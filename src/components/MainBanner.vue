<template>
  <section class="hero">
    <!-- Carrusel de imágenes de fondo -->
    <div class="carousel-container">
      <div class="carousel-slide"
           v-for="(slide, index) in slides"
           :key="index"
           :class="{ 'active': currentSlide === index }"
           :style="{ backgroundImage: `url(${slide.image})` }">
        <div class="slide-overlay"></div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="hero-container">
      <div class="hero-content">


        <div class="hero-title">
          <h1>{{ slides[currentSlide].title }}</h1>
          <h2>Fútbol y Pasión en Bogotá</h2>
        </div>

        <div class="hero-description">
          <p>{{ slides[currentSlide].description }}</p>
        </div>

        <div class="hero-actions">
          <a href="#offerings" class="btn-primary">Empezar Ahora</a>
          <a href="#about" class="btn-secondary">Conocer Más</a>
        </div>

        <div class="hero-features">
          <div class="feature-item">
            <div class="feature-icon">⚽</div>
            <span>Gestión de Equipos</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🏆</div>
            <span>Tabla de Posiciones</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <span>Estadísticas Avanzadas</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicadores del carrusel -->
    <div class="carousel-indicators">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ 'active': currentSlide === index }"
        @click="goToSlide(index)"
        :aria-label="`Ir a imagen ${index + 1}`">
      </button>
    </div>

    <!-- Controles de navegación -->
    <button class="carousel-control prev" @click="prevSlide" aria-label="Imagen anterior">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15,18 9,12 15,6"></polyline>
      </svg>
    </button>
    <button class="carousel-control next" @click="nextSlideManual" aria-label="Siguiente imagen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9,18 15,12 9,6"></polyline>
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Configuración del carrusel
const slides = ref([
  {
    image: '/images/mainCarrousel1.jpg',
    title: 'Bienvenido a la Pasión del Fútbol',
    description: 'Una página dedicada a los apasionados del fútbol, donde podrás vivir la emoción del deporte rey y conectarte con otros fanáticos.'
  },
  {
    image: '/images/mainCarrousel2.jpg',
    title: 'Torneos, Sesiones de Fotos y Arbitraje',
    description: 'Organizamos torneos profesionales, sesiones de fotos deportivas y contamos con arbitraje certificado para tus competiciones.'
  },
  {
    image: '/images/mainCarrousel3.jpg',
    title: 'Atención Médica Especializada',
    description: 'Contamos con servicios de atención médica deportiva para garantizar la seguridad y bienestar de todos los participantes.'
  },
  {
    image: '/images/mainCarrousel4.jpg',
    title: '¡Te Esperamos en el Mejor Torneo de Bogotá!',
    description: 'Participa en el torneo de fútbol más emocionante de Bogotá. ¡Ven y demuestra tu talento en las canchas!'
  }
])

const currentSlide = ref(0)
let intervalId: number | null = null

// Funciones del carrusel
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const nextSlideManual = () => {
  nextSlide()
  // Reiniciar el temporizador cuando se cambie manualmente
  stopAutoPlay()
  startAutoPlay()
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
  // Reiniciar el temporizador cuando se cambie manualmente
  stopAutoPlay()
  startAutoPlay()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  // Reiniciar el temporizador cuando se cambie manualmente
  stopAutoPlay()
  startAutoPlay()
}

// Auto-play del carrusel
const startAutoPlay = () => {
  intervalId = window.setInterval(nextSlide, 6000)
}

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  max-height: 900px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
}

/* Carrusel de imágenes */
.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 43, 96, 0.8) 0%,
    rgba(0, 64, 150, 0.6) 50%,
    rgba(0, 94, 180, 0.4) 100%
  );
}

/* Contenido principal */
.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  text-align: center;
}

.hero-content {
  color: var(--white);
  max-width: 800px;
  margin: 0 auto;
  transition: opacity 0.5s ease-in-out;
}

.hero-badge {
  display: inline-block;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--secondary-blue), var(--primary-blue));
  padding: 0.5rem 1.5rem;
  border-radius: var(--border-radius-xl);
  border: 2px solid var(--white);
  box-shadow: var(--shadow-medium);
}

.badge-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-title {
  margin-bottom: 2rem;
  transition: all 0.5s ease-in-out;
}

.hero-title h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  letter-spacing: -2px;
  background: linear-gradient(135deg, var(--white) 0%, var(--secondary-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.5s ease-in-out;
}

.hero-title h2 {
  font-size: 1.3rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  transition: all 0.5s ease-in-out;
  line-height: 1.4;
}

.hero-description {
  margin-bottom: 2.5rem;
  transition: all 0.5s ease-in-out;
}

.hero-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  transition: all 0.5s ease-in-out;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: linear-gradient(135deg, var(--secondary-blue) 0%, var(--primary-blue) 100%);
  color: var(--white);
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-medium);
  border: 2px solid transparent;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-heavy);
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--tertiary-blue) 100%);
}

.btn-secondary {
  background: transparent;
  color: var(--white);
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all var(--transition-normal);
  border: 2px solid var(--white);
}

.btn-secondary:hover {
  background: var(--white);
  color: var(--primary-blue);
  transform: translateY(-3px);
}

.hero-features {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all var(--transition-normal);
  min-width: 120px;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-item span {
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
}

/* Indicadores del carrusel */
.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
  z-index: 3;
}

.carousel-indicators button {
  width: 32px;
  height: 8px;
  border-radius: 4px;
  border: 2px solid var(--white);
  background: transparent;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.carousel-indicators button.active {
  background: var(--white);
  transform: scale(1.1);
}

.carousel-indicators button:hover {
  background: rgba(255, 255, 255, 0.7);
}

/* Controles de navegación */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
  z-index: 3;
  color: var(--white);
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

.carousel-control svg {
  width: 20px;
  height: 20px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero {
    min-height: 600px;
    max-height: 700px;
  }

  .hero-title h1 {
    font-size: 2.8rem;
  }

  .hero-features {
    gap: 1rem;
  }

  .feature-item {
    min-width: 100px;
    padding: 0.8rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 500px;
    max-height: 600px;
  }

  .hero-container {
    padding: 0 1rem;
  }

  .hero-title h1 {
    font-size: 2.2rem;
    letter-spacing: -1px;
  }

  .hero-title h2 {
    font-size: 1.1rem;
  }

  .hero-description p {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    width: 200px;
    text-align: center;
  }

  .hero-features {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .feature-item {
    flex-direction: row;
    min-width: 200px;
    padding: 0.6rem 1rem;
  }

  .feature-icon {
    font-size: 1.5rem;
    margin-bottom: 0;
    margin-right: 0.5rem;
  }

  .carousel-control {
    width: 40px;
    height: 40px;
  }

  .carousel-control.prev {
    left: 1rem;
  }

  .carousel-control.next {
    right: 1rem;
  }

  .carousel-control svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 450px;
  }

  .hero-title h1 {
    font-size: 1.8rem;
  }

  .hero-title h2 {
    font-size: 1rem;
  }

  .hero-badge {
    margin-bottom: 1rem;
    padding: 0.4rem 1rem;
  }

  .badge-text {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  .feature-item {
    min-width: 180px;
  }
}</style>
