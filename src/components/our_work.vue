<template>
  <section class="news-section">
    <h2>Nuestro trabajo</h2>
    <div class="news-grid">
      <div class="news-card" @click="openLightbox('/images/mainCarrousel2.jpg')">
        <img src="/images/mainCarrousel2.jpg" alt="Noticia 1">
        <div class="news-overlay">
          <p>Promovemos el juego limpio</p>
        </div>
      </div>
      <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
        <img src="/images/mainCarrousel1.jpg" alt="Noticia 2">
        <div class="news-overlay">
          <p>Promovemos la inclusión en el fútbol</p>
        </div>
      </div>
      <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
        <img src="/images/mainCarrousel1.jpg" alt="Noticia 3">
        <div class="news-overlay">
          <p>Nos basamos en la integridad y el respeto en el fútbol</p>
        </div>
      </div>
      <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
        <img src="/images/mainCarrousel1.jpg" alt="Noticia 4">
        <div class="news-overlay">
          <p>La UEFA anuncia el lanzamiento de un innovador estudio conjunto sobre la carga en los jugadores</p>
        </div>
      </div>
      <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
        <img src="/images/mainCarrousel1.jpg" alt="Noticia 5">
        <div class="news-overlay">
          <p>Comienza el sueño para los aspirantes europeos</p>
        </div>
      </div>
      <div class="news-card" @click="openLightbox('/images/mainCarrousel1.jpg')">
        <img src="/images/mainCarrousel1.jpg" alt="Noticia 6">
        <div class="news-overlay">
          <p>Lee los informes técnicos oficiales: 2024/25</p>
        </div>
      </div>
        </div>
  </section>


  <!-- Lightbox Modal -->
<div id="lightbox" class="lightbox" onclick="closeLightbox()">
  <span class="close">&times;</span>
  <img class="lightbox-content" id="lightbox-img">
</div>

</template>

<script setup lang="ts">


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



</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #fff;
}

.news-section {
  padding: 60px 40px;
  text-align: left;
  background-color: #00205B;
  position: relative;
  overflow: hidden;
}

.news-section h2 {
  color: #ffffff;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 500;
  padding-left: 0.5rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.news-card {
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: transparent;
  aspect-ratio: 16/9;
}

.news-card:hover {
  transform: scale(1.02);
}

.news-card img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-overlay {
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);
  color: #fff;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.news-overlay p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 400;
}

@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .news-section {
    padding: 40px 20px;
  }
  
  .news-section h2 {
    font-size: 1.75rem;
  }
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
  background-color: rgba(13, 71, 161, 0.95);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.lightbox-content {
  margin: auto;
  display: block;
  max-width: 85%;
  max-height: 85%;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0,0,0,0.3);
  animation: lightbox-zoom 0.3s ease-out;
}

@keyframes lightbox-zoom {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.2s ease;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.close:hover {
  opacity: 1;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .news-section h2 {
    font-size: 2rem;
  }
  
  .news-card {
    max-width: 100%;
  }
  
  .lightbox-content {
    max-width: 95%;
  }
  
  .close {
    top: 15px;
    right: 20px;
  }
}

</style>
