<template>
  <header>
    <nav class="navbar">
      <RouterLink class="link-navbar home" to="/" @click="closeMobileMenu">Ed90+1</RouterLink>

      <!-- Menu hamburguesa para mobile -->
      <button class="hamburger-menu" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Controles de navegación desktop -->
      <div class="nav-controls desktop-nav">
        <ThemeToggle />
        <RouterLink v-if="isLoggedIn" class="link-navbar admin-link" to="/admin">Administración</RouterLink>
        <RouterLink v-if="!isLoggedIn" class="link-navbar access" to="/login">Acceder</RouterLink>
        <span v-if="isLoggedIn" class="link-navbar access user-badge">
          {{ username }}
        </span>
        <RouterLink v-if="isLoggedIn" @click="logout" class="link-navbar logout-btn" to="/">Cerrar sesión</RouterLink>
      </div>

      <!-- Menu mobile desplegable -->
      <div class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
        <div class="mobile-menu-content">
          <!-- Controles mobile -->
          <div class="mobile-controls">
            <ThemeToggle />
            <RouterLink v-if="isLoggedIn" class="mobile-link admin-link" to="/admin" @click="closeMobileMenu">
              Administración
            </RouterLink>
            <RouterLink v-if="!isLoggedIn" class="mobile-link access" to="/login" @click="closeMobileMenu">
              Acceder
            </RouterLink>
            <span v-if="isLoggedIn" class="mobile-user-info user-badge">
              {{ username }}
            </span>
            <RouterLink v-if="isLoggedIn" @click="logout; closeMobileMenu()" class="mobile-link logout-btn" to="/">
              Cerrar sesión
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {
  getTokenName,
  isTokenValid,
  logout as authLogout
} from '@/utils/auth'
import { onMounted, ref, watch } from 'vue'
import router from './router'
import ThemeToggle from '@/components/ThemeToggle.vue'

const isLoggedIn = ref(false)
const username = ref('')
const isMobileMenuOpen = ref(false)

// Funciones para el menú hamburguesa
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const checkAuthStatus = () => {
  isLoggedIn.value = isTokenValid()
  if (isLoggedIn.value) {
    username.value = getTokenName() || ''
  } else {
    username.value = ''
  }
}

const logout = () => {
  authLogout()
  isLoggedIn.value = false
  username.value = ''
  router.push('/')
}

onMounted(() => {
  checkAuthStatus()
})

const route = useRoute()
watch(route, () => {
  checkAuthStatus()
})
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 60px;
  padding: 0 20px;
  box-shadow: var(--shadow-heavy);
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.hamburger-menu {
  display: none;
}

.mobile-menu {
  display: none;
}

.link-navbar {
  text-decoration: none;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 1rem;
  color: var(--white);
  transition: all var(--transition-normal);
  border-radius: var(--border-radius-md);
}

.link-navbar:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.home {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--white);
  background: linear-gradient(45deg, var(--secondary-blue), var(--white));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.access {
  margin-left: 0;
  background-color: var(--secondary-blue);
  border: 2px solid var(--secondary-blue);
  font-weight: 600;
}

.access:hover {
  background-color: var(--white);
  color: var(--primary-blue);
  border-color: var(--white);
}

.user-badge {
  background: linear-gradient(135deg, var(--secondary-blue) 0%, var(--primary-blue) 100%);
  color: var(--white);
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-xl);
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid var(--white);
  box-shadow: var(--shadow-light);
}

.logout-btn {
  background-color: rgba(220, 53, 69, 0.1);
  border: 2px solid #dc3545;
  color: #dc3545;
  font-weight: 600;
}

.logout-btn:hover {
  background-color: #dc3545;
  color: var(--white);
  border-color: #dc3545;
}

.admin-link {
  background-color: rgba(76, 175, 80, 0.1);
  border: 2px solid #4caf50;
  color: #4caf50;
  font-weight: 600;
}

.admin-link:hover {
  background-color: #4caf50;
  color: var(--white);
  border-color: #4caf50;
}

@media (max-width: 768px) {
  .navbar {
    height: 70px;
    padding: 0 15px;
    justify-content: space-between;
  }

  .desktop-nav {
    display: none;
  }

  .hamburger-menu {
    display: flex;
    flex-direction: column;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    justify-content: space-around;
    align-items: center;
    z-index: 1001;
  }

  .hamburger-menu span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: var(--white);
    border-radius: 3px;
    transition: all var(--transition-normal);
  }

  .hamburger-menu.active span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
  }

  .hamburger-menu.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger-menu.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  .mobile-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
    z-index: 999;
    overflow-y: auto;
    display: block !important;
  }

  .mobile-menu.active {
    transform: translateX(0);
  }

  .mobile-menu-content {
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mobile-link {
    color: var(--white);
    text-decoration: none;
    padding: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    border-radius: var(--border-radius-md);
    transition: all var(--transition-normal);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
  }

  .mobile-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .mobile-controls {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .mobile-user-info {
    text-align: center;
    padding: 1rem;
    margin: 0.5rem 0;
  }

  .home {
    font-size: 1.4rem;
  }

  .access {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 1.1rem;
  }

  .logout-btn {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 1.1rem;
  }

  .admin-link {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 1.1rem;
    background-color: rgba(76, 175, 80, 0.1);
    border: 2px solid #4caf50;
    color: #4caf50;
  }

  .admin-link:hover {
    background-color: #4caf50;
    color: var(--white);
  }
}
</style>
