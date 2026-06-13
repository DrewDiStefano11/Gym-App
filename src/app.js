const V1_KEY = "focus-lift:v1";
const V2_KEY = "focus-lift:v2";
const V3_KEY = "focus-lift:v3";
const V4_KEY = "focus-lift:v4";
const V5_KEY = "focus-lift:v5";
const V6_KEY = "focus-lift:v6";
const STORAGE_KEY = "focus-lift:v7";
const AUTO_BACKUP_KEY = "apex-signal:auto-backups:v1";
const APP_NAME = "Apex Signal";
const CHAT_HISTORY_LIMIT = 40;
const LOCAL_STORAGE_WARN_BYTES = 4_500_000;
const PHOTO_WARN_BYTES = 2_500_000;
const PHOTO_UPLOAD_MAX_BYTES = 8_000_000;
const modes = [
  { id: "training", label: "Training", accent: "purple" },
  { id: "nutrition", label: "Nutrition", accent: "red" },
  { id: "recovery", label: "Recovery", accent: "blue" },
  { id: "progress", label: "Progress", accent: "green" }
];

const navIcons = {
  home: "M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4z",
  start: "M8 5v14l11-7z",
  add: "M12 5v14M5 12h14",
  cardio: "M4 15c2-6 5-6 8 0s6 6 8 0",
  goals: "M5 12a7 7 0 1014 0 7 7 0 00-14 0zm4 0a3 3 0 106 0 3 3 0 00-6 0",
  history: "M5 5v14h14M8 15l3-3 2 2 4-6",
  macros: "M5 18h14M7 18V8m5 10V5m5 13v-7",
  weight: "M7 8h10l1 11H6zM10 8a2 2 0 014 0",
  sleep: "M19 15.5A7.5 7.5 0 118.5 5 6 6 0 0019 15.5z",
  stats: "M5 19V5m0 14h14M9 16V9m4 7V7m4 9v-5",
  photos: "M5 7h4l1-2h4l1 2h4v12H5zM12 17a4 4 0 100-8 4 4 0 000 8z",
  prs: "M12 4l2.5 5 5.5.8-4 3.8.9 5.4L12 16l-4.9 2.6.9-5.4-4-3.8 5.5-.8z",
  hub: "M12 8.2a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6zM4.8 14.7l-1.1 1.9 2.2 3.8 2.2-1a8.5 8.5 0 002.1 1.2l.3 2.4h4.4l.3-2.4a8.5 8.5 0 002.1-1.2l2.2 1 2.2-3.8-1.1-1.9c.1-.4.2-.9.2-1.4s-.1-1-.2-1.4l1.1-1.9-2.2-3.8-2.2 1a8.5 8.5 0 00-2.1-1.2L14.9 3h-4.4l-.3 2.4a8.5 8.5 0 00-2.1 1.2l-2.2-1-2.2 3.8 1.1 1.9c-.1.4-.2.9-.2 1.4s.1 1 .2 1.4z",
  coach: "M12 3l2.2 5 5.3.5-4 3.5 1.2 5.2L12 14.5 7.3 17l1.2-5.2-4-3.5 5.3-.5z",
  trash: "M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
};

const modeTabs = {
  training: [["home", "Home", navIcons.home], ["workout-start", "Log", navIcons.start], ["goals", "Goals", navIcons.goals]],
  nutrition: [["home", "Home", navIcons.home], ["nutrition", "Log", navIcons.macros], ["nutrition-goals", "Goals", navIcons.goals]],
  recovery: [["home", "Home", navIcons.home], ["health", "Log", navIcons.stats], ["recovery-goals", "Goals", navIcons.goals]],
  progress: [["home", "Home", navIcons.home], ["progress", "Log", navIcons.stats], ["progress-goals", "Goals", navIcons.goals]]
};

const muscleGroups = ["Chest", "Back", "Quads", "Hamstrings", "Glutes", "Shoulders", "Triceps", "Biceps", "Lats", "Core"];

const builtInExercises = [
  { id: "bench-press", name: "Bench Press", category: "Push", primaryMuscles: ["Chest", "Triceps"], secondaryMuscles: ["Shoulders"], movementPattern: "Horizontal Push", equipment: "Barbell", difficulty: "Intermediate", alternatives: ["incline-db-press", "overhead-press"], custom: false },
  { id: "squat", name: "Back Squat", category: "Legs", primaryMuscles: ["Quads", "Glutes"], secondaryMuscles: ["Core"], movementPattern: "Squat", equipment: "Barbell", difficulty: "Intermediate", alternatives: ["leg-press", "romanian-deadlift"], custom: false },
  { id: "deadlift", name: "Deadlift", category: "Pull", primaryMuscles: ["Hamstrings", "Back"], secondaryMuscles: ["Glutes", "Core"], movementPattern: "Hinge", equipment: "Barbell", difficulty: "Advanced", alternatives: ["romanian-deadlift", "barbell-row"], custom: false },
  { id: "overhead-press", name: "Overhead Press", category: "Push", primaryMuscles: ["Shoulders", "Triceps"], secondaryMuscles: ["Core"], movementPattern: "Vertical Push", equipment: "Barbell", difficulty: "Intermediate", alternatives: ["bench-press", "incline-db-press"], custom: false },
  { id: "overhead-tricep-extension", name: "Overhead Tricep Extension", category: "Push", primaryMuscles: ["Triceps"], secondaryMuscles: ["Shoulders"], movementPattern: "Elbow Extension", equipment: "Cable", difficulty: "Beginner", alternatives: ["overhead-press", "incline-db-press"], custom: false },
  { id: "barbell-row", name: "Barbell Row", category: "Pull", primaryMuscles: ["Back", "Biceps"], secondaryMuscles: ["Rear Delts"], movementPattern: "Horizontal Pull", equipment: "Barbell", difficulty: "Intermediate", alternatives: ["pull-up", "lat-pulldown"], custom: false },
  { id: "pull-up", name: "Pull Up", category: "Pull", primaryMuscles: ["Lats", "Biceps"], secondaryMuscles: ["Core"], movementPattern: "Vertical Pull", equipment: "Bodyweight", difficulty: "Intermediate", alternatives: ["lat-pulldown", "barbell-row"], custom: false },
  { id: "incline-db-press", name: "Incline DB Press", category: "Push", primaryMuscles: ["Upper Chest", "Shoulders"], secondaryMuscles: ["Triceps"], movementPattern: "Incline Push", equipment: "Dumbbell", difficulty: "Beginner", alternatives: ["bench-press", "overhead-press"], custom: false },
  { id: "romanian-deadlift", name: "Romanian Deadlift", category: "Legs", primaryMuscles: ["Hamstrings", "Glutes"], secondaryMuscles: ["Back"], movementPattern: "Hinge", equipment: "Barbell", difficulty: "Intermediate", alternatives: ["deadlift", "squat"], custom: false },
  { id: "lat-pulldown", name: "Lat Pulldown", category: "Pull", primaryMuscles: ["Lats", "Biceps"], secondaryMuscles: ["Rear Delts"], movementPattern: "Vertical Pull", equipment: "Machine", difficulty: "Beginner", alternatives: ["pull-up", "barbell-row"], custom: false },
  { id: "leg-press", name: "Leg Press", category: "Legs", primaryMuscles: ["Quads", "Glutes"], secondaryMuscles: ["Hamstrings"], movementPattern: "Squat", equipment: "Machine", difficulty: "Beginner", alternatives: ["squat", "romanian-deadlift"], custom: false }
];

const todayKey = () => new Date().toISOString().slice(0, 10);

const seedState = {
  version: 7,
  schemaVersion: 7,
  settings: {
    unit: "lb",
    theme: "purple-black",
    dataVersion: 7,
    suggestionSafety: "balanced",
    installPromptSeen: false,
    trackedLiftIds: ["bench-press", "squat", "overhead-tricep-extension"],
    homeHiddenPrKeys: [],
    homePinnedPrKeys: [],
    homeHiddenGoalIds: [],
    homePinnedGoalIds: [],
    notificationsEnabled: false,
    notificationPermission: "default",
    reminderTime: "18:00",
    accountLabel: "Personal",
    storageMode: "local"
  },
  activeMode: "training",
  onboardingComplete: false,
  dataSafety: { lastAutoBackupAt: null, lastSampleClearedAt: null, lastRestoreAt: null, backupCount: 0, backupError: "" },
  undoStack: [],
  pendingReview: null,
  importPreview: null,
  pendingRecoveryEstimate: null,
  pendingMealEstimate: null,
  profile: {
    id: "profile-main",
    goal: "Strength",
    experience: "Intermediate",
    trainingDaysPerWeek: 5,
    preferredEquipment: ["Barbell", "Dumbbell", "Machine", "Bodyweight", "Cable"],
    preferredSplit: "Push/Pull/Legs + Upper/Lower",
    preferredTrainingDays: ["Mon", "Tue", "Wed", "Fri", "Sat"],
    weakPoints: ["Chest", "Triceps", "Back"],
    avoidedExercises: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  },
  healthSources: [],
  healthMetrics: [],
  readinessSnapshots: [],
  liftGoals: [],
  adaptivePlanAdjustments: [],
  recoveryCheckIns: [],
  weeklyPlan: {
    id: "weekly-plan-main",
    weekStartDate: weekStartKey(),
    targetDays: 4,
    focusAreas: ["Chest", "Back", "Quads", "Hamstrings"],
    plannedSessions: [],
    completedSessionIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  },
  trainingBlocks: [],
  weeklyGoals: [],
  recommendations: [],
  customExercises: [],
  templates: [],
  progressionRules: [],
  nutritionSettings: {
    calorieTarget: 3100,
    proteinTarget: 180,
    carbTarget: 380,
    fatTarget: 90,
    goalRate: 0.5,
    bodyweight: 165,
    targetBodyweight: 165,
    updatedAt: new Date().toISOString()
  },
  mealEntries: [],
  bodyweightEntries: [],
  supplementEntries: [],
  cardioEntries: [],
  progressPhotos: [],
  aiMessages: [],
  aiSuggestions: [],
  workouts: [],
  activeWorkout: null
};

let aiChatDraft = "";
let aiContextMode = "quick";
let mealDraft = { name: "", calories: "", protein: "", carbs: "", fats: "", timing: "", barcode: "", notes: "" };
let mealPhotoData = "";
let barcodeDraft = "";
let barcodeLookupStatus = "";
let bodyweightDraft = "";
let cardioDraft = { type: "Incline walk", minutes: "", distance: "", calories: "", heartRate: "", speed: "", incline: "", notes: "" };
let supplementDraft = { type: "creatine", amount: "", timing: "", notes: "" };
let photoDraft = { view: "front", phase: "bulk", notes: "" };
const sectionHomeScreens = { training: "home", nutrition: "home", recovery: "home", progress: "home" };

let state = loadState();
let screen = !state.onboardingComplete ? "onboarding" : state.activeWorkout ? "workout" : "home";
let activePopup = null; // null | 'log-meal' | 'add-weight' | 'add-supplement' | 'recovery-checkin'
let workoutTimerInterval = null;
let lastRenderedScreen = screen;
let lastRenderedMode = state.activeMode;
let selectedExerciseId = "bench-press";
let editingWorkoutId = "";
let exerciseQuery = "";
let newExerciseName = "";
let activeSheet = "";
let whoopUploadStatus = "";
let restRemaining = 0;
let restTimerId = null;
let nowTick = Date.now();

function weekStartKey(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function loadState() {
  try {
    const v7 = localStorage.getItem(STORAGE_KEY);
    if (v7) return normalizeState(JSON.parse(v7));
    const previous = localStorage.getItem(V6_KEY) || localStorage.getItem(V5_KEY) || localStorage.getItem(V4_KEY) || localStorage.getItem(V3_KEY) || localStorage.getItem(V2_KEY) || localStorage.getItem(V1_KEY);
    if (previous) {
      const migrated = normalizeState(JSON.parse(previous));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch {
    return normalizeState(seedState);
  }
  return normalizeState(seedState);
}

function normalizeState(input = {}) {
  const merged = { ...structuredClone(seedState), ...input };
  merged.version = 7;
  merged.schemaVersion = 7;
  merged.settings = { ...seedState.settings, ...(input.settings || {}), dataVersion: 7 };
  merged.settings.trackedLiftIds = Array.isArray(merged.settings.trackedLiftIds) && merged.settings.trackedLiftIds.length ? merged.settings.trackedLiftIds : seedState.settings.trackedLiftIds;
  merged.settings.homeHiddenPrKeys = Array.isArray(merged.settings.homeHiddenPrKeys) ? merged.settings.homeHiddenPrKeys : [];
  merged.settings.homePinnedPrKeys = Array.isArray(merged.settings.homePinnedPrKeys) ? merged.settings.homePinnedPrKeys : [];
  merged.settings.homeHiddenGoalIds = Array.isArray(merged.settings.homeHiddenGoalIds) ? merged.settings.homeHiddenGoalIds : [];
  merged.settings.homePinnedGoalIds = Array.isArray(merged.settings.homePinnedGoalIds) ? merged.settings.homePinnedGoalIds : [];
  merged.onboardingComplete = Boolean(input.onboardingComplete);
  merged.dataSafety = { ...seedState.dataSafety, ...(input.dataSafety || {}) };
  merged.activeMode = input.activeMode || seedState.activeMode;
  merged.undoStack = input.undoStack || [];
  merged.pendingReview = input.pendingReview || null;
  merged.importPreview = input.importPreview || null;
  merged.pendingRecoveryEstimate = input.pendingRecoveryEstimate || null;
  merged.profile = { ...seedState.profile, ...(input.profile || {}), preferredTrainingDays: input.profile?.preferredTrainingDays?.length ? input.profile.preferredTrainingDays : seedState.profile.preferredTrainingDays, updatedAt: input.profile?.updatedAt || new Date().toISOString(), deletedAt: null };
  merged.weeklyPlan = { ...seedState.weeklyPlan, ...(input.weeklyPlan || {}), targetDays: input.weeklyPlan?.targetDays || input.profile?.trainingDaysPerWeek || 4, deletedAt: null };
  merged.weeklyPlan.plannedSessions = Array.isArray(input.weeklyPlan?.plannedSessions) ? input.weeklyPlan.plannedSessions.map(normalizePlannedSession) : [];
  merged.recoveryCheckIns = (input.recoveryCheckIns || []).map((checkIn) => ({ deletedAt: null, ...checkIn }));
  merged.healthSources = (input.healthSources || []).map((source) => ({ deletedAt: null, importMeta: null, ...source }));
  merged.healthMetrics = (input.healthMetrics || []).map((metric) => ({ deletedAt: null, ...metric }));
  merged.readinessSnapshots = (input.readinessSnapshots || []).map((snapshot) => ({ deletedAt: null, ...snapshot }));
  merged.liftGoals = (input.liftGoals?.length ? input.liftGoals : defaultLiftGoals()).map(normalizeLiftGoal);
  merged.adaptivePlanAdjustments = (input.adaptivePlanAdjustments || []).map((adjustment) => ({ deletedAt: null, ...adjustment }));
  merged.trainingBlocks = (input.trainingBlocks || defaultTrainingBlocks()).map((block) => ({ deletedAt: null, ...block }));
  merged.weeklyGoals = normalizeWeeklyGoals(input.weeklyGoals || []);
  merged.recommendations = input.recommendations || [];
  merged.customExercises = (input.customExercises || []).map((exercise) => ({ secondaryMuscles: [], movementPattern: "Custom", difficulty: "Custom", alternatives: [], createdAt: exercise.createdAt || new Date().toISOString(), updatedAt: exercise.updatedAt || new Date().toISOString(), deletedAt: null, ...exercise, custom: true }));
  merged.workouts = (input.workouts || []).map(normalizeWorkout);
  merged.activeWorkout = input.activeWorkout ? normalizeWorkout(input.activeWorkout) : null;
  merged.templates = (input.templates || []).map(normalizeTemplate);
  merged.progressionRules = input.progressionRules || [];
  merged.nutritionSettings = { ...seedState.nutritionSettings, ...(input.nutritionSettings || {}), updatedAt: input.nutritionSettings?.updatedAt || new Date().toISOString() };
  merged.mealEntries = (input.mealEntries || []).map(normalizeMealEntry);
  merged.bodyweightEntries = (input.bodyweightEntries || []).map(normalizeBodyweightEntry);
  merged.supplementEntries = (input.supplementEntries || []).map(normalizeSupplementEntry);
  merged.cardioEntries = (input.cardioEntries || []).map(normalizeCardioEntry);
  merged.progressPhotos = (input.progressPhotos || []).map(normalizeProgressPhoto);
  merged.aiMessages = (input.aiMessages || defaultAiMessages()).map(normalizeAiMessage);
  merged.aiSuggestions = (input.aiSuggestions || []).map(normalizeAiSuggestion);
  merged.pendingMealEstimate = input.pendingMealEstimate || null;
  return merged;
}

function normalizeMealEntry(meal) {
  return {
    id: meal.id || uid("meal"),
    date: meal.date || todayKey(),
    name: meal.name || "Meal",
    photoThumbnail: meal.photoThumbnail || "",
    calories: Number(meal.calories || 0),
    protein: Number(meal.protein || 0),
    carbs: Number(meal.carbs || 0),
    fats: Number(meal.fats || 0),
    timing: meal.timing || "",
    barcode: meal.barcode || "",
    confidence: meal.confidence || "manual",
    source: meal.source || "manual",
    notes: meal.notes || "",
    createdAt: meal.createdAt || new Date().toISOString(),
    updatedAt: meal.updatedAt || new Date().toISOString(),
    deletedAt: meal.deletedAt || null
  };
}

function normalizePlannedSession(session, index = 0) {
  return {
    id: session.id || uid("session"),
    name: session.name || `Session ${index + 1}`,
    dayLabel: session.dayLabel || "",
    dayIndex: Number(session.dayIndex ?? index),
    focus: session.focus || "Strength",
    targetVolume: Number(session.targetVolume || 12),
    exercises: (session.exercises || []).map((item) => ({
      exerciseId: item.exerciseId || item.id || "bench-press",
      targetSets: Number(item.targetSets || 3),
      targetRepMin: Number(item.targetRepMin || item.repRange?.[0] || 6),
      targetRepMax: Number(item.targetRepMax || item.repRange?.[1] || 10),
      defaultRest: Number(item.defaultRest || 90)
    })),
    createdAt: session.createdAt || new Date().toISOString(),
    updatedAt: session.updatedAt || new Date().toISOString(),
    deletedAt: session.deletedAt || null
  };
}

function normalizeTemplate(template, index = 0) {
  return {
    id: template.id || uid("template"),
    name: template.name || `Template ${index + 1}`,
    createdAt: template.createdAt || new Date().toISOString(),
    updatedAt: template.updatedAt || new Date().toISOString(),
    deletedAt: template.deletedAt || null,
    exercises: (template.exercises || []).map((item) => ({
      exerciseId: item.exerciseId || item.id || "bench-press",
      targetSets: Number(item.targetSets || 3),
      targetRepMin: Number(item.targetRepMin || item.repRange?.[0] || 6),
      targetRepMax: Number(item.targetRepMax || item.repRange?.[1] || 10),
      defaultRest: Number(item.defaultRest || 90),
      notes: item.notes || ""
    }))
  };
}

function normalizeBodyweightEntry(entry) {
  return {
    id: entry.id || uid("weight"),
    date: entry.date || todayKey(),
    weight: Number(entry.weight || 0),
    notes: entry.notes || "",
    timing: entry.timing || "",
    source: entry.source || "manual",
    createdAt: entry.createdAt || new Date().toISOString(),
    updatedAt: entry.updatedAt || new Date().toISOString(),
    deletedAt: entry.deletedAt || null
  };
}

function normalizeSupplementEntry(entry) {
  return {
    id: entry.id || uid("supplement"),
    date: entry.date || todayKey(),
    type: entry.type || "creatine",
    amount: entry.amount || "",
    timing: entry.timing || "",
    notes: entry.notes || "",
    createdAt: entry.createdAt || new Date().toISOString(),
    updatedAt: entry.updatedAt || new Date().toISOString(),
    deletedAt: entry.deletedAt || null
  };
}

function normalizeCardioEntry(entry) {
  return {
    id: entry.id || uid("cardio"),
    date: entry.date || todayKey(),
    type: entry.type || "Incline walk",
    minutes: Number(entry.minutes || 0),
    distance: Number(entry.distance || 0),
    calories: Number(entry.calories || 0),
    heartRate: Number(entry.heartRate || 0),
    speed: Number(entry.speed || 0),
    incline: Number(entry.incline || 0),
    notes: entry.notes || "",
    createdAt: entry.createdAt || new Date().toISOString(),
    updatedAt: entry.updatedAt || new Date().toISOString(),
    deletedAt: entry.deletedAt || null
  };
}

function normalizeProgressPhoto(photo) {
  return {
    id: photo.id || uid("photo"),
    date: photo.date || todayKey(),
    view: photo.view || "front",
    phase: photo.phase || "bulk",
    imageDataUrl: photo.imageDataUrl || photo.photoThumbnail || "",
    notes: photo.notes || "",
    createdAt: photo.createdAt || new Date().toISOString(),
    updatedAt: photo.updatedAt || new Date().toISOString(),
    deletedAt: photo.deletedAt || null
  };
}

function normalizeWeeklyGoals(inputGoals = []) {
  const currentWeek = weekStartKey();
  const goals = inputGoals.filter((goal) => goal.weekStartDate === currentWeek && !goal.deletedAt).map((goal) => ({
    id: goal.id || uid("weekly-goal"),
    section: goal.section || "training",
    title: goal.title || "Weekly goal",
    metric: goal.metric || "sessions",
    target: Number(goal.target || 1),
    weekStartDate: currentWeek,
    createdAt: goal.createdAt || new Date().toISOString(),
    updatedAt: goal.updatedAt || new Date().toISOString(),
    completedAt: goal.completedAt || null,
    deletedAt: null
  }));
  return goals.length ? goals : defaultWeeklyGoals(currentWeek);
}

function defaultWeeklyGoals(weekStartDate = weekStartKey()) {
  return [
    { section: "training", title: "Complete planned sessions", metric: "trainingSessions", target: Number(seedState.profile.trainingDaysPerWeek || 5) },
    { section: "nutrition", title: "Hit calories and protein", metric: "nutritionAdherence", target: 5 },
    { section: "recovery", title: "Recovery check-ins", metric: "recoveryCheckIns", target: 4 },
    { section: "progress", title: "Log tracked-lift progress", metric: "trackedLiftSessions", target: 2 }
  ].map((goal) => ({ id: uid("weekly-goal"), ...goal, weekStartDate, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), completedAt: null, deletedAt: null }));
}

function normalizeAiMessage(message) {
  return {
    id: message.id || uid("ai"),
    role: message.role || "assistant",
    content: message.content || "",
    contextMode: message.contextMode || "quick",
    section: message.section || state?.activeMode || "training",
    relatedActions: message.relatedActions || [],
    errorState: message.errorState || null,
    createdAt: message.createdAt || new Date().toISOString(),
    deletedAt: message.deletedAt || null
  };
}

function normalizeAiSuggestion(suggestion) {
  return {
    id: suggestion.id || uid("suggestion"),
    type: suggestion.type || "note",
    title: suggestion.title || "AI suggestion",
    reasoning: suggestion.reasoning || "",
    payload: suggestion.payload || {},
    status: suggestion.status || "pending",
    createdAt: suggestion.createdAt || new Date().toISOString(),
    appliedAt: suggestion.appliedAt || null,
    deletedAt: suggestion.deletedAt || null
  };
}

function normalizeLiftGoal(goal) {
  const exerciseId = goal.exerciseId || "bench-press";
  const baseline = Number(goal.baselineE1rm || goal.createdE1rm || 0);
  const target = Number(goal.targetE1rm || (baseline ? baseline * 1.12 : 100));
  const targetDate = goal.targetDate || new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().slice(0, 10);
  const normalized = {
    id: goal.id || uid("goal"),
    exerciseId,
    baselineE1rm: roundWeight(baseline),
    targetE1rm: roundWeight(target),
    targetDate,
    weeklyTargets: Array.isArray(goal.weeklyTargets) ? goal.weeklyTargets : [],
    projectedE1rm: Number(goal.projectedE1rm || 0),
    status: goal.status || "on-track",
    createdAt: goal.createdAt || new Date().toISOString(),
    updatedAt: goal.updatedAt || new Date().toISOString(),
    lastEvaluatedAt: goal.lastEvaluatedAt || null,
    archivedAt: goal.archivedAt || null,
    deletedAt: goal.deletedAt || null
  };
  return { ...normalized, weeklyTargets: normalized.weeklyTargets.length ? normalized.weeklyTargets : buildGoalWeeklyTargets(normalized, baseline) };
}

function normalizeWorkout(workout) {
  return {
    id: workout.id || uid("workout"),
    createdAt: workout.createdAt || workout.startedAt || new Date().toISOString(),
    updatedAt: workout.updatedAt || new Date().toISOString(),
    deletedAt: workout.deletedAt || null,
    startedAt: workout.startedAt || new Date().toISOString(),
    finishedAt: workout.finishedAt || null,
    notes: workout.notes || "",
    templateId: workout.templateId || null,
    recommendationId: workout.recommendationId || null,
    dataWarnings: workout.dataWarnings || [],
    exercises: (workout.exercises || []).map((item, order) => ({
      exerciseId: item.exerciseId,
      order: item.order ?? order,
      targetSets: item.targetSets || 3,
      targetRepMin: item.targetRepMin || 6,
      targetRepMax: item.targetRepMax || 10,
      completedAt: item.completedAt || null,
      sets: (item.sets || []).map((set) => ({
        id: set.id || uid("set"),
        createdAt: set.createdAt || new Date().toISOString(),
        updatedAt: set.updatedAt || new Date().toISOString(),
        deletedAt: set.deletedAt || null,
        weight: set.weight ?? "",
        reps: set.reps ?? "",
        completed: Boolean(set.completed),
        restSeconds: set.restSeconds || 90,
        notes: set.notes || "",
        rpe: set.rpe || "",
        rir: set.rir || "",
        targetReps: set.targetReps || "",
        suggestedWeight: set.suggestedWeight || "",
        isPr: Boolean(set.isPr),
        isWarmup: Boolean(set.isWarmup),
        isDropSet: Boolean(set.isDropSet),
        isPartial: Boolean(set.isPartial),
        toFailure: Boolean(set.toFailure),
        isUnilateral: Boolean(set.isUnilateral),
        isControlledTempo: Boolean(set.isControlledTempo)
      }))
    }))
  };
}

function saveState() {
  state.weeklyPlan.targetDays = Number(state.profile.trainingDaysPerWeek) || 4;
  state.weeklyGoals = normalizeWeeklyGoals(state.weeklyGoals);
  trimAiHistory();
  state.profile.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function autoBackups() {
  try {
    return JSON.parse(localStorage.getItem(AUTO_BACKUP_KEY) || "[]");
  } catch {
    return [];
  }
}

function backupSummary(snapshot = state) {
  return {
    workouts: snapshot.workouts?.filter((item) => !item.deletedAt).length || 0,
    meals: snapshot.mealEntries?.filter((item) => !item.deletedAt).length || 0,
    healthMetrics: snapshot.healthMetrics?.filter((item) => !item.deletedAt).length || 0,
    photos: snapshot.progressPhotos?.filter((item) => !item.deletedAt).length || 0,
    templates: snapshot.templates?.filter((item) => !item.deletedAt).length || 0,
    goals: snapshot.liftGoals?.filter((item) => !item.deletedAt && !item.archivedAt).length || 0
  };
}

function byteSize(value) {
  return new Blob([typeof value === "string" ? value : JSON.stringify(value)]).size;
}

function formatBytes(bytes = 0) {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes > 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

function storageUsage() {
  const structuredState = {
    ...state,
    progressPhotos: state.progressPhotos.map((photo) => ({ ...photo, imageDataUrl: photo.imageDataUrl ? "[file]" : "" })),
    mealEntries: state.mealEntries.map((meal) => ({ ...meal, photoThumbnail: meal.photoThumbnail ? "[thumbnail]" : "" })),
    pendingMealEstimate: state.pendingMealEstimate ? { ...state.pendingMealEstimate, photoThumbnail: state.pendingMealEstimate.photoThumbnail ? "[thumbnail]" : "" } : null
  };
  const progressPhotoBytes = state.progressPhotos.filter((photo) => !photo.deletedAt).reduce((sum, photo) => sum + byteSize(photo.imageDataUrl || ""), 0);
  const mealPhotoBytes = state.mealEntries.filter((meal) => !meal.deletedAt).reduce((sum, meal) => sum + byteSize(meal.photoThumbnail || ""), 0) + byteSize(state.pendingMealEstimate?.photoThumbnail || "");
  const backupBytes = byteSize(localStorage.getItem(AUTO_BACKUP_KEY) || "");
  const structuredBytes = byteSize(structuredState);
  const totalBytes = byteSize(localStorage.getItem(STORAGE_KEY) || "") + backupBytes;
  return {
    structuredBytes,
    progressPhotoBytes,
    mealPhotoBytes,
    backupBytes,
    totalBytes,
    photoBytes: progressPhotoBytes + mealPhotoBytes,
    status: totalBytes > LOCAL_STORAGE_WARN_BYTES || progressPhotoBytes + mealPhotoBytes > PHOTO_WARN_BYTES ? "Watch" : "OK"
  };
}

function createAutoBackup(reason = "Auto backup") {
  try {
    const snapshot = normalizeState({ ...state, undoStack: [], importPreview: null, pendingMealEstimate: null });
    const backups = autoBackups();
    backups.unshift({
      id: uid("backup"),
      reason,
      createdAt: new Date().toISOString(),
      version: snapshot.version,
      summary: backupSummary(snapshot),
      snapshot
    });
    localStorage.setItem(AUTO_BACKUP_KEY, JSON.stringify(backups.slice(0, 5)));
    state.dataSafety = { ...state.dataSafety, lastAutoBackupAt: backups[0].createdAt, backupCount: Math.min(backups.length, 5), backupError: "" };
  } catch (error) {
    const backups = autoBackups().slice(0, 1);
    try {
      localStorage.setItem(AUTO_BACKUP_KEY, JSON.stringify(backups));
    } catch {}
    state.dataSafety = { ...state.dataSafety, backupCount: backups.length, backupError: "Automatic backup storage is full. Export JSON for a full copy." };
  }
  saveState();
}

function trimAiHistory() {
  const active = state.aiMessages.filter((message) => !message.deletedAt && message.id !== "ai-welcome");
  const grouped = active.reduce((map, message) => {
    const section = message.section || "training";
    map[section] = map[section] || [];
    map[section].push(message);
    return map;
  }, {});
  const kept = Object.values(grouped).flatMap((messages) => messages.slice(-CHAT_HISTORY_LIMIT));
  const welcome = state.aiMessages.find((message) => message.id === "ai-welcome");
  state.aiMessages = [welcome, ...kept].filter(Boolean);
}

function clearCachedPhotos() {
  if (!confirm("Clear cached meal/progress photos from this device?")) return;
  pushUndo("Cleared cached photos");
  state.mealEntries = state.mealEntries.map((meal) => ({ ...meal, photoThumbnail: "", updatedAt: new Date().toISOString() }));
  state.pendingMealEstimate = state.pendingMealEstimate ? { ...state.pendingMealEstimate, photoThumbnail: "" } : null;
  state.progressPhotos = state.progressPhotos.map((photo) => ({ ...photo, deletedAt: photo.deletedAt || new Date().toISOString(), updatedAt: new Date().toISOString() }));
  createAutoBackup("Cleared cached photos");
  render();
}

function restoreAutoBackup(id) {
  const backup = autoBackups().find((item) => item.id === id);
  if (!backup?.snapshot) return;
  pushUndo(`Restored ${backup.reason}`);
  const remainingUndo = state.undoStack;
  state = normalizeState(backup.snapshot);
  state.undoStack = remainingUndo;
  state.dataSafety = { ...state.dataSafety, lastRestoreAt: new Date().toISOString(), backupCount: autoBackups().length };
  saveState();
  screen = "hub";
  render();
}

function clearAutoBackups() {
  if (!confirm("Clear local automatic backups? Export first if you want a copy.")) return;
  pushUndo("Cleared auto backups");
  localStorage.removeItem(AUTO_BACKUP_KEY);
  state.dataSafety = { ...state.dataSafety, backupCount: 0, backupError: "" };
  saveState();
  render();
}

function clearSampleHealthForRealData() {
  const sourceIds = state.healthSources.filter((source) => source.type === "sample").map((source) => source.id);
  if (!sourceIds.length) return false;
  state.healthSources = state.healthSources.filter((source) => source.type !== "sample");
  state.healthMetrics = state.healthMetrics.filter((metric) => !sourceIds.includes(metric.sourceId));
  state.readinessSnapshots = state.readinessSnapshots.filter((snapshot) => !snapshot.sourceIds?.some((id) => sourceIds.includes(id)));
  state.adaptivePlanAdjustments = [];
  state.recommendations = [];
  state.dataSafety = { ...state.dataSafety, lastSampleClearedAt: new Date().toISOString() };
  return true;
}

function pushUndo(label) {
  state.undoStack = [
    { id: uid("undo"), label, createdAt: new Date().toISOString(), snapshot: JSON.stringify({ ...state, undoStack: [] }) },
    ...(state.undoStack || [])
  ].slice(0, 8);
}

function undoLast() {
  const item = state.undoStack?.[0];
  if (!item) return;
  const remaining = state.undoStack.slice(1);
  state = normalizeState(JSON.parse(item.snapshot));
  state.undoStack = remaining;
  saveState();
  render();
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function allExercises() {
  return [...builtInExercises, ...state.customExercises.filter((exercise) => !exercise.deletedAt)];
}

function getExercise(id) {
  return allExercises().find((exercise) => exercise.id === id) || builtInExercises[0];
}

function exerciseOptions(selectedId = selectedExerciseId) {
  return allExercises().map((exercise) => `<option value="${exercise.id}" ${exercise.id === selectedId ? "selected" : ""}>${exercise.name}</option>`).join("");
}

function trackedLiftIds() {
  const valid = new Set(allExercises().map((exercise) => exercise.id));
  const ids = (state.settings.trackedLiftIds || []).filter((id) => valid.has(id));
  return ids.length ? ids : seedState.settings.trackedLiftIds;
}

function toggleTrackedLift(exerciseId) {
  const current = new Set(trackedLiftIds());
  if (current.has(exerciseId) && current.size > 1) current.delete(exerciseId);
  else current.add(exerciseId);
  state.settings.trackedLiftIds = Array.from(current).slice(0, 6);
  if (!state.settings.trackedLiftIds.includes(selectedExerciseId)) selectedExerciseId = state.settings.trackedLiftIds[0];
  saveState();
  render();
}

function trackedLiftSelector() {
  const tracked = new Set(trackedLiftIds());
  return `<div class="tracked-lifts">${allExercises().slice(0, 14).map((exercise) => `<button class="${tracked.has(exercise.id) ? "active" : ""}" data-action="toggle-tracked-lift" data-id="${exercise.id}">${exercise.name}</button>`).join("")}</div>`;
}

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatClock(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safe / 60)}:${(safe % 60).toString().padStart(2, "0")}`;
}

function secondsSince(iso) {
  return Math.floor((nowTick - new Date(iso).getTime()) / 1000);
}

function workoutVolume(workout) {
  return workout.exercises.reduce((total, item) => total + item.sets.reduce((sum, set) => sum + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0), 0);
}

function completedSets(workout) {
  return workout.exercises.reduce((total, item) => total + item.sets.filter((set) => set.completed).length, 0);
}

function completedWorkouts(days = 3650) {
  const since = daysAgo(days);
  return state.workouts.filter((workout) => !workout.deletedAt && new Date(workout.finishedAt || workout.startedAt) >= since);
}

function completedTrainingSessions(days = 3650) {
  const since = daysAgo(days);
  const strength = completedWorkouts(days).map((workout) => ({ type: "strength", date: workout.finishedAt || workout.startedAt, item: workout }));
  const cardio = state.cardioEntries
    .filter((entry) => !entry.deletedAt && new Date(entry.date) >= since)
    .map((entry) => ({ type: "cardio", date: entry.date, item: entry }));
  return [...strength, ...cardio].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function exerciseHistory(exerciseId) {
  return state.workouts
    .flatMap((workout) => workout.exercises.flatMap((item) => {
      if (item.exerciseId !== exerciseId) return [];
      return item.sets.filter((set) => set.completed && !set.deletedAt).map((set) => ({ ...set, workoutDate: workout.finishedAt || workout.startedAt, workoutId: workout.id }));
    }))
    .sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate));
}

function estimatedOneRepMax(set) {
  if (!set) return 0;
  return Math.round((Number(set.weight) || 0) * (1 + (Number(set.reps) || 0) / 30));
}

function bestSet(exerciseId) {
  const sets = exerciseHistory(exerciseId);
  if (!sets.length) return null;
  return sets.reduce((best, set) => estimatedOneRepMax(set) > estimatedOneRepMax(best) ? set : best, sets[0]);
}

function weeklyVolume() {
  return completedWorkouts(7).reduce((total, workout) => total + workoutVolume(workout), 0);
}

function weeklyGoalValue(metric) {
  if (metric === "trainingSessions") return completedTrainingSessions(7).length;
  if (metric === "nutritionAdherence") return weeklyNutritionAdherence().hitDays;
  if (metric === "recoveryCheckIns") return state.recoveryCheckIns.filter((entry) => !entry.deletedAt && new Date(entry.date) >= daysAgo(7)).length;
  if (metric === "trackedLiftSessions") {
    const tracked = new Set(trackedLiftIds());
    return completedWorkouts(7).filter((workout) => workout.exercises.some((item) => tracked.has(item.exerciseId) && item.sets.some((set) => set.completed))).length;
  }
  if (metric === "cardioMinutes") return weeklyCardio().minutes;
  return 0;
}

function currentWeeklyGoals(section = state.activeMode) {
  state.weeklyGoals = normalizeWeeklyGoals(state.weeklyGoals);
  return state.weeklyGoals
    .filter((goal) => goal.section === section && !goal.deletedAt && goal.weekStartDate === weekStartKey())
    .map((goal) => {
      const current = weeklyGoalValue(goal.metric);
      const target = goal.metric === "trainingSessions" ? Number(state.profile.trainingDaysPerWeek || goal.target || 4) : Number(goal.target || 1);
      const status = current >= target ? "completed" : "active";
      return { ...goal, target, current, status, pct: Math.max(4, Math.min(100, (current / Math.max(1, target)) * 100)) };
    });
}

function weeklyGoalRows(section = state.activeMode) {
  const goals = currentWeeklyGoals(section);
  if (!goals.length) return emptyState("No weekly goals", "This week's goals reset automatically.");
  return goals.map((goal) => `<div class="goal-row weekly-goal status-${goal.status}"><div><strong>${goal.title}</strong><span>${goal.current}/${goal.target} this week - ${goal.status === "completed" ? "completed" : "in progress"}</span><i><b style="width:${goal.pct}%"></b></i></div><em>${Math.round(goal.pct)}%</em></div>`).join("");
}

function mealsForDate(date = todayKey()) {
  return state.mealEntries.filter((meal) => !meal.deletedAt && meal.date === date);
}

function nutritionTotals(date = todayKey()) {
  return mealsForDate(date).reduce((total, meal) => ({
    calories: total.calories + Number(meal.calories || 0),
    protein: total.protein + Number(meal.protein || 0),
    carbs: total.carbs + Number(meal.carbs || 0),
    fats: total.fats + Number(meal.fats || 0)
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
}

function bodyweightHistory(limit = 12) {
  return state.bodyweightEntries
    .filter((entry) => !entry.deletedAt && entry.weight > 0)
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-limit)
    .map((entry) => ({ label: entry.date.slice(5), value: entry.weight }));
}

function latestBodyweight() {
  return bodyweightHistory(1)[0]?.value || state.nutritionSettings.bodyweight || 165;
}

function supplementsForDate(date = todayKey()) {
  return state.supplementEntries.filter((entry) => !entry.deletedAt && entry.date === date);
}

function supplementStatus(type) {
  return supplementsForDate().some((entry) => entry.type === type);
}

function cardioForDate(date = todayKey()) {
  return state.cardioEntries.filter((entry) => !entry.deletedAt && entry.date === date);
}

function weeklyCardio() {
  return calendarDays(7).reduce((total, day) => {
    cardioForDate(day.key).forEach((entry) => {
      total.minutes += Number(entry.minutes || 0);
      total.calories += Number(entry.calories || 0);
      total.sessions += 1;
    });
    return total;
  }, { minutes: 0, calories: 0, sessions: 0 });
}

function macroPct(value, target) {
  return Math.max(4, Math.min(100, (Number(value || 0) / Math.max(1, Number(target || 1))) * 100));
}

function roundTo(value, step) {
  return Math.round(value / step) * step;
}

function estimateMacroTargets(bodyweight = state.nutritionSettings.bodyweight || 165, goalRate = state.nutritionSettings.goalRate || 0.5) {
  const trainingDays = Number(state.profile.trainingDaysPerWeek || 4);
  const calories = roundTo(Number(bodyweight) * (15 + trainingDays * 0.35) + Number(goalRate) * 500, 50);
  const protein = Math.round(Number(bodyweight) * 1);
  const fats = Math.round(Number(bodyweight) * 0.45);
  const carbs = Math.max(100, Math.round((calories - protein * 4 - fats * 9) / 4));
  return { calorieTarget: calories, proteinTarget: protein, carbTarget: carbs, fatTarget: fats };
}

function weeklyNutritionAdherence() {
  const days = calendarDays(7);
  const target = state.nutritionSettings.calorieTarget || 1;
  const proteinTarget = state.nutritionSettings.proteinTarget || 1;
  const hitDays = days.filter((day) => {
    const totals = nutritionTotals(day.key);
    return totals.calories >= target * 0.9 && totals.protein >= proteinTarget * 0.9;
  }).length;
  return { hitDays, days: days.length, pct: Math.round((hitDays / days.length) * 100) };
}

function muscleSets(days = 7) {
  const totals = {};
  completedWorkouts(days).forEach((workout) => {
    workout.exercises.forEach((item) => {
      const exercise = getExercise(item.exerciseId);
      const sets = item.sets.filter((set) => set.completed).length;
      exercise.primaryMuscles.forEach((muscle) => {
        totals[muscle] = (totals[muscle] || 0) + sets;
      });
    });
  });
  return totals;
}

function weeklyBuckets(count = 6) {
  return Array.from({ length: count }, (_, index) => {
    const end = daysAgo((count - index - 1) * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    const workouts = state.workouts.filter((workout) => {
      const date = new Date(workout.finishedAt || workout.startedAt);
      return date >= start && date <= new Date(end.getTime() + 86400000);
    });
    const cardio = state.cardioEntries.filter((entry) => {
      const date = new Date(entry.date);
      return !entry.deletedAt && date >= start && date <= new Date(end.getTime() + 86400000);
    });
    return { label: `${start.getMonth() + 1}/${start.getDate()}`, volume: workouts.reduce((total, workout) => total + workoutVolume(workout), 0), workouts: workouts.length + cardio.length, cardioMinutes: cardio.reduce((sum, entry) => sum + Number(entry.minutes || 0), 0) };
  });
}

function calendarDays(count = 28) {
  return Array.from({ length: count }, (_, index) => {
    const date = daysAgo(count - index - 1);
    const key = date.toISOString().slice(0, 10);
    const workouts = state.workouts.filter((workout) => (workout.finishedAt || workout.startedAt || "").slice(0, 10) === key);
    const cardio = state.cardioEntries.filter((entry) => !entry.deletedAt && entry.date === key);
    return { key, label: date.getDate(), count: workouts.length + cardio.length, volume: workouts.reduce((sum, workout) => sum + workoutVolume(workout), 0), cardioMinutes: cardio.reduce((sum, entry) => sum + Number(entry.minutes || 0), 0) };
  });
}

function e1rmTrend(exerciseId, limit = 8) {
  return exerciseHistory(exerciseId).slice().reverse().map((set) => ({ label: new Date(set.workoutDate).toLocaleDateString(undefined, { month: "numeric", day: "numeric" }), value: estimatedOneRepMax(set) })).slice(-limit);
}

function volumeTrend(exerciseId, limit = 8) {
  return state.workouts
    .slice().reverse()
    .map((workout) => {
      const volume = workout.exercises.filter((item) => item.exerciseId === exerciseId).reduce((sum, item) => sum + item.sets.reduce((setSum, set) => setSum + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0), 0);
      return { label: new Date(workout.finishedAt || workout.startedAt).toLocaleDateString(undefined, { month: "numeric", day: "numeric" }), value: volume };
    })
    .filter((point) => point.value > 0)
    .slice(-limit);
}

function recentPrs(limit = 5) {
  return allExercises()
    .map((exercise) => ({ exercise, set: bestSet(exercise.id) }))
    .filter((item) => item.set)
    .sort((a, b) => new Date(b.set.workoutDate) - new Date(a.set.workoutDate))
    .slice(0, limit);
}

function prSummaryForExercise(exerciseId) {
  const sets = exerciseHistory(exerciseId);
  if (!sets.length) return null;
  const heaviest = sets.reduce((best, set) => Number(set.weight) > Number(best.weight) ? set : best, sets[0]);
  const bestE1rm = sets.reduce((best, set) => estimatedOneRepMax(set) > estimatedOneRepMax(best) ? set : best, sets[0]);
  const bestVolume = sets.reduce((best, set) => (Number(set.weight) * Number(set.reps)) > (Number(best.weight) * Number(best.reps)) ? set : best, sets[0]);
  const bestRepsAtWeight = sets.reduce((best, set) => {
    if (Number(set.weight) > Number(best.weight)) return set;
    if (Number(set.weight) === Number(best.weight) && Number(set.reps) > Number(best.reps)) return set;
    return best;
  }, sets[0]);
  const trend = e1rmTrend(exerciseId, 6);
  const delta = trend.length >= 2 ? trend.at(-1).value - trend[0].value : 0;
  return { exercise: getExercise(exerciseId), heaviest, bestE1rm, bestVolume, bestRepsAtWeight, delta };
}

function trackedPrSummaries() {
  return trackedLiftIds().map(prSummaryForExercise).filter(Boolean);
}

function streakWeeks() {
  const weeks = weeklyBuckets(8);
  let streak = 0;
  for (let i = weeks.length - 1; i >= 0; i -= 1) {
    if (weeks[i].workouts > 0) streak += 1;
    else break;
  }
  return streak;
}

function defaultLiftGoals() {
  return [
    { exerciseId: "bench-press", current: 225, target: 285 },
    { exerciseId: "overhead-tricep-extension", current: 140, target: 180 },
    { exerciseId: "squat", current: 315, target: 365 }
  ].map(({ exerciseId, current, target }) => {
    const targetDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().slice(0, 10);
    const goal = {
      id: `goal-${exerciseId}`,
      exerciseId,
      baselineE1rm: current,
      targetE1rm: roundWeight(target),
      targetDate,
      weeklyTargets: [],
      projectedE1rm: current,
      status: "on-track",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastEvaluatedAt: null,
      archivedAt: null,
      deletedAt: null
    };
    return {
      ...goal,
      weeklyTargets: buildGoalWeeklyTargets(goal, current)
    };
  });
}

function defaultTrainingBlocks() {
  return [{
    id: "block-strength-base",
    name: "Strength Base",
    startDate: weekStartKey(),
    weeks: 6,
    goalExerciseIds: ["bench-press", "squat", "deadlift"],
    weeklyVolumeTarget: 48,
    progressionRule: "double_progression",
    deloadWeek: 5,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  }];
}

function defaultAiMessages() {
  return [{
    id: "ai-welcome",
    role: "assistant",
    content: "Ask me about your progress, readiness, goals, nutrition, or what to do next. I can use a quick summary or deeper recent logs.",
    contextMode: "quick",
    relatedActions: [],
    errorState: null,
    createdAt: new Date().toISOString(),
    deletedAt: null
  }];
}

function splitBlueprint() {
  const split = String(state.profile.preferredSplit || "").toLowerCase();
  if (split.includes("push") || split.includes("ppl")) {
    return [
      { name: "Push", focus: "Chest, Shoulders, Triceps", ids: ["bench-press", "overhead-press", "overhead-tricep-extension", "incline-db-press"] },
      { name: "Pull", focus: "Back, Lats, Biceps", ids: ["barbell-row", "pull-up", "lat-pulldown"] },
      { name: "Legs", focus: "Quads, Hamstrings, Glutes", ids: ["squat", "romanian-deadlift", "leg-press"] },
      { name: "Upper", focus: "Bench and arm volume", ids: ["bench-press", "barbell-row", "overhead-tricep-extension", "lat-pulldown"] },
      { name: "Lower", focus: "Squat and hinge volume", ids: ["squat", "deadlift", "leg-press"] }
    ];
  }
  if (split.includes("upper") || split.includes("lower")) {
    return [
      { name: "Upper A", focus: "Bench and rows", ids: ["bench-press", "barbell-row", "overhead-tricep-extension"] },
      { name: "Lower A", focus: "Squat focus", ids: ["squat", "romanian-deadlift", "leg-press"] },
      { name: "Upper B", focus: "Press and pull", ids: ["overhead-press", "pull-up", "lat-pulldown"] },
      { name: "Lower B", focus: "Hinge focus", ids: ["deadlift", "leg-press", "romanian-deadlift"] }
    ];
  }
  return [
    { name: "Strength A", focus: "Bench, squat, row", ids: ["bench-press", "squat", "barbell-row"] },
    { name: "Strength B", focus: "Deadlift, press, pull", ids: ["deadlift", "overhead-press", "pull-up"] },
    { name: "Strength C", focus: "Volume and accessories", ids: ["incline-db-press", "lat-pulldown", "leg-press"] }
  ];
}

function generateWeeklyPlan() {
  const targetDays = Number(state.profile.trainingDaysPerWeek || state.weeklyPlan.targetDays || 4);
  const blueprint = splitBlueprint();
  const goalIds = activeLiftGoals().map((goal) => goal.exerciseId);
  const days = state.profile.preferredTrainingDays?.length ? state.profile.preferredTrainingDays : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].slice(0, targetDays);
  const plannedSessions = Array.from({ length: targetDays }, (_, index) => {
    const base = blueprint[index % blueprint.length];
    const ids = [...new Set([...(goalIds[index] ? [goalIds[index]] : []), ...base.ids])]
      .filter((id) => !state.profile.avoidedExercises.includes(id))
      .slice(0, 4);
    return normalizePlannedSession({
      id: `planned-${weekStartKey()}-${index}`,
      name: base.name,
      dayLabel: days[index % days.length],
      dayIndex: index,
      focus: base.focus,
      targetVolume: ids.length * 3,
      exercises: ids.map((exerciseId, exerciseIndex) => ({
        exerciseId,
        targetSets: exerciseIndex === 0 ? 4 : 3,
        targetRepMin: exerciseIndex === 0 ? 5 : 8,
        targetRepMax: exerciseIndex === 0 ? 8 : 12,
        defaultRest: restSuggestion(getExercise(exerciseId), { sets: [] })
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    }, index);
  });
  state.weeklyPlan = {
    ...state.weeklyPlan,
    weekStartDate: weekStartKey(),
    targetDays,
    focusAreas: [...new Set(plannedSessions.flatMap((session) => session.focus.split(", ").slice(0, 2)))].slice(0, 5),
    plannedSessions,
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };
  return plannedSessions;
}

function plannedSessions() {
  if (!state.weeklyPlan.plannedSessions?.length || state.weeklyPlan.weekStartDate !== weekStartKey()) {
    generateWeeklyPlan();
    saveState();
  }
  return state.weeklyPlan.plannedSessions.filter((session) => !session.deletedAt);
}

function latestRecovery() {
  return state.recoveryCheckIns.find((item) => item.date === todayKey()) || state.recoveryCheckIns[0] || null;
}

function latestReadinessSnapshot() {
  return state.readinessSnapshots.find((item) => item.date === todayKey() && !item.deletedAt) || state.readinessSnapshots.filter((item) => !item.deletedAt)[0] || null;
}

function healthSourceLabel(type) {
  return {
    apple_health: "Apple Health",
    apple_health_xml: "Apple Health XML",
    whoop: "WHOOP",
    manual: "Manual",
    sample: "Sample data"
  }[type] || "Health source";
}

function ensureHealthSource(type, notes = "") {
  let source = state.healthSources.find((item) => item.type === type && !item.deletedAt);
  if (!source) {
    source = { id: uid("source"), type, connectedStatus: type === "sample" ? "sample" : "imported", lastImportAt: null, notes, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null };
    state.healthSources.push(source);
  }
  source.lastImportAt = new Date().toISOString();
  source.updatedAt = new Date().toISOString();
  if (notes) source.notes = notes;
  return source;
}

function addHealthMetric(sourceId, date, metricType, value, unit = "", rawPayloadRef = "") {
  if (value === "" || value === null || value === undefined || Number.isNaN(Number(value))) return;
  const existing = state.healthMetrics.find((metric) => metric.sourceId === sourceId && metric.date === date && metric.metricType === metricType && !metric.deletedAt);
  const record = existing || { id: uid("metric"), sourceId, date, metricType, createdAt: new Date().toISOString(), deletedAt: null };
  record.value = Number(value);
  record.unit = unit;
  record.rawPayloadRef = rawPayloadRef;
  record.updatedAt = new Date().toISOString();
  if (!existing) state.healthMetrics.push(record);
}

function metricsForDate(date = todayKey()) {
  return state.healthMetrics.filter((metric) => metric.date === date && !metric.deletedAt);
}

function metricValue(type, date = todayKey()) {
  const metric = metricsForDate(date).find((item) => item.metricType === type);
  return metric ? Number(metric.value) : null;
}

function buildReadinessSnapshot(date = todayKey()) {
  const recovery = state.recoveryCheckIns.find((item) => item.date === date);
  const sleepHours = (metricValue("sleepHours", date) ?? Number(recovery?.sleepHours || 0)) || null;
  const sleepScore = metricValue("sleepScore", date) ?? (recovery ? Number(recovery.sleepQuality || 3) * 20 : null);
  const hrv = metricValue("hrv", date);
  const restingHeartRate = metricValue("restingHeartRate", date);
  const strain = metricValue("strain", date);
  const steps = metricValue("steps", date);
  const activeCalories = metricValue("activeCalories", date);
  const workoutMinutes = metricValue("workoutMinutes", date);
  const bodyweight = metricValue("bodyweight", date);
  const respiratoryRate = metricValue("respiratoryRate", date);
  const spo2 = metricValue("spo2", date);
  const skinTemp = metricValue("skinTemp", date);
  const manualScore = recovery ? readinessFromRecovery(recovery) : 72;
  let score = manualScore;
  if (sleepHours !== null) score += (sleepHours - 7) * 5;
  if (sleepScore !== null) score += (sleepScore - 75) * 0.25;
  if (hrv !== null) score += (hrv - 45) * 0.35;
  if (restingHeartRate !== null) score -= Math.max(0, restingHeartRate - 58) * 0.7;
  if (strain !== null) score -= Math.max(0, strain - 12) * 2;
  if (respiratoryRate !== null) score -= Math.max(0, respiratoryRate - 18) * 2;
  const sourceIds = [...new Set(metricsForDate(date).map((metric) => metric.sourceId))];
  const snapshot = {
    id: `ready-${date}`,
    date,
    sleepHours,
    sleepScore,
    hrv,
    restingHeartRate,
    steps,
    activeCalories,
    workoutMinutes,
    bodyweight,
    strain,
    respiratoryRate,
    spo2,
    skinTemp,
    readinessScore: Math.max(20, Math.min(100, Math.round(score))),
    sourceIds,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };
  state.readinessSnapshots = [snapshot, ...state.readinessSnapshots.filter((item) => item.date !== date)];
  return snapshot;
}

function readinessFromRecovery(recovery) {
  const sleepScore = Math.min(100, (Number(recovery.sleepHours) || 7) / 8 * 100);
  const quality = (Number(recovery.sleepQuality) || 3) * 20;
  const energy = (Number(recovery.energy) || 3) * 20;
  const motivation = (Number(recovery.motivation) || 3) * 20;
  const stressPenalty = (Number(recovery.stress) || 3) * 8;
  const sorenessPenalty = Object.values(recovery.muscleSoreness || {}).reduce((sum, value) => sum + Number(value || 0), 0) * 1.8;
  const painPenalty = (recovery.painFlags || []).length * 16;
  return Math.max(20, Math.min(100, Math.round((sleepScore + quality + energy + motivation) / 4 - stressPenalty - sorenessPenalty + 24 - painPenalty)));
}

function readinessScore() {
  const snapshot = latestReadinessSnapshot();
  if (snapshot) return snapshot.readinessScore;
  const recovery = latestRecovery();
  if (!recovery) return 72;
  return readinessFromRecovery(recovery);
}

function undertrainedMuscles() {
  const totals = muscleSets(7);
  const recovery = latestRecovery();
  return muscleGroups
    .map((muscle) => ({ muscle, sets: totals[muscle] || 0, soreness: Number(recovery?.muscleSoreness?.[muscle] || 0), pain: recovery?.painFlags?.includes(muscle) || false }))
    .filter((item) => !item.pain && item.soreness < 4)
    .sort((a, b) => a.sets - b.sets || a.soreness - b.soreness)
    .slice(0, 4);
}

function suggestedWeightFor(exerciseId, item = null) {
  const history = exerciseHistory(exerciseId);
  const lastSets = history.slice(0, 3);
  const last = lastSets[0];
  if (!last) return { weight: "", reason: "No history yet. Start with a comfortable working weight." };
  const min = item?.targetRepMin || 6;
  const max = item?.targetRepMax || 10;
  const increment = getExercise(exerciseId).equipment === "Dumbbell" ? 5 : 5;
  const allTop = lastSets.length >= 3 && lastSets.every((set) => Number(set.reps) >= max);
  const highEffort = lastSets.some((set) => Number(set.rpe) >= 9 || Number(set.rir) === 0);
  const misses = lastSets.filter((set) => Number(set.reps) < min).length;
  if (readinessScore() < 50) return { weight: roundWeight(Number(last.weight) * 0.9), reason: "Readiness is low. Reduce intensity today." };
  if (readinessScore() < 62) return { weight: roundWeight(Number(last.weight) * 0.95), reason: "Recovery is mixed. Slightly reduce load." };
  if (misses >= 2) return { weight: roundWeight(Number(last.weight) * 0.95), reason: "Recent misses detected. Use a small reset." };
  if (allTop && !highEffort && readinessScore() >= 78) return { weight: roundWeight(Number(last.weight) + increment), reason: `Readiness is strong and recent sets hit the top range. Add ${increment} lb.` };
  if (allTop && !highEffort && readinessScore() >= 60) return { weight: roundWeight(Number(last.weight) + increment), reason: `Recent sets hit the top range. Add ${increment} lb.` };
  if (allTop && highEffort) return { weight: Number(last.weight), reason: "You earned the reps, but effort was high. Repeat once." };
  return { weight: Number(last.weight), reason: "Build reps before adding load." };
}

function plateCalculator(weight, barWeight = 45) {
  const target = Number(weight || 0);
  if (!target || target <= barWeight) return { target, barWeight, perSide: 0, plates: [] };
  let remaining = Math.max(0, (roundTo(target, 5) - barWeight) / 2);
  const available = [45, 35, 25, 10, 5, 2.5];
  const plates = [];
  available.forEach((plate) => {
    let count = 0;
    while (remaining + 0.01 >= plate) {
      count += 1;
      remaining -= plate;
    }
    if (count) plates.push({ plate, count });
  });
  return { target: roundTo(target, 5), barWeight, perSide: roundTo((roundTo(target, 5) - barWeight) / 2, 2.5), plates };
}

function warmupSetsFor(target, exercise) {
  const weight = Number(target || 0);
  if (!weight || exercise.equipment !== "Barbell") return [];
  const reps = exercise.movementPattern.includes("Hinge") || exercise.movementPattern.includes("Squat") ? [8, 5, 3, 2] : [8, 5, 3, 1];
  const percents = [0.45, 0.6, 0.75, 0.88];
  return percents.map((pct, index) => ({
    weight: Math.max(45, roundTo(weight * pct, 5)),
    reps: reps[index]
  })).filter((set, index, arr) => index === 0 || set.weight > arr[index - 1].weight);
}

function exerciseCues(exercise) {
  const cues = {
    "Horizontal Push": ["Shoulder blades back", "Touch controlled", "Drive feet"],
    "Vertical Push": ["Ribs down", "Head through", "Lock out stacked"],
    "Squat": ["Brace first", "Knees track toes", "Drive midfoot"],
    "Hinge": ["Lats tight", "Hips back", "Push floor away"],
    "Horizontal Pull": ["Brace torso", "Pull elbows back", "Pause clean"],
    "Vertical Pull": ["Chest up", "Elbows to ribs", "Full stretch"],
    "Incline Push": ["Set bench angle", "Control bottom", "Press up/back"]
  };
  return cues[exercise.movementPattern] || ["Controlled reps", "Pain-free range", "Stop with form intact"];
}

function swapOptions(exercise) {
  const recovery = latestRecovery();
  const sore = recovery?.muscleSoreness || {};
  const pain = recovery?.painFlags || [];
  return (exercise.alternatives || [])
    .map((id) => getExercise(id))
    .filter((alt) => !state.profile.avoidedExercises.includes(alt.id))
    .map((alt) => {
      const affected = [...alt.primaryMuscles, ...(alt.secondaryMuscles || [])];
      const hasPain = affected.some((muscle) => pain.includes(muscle));
      const maxSoreness = Math.max(0, ...affected.map((muscle) => Number(sore[muscle] || 0)));
      const reason = hasPain ? "Avoid today if painful" : maxSoreness >= 4 ? "Use lighter if sore" : `${alt.movementPattern} substitute`;
      return { ...alt, reason, risky: hasPain || maxSoreness >= 4 };
    });
}

function roundWeight(value) {
  return Math.max(0, Math.round(value / 5) * 5);
}

function daysUntil(dateKey) {
  const end = new Date(dateKey);
  const today = new Date(todayKey());
  return Math.max(0, Math.ceil((end - today) / 86400000));
}

function weeksUntil(dateKey) {
  return Math.max(1, Math.ceil(daysUntil(dateKey) / 7));
}

function buildGoalWeeklyTargets(goal, baseline = goal.baselineE1rm || 0) {
  const weeks = weeksUntil(goal.targetDate);
  const start = Number(baseline || goal.baselineE1rm || 0);
  const target = Number(goal.targetE1rm || start);
  return Array.from({ length: Math.min(weeks, 16) }, (_, index) => {
    const week = index + 1;
    const pct = week / weeks;
    return {
      week,
      date: datePlusDays(week * 7).toISOString().slice(0, 10),
      targetE1rm: roundWeight(start + (target - start) * pct),
      workingWeight: roundWeight((start + (target - start) * pct) * 0.78),
      targetSets: week % 4 === 0 ? 3 : 4,
      repRange: week % 4 === 0 ? [4, 6] : [5, 8]
    };
  });
}

function datePlusDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function evaluatedGoal(goal) {
  const current = estimatedOneRepMax(bestSet(goal.exerciseId)) || Number(goal.baselineE1rm || 0);
  const baseline = Number(goal.baselineE1rm || current || 0);
  const target = Number(goal.targetE1rm || baseline || 1);
  const history = e1rmTrend(goal.exerciseId, 6);
  const recentGain = history.length >= 2 ? history.at(-1).value - history[0].value : current - baseline;
  const weeksObserved = Math.max(1, history.length - 1);
  const weeklyPace = recentGain / weeksObserved;
  const projected = roundWeight(current + weeklyPace * weeksUntil(goal.targetDate));
  const requiredNow = requiredGoalE1rm(goal);
  let status = "on-track";
  if (current >= target) status = "hit";
  else if (current + 2 >= requiredNow) status = "on-track";
  else if (projected >= target) status = "catching-up";
  else status = "behind";
  return {
    ...goal,
    baselineE1rm: baseline,
    weeklyTargets: buildGoalWeeklyTargets(goal, baseline),
    projectedE1rm: projected || current,
    status,
    lastEvaluatedAt: new Date().toISOString(),
    currentE1rm: current,
    requiredE1rm: requiredNow
  };
}

function requiredGoalE1rm(goal) {
  const start = new Date(goal.createdAt || new Date());
  const end = new Date(goal.targetDate);
  const now = new Date();
  const total = Math.max(1, end - start);
  const elapsed = Math.max(0, Math.min(total, now - start));
  const pct = elapsed / total;
  return roundWeight(Number(goal.baselineE1rm || 0) + (Number(goal.targetE1rm || 0) - Number(goal.baselineE1rm || 0)) * pct);
}

function goalStatusText(goal) {
  return {
    hit: "Goal hit",
    "on-track": "On track",
    "catching-up": "Projected close",
    behind: "Behind pace"
  }[goal.status] || "On track";
}

function buildRecommendation() {
  const gaps = undertrainedMuscles();
  const recovery = latestRecovery();
  const snapshot = latestReadinessSnapshot() || buildReadinessSnapshot();
  const adjustment = adaptivePlanAdjustment(snapshot);
  const preferredEquipment = state.profile.preferredEquipment || [];
  const picked = [];
  activeLiftGoals().map(evaluatedGoal).filter((goal) => goal.status !== "hit").slice(0, 1).forEach((goal) => {
    const goalExercise = getExercise(goal.exerciseId);
    if (goalExercise && !picked.some((item) => item.id === goalExercise.id)) picked.push(goalExercise);
  });
  gaps.forEach((gap) => {
    const exercise = allExercises().find((candidate) => {
      const trainsGap = candidate.primaryMuscles.includes(gap.muscle) || candidate.secondaryMuscles?.includes(gap.muscle);
      const allowed = !preferredEquipment.length || preferredEquipment.includes(candidate.equipment) || candidate.equipment === "Bodyweight";
      const avoided = state.profile.avoidedExercises?.includes(candidate.id);
      return trainsGap && allowed && !avoided && !picked.some((item) => item.id === candidate.id);
    });
    if (exercise) picked.push(exercise);
  });
  if (!picked.length) picked.push(builtInExercises[0], builtInExercises[4], builtInExercises[1]);
  const exercises = picked.slice(0, 4).map((exercise, index) => {
    const suggestion = suggestedWeightFor(exercise.id, { targetRepMin: 6, targetRepMax: 10 });
    const baseSets = index === 0 ? 4 : 3;
    return { exerciseId: exercise.id, targetSets: Math.max(2, Math.round(baseSets * adjustment.volumeMultiplier)), repRange: [6, 10], suggestedWeight: suggestion.weight ? roundWeight(Number(suggestion.weight) * adjustment.intensityMultiplier) : "", reasoning: suggestion.reason };
  });
  const warnings = [];
  if (readinessScore() < 55) warnings.push("Readiness is low. Keep one rep in reserve and avoid max attempts.");
  if (snapshot.sleepHours && snapshot.sleepHours < 6.5) warnings.push("Sleep is short. Accessory volume has been trimmed.");
  if (snapshot.strain && snapshot.strain > 14) warnings.push("Recent strain is high. Intensity has been softened.");
  if (recovery?.painFlags?.length) warnings.push(`Avoid painful areas today: ${recovery.painFlags.join(", ")}.`);
  const recommendation = {
    id: uid("recommendation"),
    generatedAt: new Date().toISOString(),
    sourceSignals: { gaps, readiness: readinessScore(), recoveryDate: recovery?.date || null, split: state.profile.preferredSplit, adjustmentId: adjustment.id, snapshotId: snapshot.id },
    exercises,
    reasoning: `Built from ${gaps.map((gap) => gap.muscle).join(", ") || "balanced"} gaps, active lift goals, readiness, and recent performance.`,
    warnings,
    confidence: recommendationConfidence(),
    missingData: missingCoachData(),
    changedFromPrevious: state.recommendations[0] ? "Updated from the latest readiness, muscle balance, and goal state." : "First generated recommendation.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };
  state.recommendations.unshift(recommendation);
  saveState();
  return recommendation;
}

function recommendationConfidence() {
  let score = 35;
  if (state.workouts.length >= 3) score += 20;
  if (state.workouts.length >= 8) score += 15;
  if (latestReadinessSnapshot()) score += 15;
  if (state.profile.goal && state.profile.preferredSplit && state.profile.preferredEquipment?.length) score += 10;
  if (activeLiftGoals().length) score += 5;
  const label = score >= 75 ? "High" : score >= 55 ? "Medium" : "Low";
  return { score: Math.min(100, score), label };
}

function missingCoachData() {
  const missing = [];
  if (state.workouts.length < 3) missing.push("More logged workouts");
  if (!latestReadinessSnapshot()) missing.push("Recent readiness or health data");
  if (!activeLiftGoals().length) missing.push("Lift goals");
  if (!state.recoveryCheckIns.length) missing.push("Recovery check-ins");
  return missing;
}

function adaptivePlanAdjustment(snapshot = latestReadinessSnapshot() || buildReadinessSnapshot()) {
  const readiness = snapshot.readinessScore || 72;
  const warnings = [];
  let volumeMultiplier = 1;
  let intensityMultiplier = 1;
  if (readiness < 50) {
    volumeMultiplier = 0.7;
    intensityMultiplier = 0.9;
    warnings.push("Low readiness: reduce sets and load.");
  } else if (readiness < 65) {
    volumeMultiplier = 0.85;
    intensityMultiplier = 0.95;
    warnings.push("Mixed recovery: trim accessory volume.");
  } else if (readiness > 82) {
    volumeMultiplier = 1.05;
    intensityMultiplier = 1.02;
    warnings.push("High readiness: normal progression is available.");
  }
  if (snapshot.sleepHours && snapshot.sleepHours < 6.5) {
    volumeMultiplier = Math.min(volumeMultiplier, 0.85);
    warnings.push("Sleep debt: reduce volume.");
  }
  if (snapshot.strain && snapshot.strain > 14) {
    intensityMultiplier = Math.min(intensityMultiplier, 0.94);
    warnings.push("High strain: soften intensity.");
  }
  const focusAreas = undertrainedMuscles().map((gap) => gap.muscle).slice(0, 4);
  const adjustment = {
    id: `adjust-${weekStartKey()}-${snapshot.date}`,
    weekStartDate: weekStartKey(),
    reason: warnings[0] || "Recovery supports the current plan.",
    volumeMultiplier,
    intensityMultiplier,
    focusAreas,
    warnings,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };
  state.adaptivePlanAdjustments = [adjustment, ...state.adaptivePlanAdjustments.filter((item) => item.id !== adjustment.id)];
  return adjustment;
}

function appStats() {
  const workouts = state.workouts;
  const totalSets = workouts.reduce((total, workout) => total + completedSets(workout), 0);
  const totalVolume = workouts.reduce((total, workout) => total + workoutVolume(workout), 0);
  return { workouts, totalSets, totalVolume, recent: workouts.slice(0, 4), best: recentPrs(3) };
}

function startWorkout(template = null, recommendation = null) {
  const sourceExercises = recommendation?.exercises || template?.exercises;
  const exercises = sourceExercises?.length
    ? sourceExercises.map((item, order) => {
        const exerciseId = item.exerciseId;
        const min = item.targetRepMin || item.repRange?.[0] || 6;
        const max = item.targetRepMax || item.repRange?.[1] || 10;
        return { exerciseId, order, targetSets: item.targetSets || 3, targetRepMin: min, targetRepMax: max, completedAt: null, sets: blankWorkoutSets(item.targetSets || 3, item.suggestedWeight || "", max, exerciseId, item) };
      })
    : [{ exerciseId: selectedExerciseId, order: 0, targetSets: 3, targetRepMin: 6, targetRepMax: 10, completedAt: null, sets: blankWorkoutSets(3, "", 10, selectedExerciseId) }];
  selectedExerciseId = exercises[0].exerciseId;
  state.activeWorkout = normalizeWorkout({ id: uid("workout"), startedAt: new Date().toISOString(), templateId: template?.id || null, recommendationId: recommendation?.id || null, exercises });
  screen = "workout";
  saveState();
  render();
}

function blankWorkoutSets(count = 3, weight = "", targetReps = 10, exerciseId = selectedExerciseId, item = null) {
  return Array.from({ length: Math.max(1, Number(count) || 3) }, () => newSet(weight, targetReps, exerciseId, item));
}

function startPlannedSession(sessionId) {
  const session = plannedSessions().find((item) => item.id === sessionId);
  if (!session) return;
  const template = {
    id: session.id,
    name: session.name,
    exercises: session.exercises
  };
  startWorkout(template);
}

function rebuildWeeklyPlan() {
  pushUndo("Rebuilt weekly plan");
  generateWeeklyPlan();
  state.recommendations = [];
  createAutoBackup("Rebuilt weekly plan");
  screen = "plan";
  render();
}

function newSet(weight = "", targetReps = 10, exerciseId = selectedExerciseId, item = null) {
  const suggestion = suggestedWeightFor(exerciseId, item);
  return { id: uid("set"), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null, weight: weight || suggestion.weight || "", reps: "", completed: false, restSeconds: item?.defaultRest || 90, notes: "", rpe: "", rir: "", targetReps, suggestedWeight: suggestion.weight || "", isPr: false, isWarmup: false, isDropSet: false, isPartial: false, toFailure: false, isUnilateral: false, isControlledTempo: false };
}

function addExerciseToWorkout(exerciseId) {
  if (!state.activeWorkout) return;
  if (state.activeWorkout.exercises.some((item) => item.exerciseId === exerciseId)) {
    selectedExerciseId = exerciseId;
    screen = "workout";
    render();
    return;
  }
  state.activeWorkout.exercises.push({ exerciseId, order: state.activeWorkout.exercises.length, targetSets: 3, targetRepMin: 6, targetRepMax: 10, completedAt: null, sets: blankWorkoutSets(3, "", 10, exerciseId) });
  selectedExerciseId = exerciseId;
  screen = "workout";
  saveState();
  render();
}

function addSet(itemIndex) {
  const item = state.activeWorkout.exercises[itemIndex];
  const last = item.sets.at(-1);
  item.sets.push(newSet(last?.weight || "", item.targetRepMax || 10, item.exerciseId, item));
  saveState();
  render();
}

function updateSet(itemIndex, setIndex, key, value) {
  state.activeWorkout.exercises[itemIndex].sets[setIndex][key] = value;
  state.activeWorkout.exercises[itemIndex].sets[setIndex].updatedAt = new Date().toISOString();
  saveState();
}

function toggleSet(itemIndex, setIndex) {
  const item = state.activeWorkout.exercises[itemIndex];
  const set = item.sets[setIndex];
  set.completed = !set.completed;
  if (set.completed) {
    const previousBest = bestSet(item.exerciseId);
    set.isPr = !previousBest || estimatedOneRepMax(set) > estimatedOneRepMax(previousBest);
  }
  saveState();
  render();
}

function completeExercise(itemIndex) {
  if (!state.activeWorkout?.exercises[itemIndex]) return;
  const item = state.activeWorkout.exercises[itemIndex];
  const previousBest = bestSet(item.exerciseId);
  item.sets.forEach((set) => {
    if (Number(set.weight) || Number(set.reps)) {
      set.completed = true;
      set.updatedAt = new Date().toISOString();
      set.isPr = !previousBest || estimatedOneRepMax(set) > estimatedOneRepMax(previousBest);
    }
  });
  item.completedAt = new Date().toISOString();
  const next = state.activeWorkout.exercises.find((exercise, index) => index > itemIndex && !exercise.completedAt) || state.activeWorkout.exercises.find((exercise) => !exercise.completedAt);
  if (next && !next.completedAt) selectedExerciseId = next.exerciseId;
  saveState();
  render();
}

function removeSet(itemIndex, setIndex) {
  const sets = state.activeWorkout.exercises[itemIndex].sets;
  if (sets.length === 1) return;
  sets.splice(setIndex, 1);
  saveState();
  render();
}

function duplicateSet(itemIndex, setIndex) {
  const sets = state.activeWorkout.exercises[itemIndex].sets;
  const copy = { ...sets[setIndex], id: uid("set"), completed: false, isPr: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  sets.splice(setIndex + 1, 0, copy);
  saveState();
  render();
}

function jumpSetWeight(itemIndex, setIndex, delta) {
  const set = state.activeWorkout.exercises[itemIndex].sets[setIndex];
  set.weight = Math.max(0, (Number(set.weight) || 0) + delta);
  set.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function copyPreviousSet(itemIndex, setIndex) {
  const sets = state.activeWorkout?.exercises[itemIndex]?.sets || [];
  const previous = sets[setIndex - 1] || sets.slice(0, setIndex).reverse().find((set) => Number(set.weight) || Number(set.reps));
  if (!previous || !sets[setIndex]) return;
  sets[setIndex].weight = previous.weight;
  sets[setIndex].reps = previous.reps;
  sets[setIndex].targetReps = previous.targetReps;
  sets[setIndex].updatedAt = new Date().toISOString();
  saveState();
  render();
}

function toggleWarmupSet(itemIndex, setIndex) {
  const set = state.activeWorkout.exercises[itemIndex].sets[setIndex];
  set.isWarmup = !set.isWarmup;
  saveState();
  render();
}

function toggleSetFlag(itemIndex, setIndex, flag) {
  const allowed = ["isWarmup", "isDropSet", "isPartial", "toFailure", "isUnilateral", "isControlledTempo"];
  if (!allowed.includes(flag)) return;
  const set = state.activeWorkout.exercises[itemIndex].sets[setIndex];
  set[flag] = !set[flag];
  set.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function removeExerciseFromWorkout(itemIndex) {
  if (!state.activeWorkout || state.activeWorkout.exercises.length <= 1) return;
  state.activeWorkout.exercises.splice(itemIndex, 1);
  selectedExerciseId = state.activeWorkout.exercises[0].exerciseId;
  saveState();
  render();
}

function swapWorkoutExercise(itemIndex, exerciseId) {
  if (!state.activeWorkout?.exercises[itemIndex]) return;
  const item = state.activeWorkout.exercises[itemIndex];
  item.exerciseId = exerciseId;
  item.sets = item.sets.map((set) => ({ ...set, suggestedWeight: "", updatedAt: new Date().toISOString() }));
  selectedExerciseId = exerciseId;
  saveState();
  render();
}

function dataWarnings(workout) {
  const warnings = [];
  workout.exercises.forEach((item) => {
    const exercise = getExercise(item.exerciseId);
    item.sets.forEach((set, index) => {
      if (!set.completed) warnings.push(`${exercise.name} set ${index + 1} is unfinished.`);
      if (set.completed && (!Number(set.weight) || !Number(set.reps))) warnings.push(`${exercise.name} set ${index + 1} is missing weight or reps.`);
      if (Number(set.reps) > 40 || Number(set.weight) > 1200) warnings.push(`${exercise.name} set ${index + 1} has an unusual value.`);
    });
  });
  return warnings.slice(0, 4);
}

function liveDataWarnings(workout) {
  const warnings = [];
  workout.exercises.forEach((item) => {
    const exercise = getExercise(item.exerciseId);
    item.sets.forEach((set, index) => {
      if (set.completed && (!Number(set.weight) || !Number(set.reps))) warnings.push(`${exercise.name} set ${index + 1} is missing weight or reps.`);
      if (Number(set.reps) > 40 || Number(set.weight) > 1200) warnings.push(`${exercise.name} set ${index + 1} has an unusual value.`);
    });
  });
  return warnings.slice(0, 3);
}

function finishWorkout() {
  if (!state.activeWorkout) return;
  const warnings = dataWarnings(state.activeWorkout);
  state.activeWorkout.dataWarnings = warnings;
  state.pendingReview = buildWorkoutReview(state.activeWorkout);
  screen = "review";
  saveState();
  render();
}

function saveReviewedWorkout() {
  if (!state.activeWorkout) return;
  pushUndo("Saved workout");
  state.activeWorkout.finishedAt = new Date().toISOString();
  state.activeWorkout.updatedAt = new Date().toISOString();
  state.workouts.unshift(normalizeWorkout(state.activeWorkout));
  state.weeklyPlan.completedSessionIds = [...new Set([...(state.weeklyPlan.completedSessionIds || []), state.activeWorkout.id])];
  clearSampleHealthForRealData();
  state.activeWorkout = null;
  state.pendingReview = null;
  restRemaining = 0;
  clearInterval(restTimerId);
  screen = "report";
  createAutoBackup("Saved workout");
  render();
}

function openWorkoutEditor(id) {
  editingWorkoutId = id;
  screen = "workout-edit";
  render();
}

function saveEditedWorkoutFromForm(form) {
  const workout = state.workouts.find((item) => item.id === form.dataset.workoutId && !item.deletedAt);
  if (!workout) return;
  pushUndo("Edited workout");
  const date = form.workoutDate.value || (workout.finishedAt || workout.startedAt || todayKey()).slice(0, 10);
  workout.startedAt = `${date}T${(workout.startedAt || new Date().toISOString()).slice(11, 19)}`;
  workout.finishedAt = workout.finishedAt ? `${date}T${workout.finishedAt.slice(11, 19)}` : workout.finishedAt;
  workout.notes = form.workoutNotes.value || "";
  workout.exercises = Array.from(form.querySelectorAll("[data-workout-edit-exercise]")).map((exerciseRow, order) => ({
    exerciseId: exerciseRow.querySelector("[name='exerciseId']").value,
    order,
    targetSets: Number(exerciseRow.dataset.targetSets || 3),
    targetRepMin: Number(exerciseRow.dataset.targetRepMin || 6),
    targetRepMax: Number(exerciseRow.dataset.targetRepMax || 10),
    completedAt: exerciseRow.dataset.completedAt || null,
    sets: Array.from(exerciseRow.querySelectorAll("[data-workout-edit-set]")).map((setRow) => ({
      id: setRow.dataset.setId || uid("set"),
      createdAt: setRow.dataset.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      weight: setRow.querySelector("[name='weight']").value,
      reps: setRow.querySelector("[name='reps']").value,
      completed: true,
      restSeconds: Number(setRow.dataset.restSeconds || 90),
      notes: setRow.querySelector("[name='setNotes']").value || "",
      rpe: "",
      rir: "",
      targetReps: setRow.dataset.targetReps || "",
      suggestedWeight: "",
      isPr: false,
      isWarmup: setRow.querySelector("[name='isWarmup']").checked,
      isDropSet: setRow.querySelector("[name='isDropSet']").checked,
      isPartial: setRow.querySelector("[name='isPartial']").checked,
      toFailure: setRow.querySelector("[name='toFailure']").checked,
      isUnilateral: setRow.querySelector("[name='isUnilateral']").checked,
      isControlledTempo: setRow.querySelector("[name='isControlledTempo']")?.checked || false
    }))
  })).filter((item) => item.sets.length);
  workout.updatedAt = new Date().toISOString();
  recomputeWorkoutPrs(workout);
  createAutoBackup("Edited workout");
  screen = "training-history";
  render();
}

function recomputeWorkoutPrs(workout) {
  workout.exercises.forEach((item) => {
    const previous = state.workouts
      .filter((saved) => saved.id !== workout.id && !saved.deletedAt && new Date(saved.finishedAt || saved.startedAt) < new Date(workout.finishedAt || workout.startedAt))
      .flatMap((saved) => saved.exercises.filter((exercise) => exercise.exerciseId === item.exerciseId).flatMap((exercise) => exercise.sets.filter((set) => set.completed && !set.deletedAt)));
    const bestPrevious = previous.reduce((best, set) => !best || estimatedOneRepMax(set) > estimatedOneRepMax(best) ? set : best, null);
    item.sets.forEach((set) => {
      set.isPr = set.completed && (!bestPrevious || estimatedOneRepMax(set) > estimatedOneRepMax(bestPrevious));
    });
  });
}

function deleteWorkout(id) {
  const workout = state.workouts.find((item) => item.id === id && !item.deletedAt);
  if (!workout) return;
  if (!confirm("Delete this workout? You can still use Undo from Hub.")) return;
  pushUndo("Deleted workout");
  workout.deletedAt = new Date().toISOString();
  workout.updatedAt = new Date().toISOString();
  createAutoBackup("Deleted workout");
  screen = "training-history";
  render();
}

function removeSavedWorkoutExercise(workoutId, exerciseIndex) {
  const workout = state.workouts.find((item) => item.id === workoutId && !item.deletedAt);
  if (!workout || workout.exercises.length <= 1) return;
  pushUndo("Removed workout exercise");
  workout.exercises.splice(exerciseIndex, 1);
  workout.updatedAt = new Date().toISOString();
  createAutoBackup("Removed workout exercise");
  editingWorkoutId = workoutId;
  screen = "workout-edit";
  render();
}

function removeSavedWorkoutSet(workoutId, exerciseIndex, setIndex) {
  const workout = state.workouts.find((item) => item.id === workoutId && !item.deletedAt);
  const exercise = workout?.exercises?.[exerciseIndex];
  if (!exercise || exercise.sets.length <= 1) return;
  pushUndo("Removed workout set");
  exercise.sets.splice(setIndex, 1);
  workout.updatedAt = new Date().toISOString();
  createAutoBackup("Removed workout set");
  editingWorkoutId = workoutId;
  screen = "workout-edit";
  render();
}

function buildWorkoutReview(workout) {
  const muscles = {};
  workout.exercises.forEach((item) => {
    const exercise = getExercise(item.exerciseId);
    const sets = item.sets.filter((set) => set.completed).length;
    exercise.primaryMuscles.forEach((muscle) => {
      muscles[muscle] = (muscles[muscle] || 0) + sets;
    });
  });
  const prs = workout.exercises.flatMap((item) => item.sets.filter((set) => set.completed && set.isPr).map((set) => ({ exerciseId: item.exerciseId, set })));
  return {
    volume: workoutVolume(workout),
    sets: completedSets(workout),
    muscles,
    prs,
    warnings: workout.dataWarnings || [],
    readinessImpact: readinessScore() < 55 ? "Recovery was low; next session may be lighter." : "Recovery supports normal progression.",
    nextSuggestion: state.recommendations[0]?.reasoning || "Build the next session from Coach."
  };
}

function saveActiveAsTemplate() {
  if (!state.activeWorkout) return;
  state.templates.unshift({ id: uid("template"), name: `Template ${state.templates.length + 1}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null, exercises: state.activeWorkout.exercises.map((item) => ({ exerciseId: item.exerciseId, targetSets: Math.max(item.sets.length, item.targetSets || 3), targetRepMin: item.targetRepMin || 6, targetRepMax: item.targetRepMax || 10, defaultRest: 90 })) });
  saveState();
  screen = "templates";
  render();
}

function createTemplateFromExercise() {
  state.templates.unshift({ id: uid("template"), name: `Blank Template ${state.templates.length + 1}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null, exercises: [] });
  saveState();
  screen = "templates";
  render();
}

function saveTemplateFromForm(form) {
  const template = state.templates.find((item) => item.id === form.dataset.templateId);
  if (!template) return;
  pushUndo("Edited template");
  template.name = form.templateName.value || template.name;
  template.exercises = Array.from(form.querySelectorAll("[data-template-row]")).map((row, index) => ({
    exerciseId: row.querySelector("[name='exerciseId']").value,
    targetSets: Number(row.querySelector("[name='targetSets']").value || 3),
    targetRepMin: Number(row.querySelector("[name='targetRepMin']").value || 6),
    targetRepMax: Number(row.querySelector("[name='targetRepMax']").value || 10),
    defaultRest: Number(row.querySelector("[name='defaultRest']").value || 90),
    notes: row.querySelector("[name='templateNotes']").value || "",
    order: index
  }));
  template.updatedAt = new Date().toISOString();
  createAutoBackup("Edited template");
  render();
}

function addTemplateExercise(templateId, exerciseId = selectedExerciseId) {
  const template = state.templates.find((item) => item.id === templateId);
  if (!template) return;
  pushUndo("Added template exercise");
  template.exercises.push({ exerciseId, targetSets: 3, targetRepMin: 6, targetRepMax: 10, defaultRest: 90, notes: "" });
  template.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function removeTemplateExercise(templateId, index) {
  const template = state.templates.find((item) => item.id === templateId);
  if (!template) return;
  pushUndo("Removed template exercise");
  template.exercises.splice(index, 1);
  template.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function deleteTemplate(templateId) {
  const template = state.templates.find((item) => item.id === templateId);
  if (!template) return;
  if (!confirm("Delete this template? You can still use Undo from Hub.")) return;
  pushUndo("Deleted template");
  template.deletedAt = new Date().toISOString();
  createAutoBackup("Deleted template");
  render();
}

function saveRecoveryFromForm(form) {
  const soreness = {};
  muscleGroups.forEach((muscle) => {
    soreness[muscle] = Number(form.querySelector(`[name="soreness-${muscle}"]`)?.value || 0);
  });
  const painFlags = muscleGroups.filter((muscle) => form.querySelector(`[name="pain-${muscle}"]`)?.checked);
  const checkIn = {
    id: uid("recovery"),
    date: todayKey(),
    sleepHours: Number(form.sleepHours.value || 0),
    sleepQuality: Number(form.sleepQuality.value || 3),
    energy: Number(form.energy.value || 3),
    motivation: Number(form.motivation.value || 3),
    stress: Number(form.stress.value || 3),
    muscleSoreness: soreness,
    painFlags,
    notes: form.recoveryNotes.value || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };
  state.recoveryCheckIns = [checkIn, ...state.recoveryCheckIns.filter((item) => item.date !== checkIn.date)];
  activePopup = null;
  saveState();
  render();
}

function completeOnboarding(seed = false) {
  state.onboardingComplete = true;
  if (seed) seedSampleHealthData();
  saveState();
  screen = "home";
  render();
}

function saveProfileFromForm(form) {
  const preferredDays = Array.from(form.querySelectorAll("[name='trainingDay']:checked")).map((input) => input.value);
  state.profile = {
    ...state.profile,
    goal: form.goal.value,
    experience: form.experience.value,
    trainingDaysPerWeek: preferredDays.length || Number(form.trainingDaysPerWeek.value || 4),
    preferredSplit: form.preferredSplit.value,
    preferredTrainingDays: preferredDays.length ? preferredDays : state.profile.preferredTrainingDays,
    preferredEquipment: Array.from(form.querySelectorAll("[name='equipment']:checked")).map((input) => input.value),
    weakPoints: form.weakPoints.value.split(",").map((item) => item.trim()).filter(Boolean),
    avoidedExercises: form.avoidedExercises.value.split(",").map((item) => item.trim()).filter(Boolean),
    updatedAt: new Date().toISOString()
  };
  state.weeklyPlan.targetDays = state.profile.trainingDaysPerWeek;
  state.weeklyPlan.focusAreas = state.profile.weakPoints.length ? state.profile.weakPoints : state.weeklyPlan.focusAreas;
  generateWeeklyPlan();
  createAutoBackup("Updated profile");
  render();
}

function saveAppSettingsFromForm(form) {
  state.settings = {
    ...state.settings,
    theme: form.theme.value || state.settings.theme,
    notificationsEnabled: Boolean(form.notificationsEnabled.checked),
    reminderTime: form.reminderTime.value || "18:00",
    accountLabel: form.accountLabel.value || "Personal",
    storageMode: form.storageMode.value || "local"
  };
  createAutoBackup("Updated app settings");
  render();
}

function startRest(seconds) {
  restRemaining = seconds;
  clearInterval(restTimerId);
  restTimerId = setInterval(() => {
    restRemaining -= 1;
    if (restRemaining <= 0) {
      restRemaining = 0;
      clearInterval(restTimerId);
    }
    render();
  }, 1000);
}

function createCustomExercise() {
  const name = newExerciseName.trim();
  if (!name) return;
  state.customExercises.push({ id: uid("custom"), name, category: "Custom", primaryMuscles: ["Custom"], secondaryMuscles: [], movementPattern: "Custom", equipment: "Any", difficulty: "Custom", alternatives: [], custom: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null });
  selectedExerciseId = state.customExercises.at(-1).id;
  newExerciseName = "";
  saveState();
  render();
}

function exportJson() {
  downloadFile(`focus-lift-v7-backup-${todayKey()}.json`, JSON.stringify(state, null, 2), "application/json");
}

function structuredExportState() {
  return {
    ...state,
    progressPhotos: state.progressPhotos.map((photo) => ({ ...photo, imageDataUrl: photo.imageDataUrl ? `local-object://progress-photos/${photo.id}.jpg` : "" })),
    mealEntries: state.mealEntries.map((meal) => ({ ...meal, photoThumbnail: meal.photoThumbnail ? `local-object://meal-thumbnails/${meal.id}.jpg` : "" })),
    pendingMealEstimate: null
  };
}

function exportStructuredJson() {
  downloadFile(`apex-signal-structured-${todayKey()}.json`, JSON.stringify(structuredExportState(), null, 2), "application/json");
}

function exportPhotoBackup() {
  const files = {
    exportedAt: new Date().toISOString(),
    progressPhotos: state.progressPhotos.filter((photo) => !photo.deletedAt && photo.imageDataUrl).map((photo) => ({ id: photo.id, date: photo.date, view: photo.view, phase: photo.phase, imageDataUrl: photo.imageDataUrl })),
    mealThumbnails: state.mealEntries.filter((meal) => !meal.deletedAt && meal.photoThumbnail).map((meal) => ({ id: meal.id, date: meal.date, name: meal.name, photoThumbnail: meal.photoThumbnail }))
  };
  downloadFile(`apex-signal-photo-backup-${todayKey()}.json`, JSON.stringify(files), "application/json");
}

function exportCsv() {
  const rows = [["date", "workout_id", "exercise", "weight", "reps", "rpe", "rir", "e1rm", "is_pr"]];
  state.workouts.forEach((workout) => workout.exercises.forEach((item) => item.sets.filter((set) => set.completed).forEach((set) => rows.push([workout.finishedAt || workout.startedAt, workout.id, getExercise(item.exerciseId).name, set.weight, set.reps, set.rpe || "", set.rir || "", estimatedOneRepMax(set), set.isPr ? "yes" : ""]))));
  downloadFile("focus-lift-workouts.csv", rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n"), "text/csv");
}

function downloadFile(name, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!parsed || !Array.isArray(parsed.workouts)) throw new Error("Missing workouts");
      state = normalizeState(parsed);
      createAutoBackup("Imported JSON backup");
      screen = "home";
      render();
      alert("Backup imported.");
    } catch {
      alert("That backup file does not look valid.");
    }
  };
  reader.readAsText(file);
}

function seedSampleHealthData() {
  const source = ensureHealthSource("sample", "Generated sample wearable data for local coaching tests.");
  for (let i = 0; i < 21; i += 1) {
    const date = daysAgo(i).toISOString().slice(0, 10);
    const wave = Math.sin(i / 2.2);
    addHealthMetric(source.id, date, "sleepHours", (7.1 + wave * 0.9).toFixed(1), "hr");
    addHealthMetric(source.id, date, "sleepScore", Math.round(78 + wave * 12), "%");
    addHealthMetric(source.id, date, "hrv", Math.round(48 + wave * 10), "ms");
    addHealthMetric(source.id, date, "restingHeartRate", Math.round(58 - wave * 4), "bpm");
    addHealthMetric(source.id, date, "strain", Math.max(6, Math.round(10 + Math.cos(i / 1.7) * 5)), "score");
    addHealthMetric(source.id, date, "respiratoryRate", (16 + Math.cos(i / 2) * 1.1).toFixed(1), "rpm");
    addHealthMetric(source.id, date, "spo2", (96 + Math.sin(i / 3) * 1.2).toFixed(1), "%");
    addHealthMetric(source.id, date, "skinTemp", (33.4 + Math.cos(i / 4) * 0.4).toFixed(1), "c");
    buildReadinessSnapshot(date);
  }
  adaptivePlanAdjustment(buildReadinessSnapshot());
  createAutoBackup("Seeded sample health data");
  render();
}

function clearHealthData(type = null) {
  if (!confirm(type ? "Clear sample health data?" : "Clear all imported health data from this device?")) return;
  const sourceIds = type ? state.healthSources.filter((source) => source.type === type).map((source) => source.id) : state.healthSources.map((source) => source.id);
  state.healthSources = state.healthSources.filter((source) => type && source.type !== type);
  state.healthMetrics = state.healthMetrics.filter((metric) => !sourceIds.includes(metric.sourceId));
  state.readinessSnapshots = state.readinessSnapshots.filter((snapshot) => !snapshot.sourceIds?.some((id) => sourceIds.includes(id)));
  if (!type) {
    state.healthSources = [];
    state.healthMetrics = [];
    state.readinessSnapshots = [];
  }
  saveState();
  render();
}

function importHealthFile(file, type) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const text = String(reader.result || "");
      const sourceType = file.name.toLowerCase().endsWith(".xml") ? "apple_health_xml" : type;
      state.importPreview = buildImportPreview(text, file.name, sourceType);
      saveState();
      render();
    } catch {
      alert("Could not import that health file. Try Apple Health export.xml, JSON, or CSV with date and metric columns.");
    }
  };
  reader.readAsText(file);
}

function buildImportPreview(text, fileName, type) {
  const lower = fileName.toLowerCase();
  const rows = lower.endsWith(".xml") ? previewAppleHealthXml(text) : lower.endsWith(".csv") ? previewCsvRows(text) : previewJsonRows(JSON.parse(text));
  const dates = rows.map((row) => row.date).filter(Boolean).sort();
  const duplicateCount = rows.filter((row) => state.healthMetrics.some((metric) => metric.date === row.date && row.metricType === metric.metricType && Number(metric.value) === Number(row.value) && !metric.deletedAt)).length;
  const metricCounts = rows.reduce((counts, row) => ({ ...counts, [row.metricType]: (counts[row.metricType] || 0) + 1 }), {});
  return { id: uid("preview"), type, sourceType: type, fileName, rowCount: rows.length, duplicateCount, invalidCount: rows.filter((row) => !row.date || row.value === undefined).length, dateRange: dates.length ? `${dates[0]} to ${dates.at(-1)}` : "No dates", metricCounts, rows, createdAt: new Date().toISOString() };
}

function previewAppleHealthXml(text) {
  const parsed = new DOMParser().parseFromString(text, "application/xml");
  if (parsed.querySelector("parsererror")) throw new Error("Invalid XML");
  const rows = [];
  const sleepByDate = {};
  const totalsByDate = {};
  const addDailyTotal = (date, metricType, value) => {
    if (!Number.isFinite(Number(value))) return;
    totalsByDate[date] = totalsByDate[date] || {};
    totalsByDate[date][metricType] = (totalsByDate[date][metricType] || 0) + Number(value);
  };
  parsed.querySelectorAll("Record").forEach((record, index) => {
    const type = record.getAttribute("type") || "";
    const date = normalizeMetricDate(record.getAttribute("startDate") || record.getAttribute("creationDate"));
    const value = Number(record.getAttribute("value"));
    if (!date) return;
    if (type.includes("SleepAnalysis")) {
      const sleepValue = record.getAttribute("value") || "";
      if (!sleepValue.includes("Asleep")) return;
      const start = new Date(record.getAttribute("startDate"));
      const end = new Date(record.getAttribute("endDate"));
      const hours = (end - start) / 3600000;
      if (hours > 0 && hours < 18) sleepByDate[date] = (sleepByDate[date] || 0) + hours;
      return;
    }
    if (type.includes("HeartRateVariabilitySDNN")) {
      rows.push({ date, metricType: "hrv", value, rawPayloadRef: `apple-xml-${index}` });
      return;
    }
    if (type.includes("RestingHeartRate")) {
      rows.push({ date, metricType: "restingHeartRate", value, rawPayloadRef: `apple-xml-${index}` });
      return;
    }
    if (type.includes("StepCount")) {
      addDailyTotal(date, "steps", value);
      return;
    }
    if (type.includes("ActiveEnergyBurned")) {
      addDailyTotal(date, "activeCalories", value);
      return;
    }
    if (type.includes("BodyMass")) {
      rows.push({ date, metricType: "bodyweight", value, rawPayloadRef: `apple-xml-${index}` });
    }
  });
  parsed.querySelectorAll("Workout").forEach((workout, index) => {
    const date = normalizeMetricDate(workout.getAttribute("startDate") || workout.getAttribute("creationDate"));
    if (!date) return;
    const duration = Number(workout.getAttribute("duration") || 0);
    const durationUnit = workout.getAttribute("durationUnit") || "min";
    const minutes = durationUnit.includes("sec") ? duration / 60 : durationUnit.includes("hr") ? duration * 60 : duration;
    addDailyTotal(date, "appleWorkouts", 1);
    if (minutes) addDailyTotal(date, "workoutMinutes", +minutes.toFixed(1));
    const energy = Array.from(workout.querySelectorAll("MetadataEntry")).find((entry) => (entry.getAttribute("key") || "").includes("ActiveEnergyBurned"));
    if (energy) addDailyTotal(date, "activeCalories", Number(energy.getAttribute("value")));
    rows.push({ date, metricType: "workoutSession", value: 1, rawPayloadRef: `apple-xml-workout-${index}` });
  });
  Object.entries(sleepByDate).forEach(([date, hours]) => rows.push({ date, metricType: "sleepHours", value: +hours.toFixed(2), rawPayloadRef: `apple-xml-sleep-${date}` }));
  Object.entries(totalsByDate).forEach(([date, metrics]) => {
    Object.entries(metrics).forEach(([metricType, value]) => rows.push({ date, metricType, value: +Number(value).toFixed(2), rawPayloadRef: `apple-xml-total-${metricType}-${date}` }));
  });
  return rows.filter((row) => row.value !== undefined && row.value !== null && row.value !== "" && !Number.isNaN(Number(row.value)));
}

function previewCsvRows(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines.shift()?.split(",").map((item) => item.replaceAll("\"", "").trim()) || [];
  return lines.flatMap((line, index) => {
    const cells = line.split(",").map((item) => item.replaceAll("\"", "").trim());
    const row = Object.fromEntries(headers.map((header, i) => [header, cells[i]]));
    const date = normalizeMetricDate(row.date || row.startDate || row.start || row.day);
    return Object.entries(mapImportRow(row)).map(([metricType, value]) => ({ date, metricType, value, rawPayloadRef: `csv-${index}` }));
  }).filter((row) => row.value !== undefined && row.value !== null && row.value !== "");
}

function previewJsonRows(payload) {
  const rows = Array.isArray(payload) ? payload : payload.records || payload.data || payload.metrics || [payload];
  return rows.flatMap((row, index) => {
    const date = normalizeMetricDate(row.date || row.start || row.start_date || row.created_at || row.day);
    return Object.entries(mapImportRow(row)).map(([metricType, value]) => ({ date, metricType, value, rawPayloadRef: `json-${index}` }));
  }).filter((row) => row.value !== undefined && row.value !== null && row.value !== "");
}

function confirmImportPreview() {
  if (!state.importPreview) return;
  pushUndo(`Imported ${healthSourceLabel(state.importPreview.type)} data`);
  const source = ensureHealthSource(state.importPreview.type, state.importPreview.type.includes("apple_health") ? "Manual Apple Health export.xml import. Automatic sync requires HealthKit/native iOS." : "Manual WHOOP-like import. Live sync requires backend OAuth.");
  source.importMeta = { importedFileName: state.importPreview.fileName, dateRange: state.importPreview.dateRange, metricCounts: state.importPreview.metricCounts, duplicateCount: state.importPreview.duplicateCount, invalidCount: state.importPreview.invalidCount, sourceType: state.importPreview.sourceType || state.importPreview.type };
  state.importPreview.rows.forEach((row) => addHealthMetric(source.id, row.date, row.metricType, row.value, metricUnit(row.metricType), row.rawPayloadRef));
  state.importPreview.rows.filter((row) => row.metricType === "bodyweight" && row.date && Number(row.value)).forEach((row) => {
    const exists = state.bodyweightEntries.some((entry) => entry.date === row.date && Number(entry.weight) === Number(row.value) && entry.source === "apple_health");
    if (!exists) state.bodyweightEntries.unshift(normalizeBodyweightEntry({ date: row.date, weight: Number(row.value), source: "apple_health", timing: "Apple Health", notes: "Imported from Apple Health export" }));
  });
  [...new Set(state.importPreview.rows.map((row) => row.date).filter(Boolean))].forEach((date) => buildReadinessSnapshot(date));
  buildReadinessSnapshot();
  adaptivePlanAdjustment();
  state.importPreview = null;
  createAutoBackup(`Imported ${healthSourceLabel(source.type)} data`);
  render();
}

function parseHealthCsv(text, source) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines.shift().split(",").map((item) => item.replaceAll("\"", "").trim());
  lines.forEach((line, index) => {
    const cells = line.split(",").map((item) => item.replaceAll("\"", "").trim());
    const row = Object.fromEntries(headers.map((header, i) => [header, cells[i]]));
    const date = normalizeMetricDate(row.date || row.startDate || row.start || row.day);
    if (!date) return;
    Object.entries(mapImportRow(row)).forEach(([metricType, value]) => addHealthMetric(source.id, date, metricType, value, metricUnit(metricType), `csv-${index}`));
  });
}

function parseHealthJson(payload, source) {
  const rows = Array.isArray(payload) ? payload : payload.records || payload.data || payload.metrics || [payload];
  rows.forEach((row, index) => {
    const date = normalizeMetricDate(row.date || row.start || row.start_date || row.created_at || row.day);
    if (!date) return;
    Object.entries(mapImportRow(row)).forEach(([metricType, value]) => addHealthMetric(source.id, date, metricType, value, metricUnit(metricType), `json-${index}`));
  });
}

function normalizeMetricDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toISOString().slice(0, 10);
}

function mapImportRow(row) {
  const score = row.score || {};
  return {
    sleepHours: row.sleepHours ?? row.sleep_hours ?? row.sleep_duration_hours ?? millisToHours(score.stage_summary?.total_in_bed_time_milli),
    sleepScore: row.sleepScore ?? row.sleep_score ?? row.sleep_performance_percentage ?? score.sleep_performance_percentage,
    hrv: row.hrv ?? row.hrv_rmssd_milli ?? score.hrv_rmssd_milli,
    restingHeartRate: row.restingHeartRate ?? row.resting_heart_rate ?? score.resting_heart_rate,
    steps: row.steps ?? row.stepCount ?? row.step_count,
    activeCalories: row.activeCalories ?? row.active_calories ?? row.activeEnergyBurned,
    bodyweight: row.bodyweight ?? row.body_mass ?? row.weight,
    workoutMinutes: row.workoutMinutes ?? row.workout_minutes,
    workoutSession: row.workoutSession ?? row.workout_session,
    strain: row.strain ?? score.strain,
    respiratoryRate: row.respiratoryRate ?? row.respiratory_rate ?? score.respiratory_rate,
    spo2: row.spo2 ?? row.spo2_percentage ?? score.spo2_percentage,
    skinTemp: row.skinTemp ?? row.skin_temp_celsius ?? score.skin_temp_celsius
  };
}

function millisToHours(value) {
  return value ? +(Number(value) / 3600000).toFixed(2) : undefined;
}

function metricUnit(type) {
  return { sleepHours: "hr", sleepScore: "%", hrv: "ms", restingHeartRate: "bpm", steps: "steps", activeCalories: "cal", bodyweight: "lb", workoutMinutes: "min", workoutSession: "session", appleWorkouts: "session", strain: "score", respiratoryRate: "rpm", spo2: "%", skinTemp: "c" }[type] || "";
}

function addLiftGoal() {
  const exercise = getExercise(selectedExerciseId);
  const current = estimatedOneRepMax(bestSet(exercise.id)) || 100;
  const goal = normalizeLiftGoal({
    id: uid("goal"),
    exerciseId: exercise.id,
    baselineE1rm: roundWeight(current),
    targetE1rm: roundWeight(current * 1.12),
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    archivedAt: null,
    deletedAt: null
  });
  state.liftGoals.unshift(evaluatedGoal(goal));
  state.recommendations = [];
  screen = "goals";
  createAutoBackup("Created lift goal");
  render();
}

function saveGoalFromForm(form) {
  const exerciseId = form.exerciseId.value;
  const current = estimatedOneRepMax(bestSet(exerciseId)) || Number(form.baselineE1rm.value || 0);
  const goal = normalizeLiftGoal({
    id: uid("goal"),
    exerciseId,
    baselineE1rm: roundWeight(Number(form.baselineE1rm.value || current || 0)),
    targetE1rm: roundWeight(Number(form.targetE1rm.value || current * 1.12 || 100)),
    targetDate: form.targetDate.value || datePlusDays(90).toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    archivedAt: null,
    deletedAt: null
  });
  selectedExerciseId = exerciseId;
  state.liftGoals.unshift(evaluatedGoal(goal));
  state.recommendations = [];
  createAutoBackup("Created lift goal");
  screen = "goals";
  render();
}

function weeklyReport() {
  const workouts = completedWorkouts(7);
  const sessions = completedTrainingSessions(7);
  const prs = recentPrs(4);
  const gaps = undertrainedMuscles();
  const warnings = workouts.flatMap((workout) => workout.dataWarnings || []);
  const volume = workouts.reduce((sum, workout) => sum + workoutVolume(workout), 0);
  const consistency = `${sessions.length}/${state.profile.trainingDaysPerWeek || 4}`;
  const fatigue = readinessScore() < 55 || latestRecovery()?.painFlags?.length ? "Watch fatigue" : "Green light";
  const correlations = performanceCorrelations();
  return { workouts, sessions, prs, gaps, warnings, volume, consistency, fatigue, correlations };
}

function dailyTrainingSignals(days = 28) {
  return Array.from({ length: days }, (_, index) => {
    const date = daysAgo(days - index - 1).toISOString().slice(0, 10);
    const workouts = state.workouts.filter((workout) => (workout.finishedAt || workout.startedAt || "").slice(0, 10) === date);
    const nutrition = nutritionTotals(date);
    const snapshot = state.readinessSnapshots.find((item) => item.date === date && !item.deletedAt);
    const weighIn = state.bodyweightEntries.find((entry) => entry.date === date && !entry.deletedAt);
    return {
      date,
      label: date.slice(5),
      workouts: workouts.length,
      volume: workouts.reduce((sum, workout) => sum + workoutVolume(workout), 0),
      calories: nutrition.calories,
      protein: nutrition.protein,
      readiness: snapshot?.readinessScore || null,
      sleepHours: snapshot?.sleepHours || null,
      bodyweight: weighIn?.weight || null
    };
  });
}

function correlation(xs, ys) {
  const pairs = xs.map((x, index) => [Number(x), Number(ys[index])]).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
  if (pairs.length < 3) return null;
  const avgX = pairs.reduce((sum, pair) => sum + pair[0], 0) / pairs.length;
  const avgY = pairs.reduce((sum, pair) => sum + pair[1], 0) / pairs.length;
  const numerator = pairs.reduce((sum, [x, y]) => sum + (x - avgX) * (y - avgY), 0);
  const denomX = Math.sqrt(pairs.reduce((sum, [x]) => sum + (x - avgX) ** 2, 0));
  const denomY = Math.sqrt(pairs.reduce((sum, [, y]) => sum + (y - avgY) ** 2, 0));
  return denomX && denomY ? +(numerator / (denomX * denomY)).toFixed(2) : null;
}

function performanceCorrelations() {
  const days = dailyTrainingSignals(28);
  const trainingDays = days.filter((day) => day.volume > 0 || day.calories > 0 || day.readiness !== null);
  const volume = trainingDays.map((day) => day.volume);
  const metrics = [
    { key: "calories", label: "Calories", values: trainingDays.map((day) => day.calories), unit: "cal" },
    { key: "protein", label: "Protein", values: trainingDays.map((day) => day.protein), unit: "g" },
    { key: "readiness", label: "Readiness", values: trainingDays.map((day) => day.readiness), unit: "" },
    { key: "sleepHours", label: "Sleep", values: trainingDays.map((day) => day.sleepHours), unit: "hr" }
  ];
  const cards = metrics.map((metric) => {
    const score = correlation(metric.values, volume);
    const avg = metric.values.filter((value) => Number.isFinite(Number(value)) && Number(value) > 0).reduce((sum, value, _, arr) => sum + Number(value) / arr.length, 0);
    return { ...metric, score, avg: avg ? Math.round(avg) : 0 };
  });
  const calorieAdherence = weeklyNutritionAdherence();
  const best = cards.filter((card) => card.score !== null).sort((a, b) => Math.abs(b.score) - Math.abs(a.score))[0] || null;
  const decision = best ? `${best.label} has the strongest recent relationship with training volume (${best.score}).` : "Log more workouts, meals, and recovery to unlock stronger correlations.";
  return { days, cards, calorieAdherence, weightDelta: 0, decision };
}

function aiContext(mode = aiContextMode) {
  const goals = activeLiftGoals().map(evaluatedGoal).slice(0, 3).map((goal) => ({
    exercise: getExercise(goal.exerciseId).name,
    currentE1rm: goal.currentE1rm,
    targetE1rm: goal.targetE1rm,
    targetDate: goal.targetDate,
    status: goal.status,
    projectedE1rm: goal.projectedE1rm
  }));
  const summary = {
    date: todayKey(),
    profile: {
      goal: state.profile.goal,
      experience: state.profile.experience,
      trainingDaysPerWeek: state.profile.trainingDaysPerWeek,
      split: state.profile.preferredSplit,
      weakPoints: state.profile.weakPoints
    },
    readiness: latestReadinessSnapshot() || { readinessScore: readinessScore() },
    weekly: {
      workouts: completedWorkouts(7).length,
      targetDays: state.profile.trainingDaysPerWeek,
      volume: weeklyVolume(),
      muscles: muscleSets(7),
      adherence: weeklyNutritionAdherence()
    },
    goals,
    nutrition: { targets: state.nutritionSettings, today: nutritionTotals(), mealsToday: mealsForDate().length },
    recentPrs: recentPrs(4).map((item) => ({ exercise: item.exercise.name, e1rm: estimatedOneRepMax(item.set), set: `${item.set.weight}x${item.set.reps}` })),
    warnings: dataQualitySummary()
  };
  if (mode === "deep") {
    summary.recentWorkouts = completedWorkouts(21).slice(0, 6).map((workout) => ({
      date: (workout.finishedAt || workout.startedAt || "").slice(0, 10),
      volume: workoutVolume(workout),
      exercises: workout.exercises.map((item) => ({
        name: getExercise(item.exerciseId).name,
        sets: item.sets.filter((set) => set.completed).map((set) => ({ weight: set.weight, reps: set.reps, rpe: set.rpe, rir: set.rir }))
      }))
    }));
    summary.recentMeals = state.mealEntries.filter((meal) => !meal.deletedAt).slice(0, 12).map((meal) => ({ date: meal.date, name: meal.name, timing: meal.timing, calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fats: meal.fats }));
  }
  return summary;
}

function dataQualitySummary() {
  const missing = [];
  if (state.workouts.length < 3) missing.push("More logged workouts will improve trend confidence.");
  if (!latestReadinessSnapshot()) missing.push("No imported readiness today.");
  if (!state.mealEntries.length) missing.push("No meals logged yet.");
  return missing;
}

function localCoachReply(question = "") {
  const goal = activeLiftGoals().map(evaluatedGoal)[0];
  const totals = nutritionTotals();
  const gaps = undertrainedMuscles().map((gap) => gap.muscle).slice(0, 3).join(", ") || "balanced muscles";
  const proteinLeft = Math.max(0, state.nutritionSettings.proteinTarget - totals.protein);
  const caloriesLeft = Math.max(0, state.nutritionSettings.calorieTarget - totals.calories);
  const goalLine = goal ? `${getExercise(goal.exerciseId).name} is ${goalStatusText(goal).toLowerCase()} at ${goal.currentE1rm}/${goal.targetE1rm} lb e1RM.` : "Add a lift goal to sharpen progression advice.";
  const readinessLine = readinessScore() < 60 ? "Readiness is low, so keep intensity conservative and trim accessories first." : "Readiness supports normal progression today.";
  const nutritionLine = `For weight gain today, you have about ${caloriesLeft} calories and ${proteinLeft}g protein left against your targets.`;
  return `${readinessLine} ${goalLine} Current muscle gaps: ${gaps}. ${nutritionLine} ${question.toLowerCase().includes("plan") ? "Plan suggestion: hit the goal lift first, add two gap-focused accessories, then stop 1-2 reps shy of failure." : ""}`.trim();
}

async function sendAiChat() {
  const prompt = aiChatDraft.trim();
  if (!prompt) return;
  const userMessage = normalizeAiMessage({ role: "user", content: prompt, contextMode: aiContextMode, section: state.activeMode, createdAt: new Date().toISOString() });
  state.aiMessages.push(userMessage);
  aiChatDraft = "";
  saveState();
  render();
  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt, contextMode: aiContextMode, context: aiContext(aiContextMode) })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "AI unavailable");
    state.aiMessages.push(normalizeAiMessage({ role: "assistant", content: payload.reply || localCoachReply(prompt), contextMode: aiContextMode, section: state.activeMode, relatedActions: payload.suggestions?.map((item) => item.id) || [] }));
    (payload.suggestions || []).forEach((suggestion) => state.aiSuggestions.unshift(normalizeAiSuggestion(suggestion)));
  } catch (error) {
    state.aiMessages.push(normalizeAiMessage({ role: "assistant", content: localCoachReply(prompt), contextMode: aiContextMode, section: state.activeMode, errorState: error.message || "AI unavailable" }));
  }
  saveState();
  render();
}

function applyAiSuggestion(id) {
  const suggestion = state.aiSuggestions.find((item) => item.id === id);
  if (!suggestion || suggestion.status === "applied") return;
  pushUndo(`Applied ${suggestion.title}`);
  if (suggestion.type === "nutrition_targets") {
    state.nutritionSettings = { ...state.nutritionSettings, ...suggestion.payload, updatedAt: new Date().toISOString() };
  }
  if (suggestion.type === "profile") {
    state.profile = { ...state.profile, ...suggestion.payload, updatedAt: new Date().toISOString() };
  }
  if (suggestion.type === "plan_focus" && Array.isArray(suggestion.payload.focusAreas)) {
    state.weeklyPlan.focusAreas = suggestion.payload.focusAreas;
  }
  suggestion.status = "applied";
  suggestion.appliedAt = new Date().toISOString();
  createAutoBackup(`Applied ${suggestion.title}`);
  render();
}

function dismissAiSuggestion(id) {
  const suggestion = state.aiSuggestions.find((item) => item.id === id);
  if (!suggestion) return;
  suggestion.status = "dismissed";
  saveState();
  render();
}

async function estimateMealFromPhoto(file) {
  if (file.size > PHOTO_UPLOAD_MAX_BYTES) {
    state.pendingMealEstimate = { errorState: "Photo is too large. Use a smaller image or crop it before estimating.", createdAt: new Date().toISOString() };
    saveState();
    render();
    return;
  }
  const thumbnail = await imageFileToDataUrl(file, 760);
  mealPhotoData = thumbnail;
  state.pendingMealEstimate = { loading: true, photoThumbnail: thumbnail, createdAt: new Date().toISOString() };
  saveState();
  render();
  try {
    const response = await fetch("/api/ai/meal-estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageDataUrl: thumbnail, goal: "muscle gain", targets: state.nutritionSettings })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "AI meal estimate unavailable");
    const estimate = payload.meal || {};
    mealDraft = {
      name: estimate.name || "Estimated meal",
      calories: estimate.calories || "",
      protein: estimate.protein || "",
      carbs: estimate.carbs || "",
      fats: estimate.fats || "",
      timing: mealDraft.timing || "",
      barcode: mealDraft.barcode || "",
      notes: estimate.notes || "AI estimate. Review before saving."
    };
    state.pendingMealEstimate = { ...mealDraft, photoThumbnail: thumbnail, confidence: estimate.confidence || "AI estimate", source: "ai", createdAt: new Date().toISOString() };
  } catch (error) {
    mealDraft = { name: "Photo meal", calories: "", protein: "", carbs: "", fats: "", timing: mealDraft.timing || "", barcode: mealDraft.barcode || "", notes: "AI unavailable. Enter macros manually." };
    state.pendingMealEstimate = { ...mealDraft, photoThumbnail: thumbnail, confidence: "manual", source: "manual", errorState: error.message || "AI unavailable", createdAt: new Date().toISOString() };
  }
  saveState();
  render();
}

function productMacros(product = {}, barcode = "") {
  const nutriments = product.nutriments || {};
  const number = (...keys) => {
    for (const key of keys) {
      const value = nutriments[key];
      if (value !== undefined && value !== null && value !== "") return Math.round(Number(value) || 0);
    }
    return "";
  };
  const serving = product.serving_size || product.product_quantity ? `Serving listed: ${product.serving_size || `${product.product_quantity}g`}.` : "Values may be per serving or per 100g. Review before saving.";
  return {
    name: product.product_name || product.generic_name || `Barcode ${barcode}`,
    calories: number("energy-kcal_serving", "energy-kcal_100g", "energy-kcal"),
    protein: number("proteins_serving", "proteins_100g", "proteins"),
    carbs: number("carbohydrates_serving", "carbohydrates_100g", "carbohydrates"),
    fats: number("fat_serving", "fat_100g", "fat"),
    barcode,
    notes: `Open Food Facts lookup. ${serving}`
  };
}

async function lookupBarcode(rawBarcode = barcodeDraft) {
  const barcode = String(rawBarcode || "").replace(/\D/g, "");
  if (!barcode) {
    barcodeLookupStatus = "Enter or scan a barcode first.";
    render();
    return;
  }
  barcodeDraft = barcode;
  barcodeLookupStatus = "Looking up product...";
  render();
  try {
    const response = await fetch("/api/nutrition/barcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.product) throw new Error(payload.error || "Product not found.");
    mealDraft = { ...mealDraft, ...productMacros(payload.product, barcode) };
    state.pendingMealEstimate = { ...mealDraft, confidence: "barcode lookup", source: "barcode", createdAt: new Date().toISOString() };
    barcodeLookupStatus = "Product found. Review macros before saving.";
  } catch (error) {
    barcodeLookupStatus = `${error.message || "Lookup failed."} You can still enter macros manually.`;
    state.pendingMealEstimate = { ...(state.pendingMealEstimate || {}), errorState: barcodeLookupStatus, source: "manual", createdAt: new Date().toISOString() };
  }
  saveState();
  render();
}

async function detectBarcodeFromImage(file) {
  barcodeLookupStatus = "Reading barcode image...";
  render();
  try {
    if (!("BarcodeDetector" in window)) throw new Error("Barcode scanning is not supported in this browser.");
    const detector = new BarcodeDetector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e"] });
    const bitmap = await createImageBitmap(file);
    const codes = await detector.detect(bitmap);
    if (!codes.length) throw new Error("No barcode found in that image.");
    await lookupBarcode(codes[0].rawValue);
  } catch (error) {
    barcodeLookupStatus = `${error.message || "Could not scan barcode."} Type the barcode number instead.`;
    saveState();
    render();
  }
}

function imageFileToDataUrl(file, maxSize = 760) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function saveMealFromForm(form) {
  const meal = normalizeMealEntry({
    date: todayKey(),
    name: form.mealName.value || "Meal",
    photoThumbnail: "",
    calories: form.calories.value,
    protein: form.protein.value,
    carbs: form.carbs.value,
    fats: form.fats.value,
    timing: form.mealTiming.value || "",
    barcode: form.mealBarcode?.value || state.pendingMealEstimate?.barcode || "",
    confidence: state.pendingMealEstimate?.confidence || "manual",
    source: state.pendingMealEstimate?.source || "manual",
    notes: form.mealNotes.value || ""
  });
  state.mealEntries.unshift(meal);
  state.pendingMealEstimate = null;
  mealDraft = { name: "", calories: "", protein: "", carbs: "", fats: "", timing: "", barcode: "", notes: "" };
  mealPhotoData = "";
  barcodeDraft = "";
  barcodeLookupStatus = "";
  activePopup = null;
  createAutoBackup("Saved meal");
  render();
}

function saveBodyweightFromForm(form) {
  const weight = Number(form.weighIn.value || 0);
  if (!weight) return;
  pushUndo("Logged bodyweight");
  state.bodyweightEntries.unshift(normalizeBodyweightEntry({ weight, date: todayKey(), source: "manual", notes: form.weighInNotes?.value || "", timing: form.weighInTiming?.value || "" }));
  state.nutritionSettings.bodyweight = weight;
  state.nutritionSettings.updatedAt = new Date().toISOString();
  bodyweightDraft = "";
  activePopup = null;
  createAutoBackup("Logged bodyweight");
  render();
}

function saveSupplementFromForm(form) {
  const type = form.supplementType.value || "creatine";
  const amount = form.supplementAmount.value || "";
  pushUndo(`Logged ${type}`);
  state.supplementEntries.unshift(normalizeSupplementEntry({
    date: todayKey(),
    type,
    amount,
    timing: form.supplementTiming.value || "",
    notes: form.supplementNotes.value || ""
  }));
  supplementDraft = { type: "creatine", amount: "", timing: "", notes: "" };
  activePopup = null;
  createAutoBackup(`Logged ${type}`);
  render();
}

function saveCardioFromForm(form) {
  const minutes = Number(form.cardioMinutes.value || 0);
  if (!minutes) return;
  pushUndo("Logged cardio");
  state.cardioEntries.unshift(normalizeCardioEntry({
    date: todayKey(),
    type: form.cardioType.value || "Cardio",
    minutes,
    distance: form.cardioDistance.value || 0,
    calories: form.cardioCalories.value || 0,
    heartRate: form.cardioHeartRate.value || 0,
    speed: form.cardioSpeed.value || 0,
    incline: form.cardioIncline.value || 0,
    notes: form.cardioNotes.value || ""
  }));
  cardioDraft = { type: "Incline walk", minutes: "", distance: "", calories: "", heartRate: "", speed: "", incline: "", notes: "" };
  createAutoBackup("Logged cardio");
  render();
}

function saveNutritionSettingsFromForm(form) {
  const targets = estimateMacroTargets(Number(form.bodyweight.value || state.nutritionSettings.bodyweight), Number(form.goalRate.value || state.nutritionSettings.goalRate));
  state.nutritionSettings = {
    ...state.nutritionSettings,
    bodyweight: Number(form.bodyweight.value || state.nutritionSettings.bodyweight),
    targetBodyweight: Number(form.targetBodyweight.value || state.nutritionSettings.targetBodyweight || form.bodyweight.value || 165),
    goalRate: Number(form.goalRate.value || state.nutritionSettings.goalRate),
    calorieTarget: Number(form.calorieTarget.value || targets.calorieTarget),
    proteinTarget: Number(form.proteinTarget.value || targets.proteinTarget),
    carbTarget: Number(form.carbTarget.value || targets.carbTarget),
    fatTarget: Number(form.fatTarget.value || targets.fatTarget),
    updatedAt: new Date().toISOString()
  };
  createAutoBackup("Updated nutrition targets");
  render();
}

async function saveProgressPhoto(file, form) {
  if (!file) return;
  if (file.size > PHOTO_UPLOAD_MAX_BYTES) {
    alert("That photo is too large. Use a smaller image so storage stays free-tier friendly.");
    return;
  }
  const imageDataUrl = await imageFileToDataUrl(file, 920);
  pushUndo("Added progress photo");
  state.progressPhotos.unshift(normalizeProgressPhoto({
    date: form.photoDate.value || todayKey(),
    view: form.photoView.value || "front",
    phase: form.photoPhase.value || "bulk",
    notes: form.photoNotes.value || "",
    imageDataUrl
  }));
  photoDraft = { view: form.photoView.value || "front", phase: form.photoPhase.value || "bulk", notes: form.photoNotes.value || "" };
  createAutoBackup("Added progress photo");
  render();
}

function deleteProgressPhoto(id) {
  const photo = state.progressPhotos.find((item) => item.id === id);
  if (!photo) return;
  pushUndo("Deleted progress photo");
  photo.deletedAt = new Date().toISOString();
  createAutoBackup("Deleted progress photo");
  render();
}

function applyEstimatedTargets() {
  state.nutritionSettings = { ...state.nutritionSettings, ...estimateMacroTargets(), updatedAt: new Date().toISOString() };
  createAutoBackup("Estimated nutrition targets");
  render();
}

function requestAppleHealthConnection() {
  const source = ensureHealthSource("apple_health", "Native HealthKit sync needs a future iOS wrapper. Manual export.xml import is ready now.");
  source.connectedStatus = "permission_placeholder";
  source.lastImportAt = null;
  source.updatedAt = new Date().toISOString();
  createAutoBackup("Updated Apple Health status");
  screen = "health";
  render();
}

async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    state.settings.notificationPermission = "unsupported";
    state.settings.notificationsEnabled = false;
    saveState();
    render();
    return;
  }
  const permission = await Notification.requestPermission();
  state.settings.notificationPermission = permission;
  state.settings.notificationsEnabled = permission === "granted";
  createAutoBackup("Updated notification permission");
  render();
}

function currentModeTabs() {
  return [...(modeTabs[state.activeMode] || modeTabs.training), ["hub", "Hub", navIcons.hub]];
}

function coachScreenForMode() {
  return {
    training: "coach",
    nutrition: "nutrition-coach",
    recovery: "recovery-coach",
    progress: "progress-coach"
  }[state.activeMode] || "coach";
}

function iconSvg(path) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" /></svg>`;
}

function topAppActions() {
  if (screen === "onboarding" || screen === "workout") return "";
  return `
    <section class="global-topbar">
      ${modeSwitch("compact")}
      <div class="global-actions">
        <button class="top-icon coach-icon" data-screen="${coachScreenForMode()}" aria-label="Open coach">${iconSvg(navIcons.coach)}<span>Coach</span></button>
        <button class="top-icon gear-button" data-screen="hub" aria-label="Open settings">${iconSvg(navIcons.hub)}</button>
      </div>
    </section>
  `;
}

function goToAdjacentTab(direction) {
  const tabs = currentModeTabs();
  const index = tabs.findIndex(([id]) => id === screen);
  if (index < 0) return;
  const next = tabs[index + direction];
  if (!next) return;
  screen = next[0];
  saveState();
  render();
}

function isSwipeBlocked(target) {
  return Boolean(target.closest("input, textarea, select, button, label, .set-row, .workout-card, .bottom-nav, .mode-switch, .global-actions"));
}

function updateThemeColors() {
  const mode = state.activeMode || "training";
  const accentColors = {
    training: "139, 92, 255", // purple
    nutrition: "255, 83, 107", // red
    recovery: "74, 168, 255", // blue
    progress: "38, 217, 108"  // green
  };
  document.documentElement.style.setProperty("--accent-rgb", accentColors[mode] || accentColors.training);
}

function updateWorkoutTimer() {
  const el = document.getElementById("workout-timer-display");
  if (!el || !state.activeWorkout) {
    clearInterval(workoutTimerInterval);
    workoutTimerInterval = null;
    return;
  }
  el.textContent = formatClock(secondsSince(state.activeWorkout.startedAt));
}

function render() {
  nowTick = Date.now();
  updateThemeColors();
  const app = document.querySelector("#app");
  const shouldResetScroll = screen !== lastRenderedScreen || state.activeMode !== lastRenderedMode;
  const renderedScreen = screenContent();
  app.innerHTML = `
    <main class="phone-shell mode-${state.activeMode || "training"} ${screen === "workout" ? "workout-mode" : ""}">
      ${topAppActions()}
      ${renderedScreen}
    </main>
    ${bottomNav()}
    ${renderPopup()}
  `;
  bindEvents(app);

  if (screen === "workout") {
    if (!workoutTimerInterval) {
      workoutTimerInterval = setInterval(updateWorkoutTimer, 1000);
    }
  } else {
    if (workoutTimerInterval) {
      clearInterval(workoutTimerInterval);
      workoutTimerInterval = null;
    }
  }

  if (shouldResetScroll) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
  lastRenderedScreen = screen;
  lastRenderedMode = state.activeMode;
}

function screenContent() {
  const map = {
    onboarding: onboardingScreen,
    home: homeScreen,
    plan: planScreen,
    health: healthScreen,
    coach: coachScreen,
    "ai-chat": aiChatScreen,
    goals: goalsScreen,
    nutrition: nutritionScreen,
    workout: workoutScreen,
    "workout-edit": workoutEditScreen,
    review: reviewScreen,
    progress: progressScreen,
    report: reportScreen,
    hub: hubScreen,
    settings: settingsScreen,
    profile: settingsScreen,
    templates: templatesScreen,
    exercises: exercisesScreen,
    "workout-start": startWorkoutScreen,
    "training-cardio": trainingCardioScreen,
    "training-history": trainingHistoryScreen,
    "nutrition-weight": nutritionWeightScreen,
    "nutrition-goals": nutritionGoalsScreen,
    "nutrition-coach": nutritionCoachScreen,
    "nutrition-history": nutritionHistoryScreen,
    "nutrition-recommendations": nutritionRecommendationsScreen,
    "recovery-sleep": recoverySleepScreen,
    "recovery-stats": recoveryStatsScreen,
    "recovery-goals": recoveryGoalsScreen,
    "recovery-coach": recoveryCoachScreen,
    "recovery-history": recoveryHistoryScreen,
    "progress-photos": progressPhotosScreen,
    "progress-prs": progressPrsScreen,
    "progress-goals": progressGoalsScreen,
    "progress-coach": progressCoachScreen,
    "progress-history": progressHistoryScreen
  };
  return (map[screen] || homeScreen)();
}

function homeScreen() {
  return `
    <section class="screen home-screen">
      <header class="home-hero">
        <div><p class="eyebrow">${APP_NAME}</p><h1>${modeHeadline()}</h1>${modeSubhead() ? `<p class="muted">${modeSubhead()}</p>` : ""}</div>
      </header>
      ${modeDashboard()}
      ${state.activeMode === "nutrition" ? "" : homeSheet()}
    </section>
  `;
}

function modeHeadline() {
  return {
    training: "Train smarter.",
    nutrition: "Fuel the bulk.",
    recovery: "Recover with intent.",
    progress: "Track the signal."
  }[state.activeMode] || "Train smarter.";
}

function modeSubhead() {
  return {
    training: "",
    nutrition: `${latestBodyweight()} lb now - ${state.nutritionSettings.targetBodyweight || 165} lb target - ${state.nutritionSettings.goalRate} lb/week.`,
    recovery: "",
    progress: ""
  }[state.activeMode] || state.profile.goal;
}

function modeSwitch(variant = "") {
  return `<section class="mode-switch ${variant}">${modes.map((mode) => `<button class="${state.activeMode === mode.id ? "active" : ""}" data-action="set-mode" data-mode="${mode.id}">${mode.label}</button>`).join("")}</section>`;
}

function modeDashboard() {
  if (state.activeMode === "nutrition") return nutritionDashboard();
  if (state.activeMode === "recovery") return recoveryDashboard();
  if (state.activeMode === "progress") return progressDashboard();
  return trainingDashboard();
}

function trainingDashboard() {
  const stats = appStats();
  const recommendation = state.recommendations[0] || buildRecommendation();
  const homePrs = homePrItems(3);
  const goalRows = homeGoalItems(2);
  return `
    <section class="today-card premium-today"><div><p class="eyebrow">Today</p><h2>${readinessScore() < 55 ? "Recover first" : "Train today"}</h2><span>${recommendation.exercises.map((item) => getExercise(item.exerciseId).name).slice(0, 2).join(" + ") || "Strength session"}</span></div><div class="today-score"><strong>${readinessScore()}</strong><small>${readinessState().label}</small></div><button class="primary" data-action="start-recommendation" data-id="${recommendation.id}">Start Workout</button></section>
    <section class="quick-actions compact-actions"><button class="secondary" data-action="open-sheet" data-sheet="training-details">Details</button><button class="secondary" data-action="open-sheet" data-sheet="training-goals">Goals</button><button class="secondary" data-action="open-sheet" data-sheet="training-templates">Templates</button></section>
    <section class="panel premium-panel"><div class="section-heading"><h2>Muscle Load</h2><strong class="confidence-pill">${completedWorkouts(7).length}/${state.profile.trainingDaysPerWeek} sessions</strong></div>${bodyHeatmap()}</section>
    <section class="panel premium-panel chart-panel"><div class="section-heading"><h2>Weekly Volume</h2><strong class="confidence-pill">${weeklyVolume().toLocaleString()} lb</strong></div>${weeklyVolumeChart()}</section>
    <section class="panel premium-panel"><div class="section-heading"><h2>Last Session</h2><button class="ghost" data-action="open-sheet" data-sheet="training-details">View</button></div>${lastSessionCard()}</section>
    <section class="panel premium-panel"><div class="section-heading"><h2>Recent PRs</h2><button class="icon-ghost" aria-label="Manage PRs" data-action="open-sheet" data-sheet="training-prs">${iconSvg(navIcons.hub)}</button></div>${homePrs.length ? homePrs.map(homePrCard).join("") : emptyState("No PRs yet", "Completed sets will build your PR board.")}</section>
    <section class="panel premium-panel"><div class="section-heading"><h2>Training Goals</h2><button class="icon-ghost" aria-label="Manage goals" data-action="open-sheet" data-sheet="training-goals">${iconSvg(navIcons.hub)}</button></div>${goalRows.length ? goalRows.map((goal) => goalRow(goal)).join("") : emptyState("No goals yet", "Add a lift target when you are ready.")}</section>
  `;
}

function nutritionDashboard() {
  const totals = nutritionTotals();
  const settings = state.nutritionSettings;
  const recommendation = localCoachReply();

  const remaining = Math.max(0, settings.calorieTarget - totals.calories);
  const heroSubtitle = state.profile.goal + (settings.goalRate ? ` • ${settings.goalRate} lb/week` : "");

  const meals = mealsForDate();
  const weightHist = bodyweightHistory(7);
  const latestWeight = weightHist.length ? weightHist.at(-1).value : (settings.bodyweight || "--");
  const targetWeight = settings.targetBodyweight || "--";
  const trend = weightHist.length >= 2 ? weightHist.at(-1).value - weightHist[0].value : 0;
  const trendText = weightHist.length >= 2 ? (trend > 0 ? `+${trend.toFixed(1)} lb this week` : `${trend.toFixed(1)} lb this week`) : "Need more data";

  return `
    <header class="premium-hero">
      <div class="premium-hero-main">
        <div class="premium-hero-content">
          <p class="eyebrow">Calories Remaining</p>
          <h2>${remaining.toLocaleString()} left</h2>
          <span>${totals.calories.toLocaleString()} logged of ${settings.calorieTarget.toLocaleString()}</span>
        </div>
        <div class="today-score">
          <strong>${totals.protein}g</strong>
          <small>Protein</small>
        </div>
      </div>
      <div class="premium-hero-actions">
        <button class="primary" data-action="open-popup" data-popup="log-meal">Log Meal</button>
        <button class="secondary" data-action="open-popup" data-popup="add-weight">Add Weight</button>
      </div>
    </header>

    <section class="premium-card">
      <div class="section-heading"><h2>Macros Progress</h2></div>
      <div class="premium-ring-group">
        ${premiumRing(totals.protein, settings.proteinTarget, "Protein", "g")}
        ${premiumRing(totals.carbs, settings.carbTarget, "Carbs", "g")}
        ${premiumRing(totals.fats, settings.fatTarget, "Fats", "g")}
      </div>
    </section>

    <section class="premium-card">
      <div class="section-heading">
        <h2>Weight Trend</h2>
        <div class="action-row">
          <div class="stat-badge">${latestWeight} / ${targetWeight} lb</div>
          <div class="stat-badge ${trend > 0 ? "good-text" : ""}">${trendText}</div>
        </div>
      </div>
      ${lineChart(weightHist, "Add weight to see trend.", "lb")}
    </section>

    <div class="premium-grid">
      <section class="premium-card">
        <div class="section-heading"><h2>Supps Today</h2><button class="ghost" data-action="open-popup" data-popup="add-supplement">+ Add</button></div>
        <div class="supp-list">
          ${supplementsForDate().length ? supplementsForDate().map(s => `
            <div class="supp-item">
              <div class="supp-item-info">
                <strong>${capitalize(s.type)}</strong>
                <span>${s.amount} ${s.timing ? `• ${s.timing}` : ""}</span>
              </div>
            </div>
          `).join("") : `<p class="privacy-note">No supplements logged.</p>`}
        </div>
      </section>
      <section class="premium-card">
        <div class="section-heading"><h2>Top Stats</h2></div>
        ${premiumStatCard("Calorie Gap", remaining, "", remaining < 200 ? "On target" : "Keep eating")}
        ${premiumStatCard("Protein Gap", Math.max(0, settings.proteinTarget - totals.protein), "g", "")}
      </section>
    </div>

    <section class="premium-card">
      <div class="section-heading"><h2>Meals Today</h2><button class="ghost" data-screen="nutrition-history">History</button></div>
      <div class="meal-grid">
        ${meals.length ? meals.map(meal => `
          <div class="meal-card-premium">
            ${meal.photoThumbnail ? `<img src="${meal.photoThumbnail}" alt="${escapeAttr(meal.name)}">` : ""}
            <div class="meal-card-info">
              <strong>${meal.name}</strong>
              <span>${meal.timing || "Anytime"}</span>
            </div>
            <div class="meal-card-macros">
              ${meal.calories} cal • ${meal.protein}P
            </div>
          </div>
        `).join("") : `
          <div style="grid-column: span 2;">
            ${emptyState("No meals logged", "Snap your first meal to see macros.")}
            <button class="secondary full" style="margin-top: 10px;" data-action="open-popup" data-popup="log-meal">Capture Meal</button>
          </div>
        `}
      </div>
    </section>

    <div class="insight-card">
      <div class="icon-box">${iconSvg(navIcons.coach)}</div>
      <div>
        <strong>Coach Insight</strong>
        <p>${recommendation}</p>
      </div>
    </div>
  `;
}

function recoveryDashboard() {
  const snapshot = latestReadinessSnapshot();
  const cardio = weeklyCardio();
  const stateInfo = readinessState();
  return `
    <section class="today-card recovery-today premium-today"><div><p class="eyebrow">Readiness</p><h2>${stateInfo.label}</h2><span>${stateInfo.copy}</span></div><div class="today-score"><strong>${readinessScore()}</strong><small>score</small></div><button class="primary" data-action="open-sheet" data-sheet="recovery-checkin">Check In</button></section>
    <section class="quick-actions compact-actions"><button class="secondary" data-action="open-sheet" data-sheet="whoop-upload">Upload Whoop</button><button class="secondary" data-action="open-sheet" data-sheet="recovery-trends">Trends</button><button class="secondary" data-action="open-sheet" data-sheet="recovery-cardio">Cardio</button></section>
    <section class="visual-grid"><article class="metric"><span>${snapshot?.sleepHours || "--"}</span><small>Sleep hours</small></article><article class="metric"><span>${snapshot?.hrv || "--"}</span><small>HRV</small></article><article class="metric"><span>${snapshot?.restingHeartRate || "--"}</span><small>Resting HR</small></article><article class="metric"><span>${cardio.minutes}</span><small>Cardio min/week</small></article></section>
    <section class="panel premium-panel chart-panel"><div class="section-heading"><h2>Sleep Trend</h2><strong class="confidence-pill">${sleepSummary().latest}</strong></div>${sleepGraph()}</section>
    <section class="coach-note"><strong>${snapshot ? healthSourceSummary(snapshot) : "Manual recovery only"}</strong><span>${stateInfo.copy}</span></section>
  `;
}

function progressDashboard() {
  const goals = activeLiftGoals().map(evaluatedGoal);
  const tracked = trackedLiftIds();
  const main = goals[0];
  const homePrs = homePrItems(3);
  return `
    <section class="today-card progress-today premium-today"><div><p class="eyebrow">Top goal</p><h2>${main ? `${getExercise(main.exerciseId).name} ${main.targetE1rm}` : "Set a target"}</h2><span>${main ? `${main.currentE1rm} current` : "Add a lift goal to track the signal."}</span></div><div class="today-score"><strong>${main ? Math.round((main.currentE1rm / main.targetE1rm) * 100) : 0}%</strong><small>done</small></div><button class="primary" data-action="open-sheet" data-sheet="progress-goals">Goals</button></section>
    <section class="quick-actions compact-actions"><button class="secondary" data-action="open-sheet" data-sheet="progress-strength">View Strength</button><button class="secondary" data-action="open-sheet" data-sheet="progress-photo">Add Photo</button><button class="secondary" data-action="open-sheet" data-sheet="progress-prs">PRs</button></section>
    <section class="panel premium-panel chart-panel"><div class="section-heading"><h2>Volume Trend</h2><strong class="confidence-pill">Weekly</strong></div>${weeklyVolumeChart(8)}</section>
    <section class="panel premium-panel chart-panel"><div class="section-heading"><h2>Strength Trend</h2><button class="ghost" data-action="open-sheet" data-sheet="progress-strength">Change</button></div>${strengthTrendPreview(selectedExerciseId)}</section>
    <section class="panel premium-panel"><div class="section-heading"><h2>Goal Movement</h2><button class="icon-ghost" aria-label="Manage goals" data-action="open-sheet" data-sheet="progress-goals">${iconSvg(navIcons.hub)}</button></div>${goals.length ? homeGoalItems(3).map(goalRow).join("") : emptyState("No goals yet", "Add bench, bodyweight, or custom lift targets.")}</section>
    <section class="panel premium-panel"><div class="section-heading"><h2>PRs</h2><button class="icon-ghost" aria-label="Manage PRs" data-action="open-sheet" data-sheet="progress-prs">${iconSvg(navIcons.hub)}</button></div>${homePrs.length ? homePrs.map(homePrCard).join("") : emptyState("No PRs yet", "Complete tracked lifts to build PR cards.")}</section>
  `;
}

function shortReason(text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= 82) return clean;
  return `${clean.slice(0, 79).trim()}...`;
}

function readinessState(score = readinessScore()) {
  if (score >= 85) return { label: "Peak", copy: "High output is reasonable." };
  if (score >= 70) return { label: "Ready", copy: "Normal training load fits today." };
  if (score >= 55) return { label: "Modify", copy: "Reduce hard sets or load slightly." };
  return { label: "Rest", copy: "Prioritize recovery before intensity." };
}

function homeSheet() {
  if (!activeSheet) return "";
  const sheets = {
    "training-details": ["Training Details", `${lastSessionCard()}<div class="sheet-divider"></div>${consistencyVisual()}`],
    "training-goals": ["Training Goals", homeGoalManager()],
    "training-templates": ["Templates", activeTemplates().length ? activeTemplates().slice(0, 5).map((template) => `<button class="sheet-list-button" data-action="start-template" data-id="${template.id}"><strong>${escapeHtml(template.name)}</strong><span>${template.exercises.length} exercises</span></button>`).join("") : emptyState("No templates yet", "Create templates from the Add tab.")],
    "training-prs": ["Homepage PRs", homePrManager()],
    "recovery-checkin": ["Recovery Check-in", recoveryForm()],
    "recovery-trends": ["Recovery Trends", `${sleepGraph()}${lineChart(healthTrend("hrv"), "Import HRV to see recovery trend.", "ms")}`],
    "recovery-cardio": ["Cardio Support", cardioRows()],
    "whoop-upload": ["Whoop Screenshot", whoopUploadSheet()],
    "progress-strength": ["Strength Trend", progressStrengthSheet()],
    "progress-photo": ["Add Photo", progressPhotoForm()],
    "progress-prs": ["Homepage PRs", homePrManager()],
    "progress-goals": ["Progress Goals", homeGoalManager()]
  };
  const [title, body] = sheets[activeSheet] || ["Details", ""];
  return `
    <section class="sheet-backdrop" data-action="close-sheet"></section>
    <aside class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${escapeAttr(title)}">
      <header><h2>${title}</h2><button class="ghost" data-action="close-sheet">Close</button></header>
      <div class="sheet-content">${body}</div>
    </aside>
  `;
}

function prKey(item) {
  return `${item.exercise.id}:${item.set.id || item.set.workoutId || item.set.workoutDate}`;
}

function homePrItems(limit = 3) {
  const hidden = new Set(state.settings.homeHiddenPrKeys || []);
  const pinned = new Set(state.settings.homePinnedPrKeys || []);
  return recentPrs(12)
    .filter((item) => !hidden.has(prKey(item)))
    .sort((a, b) => Number(pinned.has(prKey(b))) - Number(pinned.has(prKey(a))) || new Date(b.set.workoutDate) - new Date(a.set.workoutDate))
    .slice(0, limit);
}

function homePrCard(item) {
  const key = prKey(item);
  return `
    <div class="pr-swipe-card" data-pr-key="${escapeAttr(key)}">
      <div><strong>${item.exercise.name}</strong><span>${item.set.weight} lb x ${item.set.reps} - ${new Date(item.set.workoutDate).toLocaleDateString()}</span></div>
      <b>${estimatedOneRepMax(item.set)} lb</b>
      <button class="icon-ghost" aria-label="Hide PR" data-action="hide-home-pr" data-key="${escapeAttr(key)}">${iconSvg("M6 6l12 12M18 6L6 18")}</button>
    </div>
  `;
}

function homePrManager() {
  const hidden = new Set(state.settings.homeHiddenPrKeys || []);
  const pinned = new Set(state.settings.homePinnedPrKeys || []);
  const rows = recentPrs(12).map((item) => {
    const key = prKey(item);
    return `<label class="toggle-line sheet-toggle"><input type="checkbox" data-action="toggle-home-pr" data-key="${escapeAttr(key)}" ${hidden.has(key) ? "" : "checked"}><span>${item.exercise.name}</span><b>${estimatedOneRepMax(item.set)} lb</b></label>`;
  }).join("");
  const pinnedRows = recentPrs(12).map((item) => {
    const key = prKey(item);
    return `<label class="toggle-line sheet-toggle"><input type="checkbox" data-action="pin-home-pr" data-key="${escapeAttr(key)}" ${pinned.has(key) ? "checked" : ""}><span>${item.exercise.name}</span><b>Pin</b></label>`;
  }).join("");
  return rows ? `${rows}<div class="sheet-divider"></div>${pinnedRows}` : emptyState("No PRs yet", "New PRs will appear automatically.");
}

function hideHomePr(key) {
  if (!key) return;
  state.settings.homeHiddenPrKeys = Array.from(new Set([...(state.settings.homeHiddenPrKeys || []), key]));
  state.settings.homePinnedPrKeys = (state.settings.homePinnedPrKeys || []).filter((item) => item !== key);
  saveState();
  render();
}

function toggleHomePr(key, show) {
  if (!key) return;
  state.settings.homeHiddenPrKeys = show ? (state.settings.homeHiddenPrKeys || []).filter((item) => item !== key) : Array.from(new Set([...(state.settings.homeHiddenPrKeys || []), key]));
  saveState();
  render();
}

function pinHomePr(key, pinned) {
  if (!key) return;
  state.settings.homePinnedPrKeys = pinned ? Array.from(new Set([...(state.settings.homePinnedPrKeys || []), key])) : (state.settings.homePinnedPrKeys || []).filter((item) => item !== key);
  if (pinned) state.settings.homeHiddenPrKeys = (state.settings.homeHiddenPrKeys || []).filter((item) => item !== key);
  saveState();
  render();
}

function homeGoalItems(limit = 3) {
  const hidden = new Set(state.settings.homeHiddenGoalIds || []);
  const pinned = new Set(state.settings.homePinnedGoalIds || []);
  return activeLiftGoals()
    .map(evaluatedGoal)
    .filter((goal) => !hidden.has(goal.id))
    .sort((a, b) => Number(pinned.has(b.id)) - Number(pinned.has(a.id)) || (a.targetDate || "").localeCompare(b.targetDate || ""))
    .slice(0, limit);
}

function homeGoalManager() {
  const hidden = new Set(state.settings.homeHiddenGoalIds || []);
  const pinned = new Set(state.settings.homePinnedGoalIds || []);
  const goals = activeLiftGoals().map(evaluatedGoal);
  if (!goals.length) return emptyState("No goals yet", "Add goals from the Goals tab.");
  return goals.map((goal) => `
    <div class="sheet-goal-row">
      <label class="toggle-line sheet-toggle"><input type="checkbox" data-action="toggle-home-goal" data-id="${goal.id}" ${hidden.has(goal.id) ? "" : "checked"}><span>${getExercise(goal.exerciseId).name}</span><b>${goal.targetE1rm}</b></label>
      <label class="toggle-line sheet-toggle compact-pin"><input type="checkbox" data-action="pin-home-goal" data-id="${goal.id}" ${pinned.has(goal.id) ? "checked" : ""}><span>Pin</span></label>
    </div>
  `).join("");
}

function toggleHomeGoal(id, show) {
  if (!id) return;
  state.settings.homeHiddenGoalIds = show ? (state.settings.homeHiddenGoalIds || []).filter((item) => item !== id) : Array.from(new Set([...(state.settings.homeHiddenGoalIds || []), id]));
  saveState();
  render();
}

function pinHomeGoal(id, pinned) {
  if (!id) return;
  state.settings.homePinnedGoalIds = pinned ? Array.from(new Set([...(state.settings.homePinnedGoalIds || []), id])) : (state.settings.homePinnedGoalIds || []).filter((item) => item !== id);
  if (pinned) state.settings.homeHiddenGoalIds = (state.settings.homeHiddenGoalIds || []).filter((item) => item !== id);
  saveState();
  render();
}

function weeklyVolumeChart(count = 6) {
  const weeks = weeklyBuckets(count);
  const values = weeks.map((week) => ({ label: week.label, value: week.volume, meta: `${week.workouts} sessions` }));
  return premiumBars(values, "Weekly volume appears after workouts.", "lb");
}

function premiumBars(items, emptyText, unit = "") {
  if (!items.some((item) => Number(item.value) > 0)) return emptyState("No chart yet", emptyText);
  const max = Math.max(...items.map((item) => Number(item.value || 0)), 1);
  return `<div class="premium-bars">${items.map((item) => {
    const pct = Math.max(12, (Number(item.value || 0) / max) * 100);
    return `<div class="premium-bar"><span>${item.value ? Number(item.value).toLocaleString() : ""}</span><i style="height:${pct}%"></i><small>${item.label}</small>${item.meta ? `<em>${item.meta}</em>` : ""}</div>`;
  }).join("")}</div><div class="chart-meta"><span>${items[0].value.toLocaleString()}${unit ? ` ${unit}` : ""}</span><strong>${items.at(-1).value.toLocaleString()}${unit ? ` ${unit}` : ""}</strong></div>`;
}

function lastSessionCard() {
  const session = completedWorkouts(3650)[0];
  if (!session) return emptyState("No session yet", "Start a workout to build recaps.");
  const sets = completedSets(session);
  const volume = workoutVolume(session);
  const exercises = session.exercises.length;
  const duration = session.finishedAt ? Math.max(1, Math.round((new Date(session.finishedAt) - new Date(session.startedAt)) / 60000)) : null;
  const top = session.exercises.flatMap((item) => item.sets.filter((set) => set.completed).map((set) => ({ set, exercise: getExercise(item.exerciseId) }))).sort((a, b) => estimatedOneRepMax(b.set) - estimatedOneRepMax(a.set))[0];
  return `
    <div class="recap-card">
      <div><strong>${new Date(session.finishedAt || session.startedAt).toLocaleDateString()}</strong><span>${session.exercises.map((item) => getExercise(item.exerciseId).name).slice(0, 3).join(", ")}</span></div>
      <div class="score-grid compact-score"><article class="metric"><span>${exercises}</span><small>Exercises</small></article><article class="metric"><span>${sets}</span><small>Sets</small></article><article class="metric"><span>${volume.toLocaleString()}</span><small>Volume</small></article><article class="metric"><span>${duration || "--"}</span><small>Minutes</small></article></div>
      ${top ? `<p class="recap-top">Top set: ${top.exercise.name} ${top.set.weight} x ${top.set.reps}</p>` : ""}
    </div>
  `;
}

function sleepSummary() {
  const points = healthTrend("sleepHours", 14);
  const latest = points.at(-1)?.value ? `${points.at(-1).value}h` : "--";
  const average = points.length ? (points.reduce((sum, point) => sum + Number(point.value || 0), 0) / points.length).toFixed(1) : "--";
  return { latest, average };
}

function sleepGraph() {
  const points = healthTrend("sleepHours", 14);
  const summary = sleepSummary();
  return `
    <div class="sleep-graph">
      ${premiumBars(points.map((point) => ({ ...point, meta: "" })), "Import sleep or save check-ins to see trends.", "hr")}
      <div class="sleep-summary"><span>Latest <b>${summary.latest}</b></span><span>Avg <b>${summary.average}h</b></span><span>Target <b>7.5h</b></span></div>
    </div>
  `;
}

function strengthTrendPreview(exerciseId = selectedExerciseId) {
  const points = e1rmTrend(exerciseId, 10);
  const volume = volumeTrend(exerciseId, 8);
  if (points.length < 2) return emptyState("Not enough data", "Log this exercise across multiple sessions to see progression.");
  const delta = points.at(-1).value - points[0].value;
  return `<div class="strength-trend-card"><div class="section-heading inline-heading"><span>${getExercise(exerciseId).name}</span><strong class="${delta >= 0 ? "good-text" : "danger-text"}">${delta >= 0 ? "+" : ""}${delta} lb</strong></div>${lineChart(points, "Log this lift to see strength trend.")}${premiumBars(volume.map((point) => ({ ...point, meta: "" })), "Volume appears after sessions.", "lb")}</div>`;
}

function progressStrengthSheet() {
  return `${trackedLiftSelector()}<div class="sheet-divider"></div>${strengthTrendPreview(selectedExerciseId)}<div class="sheet-divider"></div><div class="section-heading inline-heading"><span>History</span></div>${exerciseHistoryRows(selectedExerciseId)}`;
}

function whoopUploadSheet() {
  const estimate = state.pendingRecoveryEstimate;
  const form = estimate ? recoveryEstimateForm(estimate) : "";
  return `
    <label class="photo-drop">Upload screenshot/photo<input data-input="whoop-photo" type="file" accept="image/*" /></label>
    ${whoopUploadStatus ? `<p class="privacy-note">${escapeHtml(whoopUploadStatus)}</p>` : ""}
    ${form}
  `;
}

function recoveryEstimateForm(estimate) {
  const metrics = estimate.metrics || {};
  return `
    <form data-form="recovery-estimate" class="form-stack compact-form">
      <div class="form-grid">
        <label>Date<input name="date" type="date" value="${escapeAttr(estimate.date || todayKey())}"></label>
        <label>Sleep hours<input name="sleepHours" inputmode="decimal" value="${escapeAttr(metrics.sleepHours ?? "")}"></label>
        <label>Sleep score<input name="sleepScore" inputmode="numeric" value="${escapeAttr(metrics.sleepScore ?? "")}"></label>
        <label>HRV<input name="hrv" inputmode="numeric" value="${escapeAttr(metrics.hrv ?? "")}"></label>
        <label>Resting HR<input name="restingHeartRate" inputmode="numeric" value="${escapeAttr(metrics.restingHeartRate ?? "")}"></label>
        <label>Recovery score<input name="recoveryScore" inputmode="numeric" value="${escapeAttr(metrics.recoveryScore ?? "")}"></label>
        <label>Strain<input name="strain" inputmode="decimal" value="${escapeAttr(metrics.strain ?? "")}"></label>
      </div>
      <p class="privacy-note">${escapeHtml(estimate.notes || "Review values before saving.")}</p>
      <div class="backup-actions"><button class="secondary" type="button" data-action="cancel-recovery-estimate">Cancel</button><button class="primary" type="submit">Confirm Save</button></div>
    </form>
  `;
}

async function estimateRecoveryFromPhoto(file) {
  if (!file) return;
  whoopUploadStatus = "Reading screenshot...";
  render();
  try {
    const imageDataUrl = await imageFileToDataUrl(file, 1200);
    const response = await fetch("/api/recovery/whoop-screenshot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageDataUrl })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Screenshot extraction failed.");
    state.pendingRecoveryEstimate = { date: todayKey(), metrics: payload.metrics || {}, notes: payload.notes || "Review extracted values before saving.", createdAt: new Date().toISOString() };
    whoopUploadStatus = "Review and confirm before saving.";
  } catch (error) {
    whoopUploadStatus = error.message || "Could not read that image.";
  }
  saveState();
  render();
}

function saveRecoveryEstimateFromForm(form) {
  const date = form.date.value || todayKey();
  const source = ensureHealthSource("whoop_screenshot", "Screenshot/photo import");
  const fields = [
    ["sleepHours", form.sleepHours.value, "hr"],
    ["sleepScore", form.sleepScore.value, "%"],
    ["hrv", form.hrv.value, "ms"],
    ["restingHeartRate", form.restingHeartRate.value, "bpm"],
    ["readinessScore", form.recoveryScore.value, "%"],
    ["strain", form.strain.value, "score"]
  ];
  pushUndo("Saved Whoop screenshot data");
  fields.forEach(([type, value, unit]) => addHealthMetric(source.id, date, type, value, unit, "whoop_screenshot"));
  state.readinessSnapshots = [buildReadinessSnapshot(date), ...state.readinessSnapshots.filter((item) => item.date !== date)];
  state.pendingRecoveryEstimate = null;
  whoopUploadStatus = "";
  activeSheet = "";
  createAutoBackup("Saved Whoop screenshot data");
  render();
}

function onboardingScreen() {
  return `
    <section class="screen">
      <header class="home-hero">
        <div><p class="eyebrow">Setup</p><h1>Make it yours.</h1><p class="muted">A short assessment helps Coach make useful calls from day one.</p></div>
      </header>
      <section class="panel">${profileForm()}<div class="backup-actions"><button class="secondary" data-action="seed-health">Add samples</button><button class="secondary" data-action="complete-onboarding">Finish setup</button><button class="secondary" data-action="skip-onboarding">Skip</button></div></section>
      <section class="panel"><div class="section-heading"><h2>Main lift goals</h2><button class="ghost" data-action="add-goal">Add</button></div>${activeLiftGoals().map(goalRow).join("")}</section>
    </section>
  `;
}

function planScreen() {
  const adjustment = state.adaptivePlanAdjustments[0] || adaptivePlanAdjustment();
  const block = activeTrainingBlock();
  const workoutsThisWeek = completedWorkouts(7).length;
  const sessions = plannedSessions();
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Plan</p><h1>This week</h1></div><button class="secondary" data-action="rebuild-weekly-plan">Rebuild</button></header>
      <section class="coach-card"><div><p class="eyebrow">Adaptive plan</p><h2>${workoutsThisWeek}/${state.weeklyPlan.targetDays} sessions</h2><span>${adjustment.reason}</span></div>${readinessGauge(readinessScore())}</section>
      <section class="panel"><div class="section-heading"><h2>${state.profile.preferredSplit}</h2><button class="ghost" data-screen="coach">Coach</button></div>${plannedSessionRows(adjustment, sessions)}</section>
      <section class="panel"><div class="section-heading"><h2>Training block</h2></div>${block ? blockCard(block) : emptyState("No active block", "Create a strength block from your goals.")}</section>
      <section class="panel"><div class="section-heading"><h2>Deload signals</h2></div>${deloadSuggestion()}</section>
    </section>
  `;
}

function healthScreen() {
  const snapshot = latestReadinessSnapshot() || buildReadinessSnapshot();
  const trends = `${bars(healthTrend("sleepHours"), "Import or seed health data to see sleep trends.")}${lineChart(healthTrend("hrv"), "Import HRV to see recovery trend.", "ms")}${lineChart(healthTrend("restingHeartRate"), "Import resting heart rate to see recovery load.", "bpm")}`;
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Health</p><h1>Recovery hub</h1></div><button class="secondary" data-action="seed-health">Sample</button></header>
      <section class="visual-grid">
        <article class="gauge-card">${readinessGauge(snapshot.readinessScore)}<span>Readiness</span></article>
        <article class="metric"><span>${snapshot.sleepHours || "--"}</span><small>Sleep hours</small></article>
        <article class="metric"><span>${snapshot.hrv || "--"}</span><small>HRV</small></article>
        <article class="metric"><span>${snapshot.restingHeartRate || "--"}</span><small>Resting HR</small></article>
      </section>
      ${collapsiblePanel("Action cards", `<div class="section-heading inline-heading"><span>Coach signals</span><button class="ghost" data-action="build-recommendation">Apply</button></div>${actionableHealthCards().map((card) => `<div class="leader-row"><div><strong>${card}</strong><span>Used by Coach recommendations.</span></div><b>Now</b></div>`).join("")}`, { open: true, meta: "Today" })}
      ${collapsiblePanel("Wearable trends", trends, { open: false, meta: "Sleep, HRV, RHR" })}
      ${collapsiblePanel("Sources", sourceCards(), { open: false, meta: `${state.healthSources.length} sources` })}
      ${importPreviewCard()}
      ${collapsiblePanel("Imports", `
        <div class="backup-actions">
          <label class="secondary import-label">Apple XML<input type="file" accept=".xml,.json,.csv" data-input="apple-health-import" /></label>
          <label class="secondary import-label">WHOOP<input type="file" accept=".json,.csv" data-input="whoop-import" /></label>
          <button class="secondary" data-action="seed-health">Seed sample</button>
        </div>
      `, { open: false, meta: "Apple/WHOOP files" })}
      ${collapsiblePanel("Data control", `<div class="backup-actions"><button class="secondary" data-action="clear-sample-health">Clear sample</button><button class="secondary" data-action="clear-health">Clear health</button><button class="secondary" data-action="export-json">Export all</button></div><p class="privacy-note">Apple Health automatic sync requires native iOS HealthKit. WHOOP live sync requires backend OAuth so secrets stay server-side.</p>`, { open: false, meta: "Privacy" })}
    </section>
  `;
}

function aiChatScreen() {
  const messages = state.aiMessages.filter((message) => !message.deletedAt).slice(-12);
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">AI Coach</p><h1>Ask Focus</h1></div><button class="secondary" data-screen="coach">Coach</button></header>
      <section class="panel ai-context">
        <div class="section-heading"><h2>Context</h2><strong class="confidence-pill">${aiContextMode === "deep" ? "Deep logs" : "Quick summary"}</strong></div>
        <div class="segmented"><button class="${aiContextMode === "quick" ? "active" : ""}" data-action="set-ai-context" data-mode="quick">Quick</button><button class="${aiContextMode === "deep" ? "active" : ""}" data-action="set-ai-context" data-mode="deep">Deep</button></div>
        <p class="privacy-note">Uses compact app summaries by default. Deep mode includes recent workouts and meals.</p>
      </section>
      <section class="panel chat-panel">
        <div class="chat-log">${messages.map(chatBubble).join("")}</div>
        <div class="chat-input"><input data-input="ai-chat" value="${escapeAttr(aiChatDraft)}" placeholder="Ask about progress, readiness, or next plan..." /><button class="primary" data-action="send-ai-chat">Send</button></div>
      </section>
      <section class="panel"><div class="section-heading"><h2>Pending suggestions</h2></div>${aiSuggestionRows()}</section>
      <section class="panel"><div class="section-heading"><h2>Local insight</h2></div><p class="privacy-note">${localCoachReply()}</p></section>
    </section>
  `;
}

function chatBubble(message) {
  return `<div class="chat-bubble ${message.role}"><strong>${message.role === "user" ? "You" : "Focus AI"}</strong><p>${escapeHtml(message.content)}</p>${message.errorState ? `<span>Fallback: ${escapeHtml(message.errorState)}</span>` : ""}</div>`;
}

function aiSuggestionRows() {
  const suggestions = state.aiSuggestions.filter((item) => !item.deletedAt && item.status === "pending").slice(0, 4);
  if (!suggestions.length) return emptyState("No suggestions waiting", "AI can propose edits, but you confirm before anything changes.");
  return suggestions.map((suggestion) => `<div class="suggestion-row"><div><strong>${suggestion.title}</strong><span>${suggestion.reasoning}</span></div><div><button class="secondary" data-action="apply-ai-suggestion" data-id="${suggestion.id}">Apply</button><button class="ghost" data-action="dismiss-ai-suggestion" data-id="${suggestion.id}">Dismiss</button></div></div>`).join("");
}

function nutritionScreen() {
  const totals = nutritionTotals();
  const settings = state.nutritionSettings;
  const adherence = weeklyNutritionAdherence();
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Nutrition</p><h1>Mass fuel</h1></div><button class="secondary" data-screen="hub">Hub</button></header>
      <section class="visual-grid macro-grid">
        <article class="metric wide"><span>${totals.calories}</span><small>${settings.calorieTarget} calorie target</small><i style="width:${macroPct(totals.calories, settings.calorieTarget)}%"></i></article>
        <article class="metric"><span>${totals.protein}g</span><small>Protein / ${settings.proteinTarget}g</small><i style="width:${macroPct(totals.protein, settings.proteinTarget)}%"></i></article>
        <article class="metric"><span>${totals.carbs}g</span><small>Carbs / ${settings.carbTarget}g</small><i style="width:${macroPct(totals.carbs, settings.carbTarget)}%"></i></article>
        <article class="metric"><span>${totals.fats}g</span><small>Fats / ${settings.fatTarget}g</small><i style="width:${macroPct(totals.fats, settings.fatTarget)}%"></i></article>
      </section>
      <section class="coach-note"><strong>${adherence.hitDays}/${adherence.days} days on track</strong><span>Weight-gain focus: hit calories and protein before worrying about perfect macro splits.</span></section>
      <section class="panel"><div class="section-heading"><h2>Photo estimate</h2><span class="confidence-pill">Review before save</span></div>${mealCaptureForm()}</section>
      <section class="panel"><div class="section-heading"><h2>Today's meals</h2></div>${mealRows()}</section>
      ${collapsiblePanel("Bodyweight", `${bodyweightGoalCard()}${bodyweightForm()}${bodyweightRows()}`, { open: false, meta: `${latestBodyweight()} lb` })}
      ${collapsiblePanel("Supplements", `${supplementForm()}${supplementRows()}`, { open: false, meta: "Creatine/caffeine" })}
      ${collapsiblePanel("Targets", `<div class="section-heading inline-heading"><span>Macros</span><button class="ghost" data-action="apply-estimated-targets">Estimate</button></div>${nutritionSettingsForm()}`, { open: false, meta: `${settings.calorieTarget} cal` })}
    </section>
  `;
}

function startWorkoutScreen() {
  const recommendation = state.recommendations[0] || buildRecommendation();
  const sessions = plannedSessions();
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Training</p><h1>Start workout</h1></div><button class="secondary" data-screen="hub">Hub</button></header>
      ${state.activeWorkout ? `<section class="coach-note"><strong>Workout in progress</strong><span>Continue the active queue or finish it from the workout screen.</span><button class="secondary" data-action="go-workout">Open</button></section>` : ""}
      <section class="panel"><div class="section-heading"><h2>Choose type</h2></div><div class="start-grid"><button class="primary" data-action="start-workout">Blank strength</button><button class="secondary" data-action="start-recommendation" data-id="${recommendation.id}">Coach suggested</button><button class="secondary" data-screen="training-cardio">Cardio</button><button class="secondary" data-screen="exercises">Pick exercise</button></div></section>
      ${collapsiblePanel("Weekly planner", `<div class="section-heading inline-heading"><span>${state.profile.preferredSplit}</span><button class="ghost" data-action="rebuild-weekly-plan">Rebuild</button></div>${plannedSessionRows(state.adaptivePlanAdjustments[0] || adaptivePlanAdjustment(), sessions)}`, { open: false, meta: `${sessions.length} sessions` })}
      <section class="panel"><div class="section-heading"><h2>Saved templates</h2><button class="ghost" data-screen="templates">Edit</button></div>${activeTemplates().length ? activeTemplates().map(templateCard).join("") : emptyState("No templates yet", "Templates start blank. Add one, then build it around your preferred split.")}</section>
    </section>
  `;
}

function trainingCardioScreen() {
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Training</p><h1>Cardio</h1></div><button class="secondary" data-screen="workout-start">Start</button></header>
      <section class="visual-grid"><article class="metric"><span>${weeklyCardio().minutes}</span><small>Minutes this week</small></article><article class="metric"><span>${weeklyCardio().calories}</span><small>Calories</small></article></section>
      <section class="panel"><div class="section-heading"><h2>Log cardio</h2></div>${cardioRows()}</section>
      <section class="panel"><div class="section-heading"><h2>Cardio trend</h2></div>${bars(cardioTrend(), "Log treadmill, bike, run, walk, or stairmaster sessions to see cardio volume.")}</section>
    </section>
  `;
}

function trainingHistoryScreen() {
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Training</p><h1>History</h1></div><button class="secondary" data-screen="workout-start">Start</button></header>
      <section class="panel"><div class="section-heading"><h2>Recent sessions</h2></div>${workoutHistoryRows()}</section>
      <section class="panel"><div class="section-heading"><h2>Cardio log</h2></div>${cardioRows()}</section>
    </section>
  `;
}

function workoutEditScreen() {
  const workout = state.workouts.find((item) => item.id === editingWorkoutId && !item.deletedAt);
  if (!workout) return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Training</p><h1>Edit workout</h1></div><button class="secondary" data-screen="training-history">History</button></header><section class="panel">${emptyState("Workout not found", "It may have been deleted or restored from backup.")}</section></section>`;
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Training</p><h1>Edit workout</h1></div><button class="secondary" data-screen="training-history">History</button></header>
      <form data-form="workout-edit" data-workout-id="${workout.id}" class="form-stack">
        <section class="panel"><div class="form-grid"><label>Date<input name="workoutDate" type="date" value="${(workout.finishedAt || workout.startedAt || todayKey()).slice(0, 10)}"></label><label>Notes<input name="workoutNotes" value="${escapeAttr(workout.notes || "")}" placeholder="Session notes"></label></div></section>
        ${workout.exercises.map((item, index) => workoutEditExercise(item, index, workout.id)).join("")}
        <button class="primary full" type="submit">Save Workout Edits</button>
      </form>
      <button class="danger-icon full-danger" data-action="delete-workout" data-id="${workout.id}">Delete Workout</button>
    </section>
  `;
}

function workoutEditExercise(item, exerciseIndex, workoutId) {
  return `
    <section class="panel workout-edit-exercise" data-workout-edit-exercise data-target-sets="${item.targetSets || 3}" data-target-rep-min="${item.targetRepMin || 6}" data-target-rep-max="${item.targetRepMax || 10}" data-completed-at="${escapeAttr(item.completedAt || "")}">
      <div class="section-heading"><select name="exerciseId">${exerciseOptions(item.exerciseId)}</select><button class="danger-icon small" type="button" data-action="remove-saved-workout-exercise" data-id="${workoutId}" data-index="${exerciseIndex}">Trash</button></div>
      ${item.sets.filter((set) => !set.deletedAt).map((set, setIndex) => workoutEditSet(set, exerciseIndex, setIndex, workoutId)).join("")}
    </section>
  `;
}

function workoutEditSet(set, exerciseIndex, setIndex, workoutId) {
  const flags = [["isWarmup", "Warm"], ["isDropSet", "Drop"], ["isPartial", "Partial"], ["toFailure", "Failure"], ["isUnilateral", "1-side"], ["isControlledTempo", "Tempo"]];
  return `
    <div class="workout-edit-set" data-workout-edit-set data-set-id="${set.id}" data-created-at="${set.createdAt || ""}" data-rest-seconds="${set.restSeconds || 90}" data-target-reps="${set.targetReps || ""}">
      <strong>${setIndex + 1}</strong>
      <input name="weight" inputmode="decimal" value="${escapeAttr(set.weight)}" placeholder="Weight">
      <input name="reps" inputmode="numeric" value="${escapeAttr(set.reps)}" placeholder="Reps">
      <button class="danger-icon small" type="button" data-action="remove-saved-workout-set" data-id="${workoutId}" data-exercise="${exerciseIndex}" data-set="${setIndex}">Trash</button>
      <input name="setNotes" value="${escapeAttr(set.notes || "")}" placeholder="Notes">
      <div class="edit-flag-row">${flags.map(([key, label]) => `<label><input type="checkbox" name="${key}" ${set[key] ? "checked" : ""}>${label}</label>`).join("")}</div>
    </div>
  `;
}

function nutritionWeightScreen() {
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Nutrition</p><h1>Weight</h1></div><button class="secondary" data-screen="nutrition">Macros</button></header>
      <section class="panel">${bodyweightGoalCard()}</section>
      <section class="panel"><div class="section-heading"><h2>Log weight</h2></div>${bodyweightForm(true)}${bodyweightRows(12)}</section>
      <section class="panel chart-panel"><div class="section-heading"><h2>Weekly average</h2></div>${lineChart(bodyweightHistory(28), "Log bodyweight to see the trend.", "lb")}</section>
    </section>
  `;
}

function nutritionGoalsScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Nutrition</p><h1>Goals</h1></div><button class="secondary" data-screen="nutrition">Macros</button></header>${collapsiblePanel("This week", weeklyGoalRows("nutrition"), { open: true, meta: "Resets weekly" })}${collapsiblePanel("Bulk / cut / maintain", `<div class="section-heading inline-heading"><span>Targets</span><button class="ghost" data-action="apply-estimated-targets">Estimate</button></div>${nutritionSettingsForm()}`, { open: false, meta: "Macro targets" })}<section class="panel"><div class="section-heading"><h2>Bodyweight goal</h2></div>${bodyweightGoalCard()}</section></section>`;
}

function nutritionCoachScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Nutrition</p><h1>Coach</h1></div><button class="secondary" data-screen="ai-chat">Chat</button></header><section class="panel"><div class="section-heading"><h2>Today</h2></div>${nutritionRecommendations()}</section><section class="panel"><div class="section-heading"><h2>Supplements</h2></div>${supplementRows()}</section></section>`;
}

function nutritionHistoryScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Nutrition</p><h1>History</h1></div><button class="secondary" data-screen="nutrition">Log</button></header><section class="panel"><div class="section-heading"><h2>Meals</h2></div>${mealRows(14)}</section><section class="panel"><div class="section-heading"><h2>Supplements</h2></div>${supplementRows(14)}</section></section>`;
}

function nutritionRecommendationsScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Nutrition</p><h1>Recommendations</h1></div><button class="secondary" data-screen="ai-chat">Chat</button></header><section class="panel"><div class="section-heading"><h2>Simple calls</h2></div>${nutritionRecommendations()}</section><section class="panel chart-panel"><div class="section-heading"><h2>Fuel x training</h2></div>${dualBars(performanceCorrelations().days.map((day) => ({ label: day.label, primary: day.volume, secondary: day.calories })), "Log workouts and meals to compare fuel and output.", "Volume", "Calories")}</section></section>`;
}

function recoverySleepScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Recovery</p><h1>Sleep</h1></div><button class="secondary" data-screen="health">Readiness</button></header><section class="visual-grid"><article class="metric"><span>${latestReadinessSnapshot()?.sleepHours || "--"}</span><small>Last sleep</small></article><article class="metric"><span>${latestReadinessSnapshot()?.sleepScore || "--"}</span><small>Sleep score</small></article></section><section class="panel chart-panel"><div class="section-heading"><h2>Sleep trend</h2></div>${lineChart(healthTrend("sleepHours"), "Import Apple Health sleep or save check-ins.", "hr")}</section><section class="panel"><div class="section-heading"><h2>Check-in</h2></div>${recoveryForm()}</section></section>`;
}

function recoveryStatsScreen() {
  const snapshot = latestReadinessSnapshot() || buildReadinessSnapshot();
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Recovery</p><h1>Health stats</h1></div><button class="secondary" data-screen="hub">Hub</button></header><section class="visual-grid"><article class="metric"><span>${snapshot.hrv || "--"}</span><small>HRV</small></article><article class="metric"><span>${snapshot.restingHeartRate || "--"}</span><small>RHR</small></article><article class="metric"><span>${snapshot.steps || "--"}</span><small>Steps</small></article><article class="metric"><span>${latestRecovery()?.stress || "--"}</span><small>Stress</small></article></section><section class="panel chart-panel"><div class="section-heading"><h2>Recovery trends</h2></div>${lineChart(healthTrend("readinessScore"), "Readiness appears after imports or check-ins.")}${lineChart(healthTrend("restingHeartRate"), "Import RHR to see load.", "bpm")}</section></section>`;
}

function recoveryGoalsScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Recovery</p><h1>Goals</h1></div><button class="secondary" data-screen="health">Readiness</button></header>${collapsiblePanel("This week", weeklyGoalRows("recovery"), { open: true, meta: "Resets weekly" })}${collapsiblePanel("Recovery targets", recoveryGoalRows(), { open: false, meta: "Sleep, steps, check-ins" })}</section>`;
}

function recoveryCoachScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Recovery</p><h1>Coach</h1></div><button class="secondary" data-screen="ai-chat">Chat</button></header><section class="panel"><div class="section-heading"><h2>Action cards</h2></div>${actionableHealthCards().map((card) => `<div class="history-set"><strong>${card}</strong></div>`).join("")}</section><section class="panel"><div class="section-heading"><h2>Training adjustment</h2></div><p class="privacy-note">${(state.adaptivePlanAdjustments[0] || adaptivePlanAdjustment()).reason}</p></section></section>`;
}

function recoveryHistoryScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Recovery</p><h1>History</h1></div><button class="secondary" data-screen="health">Import</button></header><section class="panel"><div class="section-heading"><h2>Recent check-ins</h2></div>${recoveryHistoryRows()}</section><section class="panel"><div class="section-heading"><h2>Sources</h2></div>${sourceCards()}</section></section>`;
}

function progressPhotosScreen() {
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Progress</p><h1>Photos</h1></div><button class="secondary" data-screen="hub">Hub</button></header>
      <section class="panel"><div class="section-heading"><h2>Add photo</h2><span class="confidence-pill">Local only</span></div>${progressPhotoForm()}</section>
      <section class="panel"><div class="section-heading"><h2>Timeline</h2></div>${progressPhotoGroups()}</section>
    </section>
  `;
}

function progressPhotoForm() {
  return `
    <form data-form="progress-photo" class="form-stack photo-form">
      <div class="form-grid">
        <label>Date<input name="photoDate" type="date" value="${todayKey()}"></label>
        <label>View<select name="photoView"><option value="front" ${photoDraft.view === "front" ? "selected" : ""}>Front</option><option value="side" ${photoDraft.view === "side" ? "selected" : ""}>Side</option><option value="back" ${photoDraft.view === "back" ? "selected" : ""}>Back</option></select></label>
        <label>Phase<select name="photoPhase"><option value="bulk" ${photoDraft.phase === "bulk" ? "selected" : ""}>Bulk</option><option value="cut" ${photoDraft.phase === "cut" ? "selected" : ""}>Cut</option><option value="maintain" ${photoDraft.phase === "maintain" ? "selected" : ""}>Maintain</option></select></label>
      </div>
      <label>Notes<input name="photoNotes" value="${escapeAttr(photoDraft.notes)}" placeholder="Lighting, pump, morning/evening"></label>
      <label class="photo-drop">Capture progress photo<input data-input="progress-photo" type="file" accept="image/*" capture="environment" /></label>
      <p class="privacy-note">Photos stay on this device as compressed thumbnails and are grouped by date, view, and phase.</p>
    </form>
  `;
}

function progressPhotoGroups() {
  const photos = state.progressPhotos.filter((photo) => !photo.deletedAt);
  if (!photos.length) return emptyState("No progress photos yet", "Add front, side, and back photos to compare visual changes over time.");
  const groups = photos.reduce((map, photo) => {
    map[photo.date] = map[photo.date] || [];
    map[photo.date].push(photo);
    return map;
  }, {});
  return Object.entries(groups).slice(0, 12).map(([date, items]) => `
    <div class="photo-group">
      <div class="section-heading"><h2>${date}</h2><span>${items[0].phase}</span></div>
      <div class="photo-grid">${items.map(progressPhotoCard).join("")}</div>
    </div>
  `).join("");
}

function progressPhotoCard(photo) {
  return `<article class="progress-photo-card"><img src="${photo.imageDataUrl}" alt="${escapeAttr(photo.view)} progress photo"><div><strong>${capitalize(photo.view)}</strong><span>${escapeHtml(photo.notes || photo.phase)}</span></div><button class="danger-icon small" data-action="delete-progress-photo" data-id="${photo.id}">Trash</button></article>`;
}

function progressPrsScreen() {
  const summaries = trackedPrSummaries();
  const prs = recentPrs(20);
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Progress</p><h1>PRs</h1></div><button class="secondary" data-screen="progress">Strength</button></header><section class="panel"><div class="section-heading"><h2>PR board</h2></div>${summaries.length ? summaries.map(prSummaryCard).join("") : emptyState("No PRs yet", "Complete tracked lifts to build PR categories.")}</section><section class="panel"><div class="section-heading"><h2>Recent PRs</h2></div>${prs.length ? prs.map(prRow).join("") : emptyState("No PRs yet", "Complete exercises in workouts to build PRs.")}</section><section class="panel"><div class="section-heading"><h2>PR timeline</h2></div>${timeline()}</section></section>`;
}

function progressGoalsScreen() {
  return goalsScreen().replace("<p class=\"eyebrow\">Goals</p>", "<p class=\"eyebrow\">Progress</p>");
}

function progressCoachScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Progress</p><h1>Coach</h1></div><button class="secondary" data-screen="ai-chat">Chat</button></header><section class="panel"><div class="section-heading"><h2>Signals</h2></div>${correlationCards(performanceCorrelations())}<p class="privacy-note">${weeklyDecisionSummary(performanceCorrelations())}</p></section></section>`;
}

function progressHistoryScreen() {
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Progress</p><h1>Exercise history</h1></div><button class="secondary" data-screen="exercises">Lifts</button></header><section class="panel"><div class="section-heading"><h2>Tracked lifts</h2></div>${trackedLiftSelector()}</section><section class="panel chart-panel"><div class="section-heading"><h2>${getExercise(selectedExerciseId).name}</h2><button class="ghost" data-screen="exercises">Change</button></div>${lineChart(e1rmTrend(selectedExerciseId), "Log this lift to see strength trend.")}${bars(volumeTrend(selectedExerciseId), "Volume appears after sessions.")}</section><section class="panel"><div class="section-heading"><h2>History</h2></div>${exerciseHistoryRows(selectedExerciseId)}</section></section>`;
}

function mealCaptureForm() {
  const pending = state.pendingMealEstimate || {};
  const draft = { ...mealDraft, ...pending };
  return `
    <div class="meal-capture">
      ${pending.photoThumbnail ? `<img src="${pending.photoThumbnail}" alt="Meal preview" />` : `<label class="photo-drop">Snap or upload food<input data-input="meal-photo" type="file" accept="image/*" capture="environment" /></label>`}
      ${pending.loading ? `<div class="empty"><strong>Estimating meal</strong><span>AI is reading the photo. If no key is configured, manual entry still works.</span></div>` : ""}
      <div class="barcode-box">
        <div class="section-heading"><h2>Free barcode lookup</h2><span class="confidence-pill">Open Food Facts</span></div>
        <div class="inline-form barcode-form"><input data-input="barcode" inputmode="numeric" value="${escapeAttr(barcodeDraft || draft.barcode || "")}" placeholder="Type barcode number" /><button class="secondary" data-action="lookup-barcode" type="button">Lookup</button></div>
        <div class="meal-actions"><label class="secondary import-label">Scan label<input data-input="barcode-photo" type="file" accept="image/*" capture="environment" /></label><button class="secondary" type="button" data-action="clear-barcode">Clear code</button></div>
        ${barcodeLookupStatus ? `<p class="privacy-note">${escapeHtml(barcodeLookupStatus)}</p>` : `<p class="privacy-note">Barcode lookup is free and optional. If the product is missing, enter macros manually.</p>`}
      </div>
      <form data-form="meal" class="form-stack">
        <input type="hidden" name="mealBarcode" value="${escapeAttr(draft.barcode || barcodeDraft || "")}">
        <div class="form-grid"><label>Name<input name="mealName" value="${escapeAttr(draft.name || "")}" placeholder="Chicken rice bowl"></label><label>Timing<select name="mealTiming">${mealTimingOptions(draft.timing)}</select></label><label>Calories<input name="calories" inputmode="numeric" value="${escapeAttr(draft.calories || "")}"></label><label>Protein<input name="protein" inputmode="numeric" value="${escapeAttr(draft.protein || "")}"></label><label>Carbs<input name="carbs" inputmode="numeric" value="${escapeAttr(draft.carbs || "")}"></label><label>Fats<input name="fats" inputmode="numeric" value="${escapeAttr(draft.fats || "")}"></label></div>
        <label>Notes<input name="mealNotes" value="${escapeAttr(draft.notes || "")}" placeholder="Portions, sauce, confidence..."></label>
        <button class="primary full" type="submit">Save Meal</button>
        <div class="meal-actions"><label class="secondary import-label">New photo<input data-input="meal-photo" type="file" accept="image/*" capture="environment" /></label><button class="secondary" type="button" data-action="clear-meal-draft">Clear</button></div>
      </form>
      ${pending.errorState ? `<p class="privacy-note">AI unavailable: ${escapeHtml(pending.errorState)}</p>` : ""}
    </div>
  `;
}

function mealTimingOptions(selected = "") {
  return ["", "Pre-workout", "Post-workout", "Breakfast", "Lunch", "Dinner", "Snack", "Before bed"].map((value) => `<option value="${value}" ${selected === value ? "selected" : ""}>${value || "Select"}</option>`).join("");
}

function bodyweightGoalCard() {
  const current = Number(latestBodyweight() || 0);
  const target = Number(state.nutritionSettings.targetBodyweight || 165);
  const start = Number(state.nutritionSettings.bodyweight || current || target);
  const range = Math.max(1, Math.abs(target - start));
  const progress = target === start ? 100 : Math.max(4, Math.min(100, (Math.abs(current - start) / range) * 100));
  const remaining = +(target - current).toFixed(1);
  return `<div class="goal-row nutrition-goal"><div><strong>${current} -> ${target} lb</strong><span>${remaining === 0 ? "Target reached" : `${remaining > 0 ? "+" : ""}${remaining} lb remaining`}</span><i><b style="width:${progress}%"></b></i></div><em>${Math.round(progress)}%</em></div>`;
}

function mealRows(limit = null) {
  const meals = limit ? state.mealEntries.filter((meal) => !meal.deletedAt).slice(0, limit) : mealsForDate();
  if (!meals.length) return emptyState("No meals today", "Snap a meal or enter macros manually.");
  return meals.map((meal) => `<div class="meal-row">${meal.photoThumbnail ? `<img src="${meal.photoThumbnail}" alt="${escapeAttr(meal.name)}" />` : ""}<div><strong>${meal.name}</strong><span>${meal.calories} cal - ${meal.protein}g protein - ${meal.carbs}g carbs - ${meal.fats}g fats</span><small>${meal.timing ? `${escapeHtml(meal.timing)} - ` : ""}${meal.source === "barcode" ? "Barcode lookup" : meal.source === "ai" ? "AI estimate" : "Manual"}${meal.barcode ? ` - ${escapeHtml(meal.barcode)}` : ""}${meal.notes ? ` - ${escapeHtml(meal.notes)}` : ""}</small></div></div>`).join("");
}

function nutritionSettingsForm() {
  const settings = state.nutritionSettings;
  return `
    <form data-form="nutrition-settings" class="form-stack">
      <div class="form-grid"><label>Bodyweight<input name="bodyweight" inputmode="decimal" value="${escapeAttr(settings.bodyweight)}"></label><label>Target weight<input name="targetBodyweight" inputmode="decimal" value="${escapeAttr(settings.targetBodyweight || 165)}"></label><label>Gain lb/week<input name="goalRate" inputmode="decimal" value="${escapeAttr(settings.goalRate)}"></label><label>Calories<input name="calorieTarget" inputmode="numeric" value="${escapeAttr(settings.calorieTarget)}"></label><label>Protein<input name="proteinTarget" inputmode="numeric" value="${escapeAttr(settings.proteinTarget)}"></label><label>Carbs<input name="carbTarget" inputmode="numeric" value="${escapeAttr(settings.carbTarget)}"></label><label>Fats<input name="fatTarget" inputmode="numeric" value="${escapeAttr(settings.fatTarget)}"></label></div>
      <button class="primary full" type="submit">Save Targets</button>
    </form>
  `;
}

function appSettingsForm() {
  const themeOptions = [
    ["premium-dark", "Premium dark"],
    ["high-contrast", "High contrast"],
    ["glass-dark", "Dark glass"]
  ];
  const storageOptions = [
    ["local", "Local on this phone"],
    ["cloud-ready", "Cloud-ready later"]
  ];
  const notificationStatus = state.settings.notificationPermission || "default";
  return `
    <form data-form="app-settings" class="form-stack">
      <div class="form-grid">
        <label>App theme<select name="theme">${themeOptions.map(([value, label]) => `<option value="${value}" ${state.settings.theme === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
        <label>Account label<input name="accountLabel" value="${escapeAttr(state.settings.accountLabel || "Personal")}"></label>
        <label>Storage<select name="storageMode">${storageOptions.map(([value, label]) => `<option value="${value}" ${state.settings.storageMode === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
        <label>Reminder time<input name="reminderTime" type="time" value="${escapeAttr(state.settings.reminderTime || "18:00")}"></label>
      </div>
      <label class="toggle-line"><input type="checkbox" name="notificationsEnabled" ${state.settings.notificationsEnabled ? "checked" : ""}> Show workout reminder preference</label>
      <div class="leader-row compact-row"><div><strong>Notification permission</strong><span>${notificationStatus === "granted" ? "Allowed in this browser." : notificationStatus === "denied" ? "Blocked by browser settings." : notificationStatus === "unsupported" ? "Not supported in this browser." : "Not requested yet."}</span></div><button class="secondary compact-action" type="button" data-action="request-notifications">Allow</button></div>
      <p class="privacy-note">Native scheduled notifications need a future app wrapper. For now this stores your preferred reminder time and keeps the app install-ready.</p>
      <button class="primary full" type="submit">Save Settings</button>
    </form>
  `;
}

function hubScreen() {
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Hub</p><h1>Tools</h1></div><button class="secondary" data-screen="profile">Profile</button></header>
      <section class="hub-grid">
        ${hubButton("profile", "Profile", `${state.profile.goal} - ${state.profile.trainingDaysPerWeek} days/week`)}
        ${hubButton("settings", "Settings", `${state.settings.theme} - ${state.settings.accountLabel}`)}
        ${hubButton("nutrition", "Nutrition", `${nutritionTotals().calories}/${state.nutritionSettings.calorieTarget} calories today`)}
        ${hubButton("ai-chat", "AI Chat", "Progress, readiness, plans")}
        ${hubButton("health", "Health", `${readinessScore()} readiness`)}
        ${hubButton("templates", "Templates", `${activeTemplates().length} saved`)}
        ${hubButton("progress", "Progress", "Charts and drilldowns")}
        ${hubButton("report", "Report", "Weekly review")}
        ${hubButton("exercises", "Exercises", `${allExercises().length} lifts`)}
      </section>
      <section class="panel"><div class="section-heading"><h2>Settings</h2><span>${state.settings.storageMode}</span></div>${appSettingsForm()}</section>
      <section class="panel"><div class="section-heading"><h2>Connected apps</h2><button class="ghost" data-action="connect-apple-health">Apple Health</button></div>${connectedAppsCard()}</section>
      ${collapsiblePanel("Storage status", storageStatusCard(), { meta: storageUsage().status })}
      ${collapsiblePanel("App roadmap", appRoadmapPanel(), { meta: "Local-first beta" })}
      <section class="panel"><div class="section-heading"><h2>Tools</h2></div><div class="backup-actions"><button class="secondary" data-screen="exercises">Exercise library</button><button class="secondary" data-screen="templates">Workout templates</button><button class="secondary" data-screen="ai-chat">Coach chat</button><button class="secondary" data-screen="report">Weekly report</button></div></section>
      ${collapsiblePanel("Data Control Center", `${dataSafetyCard()}<div class="backup-actions"><button class="secondary" data-action="export-json">Full export</button><button class="secondary" data-action="export-structured-json">Structured JSON</button><button class="secondary" data-action="export-csv">Workout CSV</button><button class="secondary" data-action="export-photo-backup">Photo backup</button><button class="secondary" data-action="undo-last">Undo</button><button class="secondary" data-action="clear-sample-health">Clear sample</button><button class="secondary" data-action="clear-health">Clear health</button><button class="secondary" data-action="clear-cached-photos">Clear photos</button></div><p class="privacy-note">AI uses the local server proxy. Set GEMINI_API_KEY for free-tier-friendly Gemini or OPENAI_API_KEY for OpenAI. Keys stay on the server, never in the app.</p>`, { meta: "Backup + cleanup" })}
      ${collapsiblePanel("Automatic backups", `${backupRows()}<div class="backup-actions"><button class="secondary" data-action="clear-auto-backups">Clear backups</button></div>`, { meta: `${autoBackups().length} saved` })}
    </section>
  `;
}

function appRoadmapPanel() {
  const items = [
    ["Backend/cloud", "Real database, object storage, account auth, device sync, and restore across devices.", "Next"],
    ["Workout UX", "Supersets, faster templates, smarter rest, substitutions, and cleaner set modifiers.", "Build"],
    ["Analytics/coach", "Program blocks, readiness correlations, goal projections, and short AI summaries.", "Grow"]
  ];
  return `
    <div class="leader-row compact-row status-row"><div><strong>Local-first beta</strong><span>Daily training works locally now. Production polish means durable sync, safer restores, and deeper coaching over time.</span></div><b>Current</b></div>
    ${items.map(([title, body, status]) => `<div class="leader-row compact-row"><div><strong>${title}</strong><span>${body}</span></div><b>${status}</b></div>`).join("")}
    <p class="privacy-note">Native Apple Health sync requires a future iOS HealthKit wrapper. This PWA can still import, summarize, and use the data locally.</p>
  `;
}

function storageStatusCard() {
  const usage = storageUsage();
  const photoPct = Math.min(100, Math.round((usage.photoBytes / PHOTO_WARN_BYTES) * 100));
  const totalPct = Math.min(100, Math.round((usage.totalBytes / LOCAL_STORAGE_WARN_BYTES) * 100));
  return `
    <div class="storage-grid">
      <article class="metric"><span>${formatBytes(usage.totalBytes)}</span><small>Local usage</small><i style="width:${totalPct}%"></i></article>
      <article class="metric"><span>${formatBytes(usage.photoBytes)}</span><small>Photo cache</small><i style="width:${photoPct}%"></i></article>
    </div>
    <div class="leader-row compact-row"><div><strong>Free-tier-ready structure</strong><span>Structured data belongs in a database; photos, backups, exports, and thumbnails belong in file/object storage. This local app stores URLs later and compressed thumbnails now.</span></div><b>Ready</b></div>
    <div class="leader-row compact-row"><div><strong>Apple Health summaries</strong><span>Imports keep daily sleep, steps, RHR, HRV, active calories, workouts, and bodyweight summaries. Bodyweight syncs into Nutrition.</span></div><b>Daily</b></div>
  `;
}

function connectedAppsCard() {
  const apple = state.healthSources.find((source) => source.type === "apple_health" || source.type === "apple_health_xml");
  const status = apple?.lastImportAt ? `Last import ${new Date(apple.lastImportAt).toLocaleDateString()}` : apple ? "Permission flow prepared" : "Not connected";
  return `
    <div class="leader-row compact-row"><div><strong>Apple Health</strong><span>${status}. Pull targets: sleep, steps, RHR, HRV, active calories, workouts, bodyweight.</span></div><b>${apple ? "Ready" : "Setup"}</b></div>
    <p class="privacy-note">Automatic Health sync is only possible in a native iOS HealthKit app. This PWA can store permissions/status, import export.xml, and normalize the same data now.</p>
  `;
}

function hubButton(target, title, subtitle) {
  return `<button class="hub-button" data-screen="${target}"><strong>${title}</strong><span>${subtitle}</span></button>`;
}

function dataSafetyCard() {
  const summary = backupSummary(state);
  const cleared = state.dataSafety.lastSampleClearedAt ? ` Sample data cleared ${new Date(state.dataSafety.lastSampleClearedAt).toLocaleDateString()}.` : "";
  const backup = state.dataSafety.lastAutoBackupAt ? `Last backup ${new Date(state.dataSafety.lastAutoBackupAt).toLocaleString()}.` : "No automatic backup yet.";
  return `<div class="leader-row"><div><strong>${summary.workouts} workouts, ${summary.meals} meals, ${summary.photos || 0} photos, ${summary.templates || 0} templates</strong><span>${summary.healthMetrics} health metrics. ${backup}${cleared}</span>${state.dataSafety.backupError ? `<small>${escapeHtml(state.dataSafety.backupError)}</small>` : ""}</div><b>Local</b></div>`;
}

function backupRows() {
  const backups = autoBackups();
  if (!backups.length) return emptyState("No backups yet", "Apex Signal creates local restore points after saved workouts, imports, meals, goals, and target changes.");
  return backups.slice(0, 5).map((backup) => {
    const s = backup.summary || {};
    return `<div class="leader-row backup-row"><div><strong>${escapeHtml(backup.reason)}</strong><span>${new Date(backup.createdAt).toLocaleString()} - ${s.workouts || 0} workouts, ${s.meals || 0} meals, ${s.healthMetrics || 0} health metrics</span></div><button class="secondary" data-action="restore-auto-backup" data-id="${backup.id}">Restore</button></div>`;
  }).join("");
}

function coachScreen() {
  const recommendation = state.recommendations[0] || buildRecommendation();
  const adjustment = state.adaptivePlanAdjustments[0] || adaptivePlanAdjustment();
  const snapshot = latestReadinessSnapshot();
  const headline = recommendation.exercises.map((item) => getExercise(item.exerciseId).name).slice(0, 2).join(" + ") || "Build session";
  const suggestedWorkout = recommendation.exercises.map((item) => `<div class="template-row"><strong>${getExercise(item.exerciseId).name}</strong><span>${item.targetSets} sets - ${item.repRange[0]}-${item.repRange[1]} reps - ${item.suggestedWeight || "open"} lb</span></div>`).join("");
  const planAdjustment = `<div class="insight-strip"><span>Volume</span><strong>${Math.round(adjustment.volumeMultiplier * 100)}%</strong><span>Intensity</span><strong>${Math.round(adjustment.intensityMultiplier * 100)}%</strong></div><p class="privacy-note">${adjustment.reason} ${snapshot ? healthSourceSummary(snapshot) : ""}</p>`;
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Coach</p><h1>Next session</h1></div><div class="header-actions"><button class="secondary" data-screen="ai-chat">Chat</button><button class="secondary" data-action="build-recommendation">Rebuild</button></div></header>
      <section class="coach-card next-action-card"><div><p class="eyebrow">Do this today</p><h2>${headline}</h2><span>${shortReason(recommendation.reasoning)}</span></div><div class="readiness-badge"><strong>${readinessScore()}</strong><span>Ready</span></div><button class="primary" data-action="start-recommendation" data-id="${recommendation.id}">Start Workout</button></section>
      ${recommendation.warnings.length ? `<section class="coach-note warning"><strong>Heads up</strong><span>${recommendation.warnings.join(" ")}</span></section>` : ""}
      ${collapsiblePanel("Why", `<div class="leader-row"><div><strong>${state.profile.preferredSplit}</strong><span>${recommendation.reasoning}</span></div><b>${recommendation.confidence?.label || "Medium"}</b></div>`, { open: false, meta: `${recommendation.confidence?.score || 55} confidence` })}
      ${collapsiblePanel("Watch", coachDecisionCards(recommendation, adjustment).join(""), { open: false, meta: `${coachDecisionCards(recommendation, adjustment).length} signals` })}
      ${collapsiblePanel("Change plan", planAdjustment, { open: false, meta: `${Math.round(adjustment.volumeMultiplier * 100)}% volume` })}
      ${collapsiblePanel("Workout details", `<div class="section-heading inline-heading"><span>${recommendation.exercises.length} exercises</span><button class="ghost" data-action="start-recommendation" data-id="${recommendation.id}">Start</button></div>${suggestedWorkout}`, { open: false, meta: headline })}
      ${collapsiblePanel("Update recovery", recoveryForm(), { open: false, meta: "2 min" })}
    </section>
  `;
}

function goalsScreen() {
  const goals = activeLiftGoals().map(evaluatedGoal);
  const main = goals[0];
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Goals</p><h1>Lift targets</h1></div><button class="secondary" data-action="add-goal">Quick add</button></header>
      ${collapsiblePanel("This week", weeklyGoalRows(state.activeMode === "progress" ? "progress" : "training"), { open: true, meta: "Missed goals reset" })}
      ${main ? `<section class="coach-card goal-hero"><div><p class="eyebrow">${goalStatusText(main)}</p><h2>${getExercise(main.exerciseId).name} ${main.targetE1rm} lb</h2><span>${main.currentE1rm} current e1RM - ${main.projectedE1rm} projected by ${main.targetDate}</span></div>${goalDonut(main)}</section>` : ""}
      ${collapsiblePanel("Create goal", goalForm(), { open: false, meta: "Lift target" })}
      ${main ? collapsiblePanel("Projection", `${goalProjectionChart(main)}<div class="insight-strip"><span>Need now</span><strong>${main.requiredE1rm} lb</strong><span>Days left</span><strong>${daysUntil(main.targetDate)}</strong></div>`, { open: false, meta: `${main.projectedE1rm} projected` }) : ""}
      ${collapsiblePanel("Active goals", goals.length ? goals.map(goalRow).join("") : emptyState("No goals yet", "Create a target like Bench Press 285 lb in three months."), { open: false, meta: `${goals.length} active` })}
      ${main ? collapsiblePanel("Weekly plan", goalWeeklyRows(main), { open: false, meta: `${getExercise(main.exerciseId).name} path` }) : ""}
      ${collapsiblePanel("Coach tie-in", goals.length ? goals.slice(0, 3).map((goal) => `<div class="leader-row"><div><strong>${getExercise(goal.exerciseId).name}</strong><span>${goalStatusText(goal)} - Coach will bias main work toward ${goal.targetE1rm} lb.</span></div><b>${goal.status === "behind" ? "Push" : "Build"}</b></div>`).join("") : emptyState("No target signal", "Goals help Coach choose main lifts and progression jumps."), { open: false, meta: "Signals" })}
    </section>
  `;
}

function goalForm() {
  const defaultTarget = roundWeight((estimatedOneRepMax(bestSet(selectedExerciseId)) || 225) * 1.12);
  const defaultDate = datePlusDays(90).toISOString().slice(0, 10);
  return `
    <form data-form="goal" class="form-stack">
      <div class="form-grid">
        <label>Lift<select name="exerciseId">${exerciseOptions(selectedExerciseId)}</select></label>
        <label>Target e1RM<input name="targetE1rm" inputmode="numeric" value="${defaultTarget}"></label>
        <label>Target date<input name="targetDate" type="date" value="${defaultDate}"></label>
        <label>Current e1RM<input name="baselineE1rm" inputmode="numeric" value="${estimatedOneRepMax(bestSet(selectedExerciseId)) || ""}" placeholder="Auto"></label>
      </div>
      <button class="primary full" type="submit">Build Progression Plan</button>
    </form>
  `;
}

function goalWeeklyRows(goal) {
  return goal.weeklyTargets.slice(0, 8).map((target) => `<div class="leader-row"><div><strong>Week ${target.week}: ${target.targetE1rm} lb e1RM</strong><span>${target.targetSets} sets of ${target.repRange[0]}-${target.repRange[1]} around ${target.workingWeight} lb</span></div><b>${target.date.slice(5)}</b></div>`).join("");
}

function goalDonut(goal) {
  const pct = Math.max(4, Math.min(100, (Number(goal.currentE1rm || 0) / Number(goal.targetE1rm || 1)) * 100));
  return `<div class="goal-donut" style="--pct:${pct}"><strong>${Math.round(pct)}%</strong><span>${goalStatusText(goal)}</span></div>`;
}

function goalProjectionChart(goal) {
  const actual = e1rmTrend(goal.exerciseId, 6).map((point) => ({ label: point.label, value: point.value }));
  const targetLine = [{ label: "Now", value: goal.currentE1rm }, ...goal.weeklyTargets.slice(0, 8).map((target) => ({ label: `W${target.week}`, value: target.targetE1rm }))];
  const projectedLine = [{ label: "Now", value: goal.currentE1rm }, { label: "Projected", value: goal.projectedE1rm }];
  return `<div class="projection-stack">${lineChart(targetLine, "Set a goal to see the target path.")}${actual.length ? lineChart(actual, "Log sets to compare actual progress.") : emptyState("No recent actuals", "Completed sets will draw your real progress line.")}<div class="projection-legend"><span><i></i>Target path</span><span><i class="actual"></i>Actual/projection</span><strong>${goalStatusText(goal)}</strong></div></div>`;
}

function workoutScreen() {
  const workout = state.activeWorkout;
  if (!workout) return "";
  const firstIncomplete = workout.exercises.find((ex) => !ex.completedAt);
  const selected = workout.exercises.find((ex) => ex.exerciseId === selectedExerciseId);
  const item = selected || firstIncomplete || workout.exercises[workout.exercises.length - 1];

  const currentIndex = Math.max(0, workout.exercises.indexOf(item));
  const exercise = getExercise(item.exerciseId);
  const totalExercises = workout.exercises.length || 1;

  const upNext = workout.exercises.filter((ex, idx) => idx > currentIndex && !ex.completedAt);
  const completed = workout.exercises.filter((ex) => ex.completedAt);

  return `
    <section class="screen workout-screen">
      <header class="workout-top">
        <div class="header-main">
          <p class="eyebrow">Exercise ${currentIndex + 1} of ${totalExercises}</p>
          <h1>${exercise.name}</h1>
        </div>
        <div class="header-timer">
          <strong id="workout-timer-display">${formatClock(secondsSince(workout.startedAt))}</strong>
        </div>
      </header>

      ${!item.completedAt ? `
        <section class="set-panel active-exercise-panel">
          <div class="set-head-new">
            <span>Set</span>
            <span>Weight</span>
            <span>Reps</span>
            <span>Type</span>
            <span></span>
          </div>
          <div class="set-list">
            ${item.sets.map((set, setIndex) => setRow(currentIndex, setIndex, set)).join("")}
          </div>
          <button class="secondary add-set-btn" data-action="add-set" data-item="${currentIndex}">+ Add Set</button>
          <div class="exercise-actions">
            <button class="primary full" data-action="complete-exercise" data-item="${currentIndex}">Complete Exercise</button>
          </div>
        </section>
      ` : `
        <div class="active-completed-summary">
          ${completedExerciseSummary(item)}
          ${firstIncomplete ? "" : "<p class='privacy-note' style='text-align:center;'>All exercises complete.</p>"}
        </div>
      `}

      <section class="panel edit-exercises-panel">
        <div class="section-heading">
          <h2>Edit Exercises</h2>
          <div class="header-actions">
            <button class="ghost" data-screen="exercises">+ Add</button>
            <button class="ghost" data-action="save-template">Save Template</button>
          </div>
        </div>
        <div class="exercise-reorder-list">
          ${workout.exercises.map((ex, idx) => `
            <div class="reorder-item ${idx === currentIndex ? "active" : ""}" draggable="true" data-index="${idx}">
              <div class="reorder-handle">::</div>
              <button class="reorder-name" data-action="select-workout-exercise" data-id="${ex.exerciseId}">${idx + 1}. ${getExercise(ex.exerciseId).name}</button>
              <button class="danger-icon small" data-action="remove-exercise" data-item="${idx}">${iconSvg(navIcons.trash)}</button>
            </div>
          `).join("")}
        </div>
      </section>

      ${upNext.length > 0 ? `
        <section class="panel up-next-panel">
          <div class="section-heading"><h2>Up Next</h2></div>
          <div class="up-next-list">
            ${upNext.map((ex, idx) => `
              <div class="up-next-item ${idx === 0 ? "next-immediate" : ""}">
                <strong>${currentIndex + idx + 2}. ${getExercise(ex.exerciseId).name}</strong>
              </div>
            `).join("")}
          </div>
        </section>
      ` : ""}

      ${completed.length > 0 ? `
        <section class="panel completed-panel">
          <div class="section-heading"><h2>Completed</h2></div>
          <div class="completed-list">
            ${completed.filter((ex) => ex.exerciseId !== item.exerciseId).map(completedExerciseSummary).join("")}
          </div>
        </section>
      ` : ""}

      <div class="finish-workout-area">
        <button class="secondary full" data-action="finish-workout">Finish Workout</button>
      </div>
    </section>
  `;
}

function completedExerciseSummary(item) {
  const exercise = getExercise(item.exerciseId);
  const doneSets = item.sets.filter((set) => set.completed);
  const volume = doneSets.reduce((total, set) => total + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0);
  const totalReps = doneSets.reduce((total, set) => total + (Number(set.reps) || 0), 0);
  const best = doneSets.reduce((currentBest, set) => !currentBest || (Number(set.weight) > Number(currentBest.weight) || (Number(set.weight) === Number(currentBest.weight) && Number(set.reps) > Number(currentBest.reps))) ? set : currentBest, null);

  return `
    <article class="completed-summary-card" data-action="select-workout-exercise" data-id="${item.exerciseId}">
      <div class="summary-main">
        <strong>${exercise.name}</strong>
        <span>${doneSets.length} sets - ${totalReps} reps - ${volume.toLocaleString()} lb</span>
      </div>
      ${best ? `<div class="summary-best">Best: ${best.weight} x ${best.reps}</div>` : ""}
    </article>
  `;
}

function workoutToolCards(exercise, item, suggestion) {
  const target = Number(suggestion.weight || item.sets.find((set) => Number(set.weight))?.weight || 0);
  const plates = plateCalculator(target);
  const warmups = warmupSetsFor(target, exercise);
  const cues = exerciseCues(exercise);
  const swaps = swapOptions(exercise);
  return `
    <section class="tool-panel">
      <div class="tool-card">
        <span>Plate load</span>
        <strong>${exercise.equipment === "Barbell" && plates.plates.length ? `${plates.perSide} / side` : "N/A"}</strong>
        <p>${exercise.equipment === "Barbell" && plates.plates.length ? plates.plates.map((plate) => `${plate.count}x${plate.plate}`).join(" + ") : "Use for barbell lifts with a target weight."}</p>
      </div>
      <div class="tool-card">
        <span>Warmups</span>
        <strong>${warmups.length ? `${warmups.length} ramps` : "Optional"}</strong>
        <p>${warmups.length ? warmups.map((set) => `${set.weight}x${set.reps}`).join(" / ") : "Start light, then ramp by feel."}</p>
      </div>
      <div class="tool-card wide">
        <span>Execution cues</span>
        <strong>${exercise.movementPattern}</strong>
        <p>${cues.join(" - ")}</p>
      </div>
      ${swaps.length ? `<div class="swap-strip">${swaps.slice(0, 3).map((swap) => `<button class="${swap.risky ? "risky" : ""}" data-action="swap-exercise" data-item="${state.activeWorkout.exercises.findIndex((workoutItem) => workoutItem.exerciseId === item.exerciseId)}" data-id="${swap.id}"><strong>${swap.name}</strong><span>${swap.reason}</span></button>`).join("")}</div>` : ""}
    </section>
  `;
}

function reviewScreen() {
  const review = state.pendingReview || (state.activeWorkout ? buildWorkoutReview(state.activeWorkout) : null);
  if (!review) return "";
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Review</p><h1>Before save</h1></div><button class="secondary" data-screen="workout">Edit</button></header>
      <section class="score-grid"><article class="metric"><span>${review.sets}</span><small>Sets</small></article><article class="metric"><span>${review.volume.toLocaleString()}</span><small>Volume</small></article><article class="metric"><span>${review.prs.length}</span><small>PRs</small></article><article class="metric"><span>${readinessScore()}</span><small>Readiness</small></article></section>
      <section class="panel"><div class="section-heading"><h2>Muscles trained</h2></div>${barList(review.muscles, "No completed sets yet.")}</section>
      <section class="panel"><div class="section-heading"><h2>Session notes</h2></div>${review.warnings.length ? review.warnings.map((warning) => `<div class="history-set"><strong>${warning}</strong></div>`).join("") : emptyState("Looks clean", "No unusual or incomplete set data found.")}<p class="privacy-note">${review.readinessImpact}</p><p class="privacy-note">Next: ${review.nextSuggestion}</p></section>
      <button class="primary full" data-action="save-reviewed-workout">Save Workout</button>
    </section>
  `;
}

function progressScreen() {
  const correlations = performanceCorrelations();
  const tracked = trackedLiftIds();
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Progress</p><h1>Analytics</h1></div><button class="secondary" data-screen="report">Report</button></header>
      <section class="panel"><div class="section-heading"><h2>Tracked lifts</h2><span>${tracked.length}/6</span></div>${trackedLiftSelector()}</section>
      <section class="panel chart-panel"><div class="section-heading"><h2>Strength board</h2></div>${trackedStrengthBoard(tracked)}</section>
      ${collapsiblePanel(`${getExercise(selectedExerciseId).name} deep dive`, `${lineChart(e1rmTrend(selectedExerciseId), "Log this lift to see strength trend.")}${bars(volumeTrend(selectedExerciseId), "Volume appears after more sessions.")}<div class="insight-strip"><span>Best e1RM</span><strong>${estimatedOneRepMax(bestSet(selectedExerciseId)) || 0} lb</strong><span>Next</span><strong>${suggestedWeightFor(selectedExerciseId).weight || "Open"} lb</strong></div>`, { open: false, meta: "Exercise history" })}
      ${collapsiblePanel("Lift goals", activeLiftGoals().length ? activeLiftGoals().map(goalRow).join("") : emptyState("No lift goals", "Add a goal from the Goals tab."), { open: false, meta: `${activeLiftGoals().length} active` })}
      ${collapsiblePanel("Signal correlations", `${correlationCards(correlations)}<p class="privacy-note">${correlations.decision}</p>`, { open: false, meta: "28 days" })}
      ${collapsiblePanel("Fuel x volume", dualBars(correlations.days.map((day) => ({ label: day.label, primary: day.volume, secondary: day.calories })), "Log workouts and meals to compare fuel against training volume.", "Volume", "Calories"), { open: false, meta: "Nutrition" })}
      ${collapsiblePanel("Recovery x volume", dualBars(correlations.days.map((day) => ({ label: day.label, primary: day.volume, secondary: day.readiness || 0 })), "Import recovery and log workouts to compare readiness against output.", "Volume", "Readiness"), { open: false, meta: "Readiness" })}
      ${collapsiblePanel("Muscle dashboard", `${muscleMap()}${barList(muscleSets(7), "No muscle data yet.")}`, { open: false, meta: "7 days" })}
      ${collapsiblePanel("PR timeline", timeline(), { open: false, meta: "Recent" })}
      ${collapsiblePanel("Weekly tonnage", bars(weeklyBuckets().map((week) => ({ label: week.label, value: week.volume })), "No weekly volume yet."), { open: false, meta: "Volume" })}
      ${collapsiblePanel("Cardio minutes", bars(cardioTrend(), "No cardio minutes yet."), { open: false, meta: "Conditioning" })}
    </section>
  `;
}

function reportScreen() {
  const report = weeklyReport();
  const adjustment = state.adaptivePlanAdjustments[0] || adaptivePlanAdjustment();
  const correlations = report.correlations;
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Weekly report</p><h1>This week</h1></div><button class="secondary" data-screen="coach">Coach</button></header>
      <section class="score-grid"><article class="metric"><span>${report.consistency}</span><small>Sessions</small></article><article class="metric"><span>${report.volume.toLocaleString()}</span><small>Volume</small></article><article class="metric"><span>${readinessScore()}</span><small>Readiness</small></article><article class="metric"><span>${report.fatigue}</span><small>Status</small></article></section>
      <section class="panel"><div class="section-heading"><h2>What moved performance</h2><button class="ghost" data-screen="progress">Details</button></div>${correlationCards(correlations)}<p class="privacy-note">${weeklyDecisionSummary(correlations)}</p></section>
      ${collapsiblePanel("Wins", report.prs.length ? report.prs.map(prRow).join("") : emptyState("No PRs this week", "Keep stacking completed sets."), { open: false, meta: `${report.prs.length} PRs` })}
      ${collapsiblePanel("Next-week priorities", report.gaps.map((gap) => `<div class="leader-row"><div><strong>${gap.muscle}</strong><span>${gap.sets} sets this week - soreness ${gap.soreness}/5</span></div><b>Focus</b></div>`).join(""), { open: false, meta: `${report.gaps.length} areas` })}
      ${collapsiblePanel("Fatigue notes", report.warnings.length ? report.warnings.map((warning) => `<div class="history-set"><strong>${warning}</strong></div>`).join("") : emptyState("No data issues", "Your logged sets look clean."), { open: false, meta: report.fatigue })}
      ${collapsiblePanel("Recovery summary", `${actionableHealthCards().map((card) => `<div class="history-set"><strong>${card}</strong></div>`).join("")}<p class="privacy-note">Plan update: ${adjustment.reason}</p>`, { open: false, meta: `${readinessScore()} readiness` })}
      ${collapsiblePanel("Goal movement", activeLiftGoals().length ? activeLiftGoals().slice(0, 3).map(goalRow).join("") : emptyState("No active goals", "Add lift goals on Progress."), { open: false, meta: `${activeLiftGoals().length} active` })}
      <section class="panel"><div class="section-heading"><h2>Backup</h2></div><div class="backup-actions"><button class="secondary" data-action="export-json">Export JSON</button><button class="secondary" data-action="export-csv">Export CSV</button><label class="secondary import-label">Import<input type="file" accept="application/json,.json" data-input="import-backup" /></label></div></section>
    </section>
  `;
}

function correlationCards(correlations) {
  const cards = correlations.cards.filter((card) => card.score !== null).slice(0, 5);
  if (!cards.length) return emptyState("More data needed", "Correlations need at least a few overlapping workouts, meals, or recovery snapshots.");
  return `<div class="correlation-grid">${cards.map((card) => `<div class="correlation-card"><span>${card.label}</span><strong>${card.score > 0 ? "+" : ""}${card.score}</strong><i style="width:${Math.max(8, Math.abs(card.score) * 100)}%"></i><small>Avg ${card.avg || "--"}${card.unit ? ` ${card.unit}` : ""}</small></div>`).join("")}</div>`;
}

function weeklyDecisionSummary(correlations) {
  const adherence = correlations.calorieAdherence;
  const fuelLine = adherence.hitDays >= Math.ceil(adherence.days * 0.6) ? "Fuel was consistent enough to support progress." : "Fuel consistency is likely the first thing to improve.";
  const readinessLine = readinessScore() < 60 ? " Readiness is low, so reduce volume before chasing load." : " Readiness supports normal progression if joints feel good.";
  return `${fuelLine}${readinessLine}`;
}

function dualBars(items, emptyText, primaryLabel, secondaryLabel) {
  if (!items.some((item) => item.primary > 0 || item.secondary > 0)) return emptyState("No comparison yet", emptyText);
  const maxPrimary = Math.max(...items.map((item) => item.primary), 1);
  const maxSecondary = Math.max(...items.map((item) => item.secondary), 1);
  return `<div class="dual-bars">${items.slice(-14).map((item) => `<div><span class="primary-bar" style="height:${Math.max(4, (item.primary / maxPrimary) * 100)}%"></span><span class="secondary-bar" style="height:${Math.max(4, (item.secondary / maxSecondary) * 100)}%"></span><small>${item.label}</small></div>`).join("")}</div><div class="chart-legend"><span><i></i>${primaryLabel}</span><span><i class="secondary"></i>${secondaryLabel}</span></div>`;
}

function settingsScreen() {
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Profile</p><h1>Lifter setup</h1></div><button class="secondary" data-screen="hub">Hub</button></header>
      ${!state.onboardingComplete ? `<section class="coach-note"><strong>Setup not finished</strong><span>Complete onboarding to personalize Coach, plans, and goals.</span><button class="secondary" data-screen="onboarding">Open setup</button></section>` : ""}
      <section class="panel"><div class="section-heading"><h2>Lifter profile</h2></div>${profileForm()}</section>
      <section class="panel"><div class="section-heading"><h2>App settings</h2><span>${state.settings.accountLabel || "Personal"}</span></div>${appSettingsForm()}</section>
      <section class="panel"><div class="section-heading"><h2>Install on phone</h2></div><p class="privacy-note">In Safari or your mobile browser, use Share/Add to Home Screen. ${APP_NAME} stores data locally on this device, so export backups regularly.</p></section>
    </section>
  `;
}

function templatesScreen() {
  const templates = activeTemplates();
  return `<section class="screen"><header class="simple-top"><div><p class="eyebrow">Training</p><h1>Add Workouts</h1></div><button class="secondary" data-action="create-template">New blank</button></header>${templates.length ? templates.map(templateCard).join("") : `<section class="panel">${emptyState("No templates yet", "Create a blank template, then add lifts for Push, Pull, Legs, Upper, or Lower.")}<button class="primary full" data-action="create-template">Create Template</button></section>`}</section>`;
}

function exercisesScreen() {
  const filtered = allExercises().filter((exercise) => `${exercise.name} ${exercise.category} ${exercise.primaryMuscles.join(" ")}`.toLowerCase().includes(exerciseQuery.toLowerCase()));
  return `
    <section class="screen">
      <header class="simple-top"><div><p class="eyebrow">Library</p><h1>Exercises</h1></div><button class="secondary" data-action="${state.activeWorkout ? "go-workout" : "start-workout"}">${state.activeWorkout ? "Workout" : "Start"}</button></header>
      <label class="search"><span>Search</span><input value="${escapeAttr(exerciseQuery)}" data-input="exercise-query" placeholder="Bench, squat, back..." /></label>
      <section class="panel compact"><div class="section-heading"><h2>Create custom</h2></div><div class="inline-form"><input value="${escapeAttr(newExerciseName)}" data-input="new-exercise" placeholder="Exercise name" /><button class="primary" data-action="create-exercise">Add</button></div></section>
      <section class="exercise-list">${filtered.map((exercise) => `<button class="exercise-row ${exercise.id === selectedExerciseId ? "selected" : ""}" data-action="select-exercise" data-id="${exercise.id}"><div><strong>${exercise.name}</strong><span>${exercise.category} - ${exercise.equipment} - ${exercise.movementPattern}</span></div><small>${exercise.custom ? "Custom" : exercise.primaryMuscles[0]}</small></button>`).join("")}</section>
    </section>
  `;
}

function recoveryForm() {
  const current = latestRecovery() || {};
  const soreness = current.muscleSoreness || {};
  return `
    <form data-form="recovery" class="form-stack">
      <div class="form-grid"><label>Sleep hrs<input name="sleepHours" inputmode="decimal" value="${escapeAttr(current.sleepHours || 7)}"></label><label>Quality<input name="sleepQuality" inputmode="numeric" value="${escapeAttr(current.sleepQuality || 3)}"></label><label>Energy<input name="energy" inputmode="numeric" value="${escapeAttr(current.energy || 3)}"></label><label>Stress<input name="stress" inputmode="numeric" value="${escapeAttr(current.stress || 3)}"></label><label>Motivation<input name="motivation" inputmode="numeric" value="${escapeAttr(current.motivation || 3)}"></label></div>
      <div class="soreness-grid">${muscleGroups.slice(0, 8).map((muscle) => `<label>${muscle}<input name="soreness-${muscle}" inputmode="numeric" value="${escapeAttr(soreness[muscle] || 0)}"><span><input type="checkbox" name="pain-${muscle}" ${current.painFlags?.includes(muscle) ? "checked" : ""}> pain</span></label>`).join("")}</div>
      <label>Notes<input name="recoveryNotes" value="${escapeAttr(current.notes || "")}" placeholder="Tight shoulders, bad sleep..."></label>
      <button class="primary full" type="submit">Save Recovery</button>
    </form>
  `;
}

function profileForm() {
  const equipment = ["Barbell", "Dumbbell", "Machine", "Bodyweight", "Cable"];
  const splitOptions = ["Push Pull Legs Upper Lower", "Push Pull Legs", "Upper Lower", "Full Body", "Custom"];
  const dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const selectedDays = state.profile.preferredTrainingDays?.length ? state.profile.preferredTrainingDays : dayOptions.slice(0, state.profile.trainingDaysPerWeek || 4);
  return `
    <form data-form="profile" class="form-stack">
      <div class="form-grid">
        <label>Goal<input name="goal" value="${escapeAttr(state.profile.goal)}"></label>
        <label>Experience<select name="experience">${["beginner", "intermediate", "advanced"].map((item) => `<option value="${item}" ${state.profile.experience === item ? "selected" : ""}>${item[0].toUpperCase()}${item.slice(1)}</option>`).join("")}</select></label>
        <label>Days/week<input name="trainingDaysPerWeek" inputmode="numeric" value="${escapeAttr(state.profile.trainingDaysPerWeek)}"></label>
        <label>Split<select name="preferredSplit">${splitOptions.map((item) => `<option value="${item}" ${state.profile.preferredSplit === item ? "selected" : ""}>${item}</option>`).join("")}</select></label>
      </div>
      <div><p class="mini-label">Preferred training days</p><div class="check-row compact-days">${dayOptions.map((day) => `<label><input type="checkbox" name="trainingDay" value="${day}" ${selectedDays.includes(day) ? "checked" : ""}> ${day}</label>`).join("")}</div></div>
      <div class="check-row">${equipment.map((item) => `<label><input type="checkbox" name="equipment" value="${item}" ${state.profile.preferredEquipment.includes(item) ? "checked" : ""}> ${item}</label>`).join("")}</div>
      <label>Weak points<input name="weakPoints" value="${escapeAttr(state.profile.weakPoints.join(", "))}"></label>
      <label>Avoid exercise IDs<input name="avoidedExercises" value="${escapeAttr(state.profile.avoidedExercises.join(", "))}" placeholder="deadlift, squat"></label>
      <button class="primary full" type="submit">Save Profile</button>
    </form>
  `;
}

function setRow(itemIndex, setIndex, set) {
  const item = state.activeWorkout.exercises[itemIndex];
  const history = exerciseHistory(item.exerciseId);
  const prevSet = history[setIndex] || history[0];
  const prevPerf = prevSet ? `${prevSet.weight} x ${prevSet.reps}` : "";

  const typeOptions = [
    ["Standard", ""],
    ["Warmup", "isWarmup"],
    ["Dropset", "isDropSet"],
    ["Partial", "isPartial"],
    ["Failure", "toFailure"],
    ["Unilateral", "isUnilateral"],
    ["Tempo", "isControlledTempo"]
  ];
  const currentType = typeOptions.find(([label, flag]) => flag && set[flag])?.[0] || "Standard";

  return `
    <div class="set-row-new ${set.completed ? "complete" : ""}">
      <div class="set-col-num">
        <button class="set-num-btn" data-action="toggle-set" data-item="${itemIndex}" data-set="${setIndex}">${setIndex + 1}</button>
      </div>
      <div class="set-col-input">
        <input inputmode="decimal" value="${escapeAttr(set.weight)}" data-set-input="weight" data-item="${itemIndex}" data-set="${setIndex}" placeholder="0" />
        ${prevPerf ? `<small class="prev-perf">Prev: ${prevPerf}</small>` : ""}
      </div>
      <div class="set-col-input">
        <input inputmode="numeric" value="${escapeAttr(set.reps)}" data-set-input="reps" data-item="${itemIndex}" data-set="${setIndex}" placeholder="${set.targetReps || 8}" />
      </div>
      <div class="set-col-type">
        <select data-action="set-type-change" data-item="${itemIndex}" data-set="${setIndex}">
          ${typeOptions.map(([label, flag]) => `<option value="${flag}" ${currentType === label ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </div>
      <div class="set-col-del">
        <button class="trash-btn" data-action="remove-set" data-item="${itemIndex}" data-set="${setIndex}">${iconSvg(navIcons.trash)}</button>
      </div>
    </div>
  `;
}

function templateCard(template) {
  return `
    <section class="panel template-card">
      <form data-form="template" data-template-id="${template.id}" class="template-editor">
        <div class="section-heading"><input name="templateName" value="${escapeAttr(template.name)}" aria-label="Template name"><div class="header-actions"><button class="ghost" type="button" data-action="start-template" data-id="${template.id}">Start</button><button class="danger-icon small" type="button" data-action="delete-template" data-id="${template.id}">Trash</button></div></div>
        ${template.exercises.length ? template.exercises.map((item, index) => templateExerciseEditor(template.id, item, index)).join("") : emptyState("Blank template", "Add exercises, then save this workout template.")}
        <div class="template-add-row"><select data-template-add="${template.id}">${exerciseOptions(selectedExerciseId)}</select><button class="secondary" type="button" data-action="add-template-exercise" data-id="${template.id}">Add lift</button></div>
        <button class="primary full" type="submit">Save Template</button>
      </form>
    </section>
  `;
}

function templateExerciseEditor(templateId, item, index) {
  return `
    <div class="template-edit-row" data-template-row>
      <label>Lift<select name="exerciseId">${exerciseOptions(item.exerciseId)}</select></label>
      <label>Sets<input name="targetSets" inputmode="numeric" value="${escapeAttr(item.targetSets || 3)}"></label>
      <label>Min<input name="targetRepMin" inputmode="numeric" value="${escapeAttr(item.targetRepMin || 6)}"></label>
      <label>Max<input name="targetRepMax" inputmode="numeric" value="${escapeAttr(item.targetRepMax || 10)}"></label>
      <label>Rest<input name="defaultRest" inputmode="numeric" value="${escapeAttr(item.defaultRest || 90)}"></label>
      <label class="wide">Notes<input name="templateNotes" value="${escapeAttr(item.notes || "")}" placeholder="Cue, progression, swap note"></label>
      <button class="danger-icon small" type="button" data-action="remove-template-exercise" data-id="${templateId}" data-index="${index}">Trash</button>
    </div>
  `;
}

function activeTemplates() {
  return state.templates.filter((template) => !template.deletedAt);
}

function prRow(item) {
  return `<div class="leader-row"><div><strong>${item.exercise.name}</strong><span>${item.set.weight} lb x ${item.set.reps} - ${new Date(item.set.workoutDate).toLocaleDateString()}</span></div><b>${estimatedOneRepMax(item.set)} lb</b></div>`;
}

function prSummaryCard(summary) {
  const setLine = (set) => `${set.weight} x ${set.reps}`;
  return `
    <div class="pr-summary-card">
      <div class="section-heading"><h2>${summary.exercise.name}</h2><strong class="${summary.delta >= 0 ? "good-text" : "danger-text"}">${summary.delta >= 0 ? "+" : ""}${summary.delta} e1RM</strong></div>
      <div class="score-grid compact-score">
        <article class="metric"><span>${summary.heaviest.weight}</span><small>Heaviest</small></article>
        <article class="metric"><span>${setLine(summary.bestRepsAtWeight)}</span><small>Best reps at weight</small></article>
        <article class="metric"><span>${Number(summary.bestVolume.weight) * Number(summary.bestVolume.reps)}</span><small>Best set volume</small></article>
        <article class="metric"><span>${estimatedOneRepMax(summary.bestE1rm)}</span><small>Strength trend</small></article>
      </div>
    </div>
  `;
}

function premiumRing(value, target, label, unit = "") {
  const pct = Math.max(4, Math.min(100, (Number(value || 0) / Math.max(1, Number(target || 1))) * 100));
  const dash = pct * 1.82; // 2 * PI * 29 = 182
  return `
    <div class="premium-ring-item">
      <div class="premium-ring-container">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="29"></circle>
          <circle class="value" cx="32" cy="32" r="29" style="stroke-dasharray:${dash} 182"></circle>
        </svg>
        <strong>${Math.round(pct)}%</strong>
      </div>
      <span>${label}</span>
      <small>${value}${unit}</small>
    </div>
  `;
}

function premiumStatCard(label, value, unit = "", subtext = "") {
  return `
    <div class="premium-stat-card">
      <span>${label}</span>
      <strong>${value}${unit}</strong>
      ${subtext ? `<small>${subtext}</small>` : ""}
    </div>
  `;
}

function emptyStateCard(title, body, actionText = "", actionScreen = "", actionData = "") {
  return `
    <div class="premium-card empty-state-card">
      <div class="empty">
        <strong>${title}</strong>
        <span>${body}</span>
        ${actionText ? `<button class="secondary" data-screen="${actionScreen}" ${actionData}>${actionText}</button>` : ""}
      </div>
    </div>
  `;
}

function readinessGauge(score) {
  const dash = Math.max(0, Math.min(100, score)) * 2.64;
  return `<div class="readiness-gauge"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42"></circle><circle class="value" cx="50" cy="50" r="42" style="stroke-dasharray:${dash} 264"></circle></svg><strong>${score}</strong></div>`;
}

function heatmap() {
  const max = Math.max(...calendarDays().map((day) => day.count), 1);
  return `<div class="heatmap">${calendarDays().map((day) => `<span title="${day.key}" style="opacity:${0.22 + (day.count / max) * 0.78}">${day.label}</span>`).join("")}</div>`;
}

function consistencyVisual() {
  const days = calendarDays(14);
  const thisWeek = calendarDays(7);
  const completed = thisWeek.filter((day) => day.count > 0).length;
  const target = Number(state.profile.trainingDaysPerWeek || 4);
  const pct = Math.min(100, (completed / Math.max(1, target)) * 100);
  return `
    <div class="consistency-card">
      <div class="consistency-ring" style="--pct:${pct}"><strong>${completed}/${target}</strong><span>This week</span></div>
      <div class="consistency-copy"><strong>${streakWeeks()} week streak</strong><span>${completed >= target ? "Target hit. Keep the pattern rolling." : `${Math.max(0, target - completed)} sessions left to hit your plan.`}</span></div>
    </div>
    <div class="activity-strip">${days.map((day) => `<span class="${day.count ? "hit" : ""}" title="${day.key}">${day.label}</span>`).join("")}</div>
  `;
}

function bodyHeatmap() {
  const values = muscleWorkload();
  const max = Math.max(...Object.values(values).map((item) => item.score), 1);
  const tone = (muscle) => Math.min(1, (values[muscle]?.score || 0) / max);
  const op = (muscle) => 0.18 + tone(muscle) * 0.82;
  const label = (muscle) => `${muscle}: ${values[muscle]?.sets || 0} sets, ${Math.round(values[muscle]?.score || 0)} load`;
  const chips = Object.entries(values).sort((a, b) => b[1].score - a[1].score).slice(0, 4);
  return `
    <div class="body-heatmap">
      <svg viewBox="0 0 220 210" role="img" aria-label="Weekly front and back muscle workload map">
        <text x="54" y="14">Front</text><text x="154" y="14">Back</text>
        <g class="body-side front">
          <circle cx="58" cy="31" r="12"></circle>
          <path class="load load-${loadBand(tone("Chest"))}" d="M42 48 Q58 38 74 48 L68 91 Q58 99 48 91 Z" style="opacity:${op("Chest")}"><title>${label("Chest")}</title></path>
          <path class="load load-${loadBand(tone("Shoulders"))}" d="M31 52 Q39 48 43 55 L37 94 Q29 95 26 88 Z" style="opacity:${op("Shoulders")}"><title>${label("Shoulders")}</title></path>
          <path class="load load-${loadBand(tone("Shoulders"))}" d="M73 55 Q78 48 86 52 L91 88 Q88 95 80 94 Z" style="opacity:${op("Shoulders")}"><title>${label("Shoulders")}</title></path>
          <path class="load load-${loadBand(tone("Quads"))}" d="M39 94 Q49 101 57 98 L54 165 Q42 169 35 157 Z" style="opacity:${op("Quads")}"><title>${label("Quads")}</title></path>
          <path class="load load-${loadBand(tone("Quads"))}" d="M61 98 Q70 101 78 94 L82 157 Q75 169 64 165 Z" style="opacity:${op("Quads")}"><title>${label("Quads")}</title></path>
          <path class="load load-${loadBand(tone("Core"))}" d="M48 92 Q58 99 68 92 L70 113 Q58 120 46 113 Z" style="opacity:${op("Core")}"><title>${label("Core")}</title></path>
          <path class="load load-${loadBand(tone("Biceps"))}" d="M28 89 Q34 94 38 94 L35 132 Q28 132 24 124 Z" style="opacity:${op("Biceps")}"><title>${label("Biceps")}</title></path>
          <path class="load load-${loadBand(tone("Biceps"))}" d="M80 94 Q86 94 91 89 L95 124 Q91 132 84 132 Z" style="opacity:${op("Biceps")}"><title>${label("Biceps")}</title></path>
        </g>
        <g class="body-side back">
          <circle cx="160" cy="31" r="12"></circle>
          <path class="load load-${loadBand(tone("Back"))}" d="M142 49 Q160 39 178 49 L174 91 Q160 101 146 91 Z" style="opacity:${op("Back")}"><title>${label("Back")}</title></path>
          <path class="load load-${loadBand(tone("Lats"))}" d="M146 55 Q160 66 174 55 L171 94 Q160 102 149 94 Z" style="opacity:${op("Lats")}"><title>${label("Lats")}</title></path>
          <path class="load load-${loadBand(tone("Triceps"))}" d="M132 52 Q140 48 144 55 L139 94 Q131 95 128 88 Z" style="opacity:${op("Triceps")}"><title>${label("Triceps")}</title></path>
          <path class="load load-${loadBand(tone("Triceps"))}" d="M177 55 Q182 48 190 52 L193 88 Q190 95 182 94 Z" style="opacity:${op("Triceps")}"><title>${label("Triceps")}</title></path>
          <path class="load load-${loadBand(tone("Glutes"))}" d="M149 91 Q160 99 171 91 L172 116 Q160 124 148 116 Z" style="opacity:${op("Glutes")}"><title>${label("Glutes")}</title></path>
          <path class="load load-${loadBand(tone("Hamstrings"))}" d="M141 116 Q151 123 159 119 L155 166 Q144 169 137 158 Z" style="opacity:${op("Hamstrings")}"><title>${label("Hamstrings")}</title></path>
          <path class="load load-${loadBand(tone("Hamstrings"))}" d="M163 119 Q172 123 180 116 L184 158 Q177 169 166 166 Z" style="opacity:${op("Hamstrings")}"><title>${label("Hamstrings")}</title></path>
        </g>
      </svg>
      <div class="load-chip-row">${chips.length ? chips.map(([muscle, item]) => `<span>${muscle}<b>${Math.round(item.score)}</b></span>`).join("") : `<span>Log workouts<b>0</b></span>`}</div>
      <div class="heatmap-legend"><span>Low</span><i></i><strong>High workload</strong></div>
    </div>
  `;
}

function loadBand(value) {
  if (value >= 0.78) return "high";
  if (value >= 0.48) return "medium";
  return "low";
}

function muscleWorkload() {
  const recent = {};
  const baseline = {};
  const readinessPenalty = readinessScore() < 55 ? 1.22 : readinessScore() < 70 ? 1.1 : 1;
  const add = (bucket, workout, ageWeight = 1) => {
    workout.exercises.forEach((item) => {
      const exercise = getExercise(item.exerciseId);
      const completed = item.sets.filter((set) => set.completed && !set.deletedAt);
      const setVolume = completed.reduce((sum, set) => sum + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0);
      const load = completed.length * 12 + setVolume / 120;
      [...exercise.primaryMuscles, ...(exercise.secondaryMuscles || [])].forEach((muscle, index) => {
        const multiplier = index < exercise.primaryMuscles.length ? 1 : 0.45;
        bucket[muscle] = bucket[muscle] || { score: 0, sets: 0, sessions: new Set() };
        bucket[muscle].score += load * multiplier * ageWeight;
        bucket[muscle].sets += completed.length * multiplier;
        bucket[muscle].sessions.add(workout.id);
      });
    });
  };
  completedWorkouts(7).forEach((workout) => add(recent, workout, 1));
  completedWorkouts(42).forEach((workout) => add(baseline, workout, 1 / 6));
  muscleGroups.forEach((muscle) => {
    const current = recent[muscle] || { score: 0, sets: 0, sessions: new Set() };
    const base = baseline[muscle]?.score || 1;
    const frequency = current.sessions?.size || 0;
    const baselineRatio = Math.min(1.5, current.score / Math.max(1, base));
    current.score = current.score * (1 + baselineRatio * 0.18 + frequency * 0.06) * readinessPenalty;
    recent[muscle] = current;
  });
  return recent;
}

function ringRow(values) {
  const entries = muscleGroups.slice(0, 6).map((muscle) => ({ muscle, value: values[muscle] || 0 }));
  const max = Math.max(...entries.map((item) => item.value), 1);
  return `<div class="ring-row">${entries.map((item) => `<div class="mini-ring" style="--pct:${Math.max(8, item.value / max * 100)}"><i></i><span>${item.muscle}</span><b>${item.value}</b></div>`).join("")}</div>`;
}

function muscleMap() {
  const values = muscleSets(7);
  const sore = latestRecovery()?.muscleSoreness || {};
  const hot = (muscle) => Math.min(1, (values[muscle] || 0) / 8 + (sore[muscle] || 0) / 10);
  return `<svg class="muscle-map" viewBox="0 0 160 160" aria-label="Muscle map"><circle cx="80" cy="22" r="13" /><rect x="58" y="38" width="44" height="48" rx="16" style="opacity:${0.22 + hot("Chest")}"/><rect x="33" y="45" width="22" height="52" rx="11" style="opacity:${0.22 + hot("Shoulders")}"/><rect x="105" y="45" width="22" height="52" rx="11" style="opacity:${0.22 + hot("Back")}"/><rect x="58" y="90" width="19" height="56" rx="9" style="opacity:${0.22 + hot("Quads")}"/><rect x="83" y="90" width="19" height="56" rx="9" style="opacity:${0.22 + hot("Hamstrings")}"/></svg>`;
}

function lineChart(points, emptyText, unit = "lb") {
  if (!points.length) return emptyState("Not enough data", emptyText);
  const max = Math.max(...points.map((point) => point.value), 1);
  const min = Math.min(...points.map((point) => point.value), 0);
  const range = Math.max(max - min, 1);
  const coords = points.map((point, index) => `${points.length === 1 ? 50 : (index / (points.length - 1)) * 100},${90 - ((point.value - min) / range) * 72}`).join(" ");
  return `<svg class="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${coords}" /></svg><div class="chart-meta"><span>${points[0].value}${unit ? ` ${unit}` : ""}</span><strong>${points.at(-1).value}${unit ? ` ${unit}` : ""}</strong></div>`;
}

function bars(items, emptyText) {
  if (!items || !items.some((item) => item.value > 0)) return emptyState("No chart yet", emptyText);
  const max = Math.max(...items.map((item) => item.value), 1);
  return `<div class="bar-chart">${items.map((item) => `<div><span style="height:${Math.max(6, (item.value / max) * 96)}%"></span><small>${item.label}</small></div>`).join("")}</div>`;
}

function barList(values, emptyText) {
  const entries = Object.entries(values).sort((a, b) => b[1] - a[1]).slice(0, 7);
  if (!entries.length) return emptyState("No balance yet", emptyText);
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  const modeClass = state.activeMode || "training";
  return `<div class="muscle-bars bars-${modeClass}">${entries.map(([label, value]) => `<div><p><span>${label}</span><b>${value}</b></p><i style="width:${(value / max) * 100}%"></i></div>`).join("")}</div>`;
}

function nutritionMiniCard() {
  const totals = nutritionTotals();
  const settings = state.nutritionSettings;
  return `<div class="macro-mini"><div><strong>${totals.calories}</strong><span>of ${settings.calorieTarget} calories</span><i><b style="width:${macroPct(totals.calories, settings.calorieTarget)}%"></b></i></div><div><strong>${totals.protein}g</strong><span>of ${settings.proteinTarget}g protein</span><i><b style="width:${macroPct(totals.protein, settings.proteinTarget)}%"></b></i></div></div>`;
}

function bodyweightForm(showDetails = false) {
  return `
    <form data-form="bodyweight" class="inline-form stacked-inline">
      <input name="weighIn" inputmode="decimal" value="${escapeAttr(bodyweightDraft)}" placeholder="${latestBodyweight()} lb" />
      ${showDetails ? `<input name="weighInNotes" value="" placeholder="Notes" /><select name="weighInTiming"><option>Morning</option><option>Evening</option></select>` : ""}
      <button class="secondary" type="submit">Log Weight</button>
    </form>
  `;
}

function bodyweightRows(limit = 4) {
  const entries = state.bodyweightEntries.filter((entry) => !entry.deletedAt).slice(0, limit);
  if (!entries.length) return `<p class="privacy-note">Log weigh-ins to tie nutrition to strength progress.</p>`;
  return entries.map((entry) => `<div class="leader-row compact-row"><div><strong>${entry.weight} lb</strong><span>${entry.date}${entry.timing ? ` - ${escapeHtml(entry.timing)}` : ""}${entry.notes ? ` - ${escapeHtml(entry.notes)}` : ""}</span></div><b>${entry.source}</b></div>`).join("");
}

function supplementForm() {
  return `
    <form data-form="supplement" class="form-stack compact-form">
      <div class="form-grid">
        <label>Type<select name="supplementType"><option value="creatine" ${supplementDraft.type === "creatine" ? "selected" : ""}>Creatine</option><option value="caffeine" ${supplementDraft.type === "caffeine" ? "selected" : ""}>Caffeine</option><option value="protein" ${supplementDraft.type === "protein" ? "selected" : ""}>Protein</option><option value="other" ${supplementDraft.type === "other" ? "selected" : ""}>Other</option></select></label>
        <label>Amount<input name="supplementAmount" value="${escapeAttr(supplementDraft.amount)}" placeholder="5g, 200mg"></label>
        <label>Timing<input name="supplementTiming" value="${escapeAttr(supplementDraft.timing)}" placeholder="Pre, post, morning"></label>
        <label>Notes<input name="supplementNotes" value="${escapeAttr(supplementDraft.notes)}" placeholder="Optional"></label>
      </div>
      <button class="secondary full" type="submit">Log Supplement</button>
    </form>
  `;
}

function supplementRows(limit = null) {
  const entries = limit ? state.supplementEntries.filter((entry) => !entry.deletedAt).slice(0, limit) : supplementsForDate();
  if (!entries.length) return `<p class="privacy-note">Creatine and caffeine timing will improve recovery and nutrition context.</p>`;
  return entries.map((entry) => `<div class="leader-row compact-row"><div><strong>${capitalize(entry.type)} ${escapeHtml(entry.amount)}</strong><span>${entry.timing || "No timing"}${entry.notes ? ` - ${escapeHtml(entry.notes)}` : ""}</span></div><b>Today</b></div>`).join("");
}

function cardioForm() {
  return `
    <form data-form="cardio" class="form-stack compact-form">
      <div class="form-grid">
        <label>Type<input name="cardioType" list="cardio-types" value="${escapeAttr(cardioDraft.type)}" placeholder="Treadmill"></label>
        <datalist id="cardio-types"><option value="Treadmill"></option><option value="Bike"></option><option value="Run"></option><option value="Walk"></option><option value="Stairmaster"></option></datalist>
        <label>Minutes<input name="cardioMinutes" inputmode="numeric" value="${escapeAttr(cardioDraft.minutes)}" placeholder="20"></label>
        <label>Distance<input name="cardioDistance" inputmode="decimal" value="${escapeAttr(cardioDraft.distance)}" placeholder="Optional"></label>
        <label>Calories<input name="cardioCalories" inputmode="numeric" value="${escapeAttr(cardioDraft.calories)}" placeholder="Optional"></label>
        <label>Heart rate<input name="cardioHeartRate" inputmode="numeric" value="${escapeAttr(cardioDraft.heartRate)}" placeholder="Optional"></label>
        <label>Speed<input name="cardioSpeed" inputmode="decimal" value="${escapeAttr(cardioDraft.speed)}" placeholder="mph"></label>
        <label>Incline<input name="cardioIncline" inputmode="decimal" value="${escapeAttr(cardioDraft.incline)}" placeholder="%"></label>
      </div>
      <label>Notes<input name="cardioNotes" value="${escapeAttr(cardioDraft.notes)}" placeholder="Zone 2, incline, intervals..."></label>
      <button class="secondary full" type="submit">Log Cardio</button>
    </form>
  `;
}

function cardioRows() {
  const entries = state.cardioEntries.filter((entry) => !entry.deletedAt).slice(0, 5);
  const summary = weeklyCardio();
  return `${cardioForm()}<div class="insight-strip cardio-summary"><span>Week</span><strong>${summary.minutes}m</strong><span>Calories</span><strong>${summary.calories}</strong></div><p class="privacy-note">Each cardio log counts as a Training session and feeds Progress charts.</p>${entries.length ? entries.map((entry) => `<div class="leader-row compact-row"><div><strong>${escapeHtml(entry.type)} - ${entry.minutes} min</strong><span>${entry.date}${entry.distance ? ` - ${entry.distance} mi` : ""}${entry.heartRate ? ` - ${entry.heartRate} bpm` : ""}${entry.speed ? ` - ${entry.speed} mph` : ""}${entry.incline ? ` - ${entry.incline}%` : ""}${entry.notes ? ` - ${escapeHtml(entry.notes)}` : ""}</span></div><b>${entry.calories || "--"}</b></div>`).join("") : `<p class="privacy-note">Add low-friction cardio for heart health without letting it bury strength recovery.</p>`}`;
}

function cardioTrend() {
  return calendarDays(14).map((day) => {
    const minutes = state.cardioEntries.filter((entry) => !entry.deletedAt && entry.date === day.key).reduce((sum, entry) => sum + Number(entry.minutes || 0), 0);
    return { label: day.label, value: minutes };
  });
}

function workoutHistoryRows(limit = 12) {
  const sessions = completedTrainingSessions(3650).slice(0, limit);
  if (!sessions.length) return emptyState("No workout history yet", "Start a lift or cardio session to build history.");
  return sessions.map((session) => session.type === "cardio" ? cardioHistoryCard(session.item) : strengthHistoryCard(session.item)).join("");
}

function strengthHistoryCard(workout) {
  return `<div class="leader-row compact-row history-edit-row"><div><strong>${new Date(workout.finishedAt || workout.startedAt).toLocaleDateString()}</strong><span>${workout.exercises.map((item) => getExercise(item.exerciseId).name).slice(0, 3).join(", ")} - ${completedSets(workout)} sets</span></div><b>${workoutVolume(workout).toLocaleString()}</b><button class="secondary" data-action="edit-workout" data-id="${workout.id}">Edit</button></div>`;
}

function cardioHistoryCard(entry) {
  return `<div class="leader-row compact-row history-edit-row cardio-session-card"><div><strong>${escapeHtml(entry.type)} cardio</strong><span>${entry.date} - ${entry.minutes} min${entry.distance ? ` - ${entry.distance} mi` : ""}${entry.heartRate ? ` - ${entry.heartRate} bpm` : ""}${entry.incline ? ` - ${entry.incline}% incline` : ""}</span></div><b>${entry.calories || "--"} cal</b><button class="secondary" data-screen="training-cardio">Open</button></div>`;
}

function exerciseHistoryRows(exerciseId) {
  const sets = exerciseHistory(exerciseId).slice(0, 12);
  if (!sets.length) return emptyState("No sets yet", "Log this exercise to see its history.");
  return sets.map((set) => `<div class="leader-row compact-row"><div><strong>${set.weight} x ${set.reps}</strong><span>${new Date(set.workoutDate).toLocaleDateString()}${set.isDropSet ? " - drop" : ""}${set.toFailure ? " - failure" : ""}</span></div><b>${estimatedOneRepMax(set)}</b></div>`).join("");
}

function trackedLiftMiniRows(ids = trackedLiftIds()) {
  return ids.map((id) => {
    const best = bestSet(id);
    const exercise = getExercise(id);
    return `<button class="tracked-mini ${selectedExerciseId === id ? "active" : ""}" data-action="select-exercise" data-id="${id}"><strong>${exercise.name}</strong><span>${best ? `${estimatedOneRepMax(best)} lb e1RM - ${best.weight}x${best.reps}` : "No sets yet"}</span></button>`;
  }).join("");
}

function trackedStrengthBoard(ids = trackedLiftIds()) {
  const rows = ids.map((id) => {
    const exercise = getExercise(id);
    const best = bestSet(id);
    const recent = exerciseHistory(id).slice(0, 5);
    const volume = volumeTrend(id, 4).reduce((sum, point) => sum + Number(point.value || 0), 0);
    return { id, exercise, best, recent, volume };
  });
  if (!rows.some((row) => row.best || row.volume)) return emptyState("No tracked strength yet", "Log your tracked lifts to build the strength board.");
  return `<div class="strength-board">${rows.map((row) => `<button class="${selectedExerciseId === row.id ? "active" : ""}" data-action="select-exercise" data-id="${row.id}"><span>${row.exercise.name}</span><strong>${row.best ? estimatedOneRepMax(row.best) : 0}</strong><small>${row.best ? `${row.best.weight} x ${row.best.reps}` : "No PR"} - ${row.volume.toLocaleString()} vol</small></button>`).join("")}</div>`;
}

function nutritionRecommendations() {
  const totals = nutritionTotals();
  const remaining = Math.max(0, Number(state.nutritionSettings.calorieTarget || 0) - totals.calories);
  const proteinLeft = Math.max(0, Number(state.nutritionSettings.proteinTarget || 0) - totals.protein);
  const cards = [
    `Calories remaining: ${remaining}. ${remaining > 900 ? "Add a dense meal earlier rather than forcing it before bed." : "You are close enough to steer with snacks."}`,
    `Protein remaining: ${proteinLeft}g. ${proteinLeft > 50 ? "Prioritize lean protein in the next meal." : "Protein is within striking distance."}`,
    supplementStatus("creatine") ? "Creatine is logged today." : "Creatine not logged yet; keep timing simple and consistent.",
    supplementStatus("caffeine") ? "Caffeine logged. Avoid late timing if sleep quality drops." : "No caffeine logged today."
  ];
  return cards.map((card) => `<div class="history-set"><strong>${card}</strong></div>`).join("");
}

function recoveryGoalRows() {
  const goals = [
    `Sleep: target 7.5+ hours. Last ${latestReadinessSnapshot()?.sleepHours || "--"} hours.`,
    `Readiness: keep weekly average above 70. Today ${readinessScore()}.`,
    `Soreness: chest/back/biceps/triceps/quads/hamstrings stay under 4 before hard work.`,
    `Steps: Apple Health import will fill daily step goals when connected.`
  ];
  return goals.map((goal) => `<div class="leader-row compact-row"><div><strong>${goal}</strong><span>Weekly goals reset automatically in the coach view.</span></div><b>Goal</b></div>`).join("");
}

function recoveryHistoryRows() {
  const rows = state.recoveryCheckIns.filter((entry) => !entry.deletedAt).slice(0, 12);
  if (!rows.length) return emptyState("No recovery history", "Save check-ins or import Apple Health data.");
  return rows.map((entry) => `<div class="leader-row compact-row"><div><strong>${entry.date}</strong><span>${entry.sleepHours || "--"}h sleep - stress ${entry.stress || "--"} - energy ${entry.energy || "--"}</span></div><b>${readinessFromRecovery(entry)}</b></div>`).join("");
}

function capitalize(value) {
  const text = String(value || "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function timeline() {
  const prs = recentPrs(8);
  if (!prs.length) return emptyState("No PR timeline yet", "PRs appear when completed sets beat past e1RM.");
  return `<div class="timeline">${prs.map((item) => `<div><i></i><strong>${item.exercise.name}</strong><span>${estimatedOneRepMax(item.set)} lb - ${new Date(item.set.workoutDate).toLocaleDateString()}</span></div>`).join("")}</div>`;
}

function actionableHealthCards() {
  const snapshot = latestReadinessSnapshot() || buildReadinessSnapshot();
  const cards = [];
  if (snapshot.sleepHours && snapshot.sleepHours < 6.5) cards.push("Sleep debt: reduce accessory volume 15%.");
  if (snapshot.hrv && snapshot.hrv > 55 && snapshot.readinessScore > 75) cards.push("HRV is strong: normal progression is available.");
  if (snapshot.restingHeartRate && snapshot.restingHeartRate > 65) cards.push("Resting HR is elevated: avoid max attempts.");
  if (snapshot.strain && snapshot.strain > 14) cards.push("High strain: soften today's intensity.");
  if (snapshot.readinessScore < 55) cards.push("Low readiness: reduce load and protect sore areas.");
  if (!cards.length) cards.push("Recovery steady: follow the planned progression.");
  return cards.slice(0, 4);
}

function coachDecisionCards(recommendation, adjustment) {
  const goal = activeLiftGoals().map(evaluatedGoal)[0];
  const cards = [
    { label: "Confidence", value: recommendation.confidence?.label || "Medium", body: `Score ${recommendation.confidence?.score || 55}. Workout history, recovery freshness, and goals decide this.` },
    { label: "Recovery", value: `${readinessScore()}`, body: actionableHealthCards()[0] },
    { label: "Plan change", value: `${Math.round(adjustment.volumeMultiplier * 100)}%`, body: recommendation.changedFromPrevious || "No previous recommendation." }
  ];
  if (goal) cards.push({ label: "Goal signal", value: goalStatusText(goal), body: `${getExercise(goal.exerciseId).name}: ${goal.currentE1rm}/${goal.targetE1rm} lb, projected ${goal.projectedE1rm} lb.` });
  if (recommendation.missingData?.length) cards.push({ label: "Missing", value: recommendation.missingData.length, body: recommendation.missingData.join(", ") });
  return cards.map((card) => `<div class="decision-card"><span>${card.label}</span><strong>${card.value}</strong><p>${card.body}</p></div>`);
}

function healthSourceSummary(snapshot = latestReadinessSnapshot()) {
  if (!snapshot?.sourceIds?.length) return "Manual recovery only";
  return snapshot.sourceIds.map((id) => healthSourceLabel(state.healthSources.find((source) => source.id === id)?.type)).filter(Boolean).join(" + ");
}

function sourceCards() {
  const fixed = [
    { type: "apple_health", status: "Permission flow ready. Native HealthKit app required for live sync." },
    { type: "apple_health_xml", status: "Import export.xml now. Native HealthKit app required for automatic sync." },
    { type: "whoop", status: "Import/sample now. Backend OAuth required for live sync." }
  ];
  const cards = fixed.map((item) => {
    const source = state.healthSources.find((saved) => saved.type === item.type && !saved.deletedAt);
    const status = source?.lastImportAt ? `Last import ${new Date(source.lastImportAt).toLocaleDateString()}` : source ? item.status : item.status;
    return `<div class="leader-row"><div><strong>${healthSourceLabel(item.type)}</strong><span>${status}</span></div><b>${source ? "Ready" : "Setup"}</b></div>`;
  });
  state.healthSources.filter((source) => source.type === "sample").forEach((source) => {
    cards.push(`<div class="leader-row"><div><strong>Sample data</strong><span>${state.healthMetrics.filter((metric) => metric.sourceId === source.id).length} metrics for testing</span></div><b>Local</b></div>`);
  });
  return cards.join("");
}

function importPreviewCard() {
  if (!state.importPreview) return "";
  const preview = state.importPreview;
  const counts = Object.entries(preview.metricCounts || {}).map(([metric, count]) => `${metricLabel(metric)}: ${count}`).join(" - ") || "No mapped metrics";
  return `<section class="panel"><div class="section-heading"><h2>Import preview</h2><button class="ghost" data-action="confirm-import">Confirm</button></div><div class="leader-row"><div><strong>${healthSourceLabel(preview.type)}</strong><span>${preview.fileName} - ${preview.dateRange}</span></div><b>${preview.rowCount}</b></div><p class="privacy-note">${counts}</p><p class="privacy-note">${preview.duplicateCount} duplicates, ${preview.invalidCount} invalid rows detected. Nothing is saved until you confirm.</p><button class="secondary full" data-action="cancel-import">Cancel Import</button></section>`;
}

function metricLabel(metric) {
  return {
    sleepHours: "Sleep hours",
    sleepScore: "Sleep score",
    hrv: "HRV",
    restingHeartRate: "Resting HR",
    steps: "Steps",
    activeCalories: "Active calories",
    bodyweight: "Bodyweight",
    workoutMinutes: "Workout minutes",
    workoutSession: "Workout sessions",
    appleWorkouts: "Apple workouts",
    strain: "Strain",
    respiratoryRate: "Respiratory rate",
    spo2: "Blood oxygen",
    skinTemp: "Skin temp"
  }[metric] || metric;
}

function healthTrend(metricType, limit = 14) {
  if (metricType === "readinessScore") {
    return state.readinessSnapshots.filter((item) => !item.deletedAt).slice(0, limit).reverse().map((item) => ({ label: item.date.slice(5), value: item.readinessScore }));
  }
  return state.healthMetrics
    .filter((metric) => metric.metricType === metricType && !metric.deletedAt)
    .slice(0, limit)
    .reverse()
    .map((metric) => ({ label: metric.date.slice(5), value: Number(metric.value) }));
}

function activeLiftGoals() {
  return state.liftGoals.filter((goal) => !goal.deletedAt && !goal.archivedAt);
}

function activeTrainingBlock() {
  return state.trainingBlocks.find((block) => block.status === "active" && !block.deletedAt) || state.trainingBlocks[0] || null;
}

function plannedSessionRows(adjustment, sessions = plannedSessions()) {
  if (!sessions.length) return emptyState("No sessions planned", "Rebuild the week from your profile split.");
  return sessions.map((session, index) => {
    const done = (state.weeklyPlan.completedSessionIds || [])[index];
    const volume = Math.max(1, Math.round(session.targetVolume * adjustment.volumeMultiplier));
    const lifts = session.exercises.map((item) => getExercise(item.exerciseId).name).slice(0, 3).join(", ");
    return `<div class="planned-session ${done ? "done" : ""}"><div><strong>${session.dayLabel || `Day ${index + 1}`} - ${done ? "Completed" : session.name}</strong><span>${session.focus} - ${volume} adjusted sets</span><small>${lifts}</small></div><button class="${done ? "secondary" : "primary"}" data-action="start-planned-session" data-id="${session.id}">${done ? "Repeat" : "Start"}</button></div>`;
  }).join("");
}

function blockCard(block) {
  return `<div class="leader-row"><div><strong>${block.name}</strong><span>${block.weeks} weeks - ${block.progressionRule.replaceAll("_", " ")} - deload week ${block.deloadWeek}</span></div><b>${block.status}</b></div><p class="privacy-note">Goal lifts: ${block.goalExerciseIds.map((id) => getExercise(id).name).join(", ")}. Weekly target: ${block.weeklyVolumeTarget} sets.</p>`;
}

function deloadSuggestion() {
  const misses = completedWorkouts(21).flatMap((workout) => workout.exercises.flatMap((item) => item.sets)).filter((set) => set.completed && Number(set.reps) < Number(set.targetReps || 6)).length;
  const lowReadiness = readinessScore() < 55;
  const highStrain = (latestReadinessSnapshot()?.strain || 0) > 14;
  if (misses >= 4 || lowReadiness || highStrain) {
    return `<div class="coach-note warning"><strong>Deload suggested</strong><span>${misses} recent missed targets. ${lowReadiness ? "Readiness is low. " : ""}${highStrain ? "Strain is high. " : ""}Reduce volume 20-30% this week.</span></div>`;
  }
  return emptyState("No deload needed", "Fatigue signals do not call for a deload right now.");
}

function restSuggestion(exercise, item) {
  if (exercise.movementPattern.includes("Squat") || exercise.movementPattern.includes("Hinge")) return 150;
  if ((item.sets.at(-1)?.rpe || 0) >= 9) return 150;
  if ((item.sets.at(-1)?.rpe || 0) >= 8) return 120;
  return 90;
}

function goalRow(goal) {
  goal = evaluatedGoal(goal);
  const exercise = getExercise(goal.exerciseId);
  const current = goal.currentE1rm || 0;
  const target = Number(goal.targetE1rm) || 1;
  const pct = Math.max(4, Math.min(100, (current / target) * 100));
  return `<div class="goal-row status-${goal.status}"><div><strong>${exercise.name}</strong><span>${current} / ${target} lb by ${goal.targetDate} - ${goalStatusText(goal)}</span><i><b style="width:${pct}%"></b></i></div><em>${Math.round(pct)}%</em></div>`;
}

function bottomNav() {
  if (screen === "onboarding" || screen === "workout") return "";
  const items = currentModeTabs();
  return `<nav class="bottom-nav section-nav mode-${state.activeMode || "training"}">${items.map(([id, label, path]) => `<button class="${screen === id || (id === "home" && screen === "home") ? "active" : ""}" data-screen="${id}" ${id !== "hub" ? `data-mode="${state.activeMode}"` : ""}>${iconSvg(path)}<span>${label}</span></button>`).join("")}</nav>`;
}

function collapsiblePanel(title, body, { open = false, meta = "", action = "" } = {}) {
  return `
    <details class="panel collapsible-panel" ${open ? "open" : ""}>
      <summary><span><strong>${title}</strong>${meta ? `<small>${meta}</small>` : ""}</span>${action}</summary>
      <div class="collapsible-content">${body}</div>
    </details>
  `;
}

function emptyState(title, body) {
  return `<div class="empty"><strong>${title}</strong><span>${body}</span></div>`;
}

function renderPopup() {
  if (!activePopup) return "";

  let content = "";
  let title = "";

  if (activePopup === 'log-meal') {
    title = "Log Meal";
    content = mealCaptureForm();
  } else if (activePopup === 'add-weight') {
    title = "Add Weight";
    content = bodyweightForm(true);
  } else if (activePopup === 'add-supplement') {
    title = "Add Supplement";
    content = supplementForm();
  } else if (activePopup === 'recovery-checkin') {
    title = "Recovery Check-In";
    content = recoveryForm();
  }

  return `
    <div class="popup-overlay" data-action="close-popup">
      <div class="bottom-sheet" onclick="event.stopPropagation()">
        <div class="sheet-handle"></div>
        <div class="popup-header">
          <h2>${title}</h2>
          <button class="close-popup" data-action="close-popup">×</button>
        </div>
        <div class="popup-scroll-content">
          ${content}
        </div>
      </div>
    </div>
  `;
}

function escapeAttr(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;");
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}

function bindEvents(root) {
  root.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.screen;
      if (button.dataset.mode) state.activeMode = button.dataset.mode;
      if (next === "workout" && !state.activeWorkout) startWorkout();
      else {
        screen = next;
        saveState();
        render();
      }
    });
  });

  root.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "start-workout") startWorkout();
      if (action === "build-and-start") startWorkout(null, buildRecommendation());
      if (action === "build-recommendation") { buildRecommendation(); screen = "coach"; render(); }
      if (action === "rebuild-weekly-plan") rebuildWeeklyPlan();
      if (action === "start-planned-session") startPlannedSession(button.dataset.id);
      if (action === "start-recommendation") startWorkout(null, state.recommendations.find((recommendation) => recommendation.id === button.dataset.id) || buildRecommendation());
      if (action === "go-workout") { screen = "workout"; render(); }
      if (action === "finish-workout") finishWorkout();
      if (action === "save-reviewed-workout") saveReviewedWorkout();
      if (action === "edit-workout") openWorkoutEditor(button.dataset.id);
      if (action === "delete-workout") deleteWorkout(button.dataset.id);
      if (action === "remove-saved-workout-exercise") removeSavedWorkoutExercise(button.dataset.id, Number(button.dataset.index));
      if (action === "remove-saved-workout-set") removeSavedWorkoutSet(button.dataset.id, Number(button.dataset.exercise), Number(button.dataset.set));
      if (action === "add-set") addSet(Number(button.dataset.item));
      if (action === "complete-exercise") completeExercise(Number(button.dataset.item));
      if (action === "toggle-set") toggleSet(Number(button.dataset.item), Number(button.dataset.set));
      if (action === "remove-set") removeSet(Number(button.dataset.item), Number(button.dataset.set));
      if (action === "duplicate-set") duplicateSet(Number(button.dataset.item), Number(button.dataset.set));
      if (action === "weight-up") jumpSetWeight(Number(button.dataset.item), Number(button.dataset.set), 5);
      if (action === "weight-down") jumpSetWeight(Number(button.dataset.item), Number(button.dataset.set), -5);
      if (action === "copy-previous-set") copyPreviousSet(Number(button.dataset.item), Number(button.dataset.set));
      if (action === "toggle-warmup") toggleWarmupSet(Number(button.dataset.item), Number(button.dataset.set));
      if (action === "swap-exercise") swapWorkoutExercise(Number(button.dataset.item), button.dataset.id);
      if (action === "remove-exercise") removeExerciseFromWorkout(Number(button.dataset.item));
      if (action === "start-rest") startRest(90);
      if (action === "create-exercise") createCustomExercise();
      if (action === "select-exercise") { selectedExerciseId = button.dataset.id; if (state.activeWorkout) addExerciseToWorkout(selectedExerciseId); else render(); }
      if (action === "toggle-tracked-lift") toggleTrackedLift(button.dataset.id);
      if (action === "select-workout-exercise") { selectedExerciseId = button.dataset.id; render(); }
      if (action === "save-template") saveActiveAsTemplate();
      if (action === "create-template") createTemplateFromExercise();
      if (action === "start-template") startWorkout(state.templates.find((template) => template.id === button.dataset.id));
      if (action === "add-template-exercise") addTemplateExercise(button.dataset.id, root.querySelector(`[data-template-add="${button.dataset.id}"]`)?.value || selectedExerciseId);
      if (action === "remove-template-exercise") removeTemplateExercise(button.dataset.id, Number(button.dataset.index));
      if (action === "delete-template") deleteTemplate(button.dataset.id);
      if (action === "delete-progress-photo") deleteProgressPhoto(button.dataset.id);
      if (action === "open-sheet") { activeSheet = button.dataset.sheet || ""; render(); }
      if (action === "close-sheet") { activeSheet = ""; render(); }
      if (action === "hide-home-pr") hideHomePr(button.dataset.key);
      if (action === "toggle-home-pr") toggleHomePr(button.dataset.key, button.checked);
      if (action === "pin-home-pr") pinHomePr(button.dataset.key, button.checked);
      if (action === "toggle-home-goal") toggleHomeGoal(button.dataset.id, button.checked);
      if (action === "pin-home-goal") pinHomeGoal(button.dataset.id, button.checked);
      if (action === "cancel-recovery-estimate") { state.pendingRecoveryEstimate = null; whoopUploadStatus = ""; saveState(); render(); }
      if (action === "export-json") exportJson();
      if (action === "export-structured-json") exportStructuredJson();
      if (action === "export-photo-backup") exportPhotoBackup();
      if (action === "export-csv") exportCsv();
      if (action === "seed-health") seedSampleHealthData();
      if (action === "clear-sample-health") clearHealthData("sample");
      if (action === "clear-health") clearHealthData();
      if (action === "clear-cached-photos") clearCachedPhotos();
      if (action === "connect-apple-health") requestAppleHealthConnection();
      if (action === "request-notifications") void requestNotificationPermission();
      if (action === "restore-auto-backup") restoreAutoBackup(button.dataset.id);
      if (action === "clear-auto-backups") clearAutoBackups();
      if (action === "add-goal") addLiftGoal();
      if (action === "undo-last") undoLast();
      if (action === "confirm-import") confirmImportPreview();
      if (action === "cancel-import") { state.importPreview = null; saveState(); render(); }
      if (action === "complete-onboarding") completeOnboarding();
      if (action === "skip-onboarding") completeOnboarding(false);
      if (action === "set-ai-context") { aiContextMode = button.dataset.mode || "quick"; render(); }
      if (action === "set-mode") { state.activeMode = button.dataset.mode || "training"; screen = "home"; activeSheet = ""; activePopup = null; saveState(); render(); }
      if (action === "open-popup") { activePopup = button.dataset.popup; render(); }
      if (action === "close-popup") { activePopup = null; render(); }
      if (action === "send-ai-chat") sendAiChat();
      if (action === "apply-ai-suggestion") applyAiSuggestion(button.dataset.id);
      if (action === "dismiss-ai-suggestion") dismissAiSuggestion(button.dataset.id);
      if (action === "apply-estimated-targets") applyEstimatedTargets();
      if (action === "lookup-barcode") lookupBarcode();
      if (action === "clear-barcode") { barcodeDraft = ""; barcodeLookupStatus = ""; mealDraft.barcode = ""; if (state.pendingMealEstimate) state.pendingMealEstimate.barcode = ""; saveState(); render(); }
      if (action === "clear-meal-draft") { state.pendingMealEstimate = null; mealDraft = { name: "", calories: "", protein: "", carbs: "", fats: "", timing: "", barcode: "", notes: "" }; mealPhotoData = ""; barcodeDraft = ""; barcodeLookupStatus = ""; saveState(); render(); }
      if (action === "toggle-set-flag") toggleSetFlag(Number(button.dataset.item), Number(button.dataset.set), button.dataset.flag);
    });
  });

  root.querySelectorAll("[data-action='set-type-change']").forEach((select) => {
    select.addEventListener("change", () => {
      const itemIndex = Number(select.dataset.item);
      const setIndex = Number(select.dataset.set);
      const flag = select.value;
      const set = state.activeWorkout.exercises[itemIndex].sets[setIndex];
      ["isWarmup", "isDropSet", "isPartial", "toFailure", "isUnilateral", "isControlledTempo"].forEach((item) => {
        set[item] = item === flag;
      });
      saveState();
      render();
    });
  });

  const reorderList = root.querySelector(".exercise-reorder-list");
  if (reorderList) {
    let draggedItem = null;

    const handleDragStart = (item) => {
      draggedItem = item;
      item.classList.add("dragging");
    };

    const handleDragOver = (event, target) => {
      if (target && target !== draggedItem) {
        const rect = target.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const clientY = event.clientY || event.touches?.[0]?.clientY;
        if (clientY < midpoint) target.before(draggedItem);
        else target.after(draggedItem);
      }
    };

    const handleDragEnd = () => {
      if (!draggedItem) return;
      draggedItem.classList.remove("dragging");
      const newOrder = Array.from(reorderList.querySelectorAll(".reorder-item")).map((item) => Number(item.dataset.index));
      const exercises = state.activeWorkout.exercises;
      state.activeWorkout.exercises = newOrder.map((index) => exercises[index]);
      draggedItem = null;
      saveState();
      render();
    };

    reorderList.querySelectorAll(".reorder-item").forEach((item) => {
      item.addEventListener("dragstart", (event) => {
        event.dataTransfer.effectAllowed = "move";
        handleDragStart(item);
      });
      item.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        handleDragOver(event, event.target.closest(".reorder-item"));
      });
      item.addEventListener("dragend", handleDragEnd);
      item.addEventListener("touchstart", (event) => {
        if (event.target.closest(".reorder-handle")) handleDragStart(item);
      }, { passive: true });
      item.addEventListener("touchmove", (event) => {
        if (!draggedItem) return;
        event.preventDefault();
        const touch = event.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest(".reorder-item");
        handleDragOver(event, target);
      }, { passive: false });
      item.addEventListener("touchend", handleDragEnd);
    });
  }

  root.querySelectorAll("[data-set-input]").forEach((input) => {
    input.addEventListener("input", () => updateSet(Number(input.dataset.item), Number(input.dataset.set), input.dataset.setInput, input.value));
  });

  const queryInput = root.querySelector("[data-input='exercise-query']");
  if (queryInput) queryInput.addEventListener("input", (event) => {
    exerciseQuery = event.target.value;
    render();
  });

  const newExerciseInput = root.querySelector("[data-input='new-exercise']");
  if (newExerciseInput) newExerciseInput.addEventListener("input", (event) => {
    newExerciseName = event.target.value;
  });

  const aiInput = root.querySelector("[data-input='ai-chat']");
  if (aiInput) aiInput.addEventListener("input", (event) => {
    aiChatDraft = event.target.value;
  });

  root.querySelectorAll("[data-input='meal-photo']").forEach((input) => {
    input.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) estimateMealFromPhoto(file);
    });
  });

  const barcodeInput = root.querySelector("[data-input='barcode']");
  if (barcodeInput) barcodeInput.addEventListener("input", (event) => {
    barcodeDraft = event.target.value;
  });

  const barcodePhoto = root.querySelector("[data-input='barcode-photo']");
  if (barcodePhoto) barcodePhoto.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) detectBarcodeFromImage(file);
  });

  const progressPhoto = root.querySelector("[data-input='progress-photo']");
  if (progressPhoto) progressPhoto.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    const form = root.querySelector("[data-form='progress-photo']");
    if (file && form) saveProgressPhoto(file, form);
  });

  const whoopPhoto = root.querySelector("[data-input='whoop-photo']");
  if (whoopPhoto) whoopPhoto.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) estimateRecoveryFromPhoto(file);
  });

  const importInput = root.querySelector("[data-input='import-backup']");
  if (importInput) importInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importBackup(file);
  });

  const appleImport = root.querySelector("[data-input='apple-health-import']");
  if (appleImport) appleImport.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importHealthFile(file, "apple_health");
  });

  const whoopImport = root.querySelector("[data-input='whoop-import']");
  if (whoopImport) whoopImport.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importHealthFile(file, "whoop");
  });

  const recovery = root.querySelector("[data-form='recovery']");
  if (recovery) recovery.addEventListener("submit", (event) => {
    event.preventDefault();
    saveRecoveryFromForm(recovery);
  });

  const recoveryEstimate = root.querySelector("[data-form='recovery-estimate']");
  if (recoveryEstimate) recoveryEstimate.addEventListener("submit", (event) => {
    event.preventDefault();
    saveRecoveryEstimateFromForm(recoveryEstimate);
  });

  const profile = root.querySelector("[data-form='profile']");
  if (profile) profile.addEventListener("submit", (event) => {
    event.preventDefault();
    saveProfileFromForm(profile);
  });

  const appSettings = root.querySelector("[data-form='app-settings']");
  if (appSettings) appSettings.addEventListener("submit", (event) => {
    event.preventDefault();
    saveAppSettingsFromForm(appSettings);
  });

  const goal = root.querySelector("[data-form='goal']");
  if (goal) goal.addEventListener("submit", (event) => {
    event.preventDefault();
    saveGoalFromForm(goal);
  });

  const meal = root.querySelector("[data-form='meal']");
  if (meal) meal.addEventListener("submit", (event) => {
    event.preventDefault();
    saveMealFromForm(meal);
  });

  const workoutEdit = root.querySelector("[data-form='workout-edit']");
  if (workoutEdit) workoutEdit.addEventListener("submit", (event) => {
    event.preventDefault();
    saveEditedWorkoutFromForm(workoutEdit);
  });

  const nutritionSettings = root.querySelector("[data-form='nutrition-settings']");
  if (nutritionSettings) nutritionSettings.addEventListener("submit", (event) => {
    event.preventDefault();
    saveNutritionSettingsFromForm(nutritionSettings);
  });

  root.querySelectorAll("[data-form='template']").forEach((template) => {
    template.addEventListener("submit", (event) => {
      event.preventDefault();
      saveTemplateFromForm(template);
    });
  });

  root.querySelectorAll("[data-pr-key]").forEach((card) => {
    let startX = 0;
    let startY = 0;
    card.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
      startY = event.clientY;
      card.setPointerCapture?.(event.pointerId);
    });
    card.addEventListener("pointerup", (event) => {
      const dx = event.clientX - startX;
      const dy = Math.abs(event.clientY - startY);
      if (dx > 76 && dy < 44) hideHomePr(card.dataset.prKey);
    });
  });

  const bodyweight = root.querySelector("[data-form='bodyweight']");
  if (bodyweight) bodyweight.addEventListener("submit", (event) => {
    event.preventDefault();
    saveBodyweightFromForm(bodyweight);
  });

  const supplement = root.querySelector("[data-form='supplement']");
  if (supplement) supplement.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSupplementFromForm(supplement);
  });

  const cardio = root.querySelector("[data-form='cardio']");
  if (cardio) cardio.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCardioFromForm(cardio);
  });

  const shell = root.querySelector(".phone-shell");
  if (shell && screen !== "workout" && screen !== "onboarding") {
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeBlocked = false;
    const finishSwipe = (clientX, clientY) => {
      if (swipeBlocked || !swipeStartX) return;
      const deltaX = clientX - swipeStartX;
      const deltaY = clientY - swipeStartY;
      swipeStartX = 0;
      if (Math.abs(deltaX) < 72 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;
      goToAdjacentTab(deltaX < 0 ? 1 : -1);
    };
    shell.addEventListener("touchstart", (event) => {
      const touch = event.touches[0];
      swipeBlocked = isSwipeBlocked(event.target);
      swipeStartX = touch.clientX;
      swipeStartY = touch.clientY;
    }, { passive: true });
    shell.addEventListener("touchend", (event) => {
      const touch = event.changedTouches[0];
      finishSwipe(touch.clientX, touch.clientY);
    }, { passive: true });
    shell.addEventListener("pointerdown", (event) => {
      swipeBlocked = isSwipeBlocked(event.target);
      swipeStartX = event.clientX;
      swipeStartY = event.clientY;
    }, { passive: true });
    shell.addEventListener("pointerup", (event) => finishSwipe(event.clientX, event.clientY), { passive: true });
  }
}

setInterval(() => {
  if (state.activeWorkout && !restRemaining && document.activeElement?.tagName !== "INPUT") render();
}, 30000);

saveState();
render();
