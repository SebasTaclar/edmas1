<template>
  <div class="admin-container">
    <div class="page-header">
      <h1>🛠️ MÓDULO ADMINISTRACIÓN</h1>
      <p>Gestión completa del sistema Ed90+1 - Equipos y Torneos</p>
    </div>

    <div class="dashboard-grid">
      <div class="card" @click="navigateTo('/admin/teams')">
        <div class="card-header">
          <h3>⚽ Administrar Equipos</h3>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="value">{{ teamsCount }}</span>
            <span class="label">Equipos registrados</span>
          </div>
          <div class="admin-indicator teams"></div>
          <div class="card-description">
            <p>Crear, editar y gestionar equipos del sistema. Asignar torneos y controlar accesos.</p>
          </div>
        </div>
      </div>

      <div class="card" @click="navigateTo('/admin/tournaments')">
        <div class="card-header">
          <h3>🏆 Administrar Torneos</h3>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="value">{{ tournamentsCount }}</span>
            <span class="label">Torneos activos</span>
          </div>
          <div class="admin-indicator tournaments"></div>
          <div class="card-description">
            <p>Crear y gestionar torneos. Configurar categorías, fechas y reglas de participación.</p>
          </div>
        </div>
      </div>

      <div class="card" @click="navigateTo('/admin/categories')">
        <div class="card-header">
          <h3>🏷️ Administrar Categorías</h3>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="value">{{ categoriesCount }}</span>
            <span class="label">Categorías disponibles</span>
          </div>
          <div class="admin-indicator categories"></div>
          <div class="card-description">
            <p>Crear y gestionar categorías para clasificar equipos según edad, género y nivel.</p>
          </div>
        </div>
      </div>

      <div class="card stats-card">
        <div class="card-header">
          <h3>📊 Estadísticas Generales</h3>
        </div>
        <div class="card-content">
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ activeTeamsCount }}</span>
              <span class="stat-label">Equipos Activos</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ activeTournamentsCount }}</span>
              <span class="stat-label">Torneos Activos</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ totalRegistrations }}</span>
              <span class="stat-label">Registros Totales</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ categoriesCount }}</span>
              <span class="stat-label">Categorías</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card activities-card">
        <div class="card-header">
          <h3>📋 Actividades Recientes</h3>
        </div>
        <div class="card-content">
          <div class="activities-list">
            <div class="activity-item">
              <div class="activity-icon">⚽</div>
              <div class="activity-content">
                <h4>Nuevo Equipo Registrado</h4>
                <p>Se registró un nuevo equipo en la categoría adultos</p>
                <span class="activity-time">Hace 2 horas</span>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">🏆</div>
              <div class="activity-content">
                <h4>Torneo Creado</h4>
                <p>Se creó el torneo "Copa Ed90+1 Verano 2025"</p>
                <span class="activity-time">Ayer</span>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">✅</div>
              <div class="activity-content">
                <h4>Equipo Activado</h4>
                <p>Se activó el equipo "Los Leones FC"</p>
                <span class="activity-time">Hace 3 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCategories } from '@/composables/useCategories';
import teamService from '@/utils/teamService';
import tournamentService from '@/utils/tournamentService';

defineOptions({
  name: 'AdminView',
})

const router = useRouter();

// Usar el composable de categorías
const { categories, loadCategories } = useCategories();

// Estado reactivo
const teams = ref<any[]>([]);
const tournaments = ref<any[]>([]);

// Computed properties para estadísticas
const teamsCount = computed(() => teams.value.length);
const tournamentsCount = computed(() => tournaments.value.length);
const activeTeamsCount = computed(() => teams.value.filter(team => team.isActive).length);
const activeTournamentsCount = computed(() => tournaments.value.filter(tournament => tournament.isActive).length);
const categoriesCount = computed(() => categories.value.length);

// Cálculo simple de registros totales (equipos * torneos promedio)
const totalRegistrations = computed(() => {
  return teams.value.reduce((total, team) => total + (team.tournaments?.length || 0), 0);
});

// Funciones
const loadData = async () => {
  teams.value = teamService.getAllTeams();
  tournaments.value = tournamentService.getAllTournaments(true); // Incluir inactivos
  await loadCategories(); // Cargar categorías desde la API
};

const navigateTo = (path: string) => {
  router.push(path);
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.admin-container {
  padding: 2rem;
  padding-top: 80px;
  background: var(--app-bg-primary);
  color: var(--app-text-primary);
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: var(--primary-blue);
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.page-header p {
  color: var(--app-text-secondary);
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: var(--app-bg-secondary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--app-shadow);
  overflow: hidden;
  transition: all var(--transition-normal);
  cursor: pointer;
  border: 1px solid var(--app-border-color);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 94, 180, 0.15);
}

.card.stats-card,
.card.activities-card {
  cursor: default;
}

.card.stats-card:hover,
.card.activities-card:hover {
  transform: translateY(-2px);
}

.card-header {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
  color: var(--white);
  padding: 1.5rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.card-content {
  padding: 2rem;
  position: relative;
}

.metric {
  text-align: center;
  margin-bottom: 1rem;
}

.value {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.label {
  color: var(--app-text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  right: 1rem;
  animation: pulse 2s infinite;
}

.admin-indicator.teams {
  background-color: var(--secondary-blue);
}

.admin-indicator.tournaments {
  background-color: var(--tertiary-blue);
}

.admin-indicator.categories {
  background-color: #4caf50;
}

.card-description {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--app-border-color);
}

.card-description p {
  color: var(--app-text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: var(--app-input-bg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--app-border-color);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--app-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--app-input-bg);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  border: 1px solid var(--app-border-color);
}

.activity-item:hover {
  background: var(--app-hover-bg);
}

.activity-icon {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
  align-self: flex-start;
  margin-top: 0.2rem;
}

.activity-content {
  flex: 1;
}

.activity-content h4 {
  margin: 0 0 0.3rem 0;
  color: var(--app-text-primary);
  font-size: 1rem;
  font-weight: 600;
}

.activity-content p {
  margin: 0 0 0.3rem 0;
  color: var(--app-text-secondary);
  font-size: 0.9rem;
}

.activity-time {
  color: var(--app-text-secondary);
  font-size: 0.8rem;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
    padding-top: 110px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
