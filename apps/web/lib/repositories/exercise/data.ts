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
    targetArea: ["shoulder"],
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
    targetArea: ["shoulder", "rotator_cuff"],
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
    targetArea: ["shoulder", "rotator_cuff"],
    equipment: ["resistance_band"]
  }
] 