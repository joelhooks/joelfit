export interface Metrics {
  weight: number
  bodyFat: number
  muscleMass: number
  boneMass: number
  hydration: number
  protein: number
  metabolicAge: number
  visceralFat: number
}

export interface Targets {
  weight: {
    min: number
    max: number
  }
  bodyFat: {
    min: number
    max: number
  }
  muscleMass: {
    min: number
    max: number
  }
  boneMass: {
    min: number
    max: number
  }
  hydration: {
    min: number
    max: number
  }
  protein: {
    min: number
    max: number
  }
  metabolicAge: {
    min: number
    max: number
  }
  visceralFat: {
    min: number
    max: number
  }
} 