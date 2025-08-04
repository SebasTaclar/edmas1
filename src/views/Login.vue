<template>
  <main class="login-main">
    <div class="login-container">
      <div class="login-header">
        <h1>Acceder</h1>
        <h2>Ingrese Usuario/Email y contraseña</h2>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required @invalid="setCustomValidityMessage"
            @input="clearCustomValidityMessage" class="form-input" />
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required @invalid="setCustomValidityMessage"
            @input="clearCustomValidityMessage" class="form-input" />
        </div>

        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Accediendo...' : 'Acceder' }}
        </button>
      </form>
    </div>

    <Spinner v-if="loading" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService, type LoginCredentials } from '@/services/api';
import Spinner from '@/components/Spinner.vue';

defineOptions({
  name: 'LoginView',
});

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  try {
    const credentials: LoginCredentials = {
      email: email.value,
      password: password.value,
    };

    const response = await authService.login(credentials);

    if (response.success) {
      console.log('Login successful:', response.message);
      // Redirigir según el rol del usuario
      const userInfo = authService.getCurrentUser();

      if (userInfo?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      alert(response.message || 'Credenciales inválidas');
    }
  } catch (error: unknown) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error en el servidor. Intente nuevamente.';
    alert('Error en el login: ' + errorMessage);
  } finally {
    loading.value = false;
  }
};

const setCustomValidityMessage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.validity.valid) {
    target.setCustomValidity('Este campo es obligatorio.');
  }
};

const clearCustomValidityMessage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.setCustomValidity('');
};
</script>

<style>
/* Modo claro (día) - por defecto */
.login-main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%);
  position: relative;
  transition: all 0.3s ease;
}

.login-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%);
  pointer-events: none;
}

.login-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.login-header {
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: var(--font-family);
}

.login-header h2 {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
  font-family: var(--font-family);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  font-family: var(--font-family);
}

.form-input {
  width: 100%;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  color: #1e293b;
  font-size: 1rem;
  font-family: var(--font-family);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.form-input:invalid {
  border-color: rgba(59, 130, 246, 0.2);
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(10px);
  font-family: var(--font-family);
  margin-top: 1rem;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
}

.btn-primary:disabled {
  background: rgba(156, 163, 175, 0.5);
  color: rgba(107, 114, 128, 0.8);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

/* Modo oscuro (dark) - aplicar con mayor especificidad */
@media (prefers-color-scheme: dark) {
  .login-main {
    background: linear-gradient(135deg, #00205b 0%, #003d7a 50%, #005eb4 100%) !important;
  }

  .login-main::before {
    background: linear-gradient(45deg, rgba(0, 32, 91, 0.2) 0%, rgba(0, 94, 180, 0.1) 100%) !important;
  }

  .login-container {
    background: rgba(0, 32, 91, 0.95) !important;
    border: 1px solid rgba(60, 154, 240, 0.2) !important;
    box-shadow: 0 8px 32px rgba(0, 94, 180, 0.3) !important;
  }

  .login-header h1 {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  }

  .login-header h2 {
    color: rgba(255, 255, 255, 0.8) !important;
  }

  .input-group label {
    color: #ffffff !important;
  }

  .form-input {
    background: rgba(0, 0, 0, 0.3) !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
  }

  .form-input::placeholder {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  .form-input:focus {
    border-color: #3c9af0 !important;
    background: rgba(0, 0, 0, 0.4) !important;
    box-shadow: 0 0 20px rgba(60, 154, 240, 0.4) !important;
  }

  .form-input:invalid {
    border-color: rgba(60, 154, 240, 0.3) !important;
  }

  .btn-primary {
    background: linear-gradient(135deg, #3c9af0 0%, #005eb4 100%) !important;
    box-shadow: 0 4px 15px rgba(60, 154, 240, 0.4) !important;
  }

  .btn-primary:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(60, 154, 240, 0.5) !important;
    background: linear-gradient(135deg, #005eb4 0%, #003d7a 100%) !important;
  }

  .btn-primary:disabled {
    background: rgba(255, 255, 255, 0.1) !important;
    color: rgba(255, 255, 255, 0.5) !important;
  }
}

/* También detectar data-theme="dark" para compatibilidad con toggle manual */
[data-theme="dark"] .login-main {
  background: linear-gradient(135deg, #00205b 0%, #003d7a 50%, #005eb4 100%) !important;
}

[data-theme="dark"] .login-main::before {
  background: linear-gradient(45deg, rgba(0, 32, 91, 0.2) 0%, rgba(0, 94, 180, 0.1) 100%) !important;
}

[data-theme="dark"] .login-container {
  background: rgba(0, 32, 91, 0.95) !important;
  border: 1px solid rgba(60, 154, 240, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 94, 180, 0.3) !important;
}

[data-theme="dark"] .login-header h1 {
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
}

[data-theme="dark"] .login-header h2 {
  color: rgba(255, 255, 255, 0.8) !important;
}

[data-theme="dark"] .input-group label {
  color: #ffffff !important;
}

[data-theme="dark"] .form-input {
  background: rgba(0, 0, 0, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
}

[data-theme="dark"] .form-input::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

[data-theme="dark"] .form-input:focus {
  border-color: #3c9af0 !important;
  background: rgba(0, 0, 0, 0.4) !important;
  box-shadow: 0 0 20px rgba(60, 154, 240, 0.4) !important;
}

[data-theme="dark"] .form-input:invalid {
  border-color: rgba(60, 154, 240, 0.3) !important;
}

[data-theme="dark"] .btn-primary {
  background: linear-gradient(135deg, #3c9af0 0%, #005eb4 100%) !important;
  box-shadow: 0 4px 15px rgba(60, 154, 240, 0.4) !important;
}

[data-theme="dark"] .btn-primary:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(60, 154, 240, 0.5) !important;
  background: linear-gradient(135deg, #005eb4 0%, #003d7a 100%) !important;
}

[data-theme="dark"] .btn-primary:disabled {
  background: rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.5) !important;
}

/* También detectar si el body tiene clase dark para compatibilidad con toggle manual */
body.dark .login-main {
  background: linear-gradient(135deg, #00205b 0%, #003d7a 50%, #005eb4 100%) !important;
}

body.dark .login-main::before {
  background: linear-gradient(45deg, rgba(0, 32, 91, 0.2) 0%, rgba(0, 94, 180, 0.1) 100%) !important;
}

body.dark .login-container {
  background: rgba(0, 32, 91, 0.95) !important;
  border: 1px solid rgba(60, 154, 240, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 94, 180, 0.3) !important;
}

body.dark .login-header h1 {
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
}

body.dark .login-header h2 {
  color: rgba(255, 255, 255, 0.8) !important;
}

body.dark .input-group label {
  color: #ffffff !important;
}

body.dark .form-input {
  background: rgba(0, 0, 0, 0.3) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
}

body.dark .form-input::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

body.dark .form-input:focus {
  border-color: #3c9af0 !important;
  background: rgba(0, 0, 0, 0.4) !important;
  box-shadow: 0 0 20px rgba(60, 154, 240, 0.4) !important;
}

body.dark .form-input:invalid {
  border-color: rgba(60, 154, 240, 0.3) !important;
}

body.dark .btn-primary {
  background: linear-gradient(135deg, #3c9af0 0%, #005eb4 100%) !important;
  box-shadow: 0 4px 15px rgba(60, 154, 240, 0.4) !important;
}

body.dark .btn-primary:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(60, 154, 240, 0.5) !important;
  background: linear-gradient(135deg, #005eb4 0%, #003d7a 100%) !important;
}

body.dark .btn-primary:disabled {
  background: rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-main {
    padding: 1rem;
  }

  .login-container {
    padding: 2rem;
    max-width: 350px;
  }

  .login-header h1 {
    font-size: 2rem;
  }

  .login-header h2 {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.5rem;
    max-width: 300px;
  }

  .login-header h1 {
    font-size: 1.8rem;
  }
}
</style>
