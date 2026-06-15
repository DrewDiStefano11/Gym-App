import fs from 'fs';
import path from 'path';

const DATA_DIR = 'data';
const EXERCISE_LIBRARY_PATH = path.join(DATA_DIR, 'exercise-library.json');
const WORKOUT_TEMPLATES_PATH = path.join(DATA_DIR, 'workout-templates.json');

function validate() {
  console.log('--- Training Data Validation ---');
  let hasErrors = false;

  // 1. Load files
  let exercises, templates;
  try {
    exercises = JSON.parse(fs.readFileSync(EXERCISE_LIBRARY_PATH, 'utf8'));
    console.log('✅ exercise-library.json loaded and valid JSON');
  } catch (e) {
    console.error('❌ Failed to load or parse exercise-library.json:', e.message);
    process.exit(1);
  }

  try {
    templates = JSON.parse(fs.readFileSync(WORKOUT_TEMPLATES_PATH, 'utf8'));
    console.log('✅ workout-templates.json loaded and valid JSON');
  } catch (e) {
    console.error('❌ Failed to load or parse workout-templates.json:', e.message);
    process.exit(1);
  }

  const exerciseIds = new Set();
  const exerciseRequiredFields = [
    'id', 'name', 'primaryMuscles', 'secondaryMuscles', 'equipment',
    'movementPattern', 'difficulty', 'category', 'defaultSets',
    'defaultRepRange', 'setupNotes', 'coachingCues', 'commonMistakes', 'substitutions'
  ];

  // 2. Validate Exercises
  exercises.forEach((ex, index) => {
    const label = ex.id || `index ${index}`;
    exerciseRequiredFields.forEach(field => {
      if (ex[field] === undefined || ex[field] === null) {
        console.error(`❌ Exercise [${label}]: Missing required field "${field}"`);
        hasErrors = true;
      }
    });

    if (ex.id) {
      if (exerciseIds.has(ex.id)) {
        console.error(`❌ Exercise [${label}]: Duplicate ID detected`);
        hasErrors = true;
      }
      exerciseIds.add(ex.id);
    }
  });

  // Check substitution IDs
  exercises.forEach(ex => {
    if (ex.substitutions) {
      ex.substitutions.forEach(subId => {
        if (!exerciseIds.has(subId)) {
          console.error(`❌ Exercise [${ex.id}]: Substitution ID "${subId}" does not exist in library`);
          hasErrors = true;
        }
      });
    }
  });

  console.log(`✅ Validated ${exercises.length} exercises`);

  const templateRequiredFields = [
    'id', 'name', 'goal', 'experienceLevel', 'estimatedDurationMinutes',
    'recommendedDaysPerWeek', 'exercises'
  ];
  const templateExerciseFields = [
    'exerciseId', 'sets', 'targetReps', 'restSeconds', 'intensityNote', 'optionalAlternativeExerciseIds'
  ];
  const templateIds = new Set();

  // 3. Validate Templates
  templates.forEach((temp, index) => {
    const label = temp.id || `index ${index}`;
    templateRequiredFields.forEach(field => {
      if (temp[field] === undefined || temp[field] === null) {
        console.error(`❌ Template [${label}]: Missing required field "${field}"`);
        hasErrors = true;
      }
    });

    if (temp.id) {
      if (templateIds.has(temp.id)) {
        console.error(`❌ Template [${label}]: Duplicate ID detected`);
        hasErrors = true;
      }
      templateIds.add(temp.id);
    }

    if (temp.exercises && Array.isArray(temp.exercises)) {
      temp.exercises.forEach((ex, exIndex) => {
        templateExerciseFields.forEach(field => {
          if (ex[field] === undefined || ex[field] === null) {
            console.error(`❌ Template [${label}], Exercise index ${exIndex}: Missing field "${field}"`);
            hasErrors = true;
          }
        });

        if (ex.exerciseId && !exerciseIds.has(ex.exerciseId)) {
          console.error(`❌ Template [${label}], Exercise index ${exIndex}: exerciseId "${ex.exerciseId}" not found in library`);
          hasErrors = true;
        }

        if (ex.optionalAlternativeExerciseIds) {
          ex.optionalAlternativeExerciseIds.forEach(altId => {
            if (!exerciseIds.has(altId)) {
              console.error(`❌ Template [${label}], Exercise index ${exIndex}: alternative ID "${altId}" not found in library`);
              hasErrors = true;
            }
          });
        }
      });
    }
  });

  console.log(`✅ Validated ${templates.length} templates`);

  if (hasErrors) {
    console.log('--- Validation FAILED ---');
    process.exit(1);
  } else {
    console.log('--- Validation PASSED ---');
    process.exit(0);
  }
}

validate();
