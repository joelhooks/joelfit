import type { NewExercise } from './schema'

export const initialExercises: NewExercise[] = [
  {
    title: "Crossbody Stretch",
    sets: {
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
    category: "mobility",
    targetArea: ["shoulder_posterior"],
    equipment: []
  },
  {
    title: "External Rotation Stretch (with Stick)",
    sets: {
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
    title: "Dumbbell Front Raise (Eccentric)",
    sets: {
      count: 3,
      reps: 8,
      hold: 6
    },
    frequency: {
      times: 3,
      period: 'week'
    },
    execution: [
      "Light dumbbells in hands, palms facing up",
      "Slight bend in elbows (not locked)",
      "Raise arms to shoulder height at moderate pace",
      "Lower very slowly (6-second count)",
      "Like slowly pouring water from a pitcher"
    ],
    category: "strength",
    targetArea: ["shoulder_anterior"],
    equipment: ["dumbbells"]
  },
  {
    title: "Movie Stars (Rotator Cuff)",
    sets: {
      count: 3,
      reps: 8,
      hold: 3
    },
    frequency: {
      times: 3,
      period: 'week'
    },
    execution: [
      "Sit on bench, affected arm's elbow on same-side knee",
      "Hold light dumbbell in affected hand",
      "Start with forearm pointing outward (L shape)",
      "Slowly rotate arm inward toward floor",
      "Hold 3 seconds at bottom position",
      "Keep elbow firmly planted throughout"
    ],
    category: "strength",
    targetArea: ["rotator_cuff"],
    equipment: ["dumbbells"]
  },
  {
    title: "Lateral Raises with Holds",
    sets: {
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