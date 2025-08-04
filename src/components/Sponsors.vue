<template>
  <section class="sponsors-wrapper">
    <h2 class="sponsors-title">Nuestros Patrocinadores</h2>
    <div class="offerings" :style="{ '--duration': `${duration}s` }">
      <!-- Primer conjunto de logos -->
      <div class="brand" :style="{ '--bg': 'url(/images/hooky_1.jpg)' }">
        <img src="/images/hooky.jpg" alt="Hooky">
      </div>
      <div class="brand" :style="{ '--bg': 'url(/images/as_botin.jpg)' }">
        <img src="/images/as.jpg" alt="As">
      </div>
      <div class="brand" :style="{ '--bg': 'url(/images/kiger_1.jpg)' }">
        <img src="/images/kiger.jpg" alt="Kiger">
      </div>

    </div>
    <div class="sponsors-cta">
      <h3>Únete a Nosotros</h3>
      <p>Contáctanos</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SponsorsComponent',
});

// Duración de la animación en segundos
const duration = 15;
</script>

<style scoped>
.sponsors-wrapper {
  background: var(--bg-color);
  padding: 3rem 0;
  overflow: hidden;
}


.sponsors-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
}

.sponsors-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #ff4d4d, #ff8533);
  border-radius: 2px;
}

.sponsors-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

.sponsors-track {
  width: 100%;
  display: flex;
  position: relative;
}

.sponsors-content {
  display: flex;
  animation: scroll var(--duration) linear infinite;
  gap: 2rem;
}

.sponsor-item {
  flex: 0 0 300px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  transition: all 0.3s ease;
  margin: 0 1rem;
}

.sponsor-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.sponsor-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.sponsor-item:hover img {
  opacity: 1;
  transform: scale(1.05);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(calc(-50% - 15px));
  }

  100% {
    transform: translateX(0);
  }
}

.offerings:hover {
  animation-play-state: paused;
}

/* Pausa la animación cuando el usuario pasa el mouse por encima */
.sponsors-container:hover .sponsors-content {
  animation-play-state: paused;
}

@media (max-width: 768px) {
  .sponsor-item {
    flex: 0 0 150px;
    height: 80px;
  }

  .sponsors-section {
    padding: 2rem 0;
  }
}


.offerings {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  gap: 30px;
  padding: 20px;
  width: max-content;
  margin: 0 auto;
  animation: scroll var(--duration) linear infinite;
}

.brand {
  flex: 1;
  position: relative;
  background:
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.9) 80%),
    var(--bg) center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  min-height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.brand:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.brand img {
  width: 150px;
  z-index: 1;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
  border-radius: 50%;
}

.brand:hover img {
  transform: scale(1.1);
}

.sponsors-cta {
  text-align: center;
}

.sponsors-cta h3 {
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.sponsors-cta p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.sponsors-cta p:hover {
  color: #ff4d4d;
  border-bottom-color: #ff4d4d;
}

@media (max-width: 1024px) {
  .offerings {
    flex-direction: column;
    padding: 10px;
  }

  .brand {
    min-height: 300px;
  }

  .sponsors-title {
    font-size: 2.5rem;
  }

  .sponsors-cta h3 {
    font-size: 2rem;
  }
}
</style>
