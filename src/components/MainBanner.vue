<template>
  <section class="hero">
    <div class="hero-container">
      <!-- Lado izquierdo con contenido -->
      <div class="hero-content">
        <div class="hero-title">
          <h1>EXPERTOS EN
            OUTSOURCING</h1>
        </div>

        <div class="hero-visual mobile-order">
          <div class="images-container">
            <div class="image-circle image-1">
              <img src="/images/mainBanner5.jpg" alt="FODISERVICES - Outsourcing profesional">
            </div>
            <div class="image-circle image-2">
              <img src="/images/tornillos.jpg" alt="FODISERVICES - Equipo experto">
            </div>
            <div class="image-circle image-3">
              <img src="/images/mainBanner4.jpg" alt="FODISERVICES - Soluciones innovadoras">
            </div>
          </div>
        </div>

        <div class="hero-tags">
          <span class="tag">INNOVATIVE DESIGN</span>
          <span class="tag">TECHNICAL EXPERTISE</span>
          <span class="tag">CLIENT-FOCUSED</span>
        </div>

        <div class="hero-contact">
          <div class="contact-item">
            <a href="#offerings" class="contact-button">CONOCE MAS</a>
          </div>
        </div>
      </div>

      <!-- Lado derecho con imágenes circulares para desktop -->
      <div class="hero-visual desktop-only">
        <div class="images-container">
          <div class="image-circle image-1">
            <img src="/images/mainBanner5.jpg" alt="FODISERVICES - Outsourcing profesional">
          </div>
          <div class="image-circle image-2">
            <img src="/images/tornillos.jpg" alt="FODISERVICES - Equipo experto">
          </div>
          <div class="image-circle image-3">
            <img src="/images/mainBanner4.jpg" alt="FODISERVICES - Soluciones innovadoras">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Hero Section - Recreando el diseño exacto de la imagen */




.hero {
  background-image: url('/images/fondos_geometrico_2.png');
  /* Ruta corregida */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  z-index: 1;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.hero-content {
  color: white;
  z-index: 2;
  text-align: left;
  padding-left: 0;
  margin-left: 8rem;
}

.hero-title {
  margin-bottom: 1.3rem;
}

.hero-title h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -2px;
  text-align: left;
}

.hero-title .highlight {
  color: #FFA500;
  position: relative;
}

.hero-tags {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  text-align: left;
  justify-content: flex-start;
}

.tag {
  background-color: #FFA500;
  color: #031633;
  font-weight: 700;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.tag:hover {
  background-color: #E6940A;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 165, 0, 0.4);
}

.contact-button {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: #ffffff;
  margin-top: 1.0rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

a {
  text-decoration: none;
}

.hero-contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-item:hover {
  color: #FFA500;
  transform: translateX(8px);
}

.contact-item .icon {
  font-size: 1.3rem;
  width: 24px;
  text-align: center;
}

/* Lado derecho con imágenes circulares */
.hero-visual {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.images-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
}

.image-circle {
  position: absolute;
  border-radius: 50%;
  border: 5px solid #FFA500;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(255, 165, 0, 0.3);
  transition: all 0.4s ease;
}

.image-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(255, 165, 0, 0.5);
  border-color: #FFB733;
}

.image-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Posicionamiento original de las imágenes para desktop */
.image-1 {
  width: 290px;
  height: 290px;
  top: 5%;
  right: 50%;
  animation: float1 6s ease-in-out infinite;
}

.image-2 {
  width: 320px;
  height: 320px;
  top: 25%;
  right: 10%;
  animation: float2 8s ease-in-out infinite;
}

.image-3 {
  width: 290px;
  height: 290px;
  bottom: 10%;
  right: 40%;
  animation: float3 7s ease-in-out infinite;
}

/* Animaciones de flotación */
@keyframes float1 {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(2deg);
  }
}

@keyframes float2 {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-30px) rotate(-2deg);
  }
}

@keyframes float3 {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-15px) rotate(1deg);
  }
}

/* Efectos adicionales */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: radial-gradient(circle at center,
      rgba(255, 165, 0, 0.1) 0%,
      transparent 70%);
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle, rgba(255, 165, 0, 0.15) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: 15px 15px;
  pointer-events: none;
  opacity: 0.3;
}

/* Responsive Design */
/* Responsive Design */

/* ------------------ RESPONSIVE DESIGN ------------------ */
/* ------------------ RESPONSIVE HERO ------------------ */
.mobile-order {
  display: none;
}

.desktop-only {
  display: block;
}

@media (max-width: 1024px) {
  .hero {
    min-height: auto;
    max-height: none;
    padding: 2rem 0;
  }

  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
    text-align: center;
    justify-items: center;
    margin-top: 2rem;
  }

  .hero-content {
    margin-left: 0 !important;
    padding-left: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .desktop-only {
    display: none;
  }

  .mobile-order {
    display: block;
    order: 2;
    margin: 2rem 0;
    height: 300px;
    width: 100%;
  }

  .hero-title h1 {
    font-size: 2.2rem;
    letter-spacing: -1px;
    text-align: center;
  }

  .hero-tags {
    justify-content: center;
    flex-wrap: wrap;
    order: 3;
  }

  .hero-contact {
    align-items: center;
    order: 4;
  }

  .hero-visual {
    height: 300px;
    padding: 1rem 0;
  }

  .mobile-order .images-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .mobile-order .image-circle {
    position: absolute;
    animation: none !important;
  }

  .mobile-order .image-1 {
    width: 160px !important;
    height: 160px !important;
    top: 5% !important;
    right: 50% !important;
    left: auto !important;
    transform: none !important;
  }

  .mobile-order .image-2 {
    width: 170px !important;
    height: 170px !important;
    top: 25% !important;
    right: -3% !important;
    left: auto !important;
    bottom: auto !important;
  }

  .mobile-order .image-3 {
    width: 150px !important;
    height: 150px !important;
    bottom: 10% !important;
    right: 40% !important;
    left: auto !important;
    top: auto !important;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 1rem 0 2rem 0;
  }

  .hero-content {
    margin-left: 0 !important;
    padding-left: 0 !important;
  }

  .mobile-order {
    height: 250px;
    width: 100%;
  }

  .hero-title h1 {
    font-size: 2rem;
    line-height: 1.3;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.5rem 0.9rem;
  }

  .contact-button {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }

  .contact-item {
    font-size: 1rem;
    flex-direction: row;
    justify-content: center;
  }

  .hero-visual {
    height: 250px;
    padding: 0.5rem 0;
  }

  .mobile-order .images-container {
    max-width: 100%;
  }

  /* Posicionamiento similar a desktop para móviles pequeños */
  .mobile-order .image-1 {
    width: 120px !important;
    height: 120px !important;
    top: 24% !important;
    right: 55% !important;
    left: auto !important;
    transform: none !important;
  }

  .mobile-order .image-2 {
    width: 120px !important;
    height: 120px !important;
    top: 24% !important;
    right: 10% !important;
    left: auto !important;
    bottom: auto !important;
  }

  .mobile-order .image-3 {
    width: 120px !important;
    height: 120px !important;
    bottom: 47% !important;
    right: 32% !important;
    left: auto !important;
    top: auto !important;
  }

  .hero-container {
    padding: 1rem;
    margin-top: 1rem;
  }
}
</style>
