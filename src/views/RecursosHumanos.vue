<template>
 <div class="rrhh-container">
  <div class="page-header">
   <h1>👥 RECURSOS HUMANOS</h1>
   <p>Gestión del talento humano - Vacaciones, Certificaciones, Desarrollo Personal</p>
  </div>

  <div class="dashboard-grid">
   <div class="card">
    <div class="card-header">
     <h3>👨‍💼 Empleados Activos</h3>
    </div>
    <div class="card-content">
     <div class="metric">
      <span class="value">87</span>
      <span class="label">Total empleados</span>
     </div>
     <div class="employee-indicator active"></div>
    </div>
   </div>

   <div class="card">
    <div class="card-header">
     <h3>📈 Nuevas Contrataciones</h3>
    </div>
    <div class="card-content">
     <div class="metric">
      <span class="value">12</span>
      <span class="label">Este mes</span>
     </div>
     <div class="employee-indicator new"></div>
    </div>
   </div>

   <div class="card">
    <div class="card-header">
     <h3>🎯 Retención</h3>
    </div>
    <div class="card-content">
     <div class="metric">
      <span class="value">94%</span>
      <span class="label">Tasa retención</span>
     </div>
     <div class="progress-bar">
      <div class="progress" style="width: 94%"></div>
     </div>
    </div>
   </div>

   <div class="card">
    <div class="card-header">
     <h3>😊 Satisfacción</h3>
    </div>
    <div class="card-content">
     <div class="metric">
      <span class="value">4.6</span>
      <span class="label">Rating promedio</span>
     </div>
     <div class="satisfaction-stars">
      <span>⭐⭐⭐⭐⭐</span>
     </div>
    </div>
   </div>
  </div>

  <div class="hr-section">
   <div class="departments-card">
    <h3>🏢 Departamentos</h3>
    <div class="department-list">
     <div class="department-item">
      <div class="department-icon">💻</div>
      <div class="department-info">
       <h4>Desarrollo</h4>
       <p>Ingenieros de software y desarrolladores</p>
       <div class="department-count">32 empleados</div>
      </div>
      <div class="department-chart">
       <div class="chart-bar" style="height: 80%"></div>
      </div>
     </div>

     <div class="department-item">
      <div class="department-icon">🔧</div>
      <div class="department-info">
       <h4>Operaciones</h4>
       <p>DevOps, infraestructura y soporte</p>
       <div class="department-count">18 empleados</div>
      </div>
      <div class="department-chart">
       <div class="chart-bar" style="height: 60%"></div>
      </div>
     </div>

     <div class="department-item">
      <div class="department-icon">📊</div>
      <div class="department-info">
       <h4>Administración</h4>
       <p>Finanzas, RRHH y administración</p>
       <div class="department-count">15 empleados</div>
      </div>
      <div class="department-chart">
       <div class="chart-bar" style="height: 50%"></div>
      </div>
     </div>

     <div class="department-item">
      <div class="department-icon">🎨</div>
      <div class="department-info">
       <h4>Diseño</h4>
       <p>UX/UI y diseño gráfico</p>
       <div class="department-count">12 empleados</div>
      </div>
      <div class="department-chart">
       <div class="chart-bar" style="height: 40%"></div>
      </div>
     </div>

     <div class="department-item">
      <div class="department-icon">💼</div>
      <div class="department-info">
       <h4>Ventas</h4>
       <p>Equipo comercial y marketing</p>
       <div class="department-count">10 empleados</div>
      </div>
      <div class="department-chart">
       <div class="chart-bar" style="height: 35%"></div>
      </div>
     </div>
    </div>
   </div>

   <div class="hr-activities-card">
    <h3>📋 Actividades Recientes</h3>
    <div class="activities-list">
     <div class="activity-item">
      <div class="activity-icon">✅</div>
      <div class="activity-content">
       <h4>Contratación Completada</h4>
       <p>Ana García - Desarrolladora Senior</p>
       <span class="activity-time">Hace 2 horas</span>
      </div>
     </div>

     <div class="activity-item">
      <div class="activity-icon">📝</div>
      <div class="activity-content">
       <h4>Evaluación de Desempeño</h4>
       <p>Revisión trimestral - Equipo Desarrollo</p>
       <span class="activity-time">Ayer</span>
      </div>
     </div>

     <div class="activity-item">
      <div class="activity-icon">🎓</div>
      <div class="activity-content">
       <h4>Training Completado</h4>
       <p>Curso de seguridad informática</p>
       <span class="activity-time">Hace 3 días</span>
      </div>
     </div>

     <div class="activity-item">
      <div class="activity-icon">📊</div>
      <div class="activity-content">
       <h4>Reporte Mensual</h4>
       <p>Métricas de RRHH - Julio 2025</p>
       <span class="activity-time">Hace 1 semana</span>
      </div>
     </div>
    </div>

    <div class="hr-metrics">
     <h4>📈 Métricas Clave</h4>
     <div class="metrics-grid">
      <div class="metric-item">
       <span class="metric-number">2.5</span>
       <span class="metric-label">Días promedio contratación</span>
      </div>
      <div class="metric-item">
       <span class="metric-number">96%</span>
       <span class="metric-label">Asistencia</span>
      </div>
      <div class="metric-item">
       <span class="metric-number">8.5h</span>
       <span class="metric-label">Horas training/mes</span>
      </div>
      <div class="metric-item">
       <span class="metric-number">15</span>
       <span class="metric-label">Promociones internas</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
defineOptions({
 name: 'RecursosHumanosView',
});
</script>

<style scoped>
.rrhh-container {
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
 position: relative;
}

.metric {
 text-align: center;
 margin-bottom: 1rem;
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

.employee-indicator {
 width: 12px;
 height: 12px;
 border-radius: 50%;
 position: absolute;
 top: 1rem;
 right: 1rem;
 animation: pulse 2s infinite;
}

.employee-indicator.active {
 background-color: #28a745;
}

.employee-indicator.new {
 background-color: #007bff;
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

.satisfaction-stars {
 text-align: center;
 font-size: 1.2rem;
}

.hr-section {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 2rem;
}

.departments-card,
.hr-activities-card {
 background: white;
 border-radius: 12px;
 box-shadow: 0 4px 16px rgba(3, 22, 51, 0.1);
 padding: 2rem;
}

.departments-card h3,
.hr-activities-card h3 {
 color: #031633;
 margin-bottom: 1.5rem;
 font-size: 1.3rem;
 font-weight: 700;
}

.department-list {
 display: flex;
 flex-direction: column;
 gap: 1.5rem;
}

.department-item {
 display: grid;
 grid-template-columns: auto 1fr auto;
 gap: 1rem;
 padding: 1rem;
 border-radius: 8px;
 background-color: #f8f9fa;
 transition: all 0.3s ease;
}

.department-item:hover {
 background-color: #e9ecef;
 transform: translateX(4px);
}

.department-icon {
 font-size: 2rem;
 width: 60px;
 text-align: center;
 align-self: center;
}

.department-info h4 {
 margin: 0 0 0.5rem 0;
 color: #031633;
 font-size: 1.1rem;
 font-weight: 600;
}

.department-info p {
 margin: 0 0 0.5rem 0;
 color: #666;
 font-size: 0.9rem;
}

.department-count {
 color: #FFA500;
 font-size: 0.8rem;
 font-weight: 600;
 text-transform: uppercase;
}

.department-chart {
 display: flex;
 align-items: end;
 width: 40px;
 height: 40px;
}

.chart-bar {
 width: 100%;
 background: linear-gradient(180deg, #FFA500 0%, #FFB733 100%);
 border-radius: 4px 4px 0 0;
 transition: all 0.3s ease;
}

.activities-list {
 display: flex;
 flex-direction: column;
 gap: 1rem;
 margin-bottom: 2rem;
}

.activity-item {
 display: flex;
 gap: 1rem;
 padding: 1rem;
 border-radius: 8px;
 background-color: #f8f9fa;
 transition: all 0.3s ease;
}

.activity-item:hover {
 background-color: #e9ecef;
}

.activity-icon {
 font-size: 1.5rem;
 width: 40px;
 text-align: center;
 align-self: flex-start;
 margin-top: 0.2rem;
}

.activity-content {
 flex: 1;
}

.activity-content h4 {
 margin: 0 0 0.3rem 0;
 color: #031633;
 font-size: 1rem;
 font-weight: 600;
}

.activity-content p {
 margin: 0 0 0.3rem 0;
 color: #666;
 font-size: 0.9rem;
}

.activity-time {
 color: #999;
 font-size: 0.8rem;
}

.hr-metrics h4 {
 color: #031633;
 margin-bottom: 1rem;
 font-size: 1.1rem;
 font-weight: 600;
}

.metrics-grid {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 1rem;
}

.metric-item {
 text-align: center;
 padding: 1rem;
 border-radius: 8px;
 background: linear-gradient(135deg, #FFA500 0%, #FFB733 100%);
 color: white;
}

.metric-number {
 display: block;
 font-size: 1.5rem;
 font-weight: 800;
 margin-bottom: 0.3rem;
}

.metric-label {
 font-size: 0.8rem;
 text-transform: uppercase;
 letter-spacing: 0.3px;
}

@keyframes pulse {
 0% {
  opacity: 1;
 }

 50% {
  opacity: 0.5;
 }

 100% {
  opacity: 1;
 }
}

@media (max-width: 768px) {
 .rrhh-container {
  padding: 1rem;
  padding-top: 110px;
  /* Padding superior para mobile con menú hamburguesa */
 }

 .dashboard-grid {
  grid-template-columns: 1fr;
 }

 .hr-section {
  grid-template-columns: 1fr;
 }

 .metrics-grid {
  grid-template-columns: 1fr;
 }

 .department-item {
  grid-template-columns: 1fr;
  text-align: center;
 }

 .page-header h1 {
  font-size: 2rem;
 }
}
</style>
