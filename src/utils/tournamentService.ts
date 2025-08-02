import type {
  Tournament,
  TournamentStatus,
  TournamentRegistration,
  TournamentsDatabase,
  CreateTournamentRequest,
  CreateTournamentResponse,
  TournamentRegistrationRequest,
  TournamentRegistrationResponse,
} from '@/types/TournamentType'

import tournamentsData from '@/data/tournaments.json'

class TournamentService {
  private database: TournamentsDatabase

  constructor() {
    this.database = tournamentsData as TournamentsDatabase
  }

  // Obtener todos los torneos (incluyendo inactivos para admin)
  getAllTournaments(includeInactive: boolean = false): Tournament[] {
    if (includeInactive) {
      return this.database.tournaments
    }
    return this.database.tournaments.filter((tournament) => tournament.isActive)
  }

  // Obtener torneos por categoría
  getTournamentsByCategory(category: string): Tournament[] {
    return this.database.tournaments.filter(
      (tournament) => tournament.isActive && tournament.categories.includes(category),
    )
  }

  // Obtener torneo por ID
  getTournamentById(id: string): Tournament | null {
    return this.database.tournaments.find((tournament) => tournament.id === id) || null
  }

  // Obtener torneos asociados a un equipo
  getTournamentsByTeam(teamId: string): Tournament[] {
    const registrations = this.database.registrations.filter(
      (reg) => reg.teamId === teamId && reg.isActive && reg.status === 'confirmed',
    )

    return registrations
      .map((reg) => this.getTournamentById(reg.tournamentId))
      .filter((tournament) => tournament !== null) as Tournament[]
  }

  // Crear un nuevo torneo
  createTournament(request: CreateTournamentRequest): CreateTournamentResponse {
    try {
      const newId = (this.database.metadata.lastTournamentId + 1).toString()

      const newTournament: Tournament = {
        id: newId,
        name: request.name,
        description: request.description,
        startDate: request.startDate,
        endDate: request.endDate,
        status: 'draft',
        categories: request.categories,
        maxTeams: request.maxTeams,
        currentTeams: 0,
        registrationDeadline: request.registrationDeadline || request.endDate,
        isActive: request.isActive ?? true,
        createdAt: new Date().toISOString(),
      }

      this.database.tournaments.push(newTournament)
      this.database.metadata.lastTournamentId++
      this.database.metadata.totalTournaments++

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Nuevo torneo creado:', newTournament)

      return {
        success: true,
        tournament: newTournament,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al crear el torneo',
      }
    }
  }

  // Registrar equipo en torneo
  registerTeamInTournament(request: TournamentRegistrationRequest): TournamentRegistrationResponse {
    try {
      // Verificar si ya está registrado
      const existingRegistration = this.database.registrations.find(
        (reg) =>
          reg.tournamentId === request.tournamentId &&
          reg.teamId === request.teamId &&
          reg.isActive,
      )

      if (existingRegistration) {
        return {
          success: false,
          error: 'El equipo ya está registrado en este torneo',
        }
      }

      const tournament = this.getTournamentById(request.tournamentId)
      if (!tournament) {
        return {
          success: false,
          error: 'Torneo no encontrado',
        }
      }

      if (tournament.maxTeams && tournament.currentTeams >= tournament.maxTeams) {
        return {
          success: false,
          error: 'El torneo ha alcanzado el máximo de equipos',
        }
      }

      const newId = (this.database.metadata.lastRegistrationId + 1).toString()

      const newRegistration: TournamentRegistration = {
        id: newId,
        tournamentId: request.tournamentId,
        teamId: request.teamId,
        registrationDate: new Date().toISOString(),
        status: 'confirmed',
        isActive: true,
      }

      this.database.registrations.push(newRegistration)

      // Actualizar contador de equipos en el torneo
      tournament.currentTeams++

      this.database.metadata.lastRegistrationId++
      this.database.metadata.totalRegistrations++

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Nuevo registro creado:', newRegistration)

      return {
        success: true,
        registration: newRegistration,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al registrar el equipo en el torneo',
      }
    }
  }

  // Desregistrar equipo de torneo
  unregisterTeamFromTournament(tournamentId: string, teamId: string): boolean {
    try {
      const registrationIndex = this.database.registrations.findIndex(
        (reg) => reg.tournamentId === tournamentId && reg.teamId === teamId && reg.isActive,
      )

      if (registrationIndex === -1) {
        return false
      }

      this.database.registrations[registrationIndex].isActive = false

      // Actualizar contador de equipos en el torneo
      const tournament = this.getTournamentById(tournamentId)
      if (tournament && tournament.currentTeams > 0) {
        tournament.currentTeams--
      }

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Registro eliminado para equipo:', teamId, 'de torneo:', tournamentId)

      return true
    } catch (error) {
      return false
    }
  }

  // Activar/Desactivar torneo
  toggleTournamentStatus(tournamentId: string): boolean {
    try {
      const tournament = this.database.tournaments.find((t) => t.id === tournamentId)
      if (!tournament) {
        return false
      }

      tournament.isActive = !tournament.isActive

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Estado del torneo actualizado:', tournament.id, tournament.isActive)

      return true
    } catch (error) {
      return false
    }
  }

  // Activar torneo
  activateTournament(tournamentId: string): boolean {
    try {
      const tournament = this.database.tournaments.find((t) => t.id === tournamentId)
      if (!tournament) {
        return false
      }

      tournament.isActive = true

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Torneo activado:', tournament.id)

      return true
    } catch (error) {
      return false
    }
  }

  // Desactivar torneo
  deactivateTournament(tournamentId: string): boolean {
    try {
      const tournament = this.database.tournaments.find((t) => t.id === tournamentId)
      if (!tournament) {
        return false
      }

      tournament.isActive = false

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Torneo desactivado:', tournament.id)

      return true
    } catch (error) {
      return false
    }
  }

  // Actualizar torneo
  updateTournament(
    tournamentId: string,
    updateData: CreateTournamentRequest,
  ): CreateTournamentResponse {
    try {
      const tournament = this.database.tournaments.find((t) => t.id === tournamentId)
      if (!tournament) {
        return {
          success: false,
          error: 'Torneo no encontrado',
        }
      }

      // Actualizar los datos del torneo
      tournament.name = updateData.name
      tournament.description = updateData.description
      tournament.startDate = updateData.startDate
      tournament.endDate = updateData.endDate
      tournament.categories = updateData.categories
      tournament.maxTeams = updateData.maxTeams
      tournament.isActive = updateData.isActive ?? tournament.isActive

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Torneo actualizado:', tournament)

      return {
        success: true,
        tournament,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al actualizar el torneo',
      }
    }
  }
}

const tournamentService = new TournamentService()
export default tournamentService
