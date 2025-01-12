import { Metadata } from 'next'
import { ExerciseRepository } from '@/lib/repositories/exercise/repository'
import { Exercise } from './exercise'
import { Section } from './section'
import { PageHeader } from '@/components/page-header'
import type { Exercise as ExerciseType } from '@/lib/repositories/exercise/schema'

export const metadata: Metadata = {
  title: 'Shoulder Program | JoelFit',
  description: 'My shoulder rehab routine',
}

async function getExercises() {
  const repo = new ExerciseRepository()
  const exercises = await repo.findAll()
  return exercises
}

export default async function ShoulderRehabProgram() {
  const exercises = await getExercises()
  
  const warmUpExercises = exercises.filter((e: ExerciseType) => 
    (e.category === 'warmup' || e.category === 'mobility')
  )
  
  const strengthExercises = exercises.filter((e: ExerciseType) => 
    e.category === 'strength'
  )

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
              {warmUpExercises.map((exercise: ExerciseType) => (
                <Exercise 
                  key={exercise.id} 
                  {...exercise} 
                />
              ))}
            </div>
          </Section>

          <Section title="Strength">
            <div className="space-y-4">
              {strengthExercises.map((exercise: ExerciseType) => (
                <Exercise 
                  key={exercise.id} 
                  {...exercise} 
                />
              ))}
            </div>
          </Section>
        </div>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed italic">
          Note: Do this shit under supervision until you&apos;re confident. Adjust as needed.
        </p>
      </div>
    </main>
  )
} 