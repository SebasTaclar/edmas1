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
   * TODO: Implementar cuando el endpoint esté disponible
   */
  async updateTournament(
    id: number,
    tournamentData: Partial<CreateTournamentRequest>,
  ): Promise<Tournament> {
    // Por ahora solo lanzar error hasta que se implemente el endpoint
    throw new Error('Endpoint de actualización no implementado aún')
  }

  /**
   * Eliminar un torneo
   * TODO: Implementar cuando el endpoint esté disponible
   */
  async deleteTournament(id: number): Promise<{ success: boolean; message: string }> {
    // Por ahora solo lanzar error hasta que se implemente el endpoint
    throw new Error('Endpoint de eliminación no implementado aún')
  }
}

export const tournamentService = new TournamentService()
export default tournamentService
