<template>
  <div class="financiero-container">
    <div class="page-header">
      <h1>📊 MÓDULO FINANCIERO</h1>
      <p>Gestión financiera y reportes de FODISERVICES</p>
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <h3>💰 Ingresos</h3>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="value">$1,250,000</span>
            <span class="label">Este mes</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 75%"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>📈 Ganancias</h3>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="value">$320,000</span>
            <span class="label">Ganancia neta</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 65%"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>💳 Gastos</h3>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="value">$930,000</span>
            <span class="label">Gastos totales</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 55%"></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>📋 Presupuesto</h3>
        </div>
        <div class="card-content">
          <div class="metric">
            <span class="value">85%</span>
            <span class="label">Ejecutado</span>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: 85%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-card">
        <h3>📊 Evolución Financiera</h3>
        <div class="chart-placeholder">
          <p>Gráfico de evolución financiera mensual</p>
          <div class="demo-chart">
            <div class="chart-bar" style="height: 60%"></div>
            <div class="chart-bar" style="height: 80%"></div>
            <div class="chart-bar" style="height: 45%"></div>
            <div class="chart-bar" style="height: 90%"></div>
            <div class="chart-bar" style="height: 75%"></div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>🎯 Distribución de Gastos</h3>
        <div class="chart-placeholder">
          <p>Gráfico circular de distribución de gastos</p>
          <div class="demo-pie">
            <div class="pie-slice" style="background: #FFA500;"></div>
            <div class="pie-slice" style="background: #031633;"></div>
            <div class="pie-slice" style="background: #FFB733;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FinancieroView',
});
</script>

<style scoped>
.financiero-container {
  padding: 2rem;
  padding-top: 80px;
  /* Offset para navbar fija */
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: #031633;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(3, 22, 51, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(3, 22, 51, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #031633 0%, #0a2a5c 100%);
  color: white;
  padding: 1.5rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.card-content {
  padding: 2rem;
}

.metric {
  text-align: center;
  margin-bottom: 1.5rem;
}

.value {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #031633;
  margin-bottom: 0.5rem;
}

.label {
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #FFA500 0%, #FFB733 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(3, 22, 51, 0.1);
  padding: 2rem;
}

.chart-card h3 {
  color: #031633;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  font-weight: 700;
}

.chart-placeholder {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.demo-chart {
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 150px;
  margin-top: 1rem;
}

.chart-bar {
  width: 30px;
  background: linear-gradient(180deg, #FFA500 0%, #031633 100%);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.demo-pie {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 2rem auto;
  display: flex;
  overflow: hidden;
}

.pie-slice {
  flex: 1;
  height: 100%;
}

@media (max-width: 768px) {
  .financiero-container {
    padding: 1rem;
    padding-top: 110px;
    /* Padding superior para mobile con menú hamburguesa */
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
