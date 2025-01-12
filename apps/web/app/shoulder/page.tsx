import { Metadata } from 'next'
import { AlertCircle } from 'lucide-react'
import { Exercise, type ExerciseProps } from './exercise'
import { Section } from './section'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Shoulder Program | JoelFit',
  description: 'My shoulder rehab routine',
}

export default function ShoulderRehabProgram() {
  const warmUpExercises: ExerciseProps[] = [
    {
      title: "Crossbody Stretch",
      sets: "3 × 60 seconds",
      frequency: "Daily",
      execution: [
        "Stand straight and bring one arm across chest",
        "Use opposite hand to gently pull arm closer",
        "Feel gentle stretch in back of shoulder",
        "Maintain steady breathing and relaxed shoulders"
      ]
    },
    {
      title: "External Rotation Stretch (with Stick)",
      sets: "2-3 × 60 seconds",
      frequency: "Daily",
      execution: [
        "Stand straight with affected arm at side",
        "Bend elbow 90° (upper arm against body)",
        "Hold stick behind elbow with opposite hand",
        "Use stick to gently rotate affected arm outward",
        "Keep upper arm pinned to side throughout",
        "Like opening a gate while keeping the hinge still"
      ]
    },
    {
      title: "90/90 External Rotation Walk Out",
      sets: "2 × 10 reps (5 sec each)",
      frequency: "3-4×/week",
      execution: [
        "Stand sideways to anchor point at shoulder height",
        "Position upper arm parallel to floor (90° to body)",
        "Elbow bent 90° gripping band",
        "Slowly walk backward, maintaining angles",
        "Walk back in with control",
        "Think of carrying a tray without tilting"
      ]
    }
  ]

  const strengthExercises: ExerciseProps[] = [
    {
      title: "Front Raise (Y) Banded",
      sets: "2-3 × 8-10 reps",
      frequency: "3-4×/week",
      execution: [
        "Stand on resistance band, feet shoulder-width",
        "Hold band handles, arms at sides",
        "Raise arms up and slightly out (Y shape)",
        "Arms about 45° from body",
        "Stop just before pain point"
      ],
      keyPoints: "Go to point just before pain sets in, hold, slowly lower"
    },
    {
      title: "Dumbbell Front Raise (Eccentric)",
      sets: "3 × 6-8 reps (6-sec lowering)",
      frequency: "3×/week",
      execution: [
        "Light dumbbells in hands, palms facing up",
        "Slight bend in elbows (not locked)",
        "Raise arms to shoulder height at moderate pace",
        "Lower very slowly (6-second count)",
        "Like slowly pouring water from a pitcher"
      ]
    },
    {
      title: "Movie Stars (Rotator Cuff)",
      sets: "3 × 6-10 reps (3-sec hold)",
      frequency: "3×/week",
      execution: [
        "Sit on bench, affected arm's elbow on same-side knee",
        "Hold light dumbbell in affected hand",
        "Start with forearm pointing outward (L shape)",
        "Slowly rotate arm inward toward floor",
        "Hold 3 seconds at bottom position",
        "Keep elbow firmly planted throughout"
      ]
    },
    {
      title: "Lateral Raises with Holds",
      sets: "3 × 6-8 reps (3-sec hold)",
      frequency: "3×/week",
      execution: [
        "Light dumbbells at sides",
        "Raise arms out to sides to shoulder height",
        "Keep slight bend in elbows",
        "Hold for 3 seconds at top",
        "Lower with control"
      ]
    },
    {
      title: "Lat Pull Downs",
      sets: "3 × 8-12 reps (3-3-3 tempo)",
      frequency: "2×/week",
      execution: [
        "Seated at cable machine or with band overhead",
        "Grasp bar/band wider than shoulder width",
        "Pull down to upper chest",
        "Squeeze shoulder blades together",
        "Control through full range of motion"
      ]
    }
  ]

  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Shoulder Program"
          description="Progressive rehab routine focusing on mobility, stability, and strength."
          breadcrumbs={[
            { title: "Shoulder", href: "/shoulder" }
          ]}
        />

        <div className="bg-card border border-border rounded-lg p-4 mb-8">
          <h3 className="text-lg font-medium tracking-tight mb-3">Form Tips:</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
            <li>Smooth and controlled movements</li>
            <li>Steady breathing</li>
            <li>Squeeze shoulder blades</li>
            <li>Shoulders down</li>
            <li>Good posture</li>
            <li>Quality {'>'} quantity</li>
          </ul>
        </div>

        <div className="space-y-8">
          <Section title="Warm-Up">
            <div className="space-y-4">
              {warmUpExercises.map((exercise, index) => (
                <Exercise key={index} {...exercise} />
              ))}
            </div>
          </Section>

          <Section title="Strength">
            <div className="space-y-4">
              {strengthExercises.map((exercise, index) => (
                <Exercise key={index} {...exercise} />
              ))}
            </div>
          </Section>
        </div>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed italic">
          Note: Do this shit under supervision until you're confident. Adjust as needed.
        </p>
      </div>
    </main>
  )
} 