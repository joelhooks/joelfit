import type { NewExercise } from './schema'

export const initialExercises: NewExercise[] = [
  {
    title: "Crossbody Stretch",
    sets: {
      type: 'standard',
      count: 3,
      reps: 1,
      hold: 60
    },
    frequency: {
      times: 1,
      period: 'day'
    },
    execution: [
      "Stand straight and bring one arm across chest",
      "Use opposite hand to gently pull arm closer",
      "Feel gentle stretch in back of shoulder",
      "Maintain steady breathing and relaxed shoulders"
    ],
    category: "warmup",
    targetArea: ["shoulder_posterior"],
    equipment: []
  },
  {
    title: "Ulnar Nerve Flossing",
    sets: {
      type: 'standard',
      count: 2,
      reps: 20
    },
    frequency: {
      times: 2,
      period: 'day'
    },
    execution: [
      "Start with arm by side",
      "Extend wrist and fingers",
      "Gently tilt head away from arm",
      "Return to start position",
      "Perform smooth, controlled movements"
    ],
    category: "mobility",
    targetArea: ["nerve"],
    equipment: []
  },
  {
    title: "Eccentric Focus Pull Ups",
    sets: {
      type: 'standard',
      count: 5,
      reps: 10
    },
    frequency: {
      times: 2,
      period: 'week'
    },
    execution: [
      "Start at top of pull-up position",
      "Lower body very slowly with control",
      "Focus on shoulder blade movement",
      "Maintain proper form throughout descent"
    ],
    category: "strength",
    targetArea: ["lats", "scapula"],
    equipment: ["pull_up_bar"]
  },
  {
    title: "Movie Stars",
    sets: {
      type: 'standard',
      count: 3,
      reps: 10,
      hold: 3
    },
    frequency: {
      times: 3,
      period: 'week'
    },
    execution: [
      "Start with arm at shoulder height",
      "Lower arm with control",
      "Hold for 3 seconds at bottom position",
      "Return to start position"
    ],
    category: "strength",
    targetArea: ["rotator_cuff"],
    equipment: ["dumbbells"]
  },
  {
    title: "Upright Row Holds",
    sets: {
      type: 'standard',
      count: 3,
      reps: 12,
      hold: 10
    },
    frequency: {
      times: 2,
      period: 'week'
    },
    execution: [
      "Stand with weights at thighs",
      "Pull elbows up to shoulder height",
      "Hold position for 5-10 seconds",
      "Lower with control"
    ],
    category: "strength",
    targetArea: ["traps", "shoulder_lateral"],
    equipment: ["dumbbells"]
  },
  {
    title: "90/90 KB up carries",
    sets: {
      type: 'distance',
      count: 3,
      distance: "20-40 ft"
    },
    frequency: {
      times: 2,
      period: 'week'
    },
    execution: [
      "Hold kettlebell at shoulder height",
      "Elbow at 90 degrees",
      "Walk specified distance",
      "Maintain stable shoulder position"
    ],
    category: "strength",
    targetArea: ["shoulder_stability"],
    equipment: ["kettlebell"]
  },
  {
    title: "Dumbbell Front Raise (Eccentric)",
    sets: {
      type: 'standard',
      count: 3,
      reps: 8,
      hold: 6
    },
    frequency: {
      times: 3,
      period: 'week'
    },
    execution: [
      "Light dumbbells, slight elbow bend",
      "Raise to shoulder height",
      "6-second lowering phase",
      "Control throughout movement"
    ],
    category: "strength",
    targetArea: ["shoulder_anterior"],
    equipment: ["dumbbells"]
  },
  {
    title: "Chicken Wings",
    sets: {
      type: 'standard',
      count: 3,
      reps: 10,
      hold: 10
    },
    frequency: {
      times: 2,
      period: 'week'
    },
    execution: [
      "Arms at sides, elbows bent",
      "Rotate shoulders externally",
      "Hold end position",
      "Return with control"
    ],
    category: "strength",
    targetArea: ["rotator_cuff"],
    equipment: []
  },
  {
    title: "Overhead Banded Quicks",
    sets: {
      type: 'duration',
      count: 3,
      duration: 30
    },
    frequency: {
      times: 2,
      period: 'week'
    },
    execution: [
      "Hold band overhead",
      "Perform small pulse movements",
      "Maintain tension throughout",
      "Focus on shoulder stability"
    ],
    category: "endurance",
    targetArea: ["shoulder_stability"],
    equipment: ["resistance_band"]
  },
  {
    title: "External Rotation Stretch (with Stick)",
    sets: {
      type: 'standard',
      count: 3,
      reps: 1,
      hold: 60
    },
    frequency: {
      times: 1,
      period: 'day'
    },
    execution: [
      "Stand straight with affected arm at side",
      "Bend elbow 90° (upper arm against body)",
      "Hold stick behind elbow with opposite hand",
      "Use stick to gently rotate affected arm outward",
      "Keep upper arm pinned to side throughout",
      "Like opening a gate while keeping the hinge still"
    ],
    category: "mobility",
    targetArea: ["rotator_cuff"],
    equipment: ["stick"]
  },
  {
    title: "90/90 External Rotation Walk Out",
    sets: {
      type: 'standard',
      count: 2,
      reps: 10,
      hold: 5
    },
    frequency: {
      times: 4,
      period: 'week'
    },
    execution: [
      "Stand sideways to anchor point at shoulder height",
      "Position upper arm parallel to floor (90° to body)",
      "Elbow bent 90° gripping band",
      "Slowly walk backward, maintaining angles",
      "Walk back in with control",
      "Think of carrying a tray without tilting"
    ],
    category: "warmup",
    targetArea: ["rotator_cuff"],
    equipment: ["resistance_band"]
  },
  {
    title: "Front Raise (Y) Banded",
    sets: {
      type: 'standard',
      count: 3,
      reps: 10
    },
    frequency: {
      times: 4,
      period: 'week'
    },
    execution: [
      "Stand on resistance band, feet shoulder-width",
      "Hold band handles, arms at sides",
      "Raise arms up and slightly out (Y shape)",
      "Arms about 45° from body",
      "Stop just before pain point"
    ],
    keyPoints: "Go to point just before pain sets in, hold, slowly lower",
    category: "strength",
    targetArea: ["shoulder_anterior"],
    equipment: ["resistance_band"]
  },
  {
    title: "Lateral Raises with Holds",
    sets: {
      type: 'standard',
      count: 3,
      reps: 8,
      hold: 3
    },
    frequency: {
      times: 3,
      period: 'week'
    },
    execution: [
      "Light dumbbells at sides",
      "Raise arms out to sides to shoulder height",
      "Keep slight bend in elbows",
      "Hold for 3 seconds at top",
      "Lower with control"
    ],
    category: "strength",
    targetArea: ["shoulder_lateral"],
    equipment: ["dumbbells"]
  },
  {
    title: "Lat Pull Downs",
    sets: {
      type: 'standard',
      count: 3,
      reps: 10
    },
    frequency: {
      times: 2,
      period: 'week'
    },
    execution: [
      "Seated at cable machine or with band overhead",
      "Grasp bar/band wider than shoulder width",
      "Pull down to upper chest",
      "Squeeze shoulder blades together",
      "Control through full range of motion"
    ],
    category: "strength",
    targetArea: ["scapula", "traps"],
    equipment: ["cable_machine", "resistance_band"]
  }
] 