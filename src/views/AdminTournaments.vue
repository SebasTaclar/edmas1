<template>
 <main class="admin-main">
  <div class="admin-container">
   <!-- Header de Administración -->
   <div class="admin-header">
    <h1>Administración de Torneos</h1>
    <p>Gestiona los torneos del sistema Ed+1</p>
   </div>

   <!-- Botón para crear nuevo torneo -->
   <div class="create-tournament-section">
    <div class="section-header">
     <h2>Gestionar Torneos</h2>
     <button @click="openCreateModal" class="btn-primary create-btn">
      <span class="btn-icon">🏆</span>
      Crear Nuevo Torneo
     </button>
    </div>

    <!-- Filtros -->
    <div class="filters">
     <div class="filter-group">
      <label for="statusFilter">Filtrar por estado:</label>
      <select id="statusFilter" v-model="selectedStatusFilter" class="form-select">
       <option value="">Todos los torneos</option>
       <option value="active">Activos</option>
       <option value="inactive">Inactivos</option>
      </select>
     </div>
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
   </div>

   <!-- Lista de torneos existentes -->
   <div class="tournaments-list-section">
    <div class="section-header">
     <h2>Torneos Registrados</h2>
     <div class="tournaments-count">{{ tournaments.length }} torneos</div>
    </div>

    <!-- Tabla de torneos -->
    <div class="tournaments-table-container">
     <table class="tournaments-table">
      <thead>
       <tr>
        <th>Torneo</th>
        <th>Descripción</th>
        <th>Categorías</th>
        <th>Fechas</th>
        <th>Equipos</th>
        <th>Estado</th>
        <th>Acciones</th>
       </tr>
      </thead>
      <tbody>
       <tr v-for="tournament in filteredTournaments" :key="tournament.id" :class="{ 'inactive': !tournament.isActive }">
        <td class="tournament-name">{{ tournament.name }}</td>
        <td class="description">{{ tournament.description }}</td>
        <td class="categories">
         <div class="categories-list">
          <span v-for="categoryId in tournament.categories" :key="categoryId" class="category-badge"
           :class="categoryId">
           {{ getCategoryName(categoryId) }}
          </span>
         </div>
        </td>
        <td class="dates">
         <div class="date-range">
          <div class="start-date">
           <strong>Inicio:</strong> {{ formatDate(tournament.startDate) }}
          </div>
          <div class="end-date">
           <strong>Fin:</strong> {{ formatDate(tournament.endDate) }}
          </div>
         </div>
        </td>
        <td class="teams-count">
         <span class="teams-badge">
          {{ getRegisteredTeamsCount(tournament.id) }} equipos
         </span>
        </td>
        <td class="status">
         <span class="status-badge" :class="tournament.isActive ? 'active' : 'inactive'">
          {{ tournament.isActive ? 'Activo' : 'Inactivo' }}
         </span>
        </td>
        <td class="actions">
         <button @click="openEditModal(tournament)" class="btn-action edit" title="Editar torneo">
          Editar
         </button>
         <button @click="toggleTournamentStatus(tournament)" class="btn-action"
          :class="tournament.isActive ? 'deactivate' : 'activate'"
          :title="tournament.isActive ? 'Desactivar torneo' : 'Activar torneo'">
          {{ tournament.isActive ? 'Desactivar' : 'Activar' }}
         </button>
        </td>
       </tr>
      </tbody>
     </table>

     <div v-if="filteredTournaments.length === 0" class="no-tournaments">
      <div class="no-tournaments-icon">🏆</div>
      <p>No hay torneos registrados{{ selectedStatusFilter || selectedCategoryFilter ? ' con los filtros aplicados' : ''
       }}</p>
     </div>
    </div>
   </div>
  </div>

  <!-- Modal para crear/editar torneo -->
  <UpsertTournamentPopup v-if="showUpsertModal" :tournament-data="selectedTournament" :mode="modalMode"
   @close="closeUpsertModal" @save="handleTournamentSave" />

  <Spinner v-if="loading" />
 </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Tournament } from '@/types/TournamentType'
import type { Category } from '@/types/TeamType'
import tournamentService from '@/utils/tournamentService'
import teamService from '@/utils/teamService'
import Spinner from '@/components/Spinner.vue'
import UpsertTournamentPopup from '@/components/UpsertTournamentPopup.vue'

defineOptions({
 name: 'AdminTournamentsView',
})

// Estado de la aplicación
const tournaments = ref<Tournament[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const selectedStatusFilter = ref<string>('')
const selectedCategoryFilter = ref<string>('')

// Modal de creación/edición
const showUpsertModal = ref(false)
const selectedTournament = ref<Tournament | null>(null)
const modalMode = ref<'create' | 'edit'>('create')

// Computed properties
const filteredTournaments = computed(() => {
 let filtered = tournaments.value

 // Filtrar por estado
 if (selectedStatusFilter.value) {
  if (selectedStatusFilter.value === 'active') {
   filtered = filtered.filter(tournament => tournament.isActive)
  } else if (selectedStatusFilter.value === 'inactive') {
   filtered = filtered.filter(tournament => !tournament.isActive)
  }
 }

 // Filtrar por categoría
 if (selectedCategoryFilter.value) {
  filtered = filtered.filter(tournament =>
   tournament.categories.includes(selectedCategoryFilter.value)
  )
 }

 return filtered
})

// Funciones
const loadData = () => {
 tournaments.value = tournamentService.getAllTournaments(true) // Incluir inactivos para admin
 categories.value = teamService.getCategories()
}

const openCreateModal = () => {
 selectedTournament.value = null
 modalMode.value = 'create'
 showUpsertModal.value = true
}

const openEditModal = (tournament: Tournament) => {
 selectedTournament.value = { ...tournament }
 modalMode.value = 'edit'
 showUpsertModal.value = true
}

const closeUpsertModal = () => {
 showUpsertModal.value = false
 selectedTournament.value = null
}

const handleTournamentSave = () => {
 loadData() // Recargar la lista
 closeUpsertModal()
}

const toggleTournamentStatus = (tournament: Tournament) => {
 loading.value = true

 try {
  const success = tournament.isActive
   ? tournamentService.deactivateTournament(tournament.id)
   : tournamentService.activateTournament(tournament.id)

  if (success) {
   loadData() // Recargar datos
  }
 } catch (error) {
  console.error('Error al cambiar estado del torneo:', error)
 } finally {
  loading.value = false
 }
}

const getCategoryName = (categoryId: string): string => {
 const category = categories.value.find(cat => cat.id === categoryId)
 return category?.name || categoryId
}

const getRegisteredTeamsCount = (tournamentId: string): number => {
 const teams = teamService.getAllTeams()
 return teams.filter(team => team.tournaments.includes(tournamentId)).length
}

const formatDate = (dateString: string): string => {
 const date = new Date(dateString)
 return date.toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
 })
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
 max-width: 1400px;
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

.create-tournament-section {
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

.create-btn {
 display: flex;
 align-items: center;
 gap: 0.5rem;
}

.btn-icon {
 font-size: 1.2rem;
}

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

.filters {
 display: flex;
 gap: 2rem;
 flex-wrap: wrap;
 align-items: center;
}

.filter-group {
 display: flex;
 align-items: center;
 gap: 1rem;
}

.filter-group label {
 font-weight: 500;
 color: var(--app-text-primary);
 white-space: nowrap;
}

.form-select {
 padding: 0.5rem;
 border: 2px solid var(--app-border-color);
 border-radius: var(--border-radius-md);
 font-size: 0.9rem;
 background: var(--app-input-bg);
 color: var(--app-text-primary);
 min-width: 150px;
}

.form-select:focus {
 outline: none;
 border-color: var(--primary-blue);
 box-shadow: 0 0 0 3px rgba(0, 94, 180, 0.1);
}

.tournaments-list-section {
 background: var(--app-bg-secondary);
 border-radius: var(--border-radius-lg);
 padding: 2rem;
 box-shadow: var(--app-shadow);
 border: 1px solid var(--app-border-color);
}

.tournaments-count {
 background: var(--primary-blue);
 color: var(--white);
 padding: 0.25rem 0.75rem;
 border-radius: var(--border-radius-xl);
 font-size: 0.8rem;
 font-weight: 600;
}

.tournaments-table-container {
 overflow-x: auto;
}

.tournaments-table {
 width: 100%;
 border-collapse: collapse;
 margin-top: 1rem;
}

.tournaments-table th,
.tournaments-table td {
 padding: 1rem;
 text-align: left;
 border-bottom: 1px solid var(--app-border-color);
 color: var(--app-text-primary);
}

.tournaments-table th {
 background: var(--app-table-header-bg);
 font-weight: 600;
 color: var(--app-text-primary);
 font-size: 0.9rem;
 text-transform: uppercase;
 letter-spacing: 0.5px;
}

.tournaments-table tr:hover {
 background: var(--app-hover-bg);
}

.tournaments-table tr.inactive {
 opacity: 0.6;
}

.tournament-name {
 font-weight: 600;
 color: var(--primary-blue);
 min-width: 150px;
}

.description {
 max-width: 200px;
 font-size: 0.9rem;
 line-height: 1.4;
}

.categories-list {
 display: flex;
 flex-wrap: wrap;
 gap: 0.25rem;
}

.category-badge {
 padding: 0.2rem 0.5rem;
 border-radius: var(--border-radius-xl);
 font-size: 0.7rem;
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

.dates {
 min-width: 140px;
}

.date-range {
 display: flex;
 flex-direction: column;
 gap: 0.25rem;
 font-size: 0.85rem;
}

.start-date,
.end-date {
 color: var(--app-text-primary);
}

.teams-badge {
 background: var(--secondary-blue);
 color: var(--white);
 padding: 0.25rem 0.5rem;
 border-radius: var(--border-radius-sm);
 font-size: 0.8rem;
 font-weight: 500;
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

.actions {
 display: flex;
 gap: 0.5rem;
 flex-wrap: wrap;
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

.btn-action.edit {
 background: var(--secondary-blue);
 color: var(--white);
}

.btn-action.edit:hover {
 background: var(--primary-blue);
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

.no-tournaments {
 text-align: center;
 padding: 3rem;
 color: var(--app-text-secondary);
}

.no-tournaments-icon {
 font-size: 3rem;
 margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
 .admin-container {
  padding: 1rem;
 }

 .section-header {
  flex-direction: column;
  gap: 1rem;
  text-align: center;
 }

 .filters {
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
 }

 .filter-group {
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
 }

 .tournaments-table th,
 .tournaments-table td {
  padding: 0.5rem;
  font-size: 0.8rem;
 }

 .actions {
  flex-direction: column;
  gap: 0.25rem;
 }

 .btn-action {
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
 }
}
</style>
