<template>
    <section class="sponsors-wrapper">
    <div class="sponsors-header">
      <h2 class="sponsors-title">Nuestros Patrocinadores</h2>
      <p class="sponsors-subtitle">Orgullosos de contar con el apoyo de marcas líderes en el deporte</p>
    </div>
    
    <div class="sponsors-container">
      <div class="sponsors-track">
        <div class="sponsors-content">
          <div class="sponsor-item">
            <div class="sponsor-inner">
              <img src="/images/hooky.jpg" alt="Hooky" class="sponsor-image">
            </div>
          </div>
          <div class="sponsor-item">
            <div class="sponsor-inner">
              <img src="/images/as.jpg" alt="As" class="sponsor-image">
            </div>
          </div>
          <div class="sponsor-item">
            <div class="sponsor-inner">
              <img src="/images/kiger.jpg" alt="Kiger" class="sponsor-image">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sponsors-cta">
      <h3>Únete a Nosotros</h3>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SponsorsComponent',
});

// Duración de la animación en segundos (más lenta para mejor efecto)
const duration = 30;
</script>

<style scoped>
.sponsors-wrapper {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  padding: 1rem 0;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  width: 100%;
}

.sponsors-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent);
}

.sponsors-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 1.5rem;
  padding: 0 1rem;
}

.sponsors-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #031633;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #031633, #1a365d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
}

.sponsors-subtitle {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
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
  background: transparent;
  padding: 1rem 0;
  margin: 0 auto;
}

.sponsors-track {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
}

.sponsors-content {
  display: flex;
  gap: 4rem;
  padding: 1rem 0;
  justify-content: center;
}

.sponsor-item {
  flex: 0 0 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sponsor-inner {
  width: 100%;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
}

.sponsor-inner::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.7), transparent 70%);
  transform: translateX(-100%);
}

.sponsor-inner:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.sponsor-inner:hover::after {
  transform: translateX(100%);
}

.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  border-radius: 50%;
  object-position: center;
  transform: scale(1.02); /* Asegura que no haya bordes blancos */
}

.sponsor-inner:hover .sponsor-image {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .sponsor-item {
    flex: 0 0 120px;
    height: 120px;
  }
  
  .sponsor-inner {
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 70%;
  }

  .sponsor-image {
    padding: 0;
    object-position: center;
  }
}

@media (max-width: 480px) {
  .sponsor-item {
    flex: 0 0 70px;
    height: 70px;
  }
  
  .sponsor-inner {
    border-width: 1px;
  }

  .sponsors-cta {
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .sponsors-cta h3 {
    font-size: 1.6rem;
  }

  .sponsors-cta p {
    font-size: 1rem;
    padding: 0.4rem 1.2rem;
  }
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
    flex: 0 0 130px;
    height: 80px;
  }

  .sponsors-section {
    padding: 2rem 0;
  }

.sponsors-content{
  padding: 1.5rem 0;
      gap: 0.5rem;
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
  margin-top: 3rem;
  padding: 2rem;
 
  border-radius: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.sponsors-cta h3 {
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.sponsors-cta p {
  font-size: 1.1rem;
  color: #FFA500;
  margin: 0;
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border: 2px solid #FFA500;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.sponsors-cta p:hover {
  background: #FFA500;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
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
    font-size: 2.0rem;
  }

  .sponsors-cta h3 {
    font-size: 2rem;
  }
}
</style>
