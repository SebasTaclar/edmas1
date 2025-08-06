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
        <!-- Logo del carrusel -->
        <div class="hero-logo">
          <img src="/images/logo.png" alt="Ed90+1 Logo" class="carousel-logo" />
        </div>

        <div class="hero-title">
          <h1>{{ slides[currentSlide].title }}</h1>
        </div>

        <div class="hero-description">
          <p>{{ slides[currentSlide].description }}</p>
        </div>

        <!-- Sección de torneos destacados -->
        <div class="tournaments-section">
          <h3 class="tournaments-title">Partidos y sorteos</h3>
          <div class="tournaments-carousel-container">
            <div class="tournaments-carousel" :style="{ transform: `translateX(-${currentTournamentSlide * (100 / tournamentsPerView)}%)` }">
              <div class="tournament-card">
                <div class="tournament-badge">
                  <span class="tournament-icon">🏆</span>
                  <span class="tournament-league">Conoce nuestros torneos</span>
                </div>
                <div class="tournament-info">
                  <span class="tournament-time">Accede a las estadisticas</span>
                  <h4 class="tournament-name">Los mejores equipos, la mejor organizacion</h4>
                </div>
                <button class="tournament-btn" @click="scrollToTournaments">Ver más detalles</button>
              </div>

              <div class="tournament-card">
                <div class="tournament-badge">
                  <span class="tournament-icon">🏆</span>
                  <span class="tournament-league">Revisa las estadisticas</span>
                </div>
                <div class="tournament-info">
                  <span class="tournament-time">ver detalles de los partidos</span>
                  <h4 class="tournament-name">Los mejores equipos, jugadores y porteros</h4>
                </div>
                <button class="tournament-btn">Ver más detalles</button>
              </div>

              <div class="tournament-card">
                <div class="tournament-badge">
                  <span class="tournament-icon">⚽</span>
                  <span class="tournament-league">UEFA Champions League</span>
                </div>
                <div class="tournament-info">
                  <span class="tournament-time">4 ago • 5:00</span>
                  <h4 class="tournament-name">Sorteo de los play-offs</h4>
                </div>
                <button class="tournament-btn">Ver más detalles</button>
              </div>

              <div class="tournament-card">
                <div class="tournament-badge">
                  <span class="tournament-icon">🏆</span>
                  <span class="tournament-league">Copa Libertadores</span>
                </div>
                <div class="tournament-info">
                  <span class="tournament-time">5 ago • 8:30</span>
                  <h4 class="tournament-name">Semifinales</h4>
                </div>
                <button class="tournament-btn">Ver más detalles</button>
              </div>

              <div class="tournament-card">
                <div class="tournament-badge">
                  <span class="tournament-icon">⚽</span>
                  <span class="tournament-league">Liga Bogotá</span>
                </div>
                <div class="tournament-info">
                  <span class="tournament-time">6 ago • 4:00</span>
                  <h4 class="tournament-name">Fecha 15</h4>
                </div>
                <button class="tournament-btn">Ver más detalles</button>
              </div>

              <div class="tournament-card">
                <div class="tournament-badge">
                  <span class="tournament-icon">🏆</span>
                  <span class="tournament-league">Copa Nacional</span>
                </div>
                <div class="tournament-info">
                  <span class="tournament-time">7 ago • 7:15</span>
                  <h4 class="tournament-name">Cuartos de final</h4>
                </div>
                <button class="tournament-btn">Ver más detalles</button>
              </div>
            </div>

            <!-- Controles del carrusel de torneos -->
            <button class="tournament-carousel-control prev" @click="prevTournament" v-show="currentTournamentSlide > 0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button class="tournament-carousel-control next" @click="nextTournament" v-show="currentTournamentSlide < maxTournamentSlide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>

          <!-- Indicadores de torneos (solo en móvil) -->
          <div class="tournament-indicators">
            <button
              v-for="n in Math.ceil(totalTournaments / tournamentsPerView)"
              :key="n"
              :class="{ 'active': currentTournamentSlide === n - 1 }"
              @click="currentTournamentSlide = n - 1"
              :aria-label="`Ir a grupo ${n} de torneos`">
            </button>
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
import { ref, onMounted, onUnmounted, computed, onBeforeUnmount } from 'vue'

// Configuración del carrusel principal
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

// Configuración del carrusel de torneos
const currentTournamentSlide = ref(0)
const totalTournaments = 6
const windowWidth = ref(window.innerWidth)

const tournamentsPerView = computed(() => {
  // En desktop mostrar 3, en tablet 2, en móvil 1
  if (windowWidth.value >= 1024) return 3
  if (windowWidth.value >= 768) return 2
  return 1
})

const maxTournamentSlide = computed(() => {
  return Math.max(0, totalTournaments - tournamentsPerView.value)
})

// Función para actualizar el ancho de ventana
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
  // Resetear slide si es necesario
  if (currentTournamentSlide.value > maxTournamentSlide.value) {
    currentTournamentSlide.value = 0
  }
}

// Funciones del carrusel principal
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

// Funciones del carrusel de torneos
const nextTournament = () => {
  if (currentTournamentSlide.value < maxTournamentSlide.value) {
    currentTournamentSlide.value++
  }
}

const prevTournament = () => {
  if (currentTournamentSlide.value > 0) {
    currentTournamentSlide.value--
  }
}

// Auto-play del carrusel principal
const startAutoPlay = () => {
  intervalId = window.setInterval(nextSlide, 6000)
}

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// Función para hacer scroll a la sección de torneos
const scrollToTournaments = () => {
  const tournamentsSection = document.getElementById('ongoing_tournaments')
  if (tournamentsSection) {
    tournamentsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

onMounted(() => {
  startAutoPlay()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('resize', updateWindowWidth)
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
    rgba(0, 20, 40, 0.7) 0%,
    rgba(0, 43, 96, 0.5) 50%,
    rgba(0, 64, 150, 0.3) 100%
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

/* Logo del carrusel */
.hero-logo {
  margin-bottom: 2rem;
  transition: all 0.5s ease-in-out;
}

.carousel-logo {
  height: 120px;
  width: auto;
  max-width: 280px;
  object-fit: contain;
  filter: brightness(1.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all var(--transition-normal);
}

.carousel-logo:hover {
  transform: scale(1.05);
  filter: brightness(1.4) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
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
  position: relative;
  z-index: 10;
}

.btn-primary {
  background: linear-gradient(135deg, #3c9af0 0%, #005eb4 100%);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  display: inline-block;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  background: linear-gradient(135deg, #005eb4 0%, #004096 100%);
}

.btn-secondary {
  background: transparent;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 2px solid #ffffff;
  display: inline-block;
}

.btn-secondary:hover {
  background: #ffffff;
  color: #005eb4;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

/* Sección de torneos */
.tournaments-section {
  margin-top: 3rem;
}

.tournaments-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 2rem;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.tournaments-carousel-container {
  position: relative;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
}

.tournaments-carousel {
  display: flex;
  transition: transform 0.3s ease-in-out;
  gap: 1rem;
}

.tournament-card {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  flex: 0 0 calc(33.333% - 0.667rem);
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tournament-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.tournament-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
}

.tournament-card:hover::before {
  opacity: 1;
}

.tournament-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

.tournament-icon {
  font-size: 1rem;
}

.tournament-league {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.tournament-info {
  margin-bottom: 1rem;
  flex-grow: 1;
}

.tournament-time {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.tournament-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--white);
  margin: 0.4rem 0 0 0;
  line-height: 1.2;
}

.tournament-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--white);
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  width: 100%;
}

.tournament-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

/* Controles del carrusel de torneos */
.tournament-carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
  z-index: 2;
  color: var(--white);
}

.tournament-carousel-control:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1);
}

.tournament-carousel-control.prev {
  left: -45px;
}

.tournament-carousel-control.next {
  right: -45px;
}

.tournament-carousel-control svg {
  width: 16px;
  height: 16px;
}

/* Indicadores de torneos */
.tournament-indicators {
  display: none;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tournament-indicators button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.tournament-indicators button.active {
  background: var(--white);
  transform: scale(1.2);
}

.tournament-indicators button:hover {
  background: rgba(255, 255, 255, 0.7);
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

  .tournament-card {
    flex: 0 0 calc(50% - 0.5rem);
  }

  .tournament-carousel-control.prev {
    left: -40px;
  }

  .tournament-carousel-control.next {
    right: -40px;
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

  .hero-description {
    display: none;
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

  .tournament-card {
    flex: 0 0 100%;
    min-height: 140px;
  }

  .tournaments-title {
    font-size: 1.4rem;
    text-align: center;
  }

  .tournament-carousel-control {
    width: 35px;
    height: 35px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .tournament-carousel-control:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .tournament-carousel-control.prev {
    left: -15px;
  }

  .tournament-carousel-control.next {
    right: -15px;
  }

  .tournament-carousel-control svg {
    width: 14px;
    height: 14px;
  }

  .tournament-indicators {
    display: flex;
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

  .carousel-logo {
    height: 90px;
    max-width: 220px;
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

  .carousel-logo {
    height: 70px;
    max-width: 180px;
  }

  .hero-logo {
    margin-bottom: 1.5rem;
  }
}</style>
