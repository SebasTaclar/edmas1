<template>
 <div class="modal-overlay" @click="handleOverlayClick">
  <div class="modal tournament-modal" @click.stop>
   <div class="modal-header">
    <h3>{{ mode === 'create' ? 'Crear Nuevo Torneo' : 'Editar Torneo' }}</h3>
    <button @click="handleOverlayClick" class="close-btn">×</button>
   </div>

   <form @submit.prevent="handleSubmit" class="modal-body">
    <div class="form-row">
     <div class="input-group">
      <label for="tournamentName">Nombre del Torneo *</label>
      <input type="text" id="tournamentName" v-model="formData.name" required placeholder="Ej: Copa Ed90+1 Verano 2025"
       class="form-input" :class="{ 'error': errors.name }" @input="clearError('name')" />
      <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
     </div>

     <div class="input-group">
      <label for="tournamentDescription">Descripción *</label>
      <textarea id="tournamentDescription" v-model="formData.description" required
       placeholder="Describe el torneo, modalidad, premios, etc." class="form-textarea"
       :class="{ 'error': errors.description }" @input="clearError('description')" rows="3"></textarea>
      <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
     </div>
    </div>

    <div class="form-row">
     <div class="input-group">
      <label for="startDate">Fecha de Inicio *</label>
      <input type="date" id="startDate" v-model="formData.startDate" required class="form-input"
       :class="{ 'error': errors.startDate }" @input="clearError('startDate')" />
      <span v-if="errors.startDate" class="error-message">{{ errors.startDate }}</span>
     </div>

     <div class="input-group">
      <label for="endDate">Fecha de Fin *</label>
      <input type="date" id="endDate" v-model="formData.endDate" required class="form-input"
       :class="{ 'error': errors.endDate }" @input="clearError('endDate')" />
      <span v-if="errors.endDate" class="error-message">{{ errors.endDate }}</span>
     </div>
    </div>

    <div class="form-row">
     <div class="input-group full-width">
      <label>Categorías Participantes *</label>
      <div class="categories-selection">
       <div v-if="categories.length === 0" class="no-categories-message">
        No hay categorías disponibles
       </div>
       <div v-else class="categories-checkboxes">
        <label v-for="category in categories" :key="category.id" class="category-checkbox">
         <input type="checkbox" :value="category.id" v-model="formData.categories" @change="clearError('categories')" />
         <span class="checkbox-text">
          <strong>{{ category.name }}</strong>
          <small>{{ category.description || 'Categoría de competencia' }}</small>
         </span>
        </label>
       </div>
      </div>
      <span v-if="errors.categories" class="error-message">{{ errors.categories }}</span>
     </div>
    </div>

    <div class="form-row">
     <div class="input-group">
      <label for="maxTeams">Máximo de Equipos</label>
      <input type="number" id="maxTeams" v-model.number="formData.maxTeams" min="2" max="64" placeholder="16"
       class="form-input" :class="{ 'error': errors.maxTeams }" @input="clearError('maxTeams')" />
      <small class="input-help">Déjalo vacío para sin límite</small>
      <span v-if="errors.maxTeams" class="error-message">{{ errors.maxTeams }}</span>
     </div>

     <div class="input-group">
      <label class="checkbox-label">
       <input type="checkbox" v-model="formData.isActive" class="form-checkbox" />
       <span class="checkbox-text">Torneo activo</span>
      </label>
      <small class="input-help">Los equipos pueden registrarse solo en torneos activos</small>
     </div>
    </div>

    <div class="form-actions">
     <button type="button" @click="handleOverlayClick" class="btn-secondary">
      Cancelar
     </button>
     <button type="submit" :disabled="loading" class="btn-primary">
      {{ loading ? 'Guardando...' : (mode === 'create' ? 'Crear Torneo' : 'Actualizar Torneo') }}
     </button>
    </div>
   </form>
  </div>

  <!-- Confirmation Modal -->
  <ConfirmationModal v-if="showConfirmation" title="¿Descartar cambios?"
   message="¿Estás seguro de que deseas cerrar el formulario? Los cambios no guardados se perderán."
   confirm-text="Descartar" cancel-text="Continuar editando" @confirm="confirmClose" @cancel="cancelClose" />
 </div>

 <Spinner v-if="loading" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Tournament, CreateTournamentRequest } from '@/types/TournamentType'
import type { Category } from '@/types/TeamType'
import tournamentService from '@/utils/tournamentService'
import teamService from '@/utils/teamService'
import Spinner from '@/components/Spinner.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'

const { tournamentData, mode } = defineProps<{
 tournamentData: Tournament | null
 mode: 'edit' | 'create'
}>()

const emit = defineEmits(['close', 'save'])

// Estado del formulario
const formData = ref<CreateTournamentRequest>({
 name: '',
 description: '',
 startDate: '',
 endDate: '',
 categories: [],
 maxTeams: undefined,
 isActive: true
})

// Estado de la aplicación
const categories = ref<Category[]>([])
const loading = ref(false)
const errors = ref<Record<string, string>>({})
const showConfirmation = ref(false)

// Estado inicial del formulario para detectar cambios
const initialFormData = ref<string>('')

// Computed para detectar cambios
const hasChanges = computed(() => {
 return JSON.stringify(formData.value) !== initialFormData.value
})

// Funciones
const loadCategories = () => {
 categories.value = teamService.getCategories()
}

const initializeForm = () => {
 if (mode === 'edit' && tournamentData) {
  formData.value = {
   name: tournamentData.name,
   description: tournamentData.description,
   startDate: tournamentData.startDate,
   endDate: tournamentData.endDate,
   categories: [...tournamentData.categories],
   maxTeams: tournamentData.maxTeams,
   isActive: tournamentData.isActive
  }
 } else {
  // Valores por defecto para crear
  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  formData.value = {
   name: '',
   description: '',
   startDate: today.toISOString().split('T')[0],
   endDate: nextWeek.toISOString().split('T')[0],
   categories: [],
   maxTeams: undefined,
   isActive: true
  }
 }

 // Guardar estado inicial
 initialFormData.value = JSON.stringify(formData.value)
}

const clearError = (field: string) => {
 delete errors.value[field]
}

const validateForm = (): boolean => {
 errors.value = {}

 if (!formData.value.name.trim()) {
  errors.value.name = 'El nombre del torneo es requerido'
 }

 if (!formData.value.description.trim()) {
  errors.value.description = 'La descripción es requerida'
 }

 if (!formData.value.startDate) {
  errors.value.startDate = 'La fecha de inicio es requerida'
 }

 if (!formData.value.endDate) {
  errors.value.endDate = 'La fecha de fin es requerida'
 }

 if (formData.value.startDate && formData.value.endDate) {
  if (new Date(formData.value.startDate) >= new Date(formData.value.endDate)) {
   errors.value.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio'
  }
 }

 if (formData.value.categories.length === 0) {
  errors.value.categories = 'Debe seleccionar al menos una categoría'
 }

 if (formData.value.maxTeams !== undefined && formData.value.maxTeams < 2) {
  errors.value.maxTeams = 'El máximo de equipos debe ser al menos 2'
 }

 return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
 if (!validateForm()) {
  return
 }

 loading.value = true

 try {
  let result

  if (mode === 'create') {
   result = tournamentService.createTournament(formData.value)
  } else {
   result = tournamentService.updateTournament(tournamentData!.id, formData.value)
  }

  if (result.success) {
   emit('save')
  } else {
   errors.value.general = result.error || 'Error al guardar el torneo'
  }
 } catch (error) {
  errors.value.general = 'Error interno del sistema'
  console.error('Error en handleSubmit:', error)
 } finally {
  loading.value = false
 }
}

const handleOverlayClick = () => {
 if (hasChanges.value) {
  showConfirmation.value = true
 } else {
  emit('close')
 }
}

const confirmClose = () => {
 showConfirmation.value = false
 emit('close')
}

const cancelClose = () => {
 showConfirmation.value = false
}

onMounted(() => {
 loadCategories()
 initializeForm()
})
</script>

<style scoped>
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
 overflow-y: auto;
 padding: 1rem;
}

.tournament-modal {
 background: var(--app-bg-secondary);
 border-radius: var(--border-radius-lg);
 max-width: 800px;
 width: 100%;
 max-height: 90vh;
 overflow-y: auto;
 box-shadow: var(--app-shadow);
 border: 1px solid var(--app-border-color);
 margin: auto;
}

.modal-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 1.5rem 2rem;
 border-bottom: 1px solid var(--app-border-color);
}

.modal-header h3 {
 color: var(--primary-blue);
 font-size: 1.4rem;
 margin: 0;
 font-weight: 600;
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
 padding: 2rem;
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

.input-group.full-width {
 grid-column: 1 / -1;
}

.input-group label {
 font-weight: 600;
 color: var(--app-text-primary);
 font-size: 0.9rem;
}

.form-input,
.form-textarea {
 padding: 0.75rem;
 border: 2px solid var(--app-border-color);
 border-radius: var(--border-radius-md);
 font-size: 1rem;
 transition: border-color var(--transition-normal);
 background: var(--app-input-bg);
 color: var(--app-text-primary);
}

.form-input:focus,
.form-textarea:focus {
 outline: none;
 border-color: var(--primary-blue);
 box-shadow: 0 0 0 3px rgba(0, 94, 180, 0.1);
}

.form-input.error,
.form-textarea.error {
 border-color: var(--danger);
}

.form-textarea {
 resize: vertical;
 min-height: 80px;
 font-family: inherit;
}

.input-help {
 font-size: 0.8rem;
 color: var(--app-text-secondary);
 margin-top: -0.25rem;
}

.error-message {
 color: var(--danger);
 font-size: 0.8rem;
 font-weight: 500;
}

.checkbox-label {
 display: flex;
 align-items: center;
 gap: 0.5rem;
 cursor: pointer;
 font-weight: 500 !important;
}

.form-checkbox {
 width: 16px;
 height: 16px;
 margin: 0;
}

.categories-selection {
 margin-top: 0.5rem;
}

.no-categories-message {
 padding: 1rem;
 background: var(--app-input-bg);
 border-radius: var(--border-radius-md);
 color: var(--app-text-secondary);
 font-style: italic;
 text-align: center;
 border: 1px solid var(--app-border-color);
}

.categories-checkboxes {
 display: flex;
 flex-direction: column;
 gap: 0.75rem;
}

.category-checkbox {
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

.category-checkbox:hover {
 border-color: var(--primary-blue);
 background: var(--app-hover-bg);
}

.category-checkbox input[type="checkbox"] {
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

.form-actions {
 display: flex;
 gap: 1rem;
 margin-top: 1rem;
 padding-top: 1rem;
 border-top: 1px solid var(--app-border-color);
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
 flex: 1;
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
 flex: 1;
}

.btn-secondary:hover {
 background: var(--app-hover-bg);
 border-color: var(--primary-blue);
}

/* Responsive */
@media (max-width: 768px) {
 .modal-overlay {
  padding: 0.5rem;
 }

 .tournament-modal {
  max-width: 100%;
  margin: 0;
 }

 .modal-header {
  padding: 1rem 1.5rem;
 }

 .modal-body {
  padding: 1.5rem;
 }

 .form-row {
  grid-template-columns: 1fr;
  gap: 1rem;
 }

 .form-actions {
  flex-direction: column;
 }
}
</style>
