# FitCore Training Content Pack

This pack contains the foundational data for FitCore's training features, including a comprehensive exercise library and starter workout templates.

## Files Added

1.  `data/exercise-library.json`: A catalog of 100+ exercises with detailed coaching cues and metadata.
2.  `data/workout-templates.json`: 10 pre-configured workout routines for various goals and experience levels.
3.  `scripts/validate-training-data.mjs`: A utility to ensure data integrity and referential correctness.

## Exercise Library

The library contains 103 exercises covering:
- **Chest**: Presses, flies, bodyweight options.
- **Back**: Rows, pulldowns, deadlifts.
- **Shoulders**: Overhead presses, raises, rear delt work.
- **Arms**: Bicep curls, tricep extensions, close-grip work.
- **Legs**: Squats, lunges, hinges, isolation exercises for quads, hamstrings, glutes, and calves.
- **Core**: Stability, rotation, and isolation movements.
- **Cardio/Conditioning**: Machine-based and bodyweight high-intensity options.

Each exercise includes **primary and secondary muscles**, **required equipment**, **difficulty ratings**, and **coaching cues**.

## Workout Templates

10 templates are provided to help users get started immediately:
- **Push / Pull / Legs**: The classic 3-way split.
- **Upper / Lower**: Efficient 2-way split.
- **Full Body**: For general fitness or limited time.
- **Beginner 3-Day**: Focused on mastering the basics.
- **Strength Focus 4-Day**: Lower volume, higher intensity on compound lifts.
- **Hypertrophy 5-Day**: Higher volume for maximum growth.
- **Deload Week**: Active recovery to prevent burnout.

## Future Usage

### App Integration
The application can consume these JSON files to:
- Populate an exercise selection dropdown.
- Provide "Substitute Exercise" suggestions based on the `substitutions` field.
- Allow users to import templates into their active workout.
- Display setup notes and coaching cues during a workout.

### AI Assistant
The AI assistant can use this data to:
- Suggest specific exercises based on a user's available equipment.
- Modify a workout plan if a user is find a movement too difficult (using `difficulty` and `substitutions`).
- Explain how to perform an exercise by retrieving the `coachingCues`.
- Generate custom routines by selecting exercises from relevant `movementPattern` or `category` groups.

## Maintenance & Safety

### Adding New Content
To add an exercise:
1.  Open `data/exercise-library.json`.
2.  Add a new object following the existing schema.
3.  Ensure the `id` is unique (kebab-case recommended).
4.  Optionally add its ID to relevant `substitutions` in other exercises.

To add a template:
1.  Open `data/workout-templates.json`.
2.  Ensure all `exerciseId`s used exist in the exercise library.

### Running Validation
Always run the validation script after making changes to the data:
```bash
node scripts/validate-training-data.mjs
```
The script checks for:
- Valid JSON syntax.
- Presence of all required fields.
- Duplicate IDs.
- Broken links between templates and exercises.
- Valid substitution and alternative exercise IDs.
