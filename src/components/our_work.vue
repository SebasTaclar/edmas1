<template>
  <section class="news-section">
    <h2 class="section-title">Nuestro Trabajo</h2>
    <div class="carousel-wrapper">
      <div class="carousel-container">
        <button class="nav-button prev" @click="scrollLeft">&lt;</button>
        <div class="carousel-track" ref="track">
          <div class="news-card" @click="openLightbox('/images/mainCarrousel2.jpg')">
            <img src="/images/mainCarrousel2.jpg" alt="Noticia 1">
            <div class="news-overlay">
              <p>Cómo impulsamos el fútbol femenino</p>
            </div>
          </div>
          <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
            <img src="/images/mainCarrousel1.jpg" alt="Noticia 2">
            <div class="news-overlay">
              <p>Cómo promovemos la igualdad de género en el deporte</p>
            </div>
          </div>
          <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
            <img src="/images/mainCarrousel1.jpg" alt="Noticia 3">
            <div class="news-overlay">
              <p>Cómo fomentamos el juego limpio</p>
            </div>
          </div>
          <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
            <img src="/images/mainCarrousel1.jpg" alt="Noticia 4">
            <div class="news-overlay">
              <p>El Aragón gana la Copa de las Regiones</p>
            </div>
          </div>

        </div>
        <button class="nav-button next" @click="scrollRight">&gt;</button>
      </div>
    </div>
    <div class="carousel-navigation">
      <button class="nav-dot" :class="{ active: currentIndex === 0 }" @click="scrollToIndex(0)"></button>
      <button class="nav-dot" :class="{ active: currentIndex === 1 }" @click="scrollToIndex(1)"></button>
      <button class="nav-dot" :class="{ active: currentIndex === 2 }" @click="scrollToIndex(2)"></button>
      <button class="nav-dot" :class="{ active: currentIndex === 3 }" @click="scrollToIndex(3)"></button>
    </div>

  </section>

  <!-- Lightbox Modal -->
  <div id="lightbox" class="lightbox" onclick="closeLightbox()">
    <span class="close">&times;</span>
    <img class="lightbox-content" id="lightbox-img">
  </div>

</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

const track = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
let isDown = false;
let startX: number;
let scrollPosition: number;

const scrollToIndex = (index: number) => {
  const container = track.value?.parentElement;
  if (!container) return;

  const cardWidth = 300; // ancho de la tarjeta + gap
  container.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  });
  currentIndex.value = index;
};

const scrollRight = () => {
  if (currentIndex.value < 3) {
    scrollToIndex(currentIndex.value + 1);
  }
};

const scrollLeft = () => {
  if (currentIndex.value > 0) {
    scrollToIndex(currentIndex.value - 1);
  }
};

function openLightbox(src: string): void {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img") as HTMLImageElement;

  if (lightbox && lightboxImg) {
    lightbox.style.display = "block";
    lightboxImg.src = src;
  }
}

function closeLightbox(): void {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
  }
}

onMounted(() => {
  const trackElement = track.value;
  if (!trackElement) return;

  trackElement.addEventListener('mousedown', (e: MouseEvent) => {
    isDown = true;
    trackElement.style.cursor = 'grabbing';
    startX = e.pageX - trackElement.offsetLeft;
    scrollPosition = trackElement.parentElement?.scrollLeft || 0;
  });

  trackElement.addEventListener('mouseleave', () => {
    isDown = false;
    trackElement.style.cursor = 'grab';
  });

  trackElement.addEventListener('mouseup', () => {
    isDown = false;
    trackElement.style.cursor = 'grab';
  });

  trackElement.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trackElement.offsetLeft;
    const walk = (x - startX) * 2;
    if (trackElement.parentElement) {
      trackElement.parentElement.scrollLeft = scrollPosition - walk;
    }
  });
});



</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #002366;
  /* Azul oscuro */
  color: #fff;
}

.news-section {
  padding: 40px;
  text-align: center;
  overflow: hidden;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.carousel-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.carousel-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  overflow-x: hidden;
  position: relative;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #002366;
  z-index: 2;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.nav-button.prev {
  left: 10px;
}

.nav-button.next {
  right: 10px;
}

.carousel-navigation {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
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
