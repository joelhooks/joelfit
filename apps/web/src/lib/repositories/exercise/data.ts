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
  // Before Bed — nerve glides & mobilizations for arms falling asleep
  {
    title: "Neck Scalene Massage",
    sets: {
      type: 'standard',
      count: 1,
      reps: 1,
      hold: 60
    },
    frequency: {
      times: 1,
      period: 'day'
    },
    execution: [
      "Tilt head away from the side you're working",
      "Find the scalene muscles along the side of your neck",
      "Use fingertips to apply gentle pressure and massage",
      "Work anterior, middle, and posterior scalenes",
      "Breathe deeply and don't press too hard"
    ],
    keyPoints: "Scalenes can compress the brachial plexus and cause arm numbness — keep pressure gentle",
    videoUrl: "https://www.youtube.com/watch?v=4X_vIYwxgRY",
    category: "before_bed",
    targetArea: ["neck"],
    equipment: []
  },
  {
    title: "First Rib Mobilization with Strap",
    sets: {
      type: 'standard',
      count: 2,
      reps: 10
    },
    frequency: {
      times: 1,
      period: 'day'
    },
    execution: [
      "Loop a strap or towel over the top of your shoulder near the neck",
      "Hold the strap with the opposite hand pulling downward",
      "Side-bend your head away from the strap",
      "The strap pushes the first rib down as you move",
      "Perform gentle repetitions — not forceful"
    ],
    keyPoints: "An elevated first rib can compress nerves and blood vessels causing arm tingling",
    videoUrl: "https://www.youtube.com/watch?v=mCe4Z4U16-M",
    category: "before_bed",
    targetArea: ["first_rib", "neck"],
    equipment: ["strap"]
  },
  {
    title: "Median Nerve Glide",
    sets: {
      type: 'standard',
      count: 2,
      reps: 15
    },
    frequency: {
      times: 1,
      period: 'day'
    },
    execution: [
      "Extend arm out to the side at shoulder height",
      "Extend wrist back (fingers pointing up)",
      "Gently tilt head away from the extended arm",
      "Return to neutral and repeat",
      "Smooth, controlled movements — no bouncing"
    ],
    keyPoints: "Sliding technique — gently glide the nerve, don't stretch it aggressively",
    videoUrl: "https://www.youtube.com/watch?v=UnkSHg0L4yM",
    category: "before_bed",
    targetArea: ["nerve"],
    equipment: []
  },
  {
    title: "Brachial Plexus Nerve Glide",
    sets: {
      type: 'standard',
      count: 2,
      reps: 15
    },
    frequency: {
      times: 1,
      period: 'day'
    },
    execution: [
      "Stand or sit with good posture",
      "Depress shoulder on the working side",
      "Extend arm out, slightly behind you",
      "Extend wrist and fingers",
      "Tilt head away from the working arm",
      "Return to start and repeat with control"
    ],
    keyPoints: "Targets the full brachial plexus (C5-T1) — stop if you get sharp pain or increased numbness",
    videoUrl: "https://www.youtube.com/watch?v=gSEDZDHS-mo",
    category: "before_bed",
    targetArea: ["nerve", "neck"],
    equipment: []
  },
  {
    title: "Brachial Plexus Glide (Alternate)",
    sets: {
      type: 'standard',
      count: 2,
      reps: 10
    },
    frequency: {
      times: 1,
      period: 'day'
    },
    execution: [
      "Start with arm relaxed at your side",
      "Slowly abduct arm to shoulder height",
      "Extend elbow, wrist, and fingers",
      "Tilt head away to increase the glide",
      "Return to neutral slowly",
      "Alternate sides"
    ],
    keyPoints: "Second variation — use whichever version your PT prefers for your presentation",
    videoUrl: "https://www.youtube.com/watch?v=kye0fac1IPg",
    category: "before_bed",
    targetArea: ["nerve"],
    equipment: []
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