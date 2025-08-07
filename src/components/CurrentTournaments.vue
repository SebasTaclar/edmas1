<template>
  <section class="current-tournaments">
    <h2>Torneos en Curso</h2>
    <div class="tournaments-grid">
      <div v-for="tournament in tournaments" :key="tournament.id" class="tournament-card">
        <img :src="tournament.image" :alt="tournament.name">
        <h3>{{ tournament.name }}</h3>
        <p>{{ tournament.teams }} equipos</p>
        <p>{{ tournament.period }}</p>
        <router-link :to="`/tournament/${tournament.id}`">Ver Detalles</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const tournaments = [
  {
    id: 1,
    name: 'Tournament 1',
    teams: 16,
    period: 'jun - oct 2025',
    image: '/images/torneo_encurso_M.jpg'
  },
  {
    id: 2,
    name: 'Tournament 2', 
    teams: 12,
    period: 'jul - nov 2025',
    image: '/images/torneo_encurso_F.jpg'
  },
  {
    id: 3,
    name: 'Tournament 3',
    teams: 8,
    period: 'ago - dic 2025', 
    image: '/images/torneo_encurso_I.jpg'
  }
]
</script>

<style scoped>
.current-tournaments {
  padding: 2rem;
}

.tournaments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tournament-card {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tournament-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.tournament-card h3 {
  margin: 1rem 0 0.5rem;
  color: #333;
}

.tournament-card p {
  margin: 0.25rem 0;
  color: #666;
}

.tournament-card a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.tournament-card a:hover {
  background: #2563eb;
}
</style>
