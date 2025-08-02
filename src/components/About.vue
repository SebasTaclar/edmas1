<template>
  <section class="about-section">
    <div class="about-bg">
      <div class="floating-shapes shape-1"></div>
      <div class="floating-shapes shape-2"></div>
    </div>
    <div class="section-container">
      <div class="about-content">
        <div class="about-text">
          <h2>¿Por qué elegirnos?</h2>
          <p>
            En FODISERVICES, combinamos la experiencia de más de una década
            con tecnología de vanguardia para ofrecer soluciones de outsourcing
            que realmente transforman tu negocio.
          </p>
          <p>
            Nuestra empresa competitiva y destacada en el mercado del OutSourcing (Tercerización de procesos
            industriales), por sus altos estándares de calidad, responsabilidad y cumplimiento oportuno a nuestros
            clientes.
          </p>
          <p>
            Trabajamos bajo los más altos estándares de calidad y seguridad,
            adaptándonos a las necesidades específicas de cada industria y
            manteniendo siempre el foco en el crecimiento de tu empresa.
          </p>
        </div>
        <div class="stats-grid">
          <div class="stat-item" ref="statsSection">
            <span class="stat-number" data-value="500" data-suffix="+">0</span>
            <span class="stat-label">Clientes Satisfechos</span>
          </div>
          <div class="stat-item" ref="statsSection">
            <span class="stat-number" data-value="12">0</span>
            <span class="stat-label">Años de Experiencia</span>
          </div>
          <div class="stat-item" ref="statsSection">
            <span class="stat-number" data-value="98%" data-suffix="%">0</span>
            <span class="stat-label">Tasa de Satisfacción</span>
          </div>
          <div class="stat-item" ref="statsSection">
            <span class="stat-number" data-fixed="24/7">24/7</span>
            <span class="stat-label">Soporte Técnico</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

defineOptions({ name: 'AboutSection' });

import { onMounted, ref } from 'vue';

const statsSection = ref<HTMLElement | null>(null);
const timers: number[] = [];

function resetStats() {
  const numbers = document.querySelectorAll<HTMLElement>('.stat-number');
  numbers.forEach(el => {
    const fixed = el.dataset.fixed;
    el.innerText = fixed ? fixed : '0';
  });
}

function animateStats() {
  const numbers = document.querySelectorAll<HTMLElement>('.stat-number');

  numbers.forEach((el) => {
    const fixed = el.dataset.fixed;
    if (fixed) {
      el.innerText = fixed;
      return;
    }

    const value = parseInt(el.dataset.value || '0');
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const increment = Math.max(1, Math.floor(value / 150)); // más lento
    const intervalTime = 30; // más lento

    const timer = window.setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      el.innerText = `${current}${suffix}`;
    }, intervalTime);

    timers.push(timer);
  });
}

onMounted(() => {
  if (!statsSection.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resetStats();      // reinicia al entrar
          animateStats();    // y vuelve a animar
        } else {
          timers.forEach(t => clearInterval(t)); // detener conteo si sale
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(statsSection.value);
});
</script>

<style scoped>
/* SECCIÓN ACERCA DE */

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.about-section {
  background: linear-gradient(135deg, #031633 0%, #031633 100%);
  padding: 5rem 2rem;
  position: relative;
  color: white;
}

.about-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.floating-shapes {
  position: absolute;
  width: 200px;
  height: 200px;
  opacity: 0.1;
}

.shape-1 {
  top: 10%;
  left: 10%;
  background: #ffa000;
  border-radius: 50% 0 50% 0;
  animation: float 6s ease-in-out infinite;
}

.shape-2 {
  top: 60%;
  right: 15%;
  background: #ff8f00;
  border-radius: 0 50% 0 50%;
  animation: float 8s ease-in-out infinite reverse;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
  color: #ffa000;
}

.about-text p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  text-align: justify;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 160, 0, 0.3);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffa000;
  display: block;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}


/* ANIMACIONES */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 📱 Responsive para pantallas medianas y pequeñas */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    /* Cambia a una sola columna */
    gap: 3rem;
    text-align: center;
  }

  .about-text h2 {
    font-size: 2rem;
  }

  .about-text p {
    font-size: 1.0rem;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    /* 2 columnas en tablets */
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    /* 1 columna en celulares */
  }

  .stat-item {
    padding: 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.95rem;
  }

  .floating-shapes {
    display: none;
    /* Oculta decoraciones en móviles */
  }

  .about-section {
    padding: 3rem 1rem;
  }
}
</style>
