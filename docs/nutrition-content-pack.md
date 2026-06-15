# Nutrition Content Pack

This document describes the starter nutrition content pack for FitCore, including the structure of food data and meal templates, and how to maintain them.

## Overview

The nutrition content pack consists of two main data files:
- `data/food-library.json`: A library of individual food items with their nutritional information.
- `data/meal-templates.json`: A collection of pre-defined meals that reference items from the food library.

These files provide the data layer for future nutrition-related features in the FitCore application.

## Data Schema

### Food Items (`data/food-library.json`)

Each food item in the library follows this schema:

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique kebab-case identifier (e.g., `chicken-breast-grilled`). |
| `name` | String | Display name of the food. |
| `category` | String | Category (e.g., `lean proteins`, `carbs`, `fruits`). |
| `servingLabel` | String | User-friendly serving description (e.g., `100g`, `1 cup`). |
| `servingSize` | Number | Numeric weight or volume in grams/ml. |
| `calories` | Number | Calories per serving. |
| `protein` | Number | Protein in grams per serving. |
| `carbs` | Number | Carbohydrates in grams per serving. |
| `fat` | Number | Fat in grams per serving. |
| `fiber` | Number | Fiber in grams per serving. |
| `tags` | Array<String> | Keywords for searching and categorization. |
| `notes` | String | Brief nutritional or usage notes. |

### Meal Templates (`data/meal-templates.json`)

Each meal template follows this schema:

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique kebab-case identifier. |
| `name` | String | Display name of the meal. |
| `mealType` | String | One of: `breakfast`, `lunch`, `dinner`, `snack`, `pre-workout`, `post-workout`. |
| `goal` | String | The purpose of the meal (e.g., `cutting`, `lean bulk`, `performance`). |
| `foodIds` | Array<String> | List of food item IDs from `food-library.json`. |
| `estimatedCalories` | Number | Total estimated calories for the meal. |
| `estimatedProtein` | Number | Total estimated protein for the meal. |
| `estimatedCarbs` | Number | Total estimated carbohydrates for the meal. |
| `estimatedFat` | Number | Total estimated fat for the meal. |
| `notes` | String | Guidance on preparation or timing. |

## Validation

To ensure data integrity, a validation script is provided. It checks for JSON syntax, required fields, correct data types, duplicate IDs, and ensures all `foodIds` in templates exist in the food library.

Run validation using:

```bash
node scripts/validate-nutrition-data.mjs
```

## Guidelines for Adding Content

### Adding Foods
1. Choose a unique, descriptive ID in `lowercase-kebab-case`.
2. Use realistic nutritional values based on standard databases.
3. Ensure all required fields are present.
4. Run the validation script after adding.

### Adding Meal Templates
1. Reference existing IDs from `food-library.json`.
2. Ensure the `mealType` is one of the allowed values.
3. Calculate macro estimates based on the included food items.
4. Run the validation script after adding.

### ID Stability
**Never change an existing ID** once it has been committed. These IDs will be used to track user data (like meal history) and changing them will break existing user records.

## Developer Note
This is a data-only content pack. **Do not modify runtime application code** (like `src/app.js`) when updating these data files in a data-focused PR.
