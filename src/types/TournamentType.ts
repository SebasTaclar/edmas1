export interface Tournament {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: TournamentStatus
  categories: string[] // IDs de categorías permitidas
  maxTeams?: number
  currentTeams: number
  registrationDeadline: string
  isActive: boolean
  createdAt: string
}

export type TournamentStatus =
  | 'draft'
  | 'registration_open'
  | 'registration_closed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export interface TournamentRegistration {
  id: string
  tournamentId: string
  teamId: string
  registrationDate: string
  status: RegistrationStatus
  isActive: boolean
}

export type RegistrationStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled'

export interface TournamentsDatabase {
  tournaments: Tournament[]
  registrations: TournamentRegistration[]
  metadata: {
    lastTournamentId: number
    lastRegistrationId: number
    totalTournaments: number
    totalRegistrations: number
    lastUpdated: string
  }
}

export interface CreateTournamentRequest {
  name: string
  description: string
  startDate: string
  endDate: string
  categories: string[]
  maxTeams?: number
  registrationDeadline?: string
  isActive?: boolean
}

export interface CreateTournamentResponse {
  success: boolean
  tournament?: Tournament
  error?: string
}

export interface TournamentRegistrationRequest {
  tournamentId: string
  teamId: string
}

export interface TournamentRegistrationResponse {
  success: boolean
  registration?: TournamentRegistration
  error?: string
}
