export interface Team {
  id: string
  name: string
  username: string
  password: string
  category: string // Ahora usar string para IDs de categoría
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

export interface TeamsDatabase {
  teams: Team[]
  metadata: {
    lastTeamId: number
    totalTeams: number
    lastUpdated: string
  }
}

export interface CreateTeamRequest {
  name: string
  category: string
  tournaments: string[] // IDs de torneos asociados
}

export interface CreateTeamResponse {
  success: boolean
  team?: Team
  error?: string
}
