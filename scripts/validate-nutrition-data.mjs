import fs from 'fs';
import path from 'path';

const DATA_DIR = 'data';
const FOOD_LIBRARY_PATH = path.join(DATA_DIR, 'food-library.json');
const MEAL_TEMPLATES_PATH = path.join(DATA_DIR, 'meal-templates.json');

function validate() {
  console.log('--- Nutrition Data Validation ---');
  let hasErrors = false;

  // 1. Load files
  let foods, templates;
  try {
    foods = JSON.parse(fs.readFileSync(FOOD_LIBRARY_PATH, 'utf8'));
    console.log('✅ food-library.json loaded and valid JSON');
  } catch (e) {
    console.error('❌ Failed to load or parse food-library.json:', e.message);
    process.exit(1);
  }

  try {
    templates = JSON.parse(fs.readFileSync(MEAL_TEMPLATES_PATH, 'utf8'));
    console.log('✅ meal-templates.json loaded and valid JSON');
  } catch (e) {
    console.error('❌ Failed to load or parse meal-templates.json:', e.message);
    process.exit(1);
  }

  if (!Array.isArray(foods)) {
    console.error('❌ food-library.json root must be an array');
    process.exit(1);
  }
  if (!Array.isArray(templates)) {
    console.error('❌ meal-templates.json root must be an array');
    process.exit(1);
  }

  const foodIds = new Set();
  const foodRequiredFields = [
    'id', 'name', 'category', 'servingLabel', 'servingSize',
    'calories', 'protein', 'carbs', 'fat', 'fiber', 'tags', 'notes'
  ];
  const foodNumericFields = ['servingSize', 'calories', 'protein', 'carbs', 'fat', 'fiber'];

  // 2. Validate Foods
  foods.forEach((food, index) => {
    const label = food.id || `index ${index}`;
    foodRequiredFields.forEach(field => {
      if (food[field] === undefined || food[field] === null) {
        console.error(`❌ Food [${label}]: Missing required field "${field}"`);
        hasErrors = true;
      }
    });

    foodNumericFields.forEach(field => {
      if (food[field] !== undefined && typeof food[field] !== 'number') {
        console.error(`❌ Food [${label}]: Field "${field}" must be a number`);
        hasErrors = true;
      }
    });

    if (food.tags && !Array.isArray(food.tags)) {
      console.error(`❌ Food [${label}]: Field "tags" must be an array`);
      hasErrors = true;
    }

    if (food.id) {
      if (foodIds.has(food.id)) {
        console.error(`❌ Food [${label}]: Duplicate ID detected`);
        hasErrors = true;
      }
      foodIds.add(food.id);
    }
  });

  console.log(`✅ Validated ${foods.length} foods`);

  const templateRequiredFields = [
    'id', 'name', 'mealType', 'goal', 'foodIds',
    'estimatedCalories', 'estimatedProtein', 'estimatedCarbs', 'estimatedFat', 'notes'
  ];
  const templateNumericFields = ['estimatedCalories', 'estimatedProtein', 'estimatedCarbs', 'estimatedFat'];
  const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'pre-workout', 'post-workout'];
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

    templateNumericFields.forEach(field => {
      if (temp[field] !== undefined && typeof temp[field] !== 'number') {
        console.error(`❌ Template [${label}]: Field "${field}" must be a number`);
        hasErrors = true;
      }
    });

    if (temp.mealType && !validMealTypes.includes(temp.mealType)) {
      console.error(`❌ Template [${label}]: Invalid mealType "${temp.mealType}"`);
      hasErrors = true;
    }

    if (temp.foodIds && !Array.isArray(temp.foodIds)) {
      console.error(`❌ Template [${label}]: Field "foodIds" must be an array`);
      hasErrors = true;
    } else if (temp.foodIds) {
      temp.foodIds.forEach(foodId => {
        if (!foodIds.has(foodId)) {
          console.error(`❌ Template [${label}]: foodId "${foodId}" not found in food library`);
          hasErrors = true;
        }
      });
    }

    if (temp.id) {
      if (templateIds.has(temp.id)) {
        console.error(`❌ Template [${label}]: Duplicate ID detected`);
        hasErrors = true;
      }
      templateIds.add(temp.id);
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
