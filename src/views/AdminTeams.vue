<template>
  <main class="admin-main">
    <div class="admin-container">
      <!-- Header de Administración -->
      <div class="admin-header">
        <h1>Administración de Equipos</h1>
        <p>Gestiona los equipos registrados en el torneo</p>
      </div>

      <!-- Formulario para crear nuevo equipo -->
      <div class="create-team-section">
        <div class="section-header">
          <h2>Agregar Nuevo Equipo</h2>
          <div class="section-icon">⚽</div>
        </div>

        <form @submit.prevent="handleCreateTeam" class="create-team-form">
          <div class="form-row">
            <div class="input-group">
              <label for="teamName">Nombre del Equipo</label>
              <input type="text" id="teamName" v-model="newTeam.name" required placeholder="Ej: Deportivo La Cantera"
                class="form-input" :class="{ 'error': errors.name }" @input="clearError('name')" />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="input-group">
              <label for="teamCategory">Categoría</label>
              <select id="teamCategory" v-model="newTeam.category" required class="form-select"
                :class="{ 'error': errors.category }" @change="clearError('category')">
                <option value="">Seleccionar categoría</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
            </div>
          </div>

          <div class="form-row">
            <div class="input-group tournaments-group">
              <label for="teamTournaments">Torneos Asociados</label>
              <div class="tournaments-selection">
                <div v-if="availableTournaments.length === 0" class="no-tournaments-message">
                  {{ newTeam.category ?
                    'No hay torneos disponibles para esta categoría' : 'Selecciona una categoría primero' }}
                </div>
                <div v-else class="tournaments-checkboxes">
                  <label v-for="tournament in availableTournaments" :key="tournament.id" class="tournament-checkbox">
                    <input type="checkbox" :value="tournament.id" v-model="newTeam.tournaments"
                      @change="clearError('tournaments')" />
                    <span class="checkbox-text">
                      <strong>{{ tournament.name }}</strong>
                      <small>{{ tournament.description }}</small>
                      <span class="tournament-dates">
                        {{ new Date(tournament.startDate).toLocaleDateString('es-ES') }} -
                        {{ new Date(tournament.endDate).toLocaleDateString('es-ES') }}
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <span v-if="errors.tournaments" class="error-message">{{ errors.tournaments }}</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" :disabled="loading || !newTeam.name || !newTeam.category" class="btn-primary">
              {{ loading ? 'Creando...' : 'Crear Equipo' }}
            </button>
            <button type="button" @click="resetForm" class="btn-secondary">
              Limpiar
            </button>
          </div>
        </form>
      </div>

      <!-- Lista de equipos existentes -->
      <div class="teams-list-section">
        <div class="section-header">
          <h2>Equipos Registrados</h2>
          <div class="teams-count">{{ teams.length }} equipos</div>
        </div>

        <!-- Filtros -->
        <div class="filters">
          <div class="filter-group">
            <label for="categoryFilter">Filtrar por categoría:</label>
            <select id="categoryFilter" v-model="selectedCategoryFilter" class="form-select">
              <option value="">Todas las categorías</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Tabla de equipos -->
        <div class="teams-table-container">
          <table class="teams-table">
            <thead>
              <tr>
                <th>Equipo</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Categoría</th>
                <th>Torneos</th>
                <th>Estado</th>
                <th>Fecha Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in filteredTeams" :key="team.id" :class="{ 'inactive': !team.isActive }">
                <td class="team-name">{{ team.name }}</td>
                <td class="username">{{ team.username }}</td>
                <td class="password">
                  <span v-if="!visiblePasswords[team.id]">••••••••</span>
                  <span v-else>{{ team.password }}</span>
                  <button @click="togglePasswordVisibility(team.id)" class="toggle-password"
                    :title="visiblePasswords[team.id] ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                    {{ visiblePasswords[team.id] ? '👁️' : '👁️‍🗨️' }}
                  </button>
                </td>
                <td class="category">
                  <span class="category-badge" :class="team.category">
                    {{ getCategoryName(team.category) }}
                  </span>
                </td>
                <td class="tournaments">
                  <div class="tournaments-list">
                    <span v-if="team.tournaments.length === 0" class="no-tournaments">Sin torneos</span>
                    <span v-else v-for="tournamentId in team.tournaments" :key="tournamentId" class="tournament-badge"
                      :title="getTournamentName(tournamentId)">
                      {{ getTournamentName(tournamentId) }}
                    </span>
                  </div>
                </td>
                <td class="status">
                  <span class="status-badge" :class="team.isActive ? 'active' : 'inactive'">
                    {{ team.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="date">{{ formatDate(team.createdAt) }}</td>
                <td class="actions">
                  <button @click="toggleTeamStatus(team)" class="btn-action"
                    :class="team.isActive ? 'deactivate' : 'activate'"
                    :title="team.isActive ? 'Desactivar equipo' : 'Activar equipo'">
                    {{ team.isActive ? 'Desactivar' : 'Activar' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="filteredTeams.length === 0" class="no-teams">
            <div class="no-teams-icon">🏆</div>
            <p>No hay equipos registrados{{ selectedCategoryFilter ? ' en esta categoría' : '' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
      <div class="modal success-modal" @click.stop>
        <div class="modal-header">
          <h3>¡Equipo Creado!</h3>
          <button @click="closeSuccessModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="success-icon">✅</div>
          <p><strong>{{ createdTeam?.name }}</strong> ha sido creado exitosamente.</p>
          <div class="credentials">
            <div class="credential-item">
              <strong>Usuario:</strong> {{ createdTeam?.username }}
            </div>
            <div class="credential-item">
              <strong>Contraseña:</strong> {{ createdTeam?.password }}
            </div>
          </div>
          <p class="note">Guarda estas credenciales para el equipo.</p>
        </div>
        <div class="modal-actions">
          <button @click="closeSuccessModal" class="btn-primary">Entendido</button>
        </div>
      </div>
    </div>

    <Spinner v-if="loading" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Team, TeamCategory, CreateTeamRequest, Category } from '@/types/TeamType'
import type { Tournament } from '@/types/TournamentType'
import teamService from '@/utils/teamService'
import tournamentService from '@/utils/tournamentService'
import Spinner from '@/components/Spinner.vue'

defineOptions({
  name: 'AdminTeamsView',
})

// Estado del formulario
const newTeam = ref<CreateTeamRequest>({
  name: '',
  category: '' as TeamCategory,
  tournaments: []
})

// Estado de la aplicación
const teams = ref<Team[]>([])
const categories = ref<Category[]>([])
const tournaments = ref<Tournament[]>([])
const loading = ref(false)
const errors = ref<Record<string, string>>({})
const selectedCategoryFilter = ref<string>('')
const visiblePasswords = ref<Record<string, boolean>>({})

// Modal de éxito
const showSuccessModal = ref(false)
const createdTeam = ref<Team | null>(null)

// Computed properties
const filteredTeams = computed(() => {
  if (!selectedCategoryFilter.value) {
    return teams.value
  }
  return teams.value.filter(team => team.category === selectedCategoryFilter.value)
})

const availableTournaments = computed(() => {
  if (!newTeam.value.category) {
    return tournaments.value
  }
  return tournaments.value.filter(tournament =>
    tournament.categories.includes(newTeam.value.category)
  )
})

// Funciones
const loadData = () => {
  teams.value = teamService.getAllTeams()
  categories.value = teamService.getCategories()
  tournaments.value = tournamentService.getAllTournaments()
}

const clearError = (field: string) => {
  delete errors.value[field]
}

const resetForm = () => {
  newTeam.value = {
    name: '',
    category: '' as TeamCategory,
    tournaments: []
  }
  errors.value = {}
}

const handleCreateTeam = async () => {
  loading.value = true
  errors.value = {}

  try {
    const result = teamService.createTeam(newTeam.value)

    if (result.success && result.team) {
      createdTeam.value = result.team
      showSuccessModal.value = true
      loadData() // Recargar la lista
      resetForm()
    } else {
      errors.value.general = result.error || 'Error al crear el equipo'
    }
  } catch (error) {
    errors.value.general = 'Error interno del sistema'
  } finally {
    loading.value = false
  }
}

const togglePasswordVisibility = (teamId: string) => {
  visiblePasswords.value[teamId] = !visiblePasswords.value[teamId]
}

const toggleTeamStatus = (team: Team) => {
  const success = team.isActive
    ? teamService.deactivateTeam(team.id)
    : teamService.activateTeam(team.id)

  if (success) {
    loadData() // Recargar datos
  }
}

const getCategoryName = (categoryId: TeamCategory): string => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.name || categoryId
}

const getTournamentName = (tournamentId: string): string => {
  const tournament = tournaments.value.find(t => t.id === tournamentId)
  return tournament?.name || tournamentId
}

const getTournamentNames = (tournamentIds: string[]): string => {
  if (!tournamentIds || tournamentIds.length === 0) {
    return 'Sin torneos'
  }
  return tournamentIds.map(id => getTournamentName(id)).join(', ')
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  createdTeam.value = null
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.admin-main {
  padding-top: 80px;
  min-height: 100vh;
  background: var(--app-bg-primary);
  color: var(--app-text-primary);
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.admin-header {
  text-align: center;
  margin-bottom: 3rem;
}

.admin-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.admin-header p {
  font-size: 1.1rem;
  color: var(--app-text-secondary);
}

.create-team-section {
  background: var(--app-bg-secondary);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--app-shadow);
  border: 1px solid var(--app-border-color);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--app-border-color);
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--app-text-primary);
}

.section-icon {
  font-size: 1.5rem;
  background: var(--secondary-blue);
  color: var(--white);
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.create-team-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 600;
  color: var(--app-text-primary);
  font-size: 0.9rem;
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 2px solid var(--app-border-color);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: border-color var(--transition-normal);
  background: var(--app-input-bg);
  color: var(--app-text-primary);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 94, 180, 0.1);
}

.form-input.error,
.form-select.error {
  border-color: var(--danger);
}

.error-message {
  color: var(--danger);
  font-size: 0.8rem;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

/* Botones específicos para este componente */
.btn-primary {
  background: var(--primary-blue);
  color: var(--white);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-primary:hover:not(:disabled) {
  background: var(--tertiary-blue);
  transform: translateY(-1px);
  box-shadow: var(--app-shadow);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--app-text-primary);
  border: 2px solid var(--app-border-color);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-secondary:hover {
  background: var(--app-hover-bg);
  border-color: var(--primary-blue);
}

.teams-list-section {
  background: var(--app-bg-secondary);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: var(--app-shadow);
  border: 1px solid var(--app-border-color);
}

.teams-count {
  background: var(--primary-blue);
  color: var(--white);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-xl);
  font-size: 0.8rem;
  font-weight: 600;
}

.filters {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--app-input-bg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--app-border-color);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-group label {
  font-weight: 500;
  color: var(--app-text-primary);
}

.teams-table-container {
  overflow-x: auto;
}

.teams-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.teams-table th,
.teams-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--app-border-color);
  color: var(--app-text-primary);
}

.teams-table th {
  background: var(--app-table-header-bg);
  font-weight: 600;
  color: var(--app-text-primary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.teams-table tr:hover {
  background: var(--app-hover-bg);
}

.teams-table tr.inactive {
  opacity: 0.6;
}

.team-name {
  font-weight: 600;
  color: var(--primary-blue);
}

.username {
  font-family: 'Courier New', monospace;
  font-weight: 500;
}

.password {
  font-family: 'Courier New', monospace;
  position: relative;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
  transition: opacity var(--transition-normal);
}

.toggle-password:hover {
  opacity: 1;
}

.category-badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-xl);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-badge.adultos_masculino {
  background: #3498db;
  color: var(--white);
}

.category-badge.adultos_femenino {
  background: #e91e63;
  color: var(--white);
}

.category-badge.infantil {
  background: #4caf50;
  color: var(--white);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-xl);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

.btn-action {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-action.deactivate {
  background: #f8d7da;
  color: #721c24;
}

.btn-action.activate {
  background: #d4edda;
  color: #155724;
}

.btn-action:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-light);
}

.no-teams {
  text-align: center;
  padding: 3rem;
  color: var(--app-text-secondary);
}

.no-teams-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--app-bg-secondary);
  border-radius: var(--border-radius-lg);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--app-shadow);
  border: 1px solid var(--app-border-color);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--app-border-color);
}

.modal-header h3 {
  color: var(--primary-blue);
  font-size: 1.3rem;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--app-text-secondary);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background var(--transition-normal);
}

.close-btn:hover {
  background: var(--app-hover-bg);
}

.modal-body {
  padding: 1.5rem;
  text-align: center;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.credentials {
  background: var(--app-input-bg);
  padding: 1rem;
  border-radius: var(--border-radius-md);
  margin: 1rem 0;
  text-align: left;
  border: 1px solid var(--app-border-color);
}

.credential-item {
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  color: var(--app-text-primary);
}

.note {
  font-size: 0.9rem;
  color: var(--app-text-secondary);
  font-style: italic;
}

.modal-actions {
  padding: 1.5rem;
  border-top: 1px solid var(--app-border-color);
  text-align: center;
}

/* Estilos para torneos */
.tournaments-group {
  grid-column: 1 / -1;
  /* Ocupa toda la fila */
}

.tournaments-selection {
  margin-top: 0.5rem;
}

.no-tournaments-message {
  padding: 1rem;
  background: var(--app-input-bg);
  border-radius: var(--border-radius-md);
  color: var(--app-text-secondary);
  font-style: italic;
  text-align: center;
  border: 1px solid var(--app-border-color);
}

.tournaments-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tournament-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid var(--app-border-color);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--app-input-bg);
}

.tournament-checkbox:hover {
  border-color: var(--primary-blue);
  background: var(--app-hover-bg);
}

.tournament-checkbox input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
  margin-top: 2px;
}

.checkbox-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.checkbox-text strong {
  color: var(--app-text-primary);
  font-size: 0.95rem;
  font-weight: 600;
}

.checkbox-text small {
  color: var(--app-text-secondary);
  font-size: 0.85rem;
  line-height: 1.3;
}

.tournament-dates {
  font-size: 0.8rem;
  color: var(--app-text-primary);
  font-weight: 500;
  margin-top: 0.25rem;
}

/* Estilos para la columna de torneos en la tabla */
.tournaments {
  max-width: 200px;
}

.tournaments-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tournament-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: var(--primary-blue);
  color: var(--white);
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  box-shadow: var(--app-shadow);
}

.no-tournaments {
  color: var(--app-text-secondary);
  font-style: italic;
  font-size: 0.8rem;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .teams-table th,
  .teams-table td {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
