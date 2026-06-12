async function loadFitCoreApp() {
  let source = await fetch("./src/app.js?v=7", { cache: "no-store" }).then((response) => response.text());

  const sectionTabs = `const modeTabs = {
  training: [["home", "Home", navIcons.home], ["workout-start", "Start", navIcons.start], ["templates", "Add", navIcons.add], ["training-cardio", "Cardio", navIcons.cardio], ["goals", "Goals", navIcons.goals], ["training-history", "History", navIcons.history]],
  nutrition: [["home", "Home", navIcons.home], ["nutrition", "Macros", navIcons.macros], ["nutrition-weight", "Weight", navIcons.weight], ["nutrition-goals", "Goals", navIcons.goals], ["nutrition-history", "History", navIcons.history], ["nutrition-recommendations", "Tips", navIcons.stats]],
  recovery: [["home", "Home", navIcons.home], ["recovery-sleep", "Sleep", navIcons.sleep], ["health", "Ready", navIcons.stats], ["recovery-stats", "Stats", navIcons.macros], ["recovery-goals", "Goals", navIcons.goals], ["recovery-history", "History", navIcons.history]],
  progress: [["home", "Home", navIcons.home], ["progress", "Strength", navIcons.stats], ["progress-photos", "Photos", navIcons.photos], ["progress-prs", "PRs", navIcons.prs], ["progress-goals", "Goals", navIcons.goals], ["progress-history", "History", navIcons.history]]
};`;

  source = source.replace(/const modeTabs = \{[\s\S]*?\n\};\n\nconst muscleGroups =/, `${sectionTabs}\n\nconst muscleGroups =`);
  source = source.replace('let aiContextMode = "quick";', 'let aiContextMode = "quick";\nlet aiAssistantOpen = false;');
  source = source.replace(/function currentModeTabs\(\) \{[\s\S]*?\n\}/, 'function currentModeTabs() {\n  return modeTabs[state.activeMode] || modeTabs.training;\n}');
  source = source.replace(/function topAppActions\(\) \{[\s\S]*?\n\}\n\nfunction goToAdjacentTab/, `function topAppActions() {
  if (screen === "onboarding") return "";
  return \`
    <section class="global-topbar ${screen === "workout" ? "workout-global" : ""}">
      ${screen === "workout" ? \`<span class="workout-global-spacer"></span>\` : modeSwitch("compact")}
      <div class="global-actions">
        <button class="top-icon gear-button" data-screen="hub" aria-label="Open settings">${iconSvg(navIcons.hub)}</button>
      </div>
    </section>
  \`;
}

function goToAdjacentTab`);

  source = source.replace('function render() {\n  nowTick = Date.now();', 'function render() {\n  nowTick = Date.now();\n  pruneAiMessages();');
  source = source.replace('    ${bottomNav()}\n  `;', '    ${bottomNav()}\n    ${floatingAssistant()}\n  `;');
  source = source.replace('function localCoachReply(question = "") {', `function pruneAiMessages() {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const before = state.aiMessages.length;
  state.aiMessages = state.aiMessages.filter((message) => message.id === "ai-welcome" || (new Date(message.createdAt || 0).getTime() >= cutoff && !message.deletedAt));
  return state.aiMessages.length !== before;
}

function assistantMessages() {
  pruneAiMessages();
  return state.aiMessages.filter((message) => message.id !== "ai-welcome" && !message.deletedAt).slice(-16);
}

function localCoachReply(question = "") {`);
  source = source.replace('  const userMessage = normalizeAiMessage({ role: "user", content: prompt, contextMode: aiContextMode, section: state.activeMode, createdAt: new Date().toISOString() });', '  pruneAiMessages();\n  const userMessage = normalizeAiMessage({ role: "user", content: prompt, contextMode: aiContextMode, section: state.activeMode, createdAt: new Date().toISOString() });');
  source = source.replace('    state.aiMessages.push(normalizeAiMessage({ role: "assistant", content: localCoachReply(prompt), contextMode: aiContextMode, section: state.activeMode, errorState: error.message || "AI unavailable" }));', `    const message = error.message || "AI unavailable";
    const missingKey = message.includes("API_KEY") || message.toLowerCase().includes("not configured");
    state.aiMessages.push(normalizeAiMessage({
      role: "assistant",
      content: missingKey ? "AI assistant is not configured yet." : localCoachReply(prompt),
      contextMode: aiContextMode,
      section: state.activeMode,
      errorState: missingKey ? "Add GEMINI_API_KEY to Replit Secrets to enable AI." : message
    }));`);

  const assistantUi = `function assistantEmptyState() {
  return \`
    <div class="assistant-empty">
      <strong>FitCore Assistant</strong>
      <span>Ask about training, nutrition, recovery, goals, history, Apple Health summaries, or settings.</span>
      <small>If Gemini is not configured yet, the assistant will show: "AI assistant is not configured yet."</small>
    </div>
  \`;
}

function floatingAssistant() {
  const messages = assistantMessages();
  return \`
    <button class="floating-ai ${aiAssistantOpen ? "active" : ""}" data-action="toggle-ai-assistant" aria-label="${aiAssistantOpen ? "Close AI assistant" : "Open AI assistant"}">${iconSvg(navIcons.coach)}<span>AI</span></button>
    ${aiAssistantOpen ? \`
      <section class="assistant-backdrop" data-action="close-ai-assistant"></section>
      <aside class="assistant-sheet mode-${state.activeMode || "training"}" role="dialog" aria-modal="true" aria-label="FitCore AI assistant">
        <header>
          <div><p class="eyebrow">FitCore AI</p><h2>Assistant</h2></div>
          <button class="ghost" data-action="close-ai-assistant">Close</button>
        </header>
        <div class="segmented assistant-modes">
          <button class="${aiContextMode === "quick" ? "active" : ""}" data-action="set-ai-context" data-mode="quick">Quick Answer</button>
          <button class="${aiContextMode === "deep" ? "active" : ""}" data-action="set-ai-context" data-mode="deep">Detailed Coach</button>
        </div>
        <p class="privacy-note">Changes to workouts, meals, goals, templates, health data, or settings should be previewed and confirmed before saving.</p>
        <div class="chat-log assistant-log">${messages.length ? messages.map(chatBubble).join("") : assistantEmptyState()}</div>
        <div class="assistant-prompts">
          <button data-action="assistant-prompt" data-prompt="What should I focus on today?">Today</button>
          <button data-action="assistant-prompt" data-prompt="Summarize my progress this week.">Recap</button>
          <button data-action="assistant-prompt" data-prompt="What should I log next?">Log next</button>
        </div>
        <div class="chat-input assistant-input"><input data-input="ai-chat" value="${escapeAttr(aiChatDraft)}" placeholder="Ask FitCore..." /><button class="primary" data-action="send-ai-chat">Send</button></div>
      </aside>
    \` : ""}
  \`;
}

`;
  source = source.replace('function aiSuggestionRows() {', `${assistantUi}function aiSuggestionRows() {`);
  source = source.replace('      if (action === "set-ai-context") { aiContextMode = button.dataset.mode || "quick"; render(); }', `      if (action === "set-ai-context") { aiContextMode = button.dataset.mode || "quick"; render(); }
      if (action === "toggle-ai-assistant") { aiAssistantOpen = !aiAssistantOpen; render(); }
      if (action === "close-ai-assistant") { aiAssistantOpen = false; render(); }
      if (action === "assistant-prompt") { aiChatDraft = button.dataset.prompt || ""; void sendAiChat(); }`);

  const blob = new Blob([source], { type: "text/javascript" });
  await import(URL.createObjectURL(blob));
}

loadFitCoreApp().catch((error) => {
  document.querySelector("#app").innerHTML = `<main class="phone-shell"><section class="panel"><h1>FitCore could not load</h1><p>${error.message}</p></section></main>`;
});
