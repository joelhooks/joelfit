import { type PersonalStats, type Metrics, type Targets, type StrengthArea } from '../types/metrics'

export const personalStats: PersonalStats = {
  name: 'Joel Hooks',
  age: 50,
  height: '6\'3" (75 inches)',
  weight: '251 lbs',
  activity: 'Moderately Active',
  exercise: '4-6 sessions per week',
  experience: {
    lifting: 'Advanced',
    cardio: 'Intermediate'
  }
}

export const currentMetrics: Metrics = {
  androidFat: 34.0,
  gynoidFat: 22.5,
  agRatio: 1.50,
  visceralFat: 3.08,
  totalBodyFat: 24.0,
  rsmi: 11.16
}

export const targets: Targets = {
  androidFat: 24.0,
  agRatio: 1.0,
  visceralFat: 2.0
}

export const strengthAreas: StrengthArea[] = [
  {
    title: "Muscle Mass",
    metric: "RSMI 11.16",
    details: "53% above minimum threshold, excellent foundation for metabolic health"
  },
  {
    title: "Bone Density",
    metric: "Z-score 2.9",
    details: "97-99th percentile, indicates strong resistance training history"
  },
  {
    title: "Muscle Balance",
    metric: "< 0.5% difference",
    details: "Nearly perfect symmetry between left/right sides"
  }
] 