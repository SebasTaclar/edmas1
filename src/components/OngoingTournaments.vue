<template>
  <section class="ongoing-tournaments">
    <div class="section-header">
      <h2>Torneos en curso</h2>
      <p class="section-subtitle">Descubre los torneos activos, próximos y sé parte de la competencia</p>
    </div>
    
    <div class="tournaments-grid">
      <div class="tournament-card">
        <div class="tournament-image">
          <img src="/images/torneo_encurso_M.jpg" alt="Torneo Regional">
          <div class="tournament-status active">En curso</div>
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
            <img src="/images/torneo_encurso_F.jpg" alt="Torneo Femenino">
            <div class="tournament-status upcoming">Próximamente</div>
          </div>
          <div class="tournament-content">
            <h3>F.7 - Rama Femenina 2025</h3>
            <div class="tournament-info">
              <div class="info-item">
                <i class="fas fa-users"></i>
                <span>18 equipos Aprox</span>
              </div>
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <span>Nov 2025</span>
              </div>
            </div>
            <div class="tournament-progress">
              <div class="progress-bar">
                <div class="progress" style="width: 0%"></div>
              </div>
              <span class="progress-text">Prox. Inscripciones abiertas</span>
            </div>
            <button class="view-details">Ver detalles</button>
          </div>
        </div>

        <div class="tournament-card">
          <div class="tournament-image">
            <img src="/images/torneo_encurso_I.jpg" alt="Torneo Infantil">
            <div class="tournament-status upcoming">Próximamente</div>
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
              <span class="progress-text">Prox. Inscripciones abiertas</span>
            </div>
            <button class="view-details">Ver detalles</button>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OngoingTournaments',
});
</script>

<style scoped>
.ongoing-tournaments {
  padding: 4rem 2rem;
  background-color: #001133;
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
  color: #ffffff;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #b3b9c5;
  max-width: 600px;
  margin: 0 auto;
}

.tournaments-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.tournament-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tournament-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.tournament-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.tournament-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tournament-card:hover .tournament-image img {
  transform: scale(1.05);
}

.tournament-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
}

.tournament-status.active {
  background: #4CAF50;
  color: white;
}

.tournament-status.upcoming {
  background: #FFC107;
  color: #000;
}

.tournament-content {
  padding: 1.5rem;
}

.tournament-content h3 {
  font-size: 1.25rem;
  margin: 0 0 1rem;
  color: white;
  font-weight: 600;
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
  color: #b3b9c5;
  font-size: 0.875rem;
}

.tournament-progress {
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress {
  height: 100%;
  background: #1E88E5;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: #b3b9c5;
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
  transition: all 0.3s ease;
}

.view-details:hover {
  background: #1565C0;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .tournaments-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }
  
  .tournaments-grid {
    grid-template-columns: 1fr;
  }
  
  .tournament-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .ongoing-tournaments {
    padding: 3rem 1rem;
  }
}

@media (max-width: 480px) {
  .tournament-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .info-item {
    justify-content: center;
  }
}
</style>
