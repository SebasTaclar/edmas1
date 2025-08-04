import { apiClient } from './apiConfig'
import type { Team, CreateTeamRequest, UpdateTeamRequest } from '@/types/TeamType'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
  statusCode: number
}

export class TeamService {
  /**
   * Obtiene todos los equipos
   */
  async getAllTeams(): Promise<ApiResponse<Team[]>> {
    try {
      const response = await apiClient.get<Team[]>('/teams')
      return response
    } catch (error) {
      console.error('Error fetching teams:', error)
      throw error
    }
  }

  /**
   * Crea un nuevo equipo
   */
  async createTeam(teamData: CreateTeamRequest): Promise<ApiResponse<{ team: Team }>> {
    try {
      const response = await apiClient.post<{ team: Team }>('/teams', teamData)
      return response
    } catch (error) {
      console.error('Error creating team:', error)
      throw error
    }
  }

  /**
   * Actualiza un equipo existente
   */
  async updateTeam(id: number, teamData: UpdateTeamRequest): Promise<ApiResponse<Team>> {
    try {
      const response = await apiClient.put<Team>(`/teams/${id}`, teamData)
      return response
    } catch (error) {
      console.error('Error updating team:', error)
      throw error
    }
  }

  /**
   * Elimina un equipo
   */
  async deleteTeam(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await apiClient.delete<null>(`/teams/${id}`)
      return response
    } catch (error) {
      console.error('Error deleting team:', error)
      throw error
    }
  }
}

// Instancia única del servicio
export const teamService = new TeamService()
