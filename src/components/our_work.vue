<template>
  <section class="events-section">
    <div class="events-header">
      <div class="icon-box">
        <i class="fas fa-calendar"></i>
      </div>
      <h2 class="section-title">Historial de Eventos</h2>
    </div>

    <div class="events-timeline">
      <div class="event-card">
        <div class="event-icon">
          <i class="fas fa-trophy"></i>
        </div>
        <div class="event-content">
          <h3>Final Copa Verano 2025</h3>
          <div class="event-date">15 de Febrero 2025</div>
          <p class="event-description">
            Tigres FC se coronó campeón tras vencer 4-2 a Real Madrid en una final épica. 
            Más de 200 espectadores presenciaron el encuentro.
          </p>
          <div class="event-tags">
            <span class="tag champion">🏆 Campeón: Tigres FC</span>
            <span class="tag scorer">⚽ Goleador: Carlos Mendez (3 goles)</span>
          </div>
        </div>
      </div>
         
         

        </div>
        <button class="nav-button next" @click="scrollRight">&gt;</button>
    
    
      <div class="event-card">
        <div class="event-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="event-content">
          <h3>Torneo Apertura 2025</h3>
          <div class="event-date">10 de Enero - 28 de Febrero 2025</div>
          <p class="event-description">
            16 equipos participaron en el torneo más competitivo del año. 
            Barcelona 7 sorprendió llegando a semifinales como revelación.
          </p>
          <div class="event-tags">
            <span class="tag teams">🏃 16 equipos</span>
            <span class="tag matches">⚽ 45 partidos</span>
          </div>
        </div>
      </div>
   
  </section>

</template>

<script setup lang="ts">
const openLightbox = (imagePath: string) => {
  // Add lightbox functionality here
  console.log('Opening lightbox for:', imagePath);
};

const scrollRight = () => {
  const container = document.querySelector('.carousel-track');
  if (container) {
    container.scrollLeft += 300;
  }
};
</script>

<style scoped>
.events-section {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1a2c38;
  border-radius: 15px;
}

.events-header {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1rem;
}

.icon-box {
  background-color: #00ff9d;
  padding: 1rem;
  border-radius: 12px;
  color: #1a2c38;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #00ff9d;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.events-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.event-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  border-left: 4px solid #00ff9d;
}

.event-icon {
  background-color: #00ff9d;
  color: #1a2c38;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.event-content {
  flex: 1;
}

.event-content h3 {
  font-size: 1.5rem;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.event-date {
  color: #00ff9d;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.event-description {
  color: #a0aec0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.event-tags {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.tag.champion {
  background-color: rgba(0, 255, 157, 0.1);
  color: #00ff9d;
  border: 1px solid rgba(0, 255, 157, 0.2);
}

.tag.scorer {
  background-color: rgba(255, 171, 0, 0.1);
  color: #ffab00;
  border: 1px solid rgba(255, 171, 0, 0.2);
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot:hover {
  background: rgba(255, 255, 255, 0.5);
}

.nav-dot.active {
  background: white;
  transform: scale(1.2);
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.carousel-track {
  display: flex;
  gap: 20px;
  padding: 20px;
  width: max-content;
}

.news-card {
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.4s ease;
  height: 300px;
  width: 280px;
  flex: 0 0 auto;
  background: #fff;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.news-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.news-card:hover {
  transform: translateY(-10px);
}

.news-card:hover::before {
  opacity: 1;
}

.news-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.news-card:hover img {
  transform: scale(1.1);
}

.news-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 25px;
  z-index: 2;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.news-card:hover .news-overlay {
  transform: translateY(0);
}

.news-overlay p {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

/* Lightbox styles */
.lightbox {
  display: none;
  position: fixed;
  z-index: 999;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
}

.lightbox-content {
  margin: auto;
  display: block;
  max-width: 80%;
  max-height: 80%;
}

.close {
  position: absolute;
  top: 30px;
  right: 45px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
</style>
