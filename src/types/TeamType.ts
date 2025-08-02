export interface Team {
  id: string
  name: string
  username: string
  password: string
  category: TeamCategory
  tournaments: string[] // IDs de torneos asociados
  createdAt: string
  isActive: boolean
  stats: TeamStats
}

export interface TeamStats {
  wins: number
  losses: number
  draws: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export interface Category {
  id: TeamCategory
  name: string
  description: string
}

export type TeamCategory = 'adultos_masculino' | 'adultos_femenino' | 'infantil'

export interface TeamsDatabase {
  teams: Team[]
  categories: Category[]
  metadata: {
    lastTeamId: number
    totalTeams: number
    lastUpdated: string
  }
}

export interface CreateTeamRequest {
  name: string
  category: TeamCategory
  tournaments: string[] // IDs de torneos asociados
}

export interface CreateTeamResponse {
  success: boolean
  team?: Team
  error?: string
}
