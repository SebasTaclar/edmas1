<template>
  <section class="tournaments-section">
    <div class="section-header">
      <h2>Torneos en curso</h2>
      <p class="section-subtitle">Descubre los torneos activos, proximos y sé parte de la competencia</p>
    </div>

    <!-- Spinner de carga -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando torneos...</p>
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="loadTournaments" class="retry-button">Reintentar</button>
    </div>

    <!-- Mensaje cuando no hay torneos activos -->
    <div v-else-if="activeTournaments.length === 0" class="no-tournaments">
      <p>No hay torneos activos en este momento</p>
    </div>

    <!-- Grid de torneos activos -->
    <div v-else class="tournaments-grid">
      <div
        v-for="tournament in activeTournaments"
        :key="tournament.id"
        class="tournament-card"
      >
        <div class="tournament-image">
          <img
            :src="getTournamentImage(tournament)"
            :alt="tournament.name"
          >
          <div class="tournament-status">En curso</div>
        </div>
        <div class="tournament-content">
          <h3>{{ tournament.name }}</h3>
          <div class="tournament-info">
            <div class="info-item">
              <i class="fas fa-users"></i>
              <span>{{ tournament.maxTeams }} equipos max</span>
            </div>
            <div class="info-item">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDateRange(tournament.startDate, tournament.endDate) }}</span>
            </div>
          </div>
          <div class="tournament-progress">
            <div class="progress-bar">
              <div class="progress" :style="{ width: getTournamentProgress(tournament) + '%' }"></div>
            </div>
            <span class="progress-text">{{ getTournamentPhase(tournament) }}</span>
          </div>
          <button class="view-details">Ver detalles</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTournaments } from '@/composables/useTournaments'
import type { Tournament } from '@/types/TournamentType'

defineOptions({
  name: 'OngoingTournaments'
});

// Composable para gestión de torneos
const { tournaments, loading, error, loadTournaments } = useTournaments()

// Computed para filtrar solo torneos activos
const activeTournaments = computed(() => {
  return tournaments.value.filter(tournament => tournament.isActive)
})

// Función para obtener la imagen del torneo
const getTournamentImage = (tournament: Tournament): string => {
  // Mapeo básico de imágenes basado en categorías o nombre del torneo
  const name = tournament.name.toLowerCase()

  if (name.includes('masculina') || name.includes('masculino')) {
    return '/images/torneo_encurso_M.jpg'
  } else if (name.includes('femenina') || name.includes('femenino')) {
    return '/images/torneo_encurso_F.jpg'
  } else if (name.includes('infantil') || name.includes('niños')) {
    return '/images/torneo_encurso_I.jpg'
  }

  // Imagen por defecto
  return '/images/torneo_encurso_M.jpg'
}

// Función para formatear el rango de fechas
const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startMonth = start.toLocaleDateString('es-ES', { month: 'short' })
  const endMonth = end.toLocaleDateString('es-ES', { month: 'short' })
  const year = end.getFullYear()

  if (startMonth === endMonth) {
    return `${startMonth} ${year}`
  }

  return `${startMonth} - ${endMonth} ${year}`
}

// Función para calcular el progreso del torneo
const getTournamentProgress = (tournament: Tournament): number => {
  const now = new Date()
  const start = new Date(tournament.startDate)
  const end = new Date(tournament.endDate)

  if (now < start) {
    return 0 // No ha comenzado
  } else if (now > end) {
    return 100 // Ha terminado
  } else {
    // Calcular progreso basado en fechas
    const totalDuration = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    return Math.round((elapsed / totalDuration) * 100)
  }
}

// Función para determinar la fase del torneo
const getTournamentPhase = (tournament: Tournament): string => {
  const progress = getTournamentProgress(tournament)

  if (progress === 0) {
    return 'Por comenzar'
  } else if (progress < 30) {
    return 'Fase de grupos'
  } else if (progress < 70) {
    return 'Fase intermedia'
  } else if (progress < 100) {
    return 'Fase final'
  } else {
    return 'Finalizado'
  }
}

// Cargar torneos al montar el componente
onMounted(() => {
  loadTournaments()
})
</script>

<style scoped>
.tournaments-section {
  padding: 60px 40px;
  background-color: #00205B;
  color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
}

.tournaments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.tournament-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
}

.tournament-card:hover {
  transform: translateY(-5px);
}

.tournament-image {
  position: relative;
  height: 200px;
}

.tournament-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tournament-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.tournament-content {
  padding: 1.5rem;
}

.tournament-content h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: white;
}

.tournament-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
}

.tournament-progress {
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress {
  height: 100%;
  background: #1E88E5;
  border-radius: 3px;
}

.progress-text {
  font-size: 0.875rem;
  color: #ccc;
}

.view-details {
  width: 100%;
  padding: 0.75rem;
  background: #1E88E5;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.view-details:hover {
  background: #1976D2;
}

.loading-container {
  text-align: center;
  padding: 4rem 0;
  color: #ccc;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #1E88E5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 4rem 0;
  color: #ff6b6b;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #1E88E5;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #1976D2;
}

.no-tournaments {
  text-align: center;
  padding: 4rem 0;
  color: #ccc;
  font-size: 1.1rem;
}

@media (max-width: 1024px) {
  .tournaments-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .tournaments-grid {
    grid-template-columns: 1fr;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .tournaments-section {
    padding: 40px 20px;
  }
}
</style>
