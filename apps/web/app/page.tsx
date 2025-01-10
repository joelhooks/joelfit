'use client'
import React, { useState } from 'react';
import { Clock, ChevronDown, AlertCircle, Activity } from 'lucide-react';

// First, let's define our types at the top
type ExerciseStep = string;

interface ExerciseProps {
  title: string;
  sets: string;
  frequency: string;
  execution: ExerciseStep[];
  keyPoints?: string;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Exercise = ({ title, sets, frequency, execution, keyPoints }: ExerciseProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="border rounded-lg p-4 mb-4 bg-card text-card-foreground shadow-sm">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <ChevronDown 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isOpen && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">{sets}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">{frequency}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Execution:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {execution.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground">{step}</li>
              ))}
            </ul>
            {keyPoints && (
              <div className="mt-3 text-sm text-primary font-medium">
                Key point: {keyPoints}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="mb-6">
      <div 
        className="flex items-center cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <ChevronDown 
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && children}
    </div>
  );
};

const ShoulderRehabProgram = () => {
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
  ];

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
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shoulder Rehabilitation Program</h1>
      
      <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-6 rounded-sm">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-destructive mr-2" />
          <p className="text-sm text-destructive">
            Keep pain below 3/10. Stop if you feel sharp pain. If pain increases after 24 hours, take a rest day.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-2">Form Tips for All Exercises:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Keep movements smooth and controlled</li>
          <li>Breathe steadily throughout</li>
          <li>Focus on squeezing shoulder blades together</li>
          <li>Keep shoulders down, away from ears</li>
          <li>Maintain good posture throughout</li>
          <li>Quality of movement over quantity</li>
        </ul>
      </div>

      <Section title="Warm-Up Exercises">
        <div className="space-y-4">
          {warmUpExercises.map((exercise, index) => (
            <Exercise key={index} {...exercise} />
          ))}
        </div>
      </Section>

      <Section title="Strength Exercises">
        <div className="space-y-4">
          {strengthExercises.map((exercise, index) => (
            <Exercise key={index} {...exercise} />
          ))}
        </div>
      </Section>

      <p className="mt-8 text-sm text-muted-foreground italic">
        Remember: This program should be performed under appropriate medical supervision 
        and modified based on individual needs and responses.
      </p>
    </div>
  );
};

export default ShoulderRehabProgram;