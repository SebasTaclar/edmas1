<template>
 <div class="modal-overlay" @click="$emit('close')">
  <div class="modal upsert-team-modal" @click.stop>
   <div class="modal-header">
    <h3>{{ mode === 'create' ? 'Crear Nuevo Equipo' : 'Editar Equipo' }}</h3>
    <button @click="$emit('close')" class="close-btn">×</button>
   </div>

   <div class="modal-body">
    <form @submit.prevent="handleSubmit" class="team-form">
     <!-- Información básica del equipo -->
     <div class="form-section">
      <h4>Información del Equipo</h4>

      <div class="form-row">
       <div class="input-group">
        <label for="teamName">Nombre del Equipo *</label>
        <input type="text" id="teamName" v-model="formData.name" required placeholder="Ej: Deportivo La Cantera"
         class="form-input" :class="{ 'error': errors.name }" @input="clearError('name')" />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
       </div>

       <div class="input-group">
        <label for="logoPath">Logo (URL)</label>
        <input type="url" id="logoPath" v-model="formData.logoPath" placeholder="https://ejemplo.com/logo.png"
         class="form-input" :class="{ 'error': errors.logoPath }" @input="clearError('logoPath')" />
        <span v-if="errors.logoPath" class="error-message">{{ errors.logoPath }}</span>
       </div>
      </div>
     </div>

     <!-- Información del capitán (solo en modo crear) -->
     <div v-if="mode === 'create'" class="form-section">
      <h4>Información del Capitán</h4>

      <div class="form-row">
       <div class="input-group">
        <label for="userName">Nombre del Capitán *</label>
        <input type="text" id="userName" v-model="formData.userName" required placeholder="Ej: Carlos León"
         class="form-input" :class="{ 'error': errors.userName }" @input="clearError('userName')" />
        <span v-if="errors.userName" class="error-message">{{ errors.userName }}</span>
       </div>

       <div class="input-group">
        <label for="userEmail">Email del Capitán *</label>
        <input type="email" id="userEmail" v-model="formData.userEmail" required placeholder="capitan@ejemplo.com"
         class="form-input" :class="{ 'error': errors.userEmail }" @input="clearError('userEmail')" />
        <span v-if="errors.userEmail" class="error-message">{{ errors.userEmail }}</span>
       </div>
      </div>

      <div class="form-row">
       <div class="input-group">
        <label for="userPassword">Contraseña del Capitán *</label>
        <input type="password" id="userPassword" v-model="formData.userPassword" required placeholder="••••••••"
         class="form-input" :class="{ 'error': errors.userPassword }" @input="clearError('userPassword')" />
        <span v-if="errors.userPassword" class="error-message">{{ errors.userPassword }}</span>
       </div>
      </div>
     </div>

     <!-- Información del capitán (solo en modo editar - solo lectura) -->
     <div v-else class="form-section">
      <h4>Información del Capitán</h4>
      <div class="readonly-info">
       <div class="info-item">
        <strong>Nombre:</strong> {{ teamData?.user.name }}
       </div>
       <div class="info-item">
        <strong>Email:</strong> {{ teamData?.user.email }}
       </div>
      </div>
     </div>

     <!-- Torneos asociados -->
     <div class="form-section">
      <h4>Torneos Asociados</h4>

      <div class="tournaments-selection">
       <div v-if="availableTournaments.length === 0" class="no-tournaments-message">
        No hay torneos disponibles
       </div>
       <div v-else class="tournaments-checkboxes">
        <label v-for="tournament in availableTournaments" :key="tournament.id" class="tournament-checkbox">
         <input type="checkbox" :value="tournament.id" v-model="formData.tournamentIds"
          @change="clearError('tournamentIds')" />
         <span class="checkbox-text">
          <strong>{{ tournament.name }}</strong>
          <small v-if="tournament.description">{{ tournament.description }}</small>
          <span class="tournament-dates">
           {{ formatDate(tournament.startDate) }} - {{ formatDate(tournament.endDate) }}
          </span>
         </span>
        </label>
       </div>
      </div>
      <span v-if="errors.tournamentIds" class="error-message">{{ errors.tournamentIds }}</span>
     </div>

     <!-- Error general -->
     <div v-if="errors.general" class="error-message general-error">
      {{ errors.general }}
     </div>

     <!-- Botones de acción -->
     <div class="form-actions">
      <button type="button" @click="$emit('close')" class="btn-secondary">
       Cancelar
      </button>
      <button type="submit" :disabled="loading || !isFormValid" class="btn-primary">
       {{ loading ? 'Guardando...' : (mode === 'create' ? 'Crear Equipo' : 'Actualizar Equipo') }}
      </button>
     </div>
    </form>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useTeams } from '@/composables/useTeams'
import { useTournaments } from '@/composables/useTournaments'
import type { Team, CreateTeamRequest, UpdateTeamRequest } from '@/types/TeamType'
import type { Tournament } from '@/types/TournamentType'

interface Props {
 teamData?: Team | null
 mode: 'create' | 'edit'
}

interface Emits {
 (e: 'close'): void
 (e: 'save'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Composables
const { createTeam, updateTeam, loading } = useTeams()
const { tournaments, loadTournaments } = useTournaments()

// Estado del formulario
const formData = ref<CreateTeamRequest>({
 name: '',
 logoPath: '',
 userEmail: '',
 userPassword: '',
 userName: '',
 tournamentIds: []
})

const errors = ref<Record<string, string>>({})

// Computed
const availableTournaments = computed(() => tournaments.value || [])

const isFormValid = computed(() => {
 if (props.mode === 'create') {
  return formData.value.name &&
   formData.value.userName &&
   formData.value.userEmail &&
   formData.value.userPassword
 } else {
  return formData.value.name
 }
})

// Métodos
const clearError = (field: string) => {
 delete errors.value[field]
}

const formatDate = (dateString: string): string => {
 return new Date(dateString).toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
 })
}

const resetForm = () => {
 formData.value = {
  name: '',
  logoPath: '',
  userEmail: '',
  userPassword: '',
  userName: '',
  tournamentIds: []
 }
 errors.value = {}
}

const loadFormData = () => {
 if (props.mode === 'edit' && props.teamData) {
  formData.value = {
   name: props.teamData.name,
   logoPath: props.teamData.logoPath || '',
   userEmail: props.teamData.user.email,
   userPassword: '', // No cargar contraseña en edición
   userName: props.teamData.user.name,
   tournamentIds: props.teamData.tournaments.map(t => t.id)
  }
 } else {
  resetForm()
 }
}

const handleSubmit = async () => {
 errors.value = {}

 try {
  let result

  if (props.mode === 'create') {
   result = await createTeam(formData.value)
  } else if (props.teamData) {
   const updateData: UpdateTeamRequest = {
    name: formData.value.name,
    logoPath: formData.value.logoPath,
    tournamentIds: formData.value.tournamentIds
   }
   result = await updateTeam(props.teamData.id, updateData)
  }

  if (result?.success) {
   emit('save')
  } else {
   errors.value.general = result?.message || 'Error al guardar el equipo'
  }
 } catch (error) {
  console.error('Error saving team:', error)
  errors.value.general = 'Error interno del sistema'
 }
}

// Watchers
watch(() => props.teamData, loadFormData, { immediate: true })
watch(() => props.mode, loadFormData)

// Lifecycle
onMounted(async () => {
 await loadTournaments()
 loadFormData()
})
</script>

<style scoped>
.modal-overlay {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: rgba(0, 0, 0, 0.7);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
 padding: 1rem;
}

.upsert-team-modal {
 background: var(--app-bg-secondary);
 border-radius: var(--border-radius-lg);
 box-shadow: var(--app-shadow);
 border: 1px solid var(--app-border-color);
 width: 100%;
 max-width: 800px;
 max-height: 90vh;
 overflow-y: auto;
}

.modal-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 1.5rem 2rem;
 border-bottom: 1px solid var(--app-border-color);
 background: var(--app-bg-primary);
}

.modal-header h3 {
 margin: 0;
 color: var(--primary-blue);
 font-size: 1.25rem;
 font-weight: 600;
}

.close-btn {
 background: none;
 border: none;
 font-size: 1.5rem;
 cursor: pointer;
 color: var(--app-text-secondary);
 padding: 0;
 width: 32px;
 height: 32px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: var(--border-radius-sm);
 transition: all var(--transition-normal);
}

.close-btn:hover {
 background: var(--app-hover-bg);
 color: var(--app-text-primary);
}

.modal-body {
 padding: 2rem;
}

.team-form {
 display: flex;
 flex-direction: column;
 gap: 2rem;
}

.form-section {
 background: var(--app-bg-primary);
 border-radius: var(--border-radius-md);
 padding: 1.5rem;
 border: 1px solid var(--app-border-color);
}

.form-section h4 {
 margin: 0 0 1.5rem 0;
 color: var(--app-text-primary);
 font-size: 1.1rem;
 font-weight: 600;
 display: flex;
 align-items: center;
 gap: 0.5rem;
}

.form-section h4::before {
 content: '●';
 color: var(--primary-blue);
 font-size: 0.8rem;
}

.form-row {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 gap: 1rem;
 margin-bottom: 1rem;
}

.form-row:last-child {
 margin-bottom: 0;
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

.form-input {
 padding: 0.75rem 1rem;
 border: 2px solid var(--app-border-color);
 border-radius: var(--border-radius-md);
 font-size: 1rem;
 background: var(--app-input-bg);
 color: var(--app-text-primary);
 transition: all var(--transition-normal);
}

.form-input:focus {
 outline: none;
 border-color: var(--primary-blue);
 box-shadow: 0 0 0 3px rgba(0, 94, 180, 0.1);
}

.form-input.error {
 border-color: var(--danger);
 box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.readonly-info {
 display: flex;
 flex-direction: column;
 gap: 0.75rem;
 background: var(--app-input-bg);
 padding: 1rem;
 border-radius: var(--border-radius-md);
 border: 1px solid var(--app-border-color);
}

.info-item {
 color: var(--app-text-secondary);
}

.info-item strong {
 color: var(--app-text-primary);
}

.tournaments-selection {
 margin-top: 1rem;
}

.no-tournaments-message {
 color: var(--app-text-secondary);
 font-style: italic;
 text-align: center;
 padding: 2rem;
}

.tournaments-checkboxes {
 display: flex;
 flex-direction: column;
 gap: 1rem;
}

.tournament-checkbox {
 display: flex;
 align-items: flex-start;
 gap: 0.75rem;
 padding: 1rem;
 background: var(--app-input-bg);
 border: 1px solid var(--app-border-color);
 border-radius: var(--border-radius-md);
 cursor: pointer;
 transition: all var(--transition-normal);
}

.tournament-checkbox:hover {
 background: var(--app-hover-bg);
 border-color: var(--primary-blue);
}

.tournament-checkbox input[type="checkbox"] {
 margin: 0;
 cursor: pointer;
}

.checkbox-text {
 flex: 1;
 display: flex;
 flex-direction: column;
 gap: 0.25rem;
}

.checkbox-text strong {
 color: var(--app-text-primary);
 font-weight: 600;
}

.checkbox-text small {
 color: var(--app-text-secondary);
 font-size: 0.85rem;
}

.tournament-dates {
 color: var(--primary-blue);
 font-size: 0.8rem;
 font-weight: 500;
}

.error-message {
 color: var(--danger);
 font-size: 0.85rem;
 font-weight: 500;
}

.general-error {
 background: rgba(220, 53, 69, 0.1);
 padding: 1rem;
 border-radius: var(--border-radius-md);
 border: 1px solid var(--danger);
 text-align: center;
}

.form-actions {
 display: flex;
 gap: 1rem;
 justify-content: flex-end;
 padding-top: 1rem;
 border-top: 1px solid var(--app-border-color);
}

.btn-primary,
.btn-secondary {
 padding: 0.75rem 1.5rem;
 border: none;
 border-radius: var(--border-radius-md);
 font-size: 1rem;
 font-weight: 600;
 cursor: pointer;
 transition: all var(--transition-normal);
 display: flex;
 align-items: center;
 gap: 0.5rem;
}

.btn-primary {
 background: var(--primary-blue);
 color: var(--white);
}

.btn-primary:hover:not(:disabled) {
 background: var(--tertiary-blue);
 transform: translateY(-1px);
 box-shadow: var(--shadow-light);
}

.btn-primary:disabled {
 opacity: 0.5;
 cursor: not-allowed;
 transform: none;
 box-shadow: none;
}

.btn-secondary {
 background: var(--app-input-bg);
 color: var(--app-text-primary);
 border: 1px solid var(--app-border-color);
}

.btn-secondary:hover {
 background: var(--app-hover-bg);
 transform: translateY(-1px);
 box-shadow: var(--shadow-light);
}

/* Responsive Design */
@media (max-width: 768px) {
 .upsert-team-modal {
  margin: 1rem;
  max-height: calc(100vh - 2rem);
 }

 .modal-header {
  padding: 1rem 1.5rem;
 }

 .modal-body {
  padding: 1.5rem;
 }

 .form-section {
  padding: 1rem;
 }

 .form-row {
  grid-template-columns: 1fr;
 }

 .form-actions {
  flex-direction: column-reverse;
 }

 .btn-primary,
 .btn-secondary {
  width: 100%;
  justify-content: center;
 }
}

@media (max-width: 480px) {
 .modal-header h3 {
  font-size: 1.1rem;
 }

 .form-input {
  font-size: 0.9rem;
 }
}
</style>
