<template>
 <div class="modal-backdrop" @click="handleBackdropClick">
  <div class="modal-content" @click.stop>
   <div class="modal-header">
    <h2>{{ isEditing ? 'Editar Jugador' : 'Agregar Jugador' }}</h2>
    <button @click="$emit('close')" class="close-btn">
     <i class="fas fa-times"></i>
    </button>
   </div>

   <div class="modal-body">
    <form @submit.prevent="handleSubmit" class="player-form">
     <!-- Información básica -->
     <div class="form-section">
      <h3>Información Personal</h3>

      <div class="form-group">
       <label for="firstName">Nombre *</label>
       <input id="firstName" v-model="formData.firstName" type="text" required placeholder="Nombre del jugador"
        :class="{ 'error': errors.firstName }" />
       <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
      </div>

      <div class="form-group">
       <label for="lastName">Apellido *</label>
       <input id="lastName" v-model="formData.lastName" type="text" required placeholder="Apellido del jugador"
        :class="{ 'error': errors.lastName }" />
       <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
      </div>

      <div class="form-group">
       <label for="email">Correo Electrónico *</label>
       <input id="email" v-model="formData.email" type="email" required placeholder="correo@ejemplo.com"
        :class="{ 'error': errors.email }" />
       <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>

      <div class="form-row">
       <div class="form-group">
        <label for="jerseyNumber">Número de Camiseta *</label>
        <input id="jerseyNumber" v-model.number="formData.jerseyNumber" type="number" required min="1" max="99"
         placeholder="1-99" :class="{ 'error': errors.jerseyNumber }" />
        <span v-if="errors.jerseyNumber" class="error-text">{{ errors.jerseyNumber }}</span>
       </div>

       <div class="form-group">
        <label for="dateOfBirth">Fecha de Nacimiento *</label>
        <input id="dateOfBirth" v-model="formData.dateOfBirth" type="date" required :max="maxDate"
         :class="{ 'error': errors.dateOfBirth }" />
        <span v-if="errors.dateOfBirth" class="error-text">{{ errors.dateOfBirth }}</span>
       </div>
      </div>

      <div class="form-row">
       <div class="form-group">
        <label for="phone">Teléfono Celular *</label>
        <input id="phone" v-model="formData.phone" type="tel" required placeholder="3001234567"
         :class="{ 'error': errors.phone }" />
        <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
       </div>

       <div class="form-group">
        <label for="position">Posición</label>
        <select id="position" v-model="formData.position" :class="{ 'error': errors.position }">
         <option value="">Seleccionar posición</option>
         <option value="Portero">Portero</option>
         <option value="Defensa">Defensa</option>
         <option value="Mediocampista">Mediocampista</option>
         <option value="Delantero">Delantero</option>
        </select>
        <span v-if="errors.position" class="error-text">{{ errors.position }}</span>
       </div>
      </div>

      <div class="form-group">
       <label for="identificationNumber">Número de Cédula</label>
       <input id="identificationNumber" v-model="formData.identificationNumber" type="text"
        placeholder="Número de identificación" :class="{ 'error': errors.identificationNumber }" />
       <span v-if="errors.identificationNumber" class="error-text">{{ errors.identificationNumber }}</span>
      </div>
     </div>

     <!-- Foto del jugador -->
     <div class="form-section">
      <h3>Foto de Identificación</h3>

      <!-- Vista previa de foto existente -->
      <div v-if="currentPhotoUrl && !newPhotoFile" class="current-photo">
       <img :src="currentPhotoUrl" alt="Foto actual" class="photo-preview" />
       <p class="photo-label">Foto actual</p>
       <button type="button" @click="removeCurrentPhoto" class="btn-remove-photo">
        <i class="fas fa-trash"></i> Eliminar foto actual
       </button>
      </div>

      <!-- Zona de subida de nueva foto -->
      <div class="photo-upload-zone" :class="{
       'dragover': isDragOver,
       'has-file': newPhotoFile
      }" @drop="handleDrop" @dragover.prevent="isDragOver = true" @dragleave="isDragOver = false"
       @click="triggerFileInput">
       <input ref="fileInput" type="file" accept="image/*" @change="handleFileSelect" style="display: none;" />

       <!-- Preview de nueva foto -->
       <div v-if="newPhotoFile" class="new-photo-preview">
        <img v-if="newPhotoPreview" :src="newPhotoPreview" alt="Nueva foto" class="photo-preview" />
        <p class="photo-label">Nueva foto seleccionada</p>
        <button type="button" @click.stop="removeNewPhoto" class="btn-remove-photo">
         <i class="fas fa-times"></i> Quitar
        </button>
       </div>

       <!-- Mensaje de upload -->
       <div v-else class="upload-message">
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
        <small>Formatos permitidos: JPG, PNG, GIF (máx. 5MB)</small>
       </div>
      </div>

      <span v-if="errors.photo" class="error-text">{{ errors.photo }}</span>
     </div>

     <!-- Botones de acción -->
     <div class="form-actions">
      <button type="button" @click="$emit('close')" class="btn-cancel">
       Cancelar
      </button>
      <button type="submit" class="btn-submit" :disabled="loading">
       <i v-if="loading" class="fas fa-spinner fa-spin"></i>
       {{ loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear') }}
      </button>
     </div>
    </form>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { usePlayers } from '@/composables/usePlayers'
import type { Player, CreatePlayerRequest, UpdatePlayerRequest } from '@/types/PlayerType'

// Props
interface Props {
 player?: Player | null
 teamId?: number
}

const props = withDefaults(defineProps<Props>(), {
 player: null,
 teamId: undefined
})

// Emits
const emit = defineEmits<{
 close: []
 save: [playerData: CreatePlayerRequest | UpdatePlayerRequest]
}>()

// Composables
const {
 createPlayer,
 updatePlayer,
 uploadPlayerPhoto,
 deletePlayerPhoto,
 loading
} = usePlayers()

// Estado del formulario
const formData = ref({
 firstName: '',
 lastName: '',
 email: '',
 phone: '',
 position: '',
 jerseyNumber: 1,
 dateOfBirth: '',
 identificationNumber: '',
 teamId: props.teamId || 0
})

// Estado de archivos
const newPhotoFile = ref<File | null>(null)
const newPhotoPreview = ref<string | null>(null)
const currentPhotoUrl = ref<string | null>(null)
const photoToDelete = ref(false)

// Estado de UI
const isDragOver = ref(false)
const fileInput = ref<HTMLInputElement>()
const errors = ref<Record<string, string>>({})

// Computed
const isEditing = computed(() => !!props.player)
const maxDate = computed(() => {
 const today = new Date()
 return today.toISOString().split('T')[0]
})

/**
 * Inicializar formulario
 */
onMounted(() => {
 if (props.player) {
  formData.value = {
   firstName: props.player.firstName,
   lastName: props.player.lastName,
   email: props.player.email,
   phone: props.player.phone,
   position: props.player.position || '',
   jerseyNumber: props.player.jerseyNumber,
   dateOfBirth: props.player.dateOfBirth.split('T')[0], // Convertir a formato de fecha
   identificationNumber: props.player.identificationNumber || '',
   teamId: props.teamId || props.player.teamId || 0
  }
  currentPhotoUrl.value = props.player.profilePhotoPath
 } else {
  formData.value.teamId = props.teamId || 0
 }
})

/**
 * Limpiar errores cuando cambian los valores
 */
watch(formData, () => {
 errors.value = {}
}, { deep: true })

/**
 * Validar formulario
 */
const validateForm = (): boolean => {
 errors.value = {}

 if (!formData.value.firstName.trim()) {
  errors.value.firstName = 'El nombre es requerido'
 }

 if (!formData.value.lastName.trim()) {
  errors.value.lastName = 'El apellido es requerido'
 }

 if (!formData.value.email.trim()) {
  errors.value.email = 'El correo electrónico es requerido'
 } else {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
   errors.value.email = 'El correo electrónico no es válido'
  }
 }

 if (!formData.value.phone.trim()) {
  errors.value.phone = 'El teléfono es requerido'
 } else {
  const phoneRegex = /^[3][0-9]{9}$/
  if (!phoneRegex.test(formData.value.phone.replace(/\s/g, ''))) {
   errors.value.phone = 'El teléfono debe tener 10 dígitos y comenzar con 3'
  }
 }

 if (!formData.value.jerseyNumber || formData.value.jerseyNumber < 1 || formData.value.jerseyNumber > 99) {
  errors.value.jerseyNumber = 'El número debe estar entre 1 y 99'
 }

 if (!formData.value.dateOfBirth) {
  errors.value.dateOfBirth = 'La fecha de nacimiento es requerida'
 }

 if (!formData.value.teamId || formData.value.teamId <= 0) {
  errors.value.teamId = 'El ID del equipo es requerido'
 }

 return Object.keys(errors.value).length === 0
}

/**
 * Manejar envío del formulario
 */
const handleSubmit = async () => {
 if (!validateForm()) return

 try {
  let result
  const playerData = {
   firstName: formData.value.firstName.trim(),
   lastName: formData.value.lastName.trim(),
   email: formData.value.email.trim(),
   phone: formData.value.phone.trim(),
   position: formData.value.position.trim() || undefined,
   jerseyNumber: formData.value.jerseyNumber,
   dateOfBirth: formData.value.dateOfBirth,
   identificationNumber: formData.value.identificationNumber.trim() || undefined,
   teamId: formData.value.teamId
  }

  if (isEditing.value && props.player) {
   // Actualizar jugador existente
   result = await updatePlayer(props.player.id, playerData)
  } else {
   // Crear nuevo jugador
   result = await createPlayer(playerData)
  }

  if (result.success && result.data) {
   // Manejar foto si es necesario
   await handlePhotoOperations(result.data.id)

   emit('save', playerData)
  } else {
   console.error('Error al guardar jugador:', result.message)
  }
 } catch (err) {
  console.error('Error en handleSubmit:', err)
 }
}

/**
 * Manejar operaciones de foto
 */
const handlePhotoOperations = async (playerId: number) => {
 try {
  // Si se marcó para eliminar la foto actual
  if (photoToDelete.value && currentPhotoUrl.value) {
   await deletePlayerPhoto(playerId)
  }

  // Si hay una nueva foto para subir
  if (newPhotoFile.value) {
   await uploadPlayerPhoto(playerId, newPhotoFile.value)
  }
 } catch (err) {
  console.error('Error al manejar foto:', err)
 }
}

/**
 * Manejar selección de archivo
 */
const handleFileSelect = (event: Event) => {
 const target = event.target as HTMLInputElement
 const file = target.files?.[0]
 if (file) {
  processFile(file)
 }
}

/**
 * Manejar drag & drop
 */
const handleDrop = (event: DragEvent) => {
 event.preventDefault()
 isDragOver.value = false

 const file = event.dataTransfer?.files[0]
 if (file) {
  processFile(file)
 }
}

/**
 * Procesar archivo seleccionado
 */
const processFile = (file: File) => {
 // Validar tipo de archivo
 if (!file.type.startsWith('image/')) {
  errors.value.photo = 'Solo se permiten archivos de imagen'
  return
 }

 // Validar tamaño (5MB)
 if (file.size > 5 * 1024 * 1024) {
  errors.value.photo = 'El archivo no puede ser mayor a 5MB'
  return
 }

 newPhotoFile.value = file

 // Crear preview
 const reader = new FileReader()
 reader.onload = (e) => {
  newPhotoPreview.value = e.target?.result as string
 }
 reader.readAsDataURL(file)

 // Limpiar errores
 delete errors.value.photo
}

/**
 * Activar input de archivo
 */
const triggerFileInput = () => {
 fileInput.value?.click()
}

/**
 * Quitar nueva foto
 */
const removeNewPhoto = () => {
 newPhotoFile.value = null
 newPhotoPreview.value = null
 if (fileInput.value) {
  fileInput.value.value = ''
 }
}

/**
 * Marcar foto actual para eliminar
 */
const removeCurrentPhoto = () => {
 photoToDelete.value = true
 currentPhotoUrl.value = null
}

/**
 * Manejar clic en backdrop
 */
const handleBackdropClick = () => {
 emit('close')
}
</script>

<style scoped>
.modal-backdrop {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background: rgb(0, 0, 0);
 display: flex;
 align-items: center;
 justify-content: center;
 z-index: 1000;
}

.modal-content {
 background: var(--app-surface);
 border-radius: 12px;
 width: 90%;
 max-width: 600px;
 max-height: 90vh;
 overflow-y: auto;
 box-shadow: 0 8px 24px rgb(0, 0, 0), 0 0 0 1px var(--app-border);
 border: 1px solid var(--app-border);
 transform: scale(1);
 transition: all 0.3s ease;
}

.modal-header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 20px 24px;
 border-bottom: 1px solid var(--app-border);
}

.modal-header h2 {
 margin: 0;
 color: var(--app-primary);
}

.close-btn {
 background: none;
 border: none;
 font-size: 24px;
 cursor: pointer;
 color: var(--app-text-muted);
 width: 40px;
 height: 40px;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: all 0.3s ease;
}

.close-btn:hover {
 background: var(--app-hover-bg);
 color: var(--app-text-primary);
}

.modal-body {
 padding: 24px;
}

.player-form {
 display: flex;
 flex-direction: column;
 gap: 24px;
}

.form-section {
 background: var(--app-surface-elevated);
 padding: 20px;
 border-radius: 8px;
 border: 1px solid var(--app-border-light);
}

.form-section h3 {
 margin: 0 0 16px 0;
 color: var(--app-text-primary);
 font-size: 1.1em;
 font-weight: 600;
}

.form-group {
 margin-bottom: 16px;
}

.form-row {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 16px;
}

.form-group label {
 display: block;
 margin-bottom: 6px;
 font-weight: 500;
 color: var(--app-text-primary);
}

.form-group input {
 width: 100%;
 padding: 12px;
 border: 2px solid var(--app-border);
 border-radius: 8px;
 font-size: 14px;
 transition: all 0.3s ease;
 background: var(--app-input-bg);
 color: var(--app-text-primary);
}

.form-group select {
 width: 100%;
 padding: 12px;
 border: 2px solid var(--app-border);
 border-radius: 8px;
 font-size: 14px;
 transition: all 0.3s ease;
 background: var(--app-input-bg);
 color: var(--app-text-primary);
 cursor: pointer;
}

.form-group input:focus,
.form-group select:focus {
 outline: none;
 border-color: var(--app-primary);
 box-shadow: 0 0 0 3px var(--app-primary-light);
}

.form-group input.error {
 border-color: var(--app-error);
}

.error-text {
 color: var(--app-error);
 font-size: 12px;
 margin-top: 4px;
 display: block;
}

/* Foto upload */
.current-photo,
.new-photo-preview {
 text-align: center;
 margin-bottom: 16px;
}

.photo-preview {
 width: 120px;
 height: 120px;
 object-fit: cover;
 border-radius: 50%;
 border: 4px solid #ddd;
 margin-bottom: 8px;
}

.photo-label {
 font-size: 14px;
 color: var(--text-muted);
 margin-bottom: 8px;
}

.btn-remove-photo {
 background: #dc3545;
 color: white;
 border: none;
 padding: 6px 12px;
 border-radius: 6px;
 font-size: 12px;
 cursor: pointer;
 transition: background 0.3s ease;
}

.btn-remove-photo:hover {
 background: #c82333;
}

.photo-upload-zone {
 border: 3px dashed #ddd;
 border-radius: 12px;
 padding: 40px 20px;
 text-align: center;
 cursor: pointer;
 transition: all 0.3s ease;
 background: #fafafa;
}

.photo-upload-zone:hover {
 border-color: var(--primary-color);
 background: #f0f8ff;
}

.photo-upload-zone.dragover {
 border-color: var(--primary-color);
 background: #e3f2fd;
}

.photo-upload-zone.has-file {
 border-color: var(--primary-color);
 background: white;
}

.upload-message i {
 font-size: 2em;
 color: var(--primary-color);
 margin-bottom: 12px;
 display: block;
}

.upload-message p {
 font-weight: 500;
 margin-bottom: 4px;
 color: var(--text-color);
}

.upload-message small {
 color: var(--text-muted);
}

/* Botones de acción */
.form-actions {
 display: flex;
 gap: 12px;
 justify-content: flex-end;
 margin-top: 24px;
 padding-top: 20px;
 border-top: 1px solid #eee;
}

.btn-cancel,
.btn-submit {
 padding: 12px 24px;
 border: none;
 border-radius: 8px;
 font-size: 14px;
 cursor: pointer;
 font-weight: 500;
 transition: all 0.3s ease;
}

.btn-cancel {
 background: #f8f9fa;
 color: var(--text-color);
 border: 1px solid #ddd;
}

.btn-cancel:hover {
 background: #e9ecef;
}

.btn-submit {
 background: var(--primary-color);
 color: white;
 display: flex;
 align-items: center;
 gap: 8px;
}

.btn-submit:hover:not(:disabled) {
 background: var(--primary-dark);
 transform: translateY(-2px);
}

.btn-submit:disabled {
 opacity: 0.6;
 cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
 .modal-content {
  width: 95%;
  margin: 20px;
 }

 .form-row {
  grid-template-columns: 1fr;
 }

 .form-actions {
  flex-direction: column;
 }

 .btn-cancel,
 .btn-submit {
  width: 100%;
 }
}
</style>
