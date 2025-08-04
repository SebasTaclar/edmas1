import { ApiClient } from './apiConfig'
import type {
  Tournament,
  CreateTournamentRequest,
  CreateTournamentResponse,
} from '@/types/TournamentType'

class TournamentService {
  private api = new ApiClient()

  /**
   * Obtener todos los torneos
   */
  async getTournaments(): Promise<Tournament[]> {
    try {
      const response = await this.api.get<Tournament[]>('/tournament')
      return response.data
    } catch (error) {
      console.error('Error al obtener torneos:', error)
      throw error
    }
  }

  /**
   * Crear un nuevo torneo
   */
  async createTournament(
    tournamentData: CreateTournamentRequest,
  ): Promise<CreateTournamentResponse> {
    try {
      const response = await this.api.post<CreateTournamentResponse>('/tournament', tournamentData)

      return response.data
    } catch (error) {
      console.error('Error al crear torneo:', error)
      throw error
    }
  }

  /**
   * Actualizar un torneo existente
   */
  async updateTournament(
    id: number,
    tournamentData: Partial<CreateTournamentRequest>,
  ): Promise<Tournament> {
    try {
      const response = await this.api.put<Tournament>(`/tournament/${id}`, tournamentData)
      return response.data
    } catch (error) {
      console.error('Error al actualizar torneo:', error)
      throw error
    }
  }

  /**
   * Eliminar un torneo
   */
  async deleteTournament(id: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.api.delete<{ message: string }>(`/tournament/${id}`)
      return { success: true, message: response.message }
    } catch (error) {
      console.error('Error al eliminar torneo:', error)
      throw error
    }
  }
}

export const tournamentService = new TournamentService()
export default tournamentService
