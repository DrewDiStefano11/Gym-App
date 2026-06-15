import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const provider = (process.env.AI_PROVIDER || (process.env.GEMINI_API_KEY ? "gemini" : process.env.OPENAI_API_KEY ? "openai" : "gemini")).toLowerCase();
const openAiModel = process.env.OPENAI_MODEL || "gpt-5.5";
const geminiModel = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const rateWindowMs = Number(process.env.AI_RATE_WINDOW_MS || 60_000);
const chatLimit = Number(process.env.AI_CHAT_LIMIT_PER_WINDOW || 12);
const mealLimit = Number(process.env.AI_MEAL_LIMIT_PER_WINDOW || 6);
const rateBuckets = new Map();

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function resolvePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const clean = normalize(pathname === "/" ? "/index.html" : pathname).replace(/^(\.\.[/\\])+/, "");
  return join(root, clean);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

function extractJson(text, fallback = {}) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return fallback;
    try {
      return JSON.parse(match[0]);
    } catch {
      return fallback;
    }
  }
}

function clientKey(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "local";
}

function rateLimit(req, bucket, limit) {
  const now = Date.now();
  const key = `${bucket}:${clientKey(req)}`;
  const entry = rateBuckets.get(key) || { count: 0, resetAt: now + rateWindowMs };
  if (entry.resetAt <= now) {
    entry.count = 0;
    entry.resetAt = now + rateWindowMs;
  }
  entry.count += 1;
  rateBuckets.set(key, entry);
  if (entry.count > limit) {
    const error = new Error(`Free-tier limit reached. Try again in ${Math.ceil((entry.resetAt - now) / 1000)} seconds.`);
    error.status = 429;
    throw error;
  }
}

async function callOpenAi(body) {
  if (!process.env.OPENAI_API_KEY) {
    const error = new Error("OPENAI_API_KEY is not configured on the local server.");
    error.status = 503;
    throw error;
  }
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify(body)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error?.message || "OpenAI request failed.");
    error.status = response.status;
    throw error;
  }
  return payload;
}

async function callGemini({ instruction, text, imageDataUrl = "" }) {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error("GEMINI_API_KEY is not configured on the local server.");
    error.status = 503;
    throw error;
  }
  const parts = [{ text: `${instruction}\n\n${text}` }];
  if (imageDataUrl) {
    const match = imageDataUrl.match(/^data:(.+?);base64,(.+)$/);
    if (match) parts.push({ inline_data: { mime_type: match[1], data: match[2] } });
  }
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: { maxOutputTokens: 420, temperature: 0.35 }
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error?.message || "Gemini request failed.");
    error.status = response.status;
    throw error;
  }
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
}

async function handleAiChat(req, res) {
  try {
    rateLimit(req, "chat", chatLimit);
    const { message, contextMode, context } = await readJson(req);
    const clientKey = req.headers["x-gemini-key"];
    const activeKey = clientKey || process.env.GEMINI_API_KEY;

    if (!activeKey) {
      const error = new Error("GEMINI_API_KEY is not configured.");
      error.status = 503;
      throw error;
    }

    const instruction = `You are Apex Signal's strength and weight-gain coach. Keep replies under 120 words.
Use the provided app context. Be conservative, avoid medical claims.
If contextMode is 'log', interpret the message as a potential app log.
Available actions to suggest as JSON objects in 'suggestions' array:
- { "type": "workout_set", "title": "Log Set", "payload": { "exerciseName": "Bench Press", "weight": 185, "reps": 8 } }
- { "type": "food", "title": "Log Food", "payload": { "name": "Chicken and rice", "calories": 650, "protein": 45, "carbs": 70, "fats": 18 } }
- { "type": "bodyweight", "title": "Log Weight", "payload": { "weight": 184.6 } }
- { "type": "cardio", "title": "Log Cardio", "payload": { "type": "Basketball", "minutes": 45 } }
- { "type": "reminder", "title": "Create Reminder", "payload": { "title": "Weigh in", "dateTime": "2024-05-20T21:00" } }
- { "type": "start_workout", "title": "Start Workout", "payload": { "name": "Upper Body" } }

Return response as JSON: { "reply": "...", "suggestions": [...], "used": ["..."] }`;

    const prompt = `Question: ${message}\nContext mode: ${contextMode}\nApp context JSON: ${JSON.stringify(context)}`;
    let text = "";
    if (provider === "gemini") {
      const parts = [{ text: `${instruction}\n\n${prompt}` }];
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${activeKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: { maxOutputTokens: 1000, temperature: 0.2, response_mime_type: "application/json" }
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(payload.error?.message || "Gemini request failed.");
        error.status = response.status;
        throw error;
      }
      text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "{}";
    } else {
      const response = await callOpenAi({
        model: openAiModel,
        instructions: instruction,
        input: [{ role: "user", content: [{ type: "input_text", text: prompt }] }]
      });
      text = response.output_text || response.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n") || "";
    }
    sendJson(res, 200, { reply: text.trim(), suggestions: [] });
  } catch (error) {
    sendJson(res, error.status || 500, { error: error.message || "AI chat unavailable." });
  }
}

async function handleMealEstimate(req, res) {
  try {
    rateLimit(req, "meal", mealLimit);
    const { imageDataUrl, targets } = await readJson(req);
    const clientKey = req.headers["x-gemini-key"];
    const activeKey = clientKey || process.env.GEMINI_API_KEY;

    if (!activeKey) {
      const error = new Error("GEMINI_API_KEY is not configured.");
      error.status = 503;
      throw error;
    }

    const instruction = "Estimate nutrition from the food photo. Return only compact JSON with keys: name, calories, protein, carbs, fats, confidence, notes. Be conservative and mention uncertainty in notes.";
    const prompt = `Estimate this meal for a strength athlete trying to gain weight. Targets: ${JSON.stringify(targets)}`;
    let text = "";
    if (provider === "gemini") {
      const parts = [{ text: `${instruction}\n\n${prompt}` }];
      if (imageDataUrl) {
        const match = imageDataUrl.match(/^data:(.+?);base64,(.+)$/);
        if (match) parts.push({ inline_data: { mime_type: match[1], data: match[2] } });
      }
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${activeKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: { maxOutputTokens: 1000, temperature: 0.2, response_mime_type: "application/json" }
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(payload.error?.message || "Gemini request failed.");
        error.status = response.status;
        throw error;
      }
      text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "{}";
    } else {
      const response = await callOpenAi({
        model: openAiModel,
        instructions: instruction,
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: imageDataUrl }
          ]
        }]
      });
      text = response.output_text || response.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n") || "{}";
    }
    const result = extractJson(text, { reply: text });
    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, error.status || 500, { error: error.message || "Meal estimate unavailable." });
  }
}

async function handleRecoveryScreenshot(req, res) {
  try {
    rateLimit(req, "meal", mealLimit);
    const { imageDataUrl } = await readJson(req);
    const clientKey = req.headers["x-gemini-key"];
    const activeKey = clientKey || process.env.GEMINI_API_KEY;

    if (!activeKey) {
      const error = new Error("GEMINI_API_KEY is not configured.");
      error.status = 503;
      throw error;
    }

    if (!imageDataUrl) return sendJson(res, 400, { error: "Image is required." });
    const instruction = "Extract visible WHOOP or recovery screenshot data. Return only compact JSON with keys: metrics and notes. metrics may include sleepHours, sleepScore, hrv, restingHeartRate, recoveryScore, strain. Use numbers only. Omit uncertain fields. Never invent values.";
    const prompt = "Read this recovery screenshot/photo. Extract only clearly visible recovery and sleep values. If a value is not visible, omit it.";
    let text = "";
    if (provider === "gemini") {
      const parts = [{ text: `${instruction}\n\n${prompt}` }];
      const match = imageDataUrl.match(/^data:(.+?);base64,(.+)$/);
      if (match) parts.push({ inline_data: { mime_type: match[1], data: match[2] } });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${activeKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: { maxOutputTokens: 1000, temperature: 0.2, response_mime_type: "application/json" }
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(payload.error?.message || "Gemini request failed.");
        error.status = response.status;
        throw error;
      }
      text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "{}";
    } else {
      const response = await callOpenAi({
        model: openAiModel,
        instructions: instruction,
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: imageDataUrl }
          ]
        }]
      });
      text = response.output_text || response.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n") || "{}";
    }
    const extracted = extractJson(text, {});
    sendJson(res, 200, { metrics: extracted.metrics || extracted, notes: extracted.notes || "Review extracted values before saving." });
  } catch (error) {
    sendJson(res, error.status || 500, { error: error.message || "Recovery screenshot extraction unavailable." });
  }
}

async function handleBarcodeLookup(req, res) {
  try {
    const { barcode } = await readJson(req);
    const clean = String(barcode || "").replace(/\D/g, "");
    if (!clean) return sendJson(res, 400, { error: "Barcode is required." });
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${clean}.json?fields=product_name,generic_name,serving_size,product_quantity,nutriments`, {
      headers: { "User-Agent": "ApexSignal/1.0 local personal app" },
      signal: AbortSignal.timeout(4500)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.status === 0 || !payload.product) return sendJson(res, 404, { error: "Product not found." });
    sendJson(res, 200, { product: payload.product });
  } catch (error) {
    sendJson(res, 502, { error: error.message || "Barcode lookup unavailable." });
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    if (req.method === "POST" && url.pathname === "/api/ai/chat") return handleAiChat(req, res);
    if (req.method === "POST" && url.pathname === "/api/ai/meal-estimate") return handleMealEstimate(req, res);
    if (req.method === "POST" && url.pathname === "/api/recovery/whoop-screenshot") return handleRecoveryScreenshot(req, res);
    if (req.method === "POST" && url.pathname === "/api/nutrition/barcode") return handleBarcodeLookup(req, res);
    const file = resolvePath(req.url || "/");
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  } catch {
    const data = await readFile(join(root, "index.html"));
    res.writeHead(200, { "Content-Type": types[".html"], "Cache-Control": "no-store" });
    res.end(data);
  }
});

server.listen(port, () => {
  console.log(`Apex Signal running at http://localhost:${port}`);
});
