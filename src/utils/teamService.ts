import type {
  Team,
  TeamCategory,
  CreateTeamRequest,
  CreateTeamResponse,
  TeamsDatabase,
} from '@/types/TeamType'
import teamsData from '@/data/teams.json'

class TeamService {
  private teams: TeamsDatabase = teamsData as TeamsDatabase

  /**
   * Obtiene todos los equipos
   */
  getAllTeams(): Team[] {
    return this.teams.teams
  }

  /**
   * Obtiene equipos por categoría
   */
  getTeamsByCategory(category: TeamCategory): Team[] {
    return this.teams.teams.filter((team) => team.category === category)
  }

  /**
   * Obtiene todas las categorías disponibles
   */
  getCategories() {
    return this.teams.categories
  }

  /**
   * Genera un nombre de usuario basado en el nombre del equipo
   */
  private generateUsername(teamName: string): string {
    return teamName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20)
  }

  /**
   * Genera una contraseña por defecto
   */
  private generatePassword(username: string): string {
    const year = new Date().getFullYear()
    return `${username}${year}`
  }

  /**
   * Genera un nuevo ID para el equipo
   */
  private generateTeamId(): string {
    const nextId = this.teams.metadata.lastTeamId + 1
    return `team_${nextId.toString().padStart(3, '0')}`
  }

  /**
   * Verifica si el nombre de usuario ya existe
   */
  private isUsernameExists(username: string): boolean {
    return this.teams.teams.some((team) => team.username === username)
  }

  /**
   * Verifica si el nombre del equipo ya existe
   */
  private isTeamNameExists(name: string): boolean {
    return this.teams.teams.some((team) => team.name.toLowerCase() === name.toLowerCase())
  }

  /**
   * Crea un nuevo equipo
   */
  createTeam(request: CreateTeamRequest): CreateTeamResponse {
    try {
      // Validaciones
      if (!request.name || request.name.trim().length < 2) {
        return {
          success: false,
          error: 'El nombre del equipo debe tener al menos 2 caracteres',
        }
      }

      if (!request.category) {
        return {
          success: false,
          error: 'Debe seleccionar una categoría',
        }
      }

      // Verificar si el nombre ya existe
      if (this.isTeamNameExists(request.name)) {
        return {
          success: false,
          error: 'Ya existe un equipo con ese nombre',
        }
      }

      // Generar datos del equipo
      const username = this.generateUsername(request.name)
      let finalUsername = username

      // Si el username ya existe, agregar un número
      let counter = 1
      while (this.isUsernameExists(finalUsername)) {
        finalUsername = `${username}${counter}`
        counter++
      }

      const password = this.generatePassword(finalUsername)
      const teamId = this.generateTeamId()

      // Crear el nuevo equipo
      const newTeam: Team = {
        id: teamId,
        name: request.name.trim(),
        username: finalUsername,
        password: password,
        category: request.category,
        tournaments: request.tournaments || [], // Asociar torneos seleccionados
        createdAt: new Date().toISOString(),
        isActive: true,
        stats: {
          wins: 0,
          losses: 0,
          draws: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        },
      }

      // Agregar el equipo a la lista
      this.teams.teams.push(newTeam)

      // Actualizar metadata
      this.teams.metadata.lastTeamId += 1
      this.teams.metadata.totalTeams += 1
      this.teams.metadata.lastUpdated = new Date().toISOString()

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Nuevo equipo creado:', newTeam)
      console.log('Base de datos actualizada:', this.teams)

      return {
        success: true,
        team: newTeam,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error interno del sistema',
      }
    }
  }

  /**
   * Obtiene un equipo por ID
   */
  getTeamById(id: string): Team | null {
    return this.teams.teams.find((team) => team.id === id) || null
  }

  /**
   * Obtiene un equipo por username
   */
  getTeamByUsername(username: string): Team | null {
    return this.teams.teams.find((team) => team.username === username) || null
  }

  /**
   * Verifica las credenciales de login de un equipo
   */
  validateTeamLogin(username: string, password: string): Team | null {
    const team = this.getTeamByUsername(username)
    if (team && team.password === password && team.isActive) {
      return team
    }
    return null
  }

  /**
   * Desactiva un equipo
   */
  deactivateTeam(id: string): boolean {
    const team = this.getTeamById(id)
    if (team) {
      team.isActive = false
      this.teams.metadata.lastUpdated = new Date().toISOString()
      return true
    }
    return false
  }

  /**
   * Activa un equipo
   */
  activateTeam(id: string): boolean {
    const team = this.getTeamById(id)
    if (team) {
      team.isActive = true
      this.teams.metadata.lastUpdated = new Date().toISOString()
      return true
    }
    return false
  }

  /**
   * Actualiza los torneos asociados a un equipo
   */
  updateTeamTournaments(teamId: string, tournaments: string[]): boolean {
    const team = this.getTeamById(teamId)
    if (team) {
      team.tournaments = tournaments
      this.teams.metadata.lastUpdated = new Date().toISOString()
      return true
    }
    return false
  }

  /**
   * Agrega un torneo a un equipo
   */
  addTournamentToTeam(teamId: string, tournamentId: string): boolean {
    const team = this.getTeamById(teamId)
    if (team && !team.tournaments.includes(tournamentId)) {
      team.tournaments.push(tournamentId)
      this.teams.metadata.lastUpdated = new Date().toISOString()
      return true
    }
    return false
  }

  /**
   * Remueve un torneo de un equipo
   */
  removeTournamentFromTeam(teamId: string, tournamentId: string): boolean {
    const team = this.getTeamById(teamId)
    if (team) {
      const index = team.tournaments.indexOf(tournamentId)
      if (index > -1) {
        team.tournaments.splice(index, 1)
        this.teams.metadata.lastUpdated = new Date().toISOString()
        return true
      }
    }
    return false
  }

  /**
   * Obtiene los torneos de un equipo
   */
  getTeamTournaments(teamId: string): string[] {
    const team = this.getTeamById(teamId)
    return team ? team.tournaments : []
  }
}

export const teamService = new TeamService()
export default teamService
