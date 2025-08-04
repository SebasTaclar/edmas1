<template>
  <section class="tournaments-section">
    <div class="section-header">
      <h2>Torneos en curso</h2>
      <p class="section-subtitle">Descubre los torneos activos, proximos y sé parte de la competencia</p>
    </div>

    <div class="tournaments-grid">
      <div class="tournament-card">
        <div class="tournament-image">
          <img src="/images/torneo_encurso_M.jpg" alt="Torneo Regional">
          <div class="tournament-status">En curso</div>
        </div>
        <div class="tournament-content">
          <h3>F.7 - Rama masculina 2025</h3>
          <div class="tournament-info">
            <div class="info-item">
              <i class="fas fa-users"></i>
              <span>27 equipos</span>
            </div>
            <div class="info-item">
              <i class="fas fa-calendar"></i>
              <span>Jul - Oct 2025</span>
            </div>
          </div>
          <div class="tournament-progress">
            <div class="progress-bar">
              <div class="progress" style="width: 15%"></div>
            </div>
            <span class="progress-text">Fase de grupos</span>
          </div>
          <button class="view-details">Ver detalles</button>
        </div>
      </div>

      <div class="tournament-card">
        <div class="tournament-image">
          <img src="/images/torneo_encurso_F.jpg" alt="Torneo Juvenil">
          <div class="tournament-status">En curso</div>
        </div>
        <div class="tournament-content">
          <h3>F.7 - Rama Femenina 2025</h3>
          <div class="tournament-info">
            <div class="info-item">
              <i class="fas fa-users"></i>
              <span>6 equipos</span>
            </div>
            <div class="info-item">
              <i class="fas fa-calendar"></i>
              <span>Ene 2025</span>
            </div>
          </div>
          <div class="tournament-progress">
            <div class="progress-bar">
              <div class="progress" style="width: 60%"></div>
            </div>
            <span class="progress-text">Fase final</span>
          </div>
          <button class="view-details">Ver detalles</button>
        </div>
      </div>

      <div class="tournament-card">
        <div class="tournament-image">
          <img src="/images/torneo_encurso_I.jpg" alt="Liga Femenina">
          <div class="tournament-status">En curso</div>
        </div>
        <div class="tournament-content">
          <h3>F.7 - Rama Infantil 2025</h3>
          <div class="tournament-info">
            <div class="info-item">
              <i class="fas fa-users"></i>
              <span>8 equipos</span>
            </div>
            <div class="info-item">
              <i class="fas fa-calendar"></i>
              <span>Dic 2025</span>
            </div>
          </div>
          <div class="tournament-progress">
            <div class="progress-bar">
              <div class="progress" style="width: 0%"></div>
            </div>
            <span class="progress-text">-</span>
          </div>
          <button class="view-details">Ver detalles</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CurrentTournaments'
});
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
