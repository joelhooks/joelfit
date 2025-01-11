export * from './schema'
export * from './repository'

// Create a singleton instance
import { ProfileRepository } from './repository'
export const profileRepo = new ProfileRepository() 