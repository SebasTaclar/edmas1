<template>
  <header>
    <nav class="navbar">
      <RouterLink class="link-navbar home" to="/" @click="closeMobileMenu">FODISERVICES</RouterLink>

      <!-- Menu hamburguesa para mobile -->
      <button class="hamburger-menu" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Links de navegación desktop -->
      <div class="nav-links desktop-nav">
        <!-- Admin: Financiero, Supervisor, Producto -->
        <RouterLink v-if="canAccessFinancieroRef" class="link-navbar" to="/financiero">Financiero</RouterLink>
        <RouterLink v-if="canAccessOperativoRef" class="link-navbar" to="/supervisor">Supervisor</RouterLink>
        <RouterLink v-if="canAccessProductoRef" class="link-navbar" to="/producto">Producto</RouterLink>

        <!-- Recursos Humanos: Todos los roles -->
        <RouterLink v-if="canAccessRecursosHumanosRef" class="link-navbar" to="/recursos-humanos">Recursos Humanos
        </RouterLink>
      </div>

      <!-- Controles de navegación desktop -->
      <div class="nav-controls desktop-nav">
        <ThemeToggle />
        <RouterLink v-if="!isLoggedIn" class="link-navbar access" to="/login">Acceder</RouterLink>
        <span v-if="isLoggedIn" class="link-navbar access role-badge" :class="userRole">
          {{ userRole?.toUpperCase() }} - {{ username }}
        </span>
        <RouterLink v-if="isLoggedIn" @click="logout" class="link-navbar logout-btn" to="/">Cerrar sesión</RouterLink>
      </div>

      <!-- Menu mobile desplegable -->
      <div class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
        <div class="mobile-menu-content">
          <!-- Links de navegación mobile -->
          <RouterLink v-if="canAccessFinancieroRef" class="mobile-link" to="/financiero" @click="closeMobileMenu">
            Financiero
          </RouterLink>
          <RouterLink v-if="canAccessOperativoRef" class="mobile-link" to="/supervisor" @click="closeMobileMenu">
            Supervisor
          </RouterLink>
          <RouterLink v-if="canAccessProductoRef" class="mobile-link" to="/producto" @click="closeMobileMenu">
            Producto
          </RouterLink>
          <RouterLink v-if="canAccessRecursosHumanosRef" class="mobile-link" to="/recursos-humanos"
            @click="closeMobileMenu">
            Recursos Humanos
          </RouterLink>

          <!-- Controles mobile -->
          <div class="mobile-controls">
            <ThemeToggle />
            <RouterLink v-if="!isLoggedIn" class="mobile-link access" to="/login" @click="closeMobileMenu">
              Acceder
            </RouterLink>
            <span v-if="isLoggedIn" class="mobile-user-info role-badge" :class="userRole">
              {{ userRole?.toUpperCase() }} - {{ username }}
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
  userHasAdminRole,
  getUserRole,
  canAccessFinanciero,
  canAccessOperativo,
  canAccessProducto,
  canAccessRecursosHumanos,
  logout as authLogout
} from '@/utils/auth'
import { onMounted, ref, watch } from 'vue'
import router from './router'
import ThemeToggle from '@/components/ThemeToggle.vue'

const isLoggedIn = ref(false)
const username = ref('')
const isAdminRole = ref(false)
const userRole = ref('')
const isMobileMenuOpen = ref(false)

// Computed refs for permissions
const canAccessFinancieroRef = ref(false)
const canAccessOperativoRef = ref(false)
const canAccessProductoRef = ref(false)
const canAccessRecursosHumanosRef = ref(false)

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
    userRole.value = getUserRole() || ''
    isAdminRole.value = userHasAdminRole()

    // Update permissions
    canAccessFinancieroRef.value = canAccessFinanciero()
    canAccessOperativoRef.value = canAccessOperativo()
    canAccessProductoRef.value = canAccessProducto()
    canAccessRecursosHumanosRef.value = canAccessRecursosHumanos()
  } else {
    username.value = ''
    userRole.value = ''
    isAdminRole.value = false
    canAccessFinancieroRef.value = false
    canAccessOperativoRef.value = false
    canAccessProductoRef.value = false
    canAccessRecursosHumanosRef.value = false
  }
}

const logout = () => {
  authLogout()
  isLoggedIn.value = false
  username.value = ''
  userRole.value = ''
  isAdminRole.value = false
  canAccessFinancieroRef.value = false
  canAccessOperativoRef.value = false
  canAccessProductoRef.value = false
  canAccessRecursosHumanosRef.value = false
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
  background-color: #031633;
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
  box-shadow: 0 2px 10px rgba(255, 165, 0, 0.2);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.hamburger-menu {
  display: none;
}

.mobile-menu {
  display: none;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.link-navbar {
  text-decoration: none;
  padding: 10px;
  font-weight: 400;
  font-size: 1.2rem;
  color: #f0f0f0;
  transition: color 0.3s ease-in-out;
}

.link-navbar:hover {
  color: #FFA500;
  background-color: rgba(255, 165, 0, 0.1);
  border-radius: 50px;
}

.home {
  font-size: 1.5rem;
  color: #FFA500;
  font-weight: 1000;
}

.access {
  margin-left: 0;
}

.role-badge {
  background: linear-gradient(135deg, #FFA500 0%, #FFB733 100%);
  color: #031633;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  border: 2px solid #FFA500;
}

.role-badge.admin {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border-color: #e74c3c;
}

.role-badge.supervisor {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border-color: #3498db;
}

.role-badge.employ {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  border-color: #2ecc71;
}

.logout-btn {
  background-color: rgba(231, 76, 60, 0.1);
  border: 1px solid #e74c3c;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #e74c3c;
  color: white;
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
    background-color: #FFA500;
    border-radius: 3px;
    transition: all 0.3s ease;
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
    background-color: #031633;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
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
    color: #f0f0f0;
    text-decoration: none;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 165, 0, 0.2);
  }

  .mobile-link:hover {
    background-color: rgba(255, 165, 0, 0.1);
    color: #FFA500;
  }

  .mobile-controls {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(255, 165, 0, 0.3);
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
    font-size: 1.2rem;
  }
}
</style>
