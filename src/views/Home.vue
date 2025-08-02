<template>
  <main class="home-main">
    <section class="section">
      <MainBanner />
    </section>
    <section id="ongoing_tournaments" class="section offset">
      <OngoingTournaments />
    </section>
    <section id="our_work" class="section offset">
      <our_work />
    </section>
    <section class="section offset">
      <TopPlayers />
    </section>
    <section id="offerings" class="section offset">
      <Offerings />
    </section>
    <section class="section offset">
      <About />
    </section>
    <section class="section offset">
      <Contact />
    </section>
    <section class="section offset">
      <Footer_ />
    </section>
  </main>
</template>

<script setup lang="ts">
import MainBanner from '@/components/MainBanner.vue';
import TopPlayers from '@/components/TopPlayers.vue';
import Offerings from '@/components/Offerings.vue';
import OngoingTournaments from '@/components/OngoingTournaments.vue';
import our_work from '@/components/our_work.vue';
import About from '@/components/About.vue';
import Contact from '@/components/Contact.vue';
import Footer_ from "@/components/Footer_.vue";


defineOptions({
  name: 'HomeView',
});

</script>

<style scoped>
.home-main {
  padding-top: 60px;
  background-color: transparent;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}

.section {
  padding: 0.1px 0 0 0;
  border-bottom: 1px solid #ccc;
  /* Light gray color for separation */
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.section:last-child {
  border-bottom: none;
}

.offset {
  padding-top: 60px;
  /* Adjust this value to match the height of your fixed navbar */
  margin-top: -60px;
  /* Negative margin to offset the added padding */
}
</style>
