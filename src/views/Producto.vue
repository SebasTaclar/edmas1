<template>
  <div class="producto-container">
    <div class="page-header">
      <h1>🚀 MÓDULO PRODUCTO</h1>
      <p>Gestión de productos y desarrollo de FODISERVICES</p>
    </div>

    <!-- Sección de Ingreso de Productos - Layout Horizontal -->
    <div class="product-entry-section">
      <div class="horizontal-layout">
        <!-- Formulario de Ingreso -->
        <div class="entry-form-card">
          <h3>Ingresar Producto</h3>
          <form @submit.prevent="addProduct" class="product-form">
            <div class="form-fields">
              <div class="form-group">
                <label for="productType">Tipo de Producto:</label>
                <select v-model="newProduct.type" id="productType" required>
                  <option value="">Selecciona tipo</option>
                  <option value="toma">Toma doble</option>
                  <option value="doble">Fulcro</option>
                  <option value="fulcro_fijo">Fijo</option>
                </select>
              </div>

              <div class="form-group">
                <label for="quantity">Cantidad:</label>
                <input type="number" v-model.number="newProduct.quantity" id="quantity" min="1" required />
              </div>

              <div class="form-group">
                <label for="entryDate">Fecha y Hora de Ingreso:</label>
                <input type="datetime-local" v-model="newProduct.entryDateTime" id="entryDate" :max="maxDateTime"
                  required />
              </div>

              <div class="form-group">
                <label for="shift">Turno:</label>
                <select v-model="newProduct.shift" id="shift" required>
                  <option value="">Selecciona turno</option>
                  <option value="am">AM (Mañana)</option>
                  <option value="pm">PM (Tarde)</option>
                </select>
              </div>
            </div>

            <button type="submit" class="submit-btn">Agregar Producto</button>
          </form>
        </div>

        <!-- Gráfico con Métricas Integradas -->
        <div class="chart-section">
          <h3>Gráfico de Producción Mensual</h3>

          <div class="chart-layout">
            <!-- Gráfico principal a la izquierda -->
            <div class="chart-container">
              <canvas ref="chartCanvas" width="800" height="340" class="chart-canvas" @mousemove="handleChartMouseMove"
                @mouseleave="handleChartMouseLeave">
              </canvas>
              <!-- Tooltip para mostrar información del día -->
              <div v-if="tooltip.visible" class="chart-tooltip" :class="{ visible: tooltip.visible }" :style="{
                left: tooltip.x + 'px',
                top: tooltip.y + 'px'
              }">
                <div class="tooltip-content">
                  <div class="tooltip-date">{{ tooltip.date }}</div>
                  <div class="tooltip-value">{{ tooltip.value }} unidades</div>
                </div>
              </div>
            </div>

            <!-- Métricas al lado derecho -->
            <div class="chart-metrics-sidebar">
              <div class="chart-metric-item">
                <div class="chart-metric-icon">🎯</div>
                <div class="chart-metric-content">
                  <span class="chart-metric-value">{{ monthlyGoal }}</span>
                  <span class="chart-metric-label">Meta del Mes</span>
                </div>
              </div>

              <div class="chart-metric-item">
                <div class="chart-metric-icon">📊</div>
                <div class="chart-metric-content">
                  <span class="chart-metric-value">{{ monthlyTotal }}</span>
                  <span class="chart-metric-label">Unidades del Mes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header">
            <h3>💼 Productos Activos</h3>
          </div>
          <div class="card-content">
            <div class="metric">
              <span class="value">12</span>
              <span class="label">En producción</span>
            </div>
            <div class="product-indicator active"></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>🔬 En Desarrollo</h3>
          </div>
          <div class="card-content">
            <div class="metric">
              <span class="value">5</span>
              <span class="label">Proyectos</span>
            </div>
            <div class="product-indicator development"></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>📊 Market Share</h3>
          </div>
          <div class="card-content">
            <div class="metric">
              <span class="value">23%</span>
              <span class="label">Participación</span>
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: 23%"></div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>⭐ Satisfacción</h3>
          </div>
          <div class="card-content">
            <div class="metric">
              <span class="value">4.8</span>
              <span class="label">Rating promedio</span>
            </div>
            <div class="stars">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      </div>

      <div class="products-section">
        <div class="products-card">
          <h3>🏆 Productos Destacados</h3>
          <div class="product-list">
            <div class="product-item">
              <div class="product-icon">💻</div>
              <div class="product-info">
                <h4>FODISERVICES ERP</h4>
                <p>Sistema integral de gestión empresarial</p>
                <div class="product-tags">
                  <span class="tag">Enterprise</span>
                  <span class="tag">Cloud</span>
                  <span class="tag">AI-Powered</span>
                </div>
                <div class="product-status active">Activo</div>
              </div>
              <div class="product-metrics">
                <span class="metric-value">150+</span>
                <span class="metric-label">Clientes</span>
              </div>
            </div>

            <div class="product-item">
              <div class="product-icon">📱</div>
              <div class="product-info">
                <h4>FODI Mobile Suite</h4>
                <p>Aplicaciones móviles corporativas</p>
                <div class="product-tags">
                  <span class="tag">Mobile</span>
                  <span class="tag">Cross-Platform</span>
                </div>
                <div class="product-status development">En Desarrollo</div>
              </div>
              <div class="product-metrics">
                <span class="metric-value">75%</span>
                <span class="metric-label">Progreso</span>
              </div>
            </div>

            <div class="product-item">
              <div class="product-icon">🔒</div>
              <div class="product-info">
                <h4>FODI Security</h4>
                <p>Suite de seguridad cibernética</p>
                <div class="product-tags">
                  <span class="tag">Security</span>
                  <span class="tag">Blockchain</span>
                </div>
                <div class="product-status active">Activo</div>
              </div>
              <div class="product-metrics">
                <span class="metric-value">98.9%</span>
                <span class="metric-label">Efectividad</span>
              </div>
            </div>

            <div class="product-item">
              <div class="product-icon">🤖</div>
              <div class="product-info">
                <h4>FODI AI Assistant</h4>
                <p>Asistente inteligente para empresas</p>
                <div class="product-tags">
                  <span class="tag">AI</span>
                  <span class="tag">Machine Learning</span>
                </div>
                <div class="product-status beta">Beta</div>
              </div>
              <div class="product-metrics">
                <span class="metric-value">Beta</span>
                <span class="metric-label">Fase</span>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap-card">
          <h3>🗺️ Roadmap de Productos</h3>
          <div class="roadmap-timeline">
            <div class="timeline-item completed">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>Q1 2025</h4>
                <p>Lanzamiento FODI ERP v3.0</p>
              </div>
            </div>

            <div class="timeline-item active">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>Q2 2025</h4>
                <p>FODI Mobile Suite Beta</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>Q3 2025</h4>
                <p>AI Assistant Release</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>Q4 2025</h4>
                <p>FODI Security v2.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'

defineOptions({
  name: 'ProductoView',
});

// Product entry form data
const newProduct = reactive({
  type: '',
  quantity: 1,
  entryDateTime: new Date().toISOString().slice(0, 16), // Fecha y hora actual por defecto
  shift: ''
})

// Product entries storage
const productEntries = ref<Array<{
  id: number
  type: string
  quantity: number
  entryDateTime: string
  shift: string
  day: number
}>>([])

// Mock data para demo - Días laborales de Julio 2025 (Lunes a Sábado)
const mockData = [
  // Semana 1
  { id: 1, type: 'toma', quantity: 45, entryDateTime: '2025-07-01T09:30', shift: 'am', day: 1 }, // Martes
  { id: 2, type: 'doble', quantity: 38, entryDateTime: '2025-07-02T14:15', shift: 'pm', day: 2 }, // Miércoles
  { id: 3, type: 'fulcro_fijo', quantity: 42, entryDateTime: '2025-07-03T08:45', shift: 'am', day: 3 }, // Jueves
  { id: 4, type: 'toma', quantity: 35, entryDateTime: '2025-07-04T15:20', shift: 'pm', day: 4 }, // Viernes
  { id: 5, type: 'doble', quantity: 48, entryDateTime: '2025-07-05T10:00', shift: 'am', day: 5 }, // Sábado
  // Semana 2
  { id: 6, type: 'fulcro_fijo', quantity: 52, entryDateTime: '2025-07-07T09:15', shift: 'am', day: 7 }, // Lunes
  { id: 7, type: 'toma', quantity: 44, entryDateTime: '2025-07-08T13:30', shift: 'pm', day: 8 }, // Martes
  { id: 8, type: 'doble', quantity: 39, entryDateTime: '2025-07-09T08:20', shift: 'am', day: 9 }, // Miércoles
  { id: 9, type: 'fulcro_fijo', quantity: 46, entryDateTime: '2025-07-10T16:45', shift: 'pm', day: 10 }, // Jueves
  { id: 10, type: 'toma', quantity: 41, entryDateTime: '2025-07-11T11:10', shift: 'am', day: 11 }, // Viernes
  { id: 11, type: 'doble', quantity: 37, entryDateTime: '2025-07-12T14:30', shift: 'pm', day: 12 }, // Sábado
  // Semana 3
  { id: 12, type: 'fulcro_fijo', quantity: 49, entryDateTime: '2025-07-14T09:45', shift: 'am', day: 14 }, // Lunes
  { id: 13, type: 'toma', quantity: 43, entryDateTime: '2025-07-15T15:15', shift: 'pm', day: 15 }, // Martes
  { id: 14, type: 'doble', quantity: 40, entryDateTime: '2025-07-16T08:30', shift: 'am', day: 16 }, // Miércoles
  { id: 15, type: 'fulcro_fijo', quantity: 47, entryDateTime: '2025-07-17T13:45', shift: 'pm', day: 17 }, // Jueves
  { id: 16, type: 'toma', quantity: 45, entryDateTime: '2025-07-18T10:20', shift: 'am', day: 18 }, // Viernes
  { id: 17, type: 'doble', quantity: 42, entryDateTime: '2025-07-19T14:50', shift: 'pm', day: 19 }, // Sábado
  // Semana 4
  { id: 18, type: 'fulcro_fijo', quantity: 51, entryDateTime: '2025-07-21T09:30', shift: 'am', day: 21 }, // Lunes
  { id: 19, type: 'toma', quantity: 46, entryDateTime: '2025-07-22T15:40', shift: 'pm', day: 22 }, // Martes
  { id: 20, type: 'doble', quantity: 38, entryDateTime: '2025-07-23T08:15', shift: 'am', day: 23 }, // Miércoles
  { id: 21, type: 'fulcro_fijo', quantity: 44, entryDateTime: '2025-07-24T13:25', shift: 'pm', day: 24 }, // Jueves
  { id: 22, type: 'toma', quantity: 50, entryDateTime: '2025-07-25T11:35', shift: 'am', day: 25 }, // Viernes
  { id: 23, type: 'doble', quantity: 43, entryDateTime: '2025-07-26T14:15', shift: 'pm', day: 26 }, // Sábado
  // Semana 5
  { id: 24, type: 'fulcro_fijo', quantity: 48, entryDateTime: '2025-07-28T09:00', shift: 'am', day: 28 }, // Lunes
  { id: 25, type: 'toma', quantity: 41, entryDateTime: '2025-07-29T15:30', shift: 'pm', day: 29 }, // Martes
  { id: 26, type: 'doble', quantity: 45, entryDateTime: '2025-07-30T10:45', shift: 'am', day: 30 }, // Miércoles
]

// Chart reference
const chartCanvas = ref<HTMLCanvasElement | null>(null)

// Tooltip state
const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  day: 0,
  value: 0,
  date: ''
})

// Chart interaction state
const chartData = ref<number[]>([])
const hoveredPoint = ref(-1)

// Current date for max date validation
const maxDateTime = computed(() => {
  const today = new Date()
  return today.toISOString().slice(0, 16) // YYYY-MM-DDTHH:MM format
})

// Monthly goal
const monthlyGoal = ref(1000)

// Calculate monthly total
const monthlyTotal = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return productEntries.value
    .filter(entry => {
      const entryDate = new Date(entry.entryDateTime)
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
    })
    .reduce((total, entry) => total + entry.quantity, 0)
})

// Get current month days data for chart
const getMonthlyData = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const dailyData = Array(daysInMonth).fill(0)

  productEntries.value
    .filter(entry => {
      const entryDate = new Date(entry.entryDateTime)
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
    })
    .forEach(entry => {
      const day = entry.day - 1 // Convert to 0-based index
      if (day >= 0 && day < daysInMonth) {
        dailyData[day] += entry.quantity
      }
    })

  return dailyData
}

// Add new product
const addProduct = () => {
  if (!newProduct.type || !newProduct.quantity || !newProduct.entryDateTime || !newProduct.shift) {
    alert('Por favor completa todos los campos')
    return
  }

  const entryDate = new Date(newProduct.entryDateTime)
  const day = entryDate.getDate()

  const entry = {
    id: Date.now(),
    type: newProduct.type,
    quantity: newProduct.quantity,
    entryDateTime: newProduct.entryDateTime,
    shift: newProduct.shift,
    day: day
  }

  productEntries.value.push(entry)

  // Reset form pero mantener la fecha y hora
  const currentDateTime = newProduct.entryDateTime
  newProduct.type = ''
  newProduct.quantity = 1
  newProduct.entryDateTime = currentDateTime
  newProduct.shift = ''

  // Redraw chart
  nextTick(() => {
    drawChart()
  })
}

// Handle chart mouse interactions
const handleChartMouseMove = (event: MouseEvent) => {
  if (!chartCanvas.value) return

  const canvas = chartCanvas.value
  const rect = canvas.getBoundingClientRect()

  // Calcular la escala del canvas para corregir coordenadas en mobile
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  const x = (event.clientX - rect.left) * scaleX
  const y = (event.clientY - rect.top) * scaleY

  const isMobile = window.innerWidth <= 768
  const padding = isMobile ? 50 : 70
  const chartWidth = canvas.width - 2 * padding
  const data = chartData.value

  if (data.length === 0) return

  // Calcular el día más cercano basado en la posición del mouse
  const relativeX = x - padding
  if (relativeX >= 0 && relativeX <= chartWidth) {
    const dayIndex = Math.round((relativeX / chartWidth) * (data.length - 1))

    if (dayIndex >= 0 && dayIndex < data.length) {
      const pointX = padding + (dayIndex / (data.length - 1)) * chartWidth
      const distance = Math.abs(x - pointX)

      // Área de detección más grande en mobile para facilitar el touch
      const detectionRadius = isMobile ? 35 : 20

      // Solo mostrar tooltip si el mouse está cerca del punto
      if (distance <= detectionRadius) {
        hoveredPoint.value = dayIndex
        tooltip.visible = true

        // Posición del tooltip ajustada para mobile
        if (isMobile) {
          // En mobile, centrar el tooltip y ajustar la altura
          tooltip.x = rect.left + canvas.offsetWidth / 2 - 75 // Centrado aproximadamente
          tooltip.y = rect.top + 20 // Más arriba para evitar obstrucción
        } else {
          tooltip.x = rect.left + (pointX / scaleX) + 10
          tooltip.y = rect.top + (y / scaleY) - 50
        }

        tooltip.day = dayIndex + 1
        tooltip.value = data[dayIndex]

        // Crear fecha formateada (4 de Julio)
        const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ]
        const currentDate = new Date()
        const currentMonth = monthNames[currentDate.getMonth()]
        tooltip.date = `${tooltip.day} de ${currentMonth}`

        // Redibujar gráfico con punto resaltado
        drawChart()
        return
      }
    }
  }

  // Si no está cerca de ningún punto, ocultar tooltip
  if (hoveredPoint.value !== -1) {
    hoveredPoint.value = -1
    tooltip.visible = false
    drawChart()
  }
}

const handleChartMouseLeave = () => {
  tooltip.visible = false
  hoveredPoint.value = -1
  drawChart()
}

// Draw chart function
const drawChart = () => {
  if (!chartCanvas.value) return

  const canvas = chartCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Detect theme colors
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark' ||
    document.documentElement.getAttribute('data-theme') === null || // Default to dark if no theme set
    document.documentElement.classList.contains('dark-theme') ||
    document.body.classList.contains('dark-theme')

  const colors = {
    grid: isDarkTheme ? '#444' : '#e0e0e0',
    axis: isDarkTheme ? '#fff' : '#333',
    line: '#FFA500',
    points: isDarkTheme ? '#FFA500' : '#031633',
    highlightPoint: '#FF6B35',
    text: isDarkTheme ? '#fff' : '#666',
    title: isDarkTheme ? '#fff' : '#031633'
  }

  const data = getMonthlyData()
  chartData.value = data // Almacenar datos para interactividad
  const maxValue = Math.max(...data, 50) // Minimum scale of 50

  // Detect mobile and adjust padding accordingly
  const isMobile = window.innerWidth <= 768
  const padding = isMobile ? 50 : 70
  const chartWidth = canvas.width - 2 * padding
  const chartHeight = canvas.height - 2 * padding

  // Draw grid
  ctx.strokeStyle = colors.grid
  ctx.lineWidth = 1

  // Vertical grid lines (days) - mostrar más líneas para mejor referencia
  for (let i = 0; i <= data.length; i += 1) {
    const x = padding + (i / data.length) * chartWidth
    ctx.beginPath()
    ctx.moveTo(x, padding)
    ctx.lineTo(x, padding + chartHeight)
    ctx.globalAlpha = i % 5 === 0 ? 0.6 : 0.2 // Líneas principales más visibles
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  // Horizontal grid lines (quantities)
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i / 5) * chartHeight
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(padding + chartWidth, y)
    ctx.stroke()
  }

  // Draw axes
  ctx.strokeStyle = colors.axis
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, padding + chartHeight)
  ctx.lineTo(padding + chartWidth, padding + chartHeight)
  ctx.stroke()

  // Draw data line
  if (data.some(value => value > 0)) {
    ctx.strokeStyle = colors.line
    ctx.lineWidth = 3
    ctx.beginPath()

    let firstPoint = true
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = padding + chartHeight - (value / maxValue) * chartHeight

      if (firstPoint) {
        ctx.moveTo(x, y)
        firstPoint = false
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw data points
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = padding + chartHeight - (value / maxValue) * chartHeight

      // Punto normal o resaltado
      const isHovered = index === hoveredPoint.value
      ctx.fillStyle = isHovered ? colors.highlightPoint : colors.points

      ctx.beginPath()
      ctx.arc(x, y, isHovered ? 6 : 4, 0, Math.PI * 2)
      ctx.fill()

      // Agregar un anillo alrededor del punto hover
      if (isHovered) {
        ctx.strokeStyle = colors.highlightPoint
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.stroke()
      }
    })
  }

  // Draw labels
  ctx.fillStyle = colors.text
  ctx.font = isMobile ? '10px "Montserrat", sans-serif' : '11px "Montserrat", sans-serif'
  ctx.textAlign = 'center'

  // X-axis labels (days) - ajustar para mobile
  const dayStep = isMobile ? 4 : 3 // Mostrar cada 4 días en mobile para mejor espaciado
  for (let i = 0; i < data.length; i += dayStep) {
    const x = padding + (i / (data.length - 1)) * chartWidth
    const labelY = padding + chartHeight + (isMobile ? 18 : 20)
    ctx.fillText((i + 1).toString(), x, labelY)
  }

  // Mostrar también el último día
  if (data.length > 1) {
    const lastIndex = data.length - 1
    const x = padding + (lastIndex / (data.length - 1)) * chartWidth
    const labelY = padding + chartHeight + (isMobile ? 18 : 20)
    ctx.fillText((lastIndex + 1).toString(), x, labelY)
  }

  // Y-axis labels (quantities)
  ctx.textAlign = 'right'
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i / 5) * chartHeight + 4
    const value = Math.round(maxValue * (5 - i) / 5)
    const labelX = padding - (isMobile ? 10 : 10)
    ctx.fillText(value.toString(), labelX, y)
  }

  // Chart title
  ctx.fillStyle = colors.title
  ctx.font = isMobile ? 'bold 14px "Montserrat", sans-serif' : 'bold 18px "Montserrat", sans-serif'
  ctx.textAlign = 'center'
  const titleY = isMobile ? 25 : 30
  ctx.fillText(isMobile ? 'Producción Diaria' : 'Unidades de Producción Diaria', canvas.width / 2, titleY)

  // Axis labels
  ctx.font = isMobile ? '11px "Montserrat", sans-serif' : '14px "Montserrat", sans-serif'

  // X-axis label con mes actual
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  const currentDate = new Date()
  const currentMonth = monthNames[currentDate.getMonth()]
  const xAxisLabel = isMobile ? `${currentMonth} 2025` : `Días del mes de ${currentMonth}`
  ctx.fillText(xAxisLabel, canvas.width / 2, canvas.height - 10)

  // Y-axis label con mejor estilo
  ctx.save()
  ctx.translate(25, canvas.height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.font = isMobile ? 'bold 10px "Montserrat", sans-serif' : 'bold 13px "Montserrat", sans-serif'
  ctx.fillStyle = colors.text
  ctx.textAlign = 'center'
  const yAxisLabel = isMobile ? 'Unidades' : 'Cantidad de Unidades'
  ctx.fillText(yAxisLabel, 0, 0)
  ctx.restore()
}

// Initialize date to today
onMounted(() => {
  newProduct.entryDateTime = maxDateTime.value
  // Cargar datos mock para demo
  productEntries.value = [...mockData]
  nextTick(() => {
    drawChart()
  })

  // Listen for theme changes
  const observer = new MutationObserver(() => {
    nextTick(() => {
      drawChart()
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })

  // Mobile-specific tooltip hiding events
  if (window.innerWidth <= 768) {
    // Hide tooltip on scroll
    const hideTooltipOnScroll = () => {
      if (tooltip.visible) {
        tooltip.visible = false
        hoveredPoint.value = -1
        drawChart()
      }
    }

    // Hide tooltip on click outside chart
    const hideTooltipOnClick = (event: Event) => {
      if (!chartCanvas.value) return

      const target = event.target as HTMLElement
      if (!chartCanvas.value.contains(target) && tooltip.visible) {
        tooltip.visible = false
        hoveredPoint.value = -1
        drawChart()
      }
    }

    // Add event listeners for mobile only
    window.addEventListener('scroll', hideTooltipOnScroll, { passive: true })
    document.addEventListener('touchstart', hideTooltipOnClick, { passive: true })
    document.addEventListener('click', hideTooltipOnClick)

    // Cleanup function for mobile events
    const cleanup = () => {
      window.removeEventListener('scroll', hideTooltipOnScroll)
      document.removeEventListener('touchstart', hideTooltipOnClick)
      document.removeEventListener('click', hideTooltipOnClick)
    }

      // Store cleanup function for potential unmount
      ; (window as any).__mobileTooltipCleanup = cleanup
  }
})
</script>

<style scoped>
.producto-container {
  padding: 2rem;
  padding-top: 80px;
  /* Offset para navbar fija */
  background-color: var(--bg-color, #f8f9fa);
  color: var(--text-color, #031633);
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: var(--text-color, #031633);
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.page-header p {
  color: var(--text-secondary, #6c757d);
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

/* Product Entry Section Styles */
.product-entry-section {
  margin-bottom: 3rem;
}

.section-title h2 {
  color: var(--text-color, #031633);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Horizontal Layout */
.horizontal-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 2rem;
}

.entry-form-card {
  background: var(--bg-color, white);
  color: var(--text-color, #031633);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(3, 22, 51, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.2);
  min-width: 300px;
  height: 477px;
  /* Altura fija igual al gráfico */
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.entry-form-card h3 {
  color: var(--text-color, #031633);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* Aumentado de 0.75rem */
  flex: 1;
  /* Para que ocupe el espacio disponible */
  justify-content: space-between;
  /* Distribuir el espacio */
}

/* Contenedor para los campos del formulario */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: var(--text-color, #031633);
  font-weight: 600;
  margin-bottom: 0.3rem;
  /* Reducido de 0.4rem */
  font-size: 0.85rem;
  /* Reducido de 0.9rem */
}

.form-group select,
.form-group input {
  padding: 0.6rem;
  /* Reducido de 0.75rem */
  border: 2px solid var(--border-color, #e0e6ed);
  border-radius: 6px;
  /* Reducido de 8px */
  font-size: 0.9rem;
  /* Reducido de 1rem */
  transition: border-color 0.3s ease;
  background-color: var(--bg-color, white);
  color: var(--text-color, #031633);
  min-height: 38px;
  /* Reducido de 44px */
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #FFA500;
  box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
}

/* Estilos específicos para datetime-local en dark theme */
.form-group input[type="datetime-local"] {
  position: relative;
  color-scheme: dark light;
  /* Permitir que el navegador adapte el color */
}

/* Para navegadores WebKit (Chrome, Safari, Edge) */
.form-group input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: var(--datetime-icon-filter, invert(0));
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.form-group input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover {
  background-color: rgba(255, 165, 0, 0.1);
}

/* Variables CSS para el filtro del icono */
:root {
  --datetime-icon-filter: invert(0);
  /* Light theme - icono normal */
}

[data-theme="dark"] {
  --datetime-icon-filter: invert(1);
  /* Dark theme - icono blanco */
}

.submit-btn {
  background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
  color: white;
  border: none;
  padding: 1.25rem 1.75rem;
  /* Aumentado de 1rem 1.5rem */
  border-radius: 8px;
  /* Aumentado de 6px */
  font-size: 1rem;
  /* Aumentado de 0.9rem */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0;
  /* Eliminar margen superior ya que está en la parte inferior */
  min-height: 52px;
  /* Aumentado de 48px para acomodar el padding extra */
  align-self: stretch;
  /* Ocupar todo el ancho disponible */
}

.submit-btn:hover {
  background: linear-gradient(135deg, #FF8C00 0%, #FF7F00 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.3);
}

.metrics-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;
}

.metric-card {
  background: var(--bg-color, white);
  color: var(--text-color, #031633);
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(3, 22, 51, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.metric-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-content {
  display: flex;
  flex-direction: column;
}

.metric-value {
  color: var(--text-color, #031633);
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1;
}

.metric-label {
  color: var(--text-secondary, #6c757d);
  font-size: 0.9rem;
  font-weight: 500;
}

.chart-section {
  background: var(--bg-color, white);
  color: var(--text-color, #031633);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(3, 22, 51, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.2);
  min-width: 400px;
  height: 477px;
  /* Altura fija específica */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.chart-section h3 {
  color: var(--text-color, #031633);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.chart-layout {
  display: grid !important;
  /* Forzar grid layout */
  grid-template-columns: 1fr auto !important;
  /* Gráfico a la izquierda, métricas a la derecha */
  gap: 1.5rem;
  align-items: start;
}

.chart-metrics-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 180px;
  margin-top: 0;
  grid-column: 2;
  /* Asegurar que esté en la segunda columna */
  /* Eliminar margen superior */
}

.chart-metrics {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  gap: 1rem;
}

.chart-metric-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--card-bg, rgba(255, 165, 0, 0.1));
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 165, 0, 0.2);
  box-shadow: 0 4px 16px rgba(3, 22, 51, 0.1);
  transition: all 0.3s ease;
}

.chart-metric-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(3, 22, 51, 0.15);
}

.chart-metric-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
}

.chart-metric-content {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.chart-metric-value {
  color: var(--text-color, #031633);
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  font-family: 'Montserrat', sans-serif;
}

.chart-metric-label {
  color: var(--text-secondary, #6c757d);
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.chart-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-color, white);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 165, 0, 0.1);
  box-shadow: 0 2px 8px rgba(3, 22, 51, 0.05);
  grid-column: 1;
  /* Asegurar que esté en la primera columna */
}

.chart-container canvas {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .horizontal-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .chart-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .chart-metrics-sidebar {
    flex-direction: row;
    justify-content: space-around;
    min-width: 100%;
    gap: 0.75rem;
  }

  .chart-section {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .producto-container {
    padding: 1rem;
    padding-top: 110px;
    /* Padding superior para mobile con menú hamburguesa */
  }

  .chart-layout {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr auto !important;
    gap: 1rem !important;
  }

  .chart-container {
    grid-column: 1 !important;
    grid-row: 1 !important;
    width: 100% !important;
  }

  .chart-metrics-sidebar {
    grid-column: 1 !important;
    grid-row: 2 !important;
    flex-direction: row !important;
    justify-content: space-around !important;
    gap: 1rem !important;
    min-width: 100% !important;
    margin-top: 0 !important;
  }

  .chart-container canvas {
    width: 100%;
    height: 270px;
  }

  .entry-form-card,
  .chart-section {
    padding: 1rem;
    min-width: 100%;
  }

  .horizontal-layout {
    gap: 1rem;
  }

  .chart-metric-item {
    padding: 0.75rem;
  }

  .chart-metric-value {
    font-size: 1.2rem;
  }
}

.page-header p {
  color: var(--text-secondary, #666);
  font-size: 1.1rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: var(--bg-color, white);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(3, 22, 51, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.15);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(3, 22, 51, 0.2);
  border-color: rgba(255, 165, 0, 0.3);
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
  color: var(--text-color, #031633);
  margin-bottom: 0.5rem;
}

.label {
  color: var(--text-secondary, #666);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  top: 1rem;
  right: 1rem;
  animation: pulse 2s infinite;
}

.product-indicator.active {
  background-color: #28a745;
}

.product-indicator.development {
  background-color: #FFA500;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--border-color, #e9ecef);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #FFA500 0%, #FFB733 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.stars {
  text-align: center;
  font-size: 1.2rem;
}

.products-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.products-card,
.roadmap-card {
  background: var(--bg-color, white);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(3, 22, 51, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.15);
  padding: 2rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.products-card:hover,
.roadmap-card:hover {
  box-shadow: 0 12px 40px rgba(3, 22, 51, 0.15);
  border-color: rgba(255, 165, 0, 0.25);
}

.products-card h3,
.roadmap-card h3 {
  color: var(--text-color, #031633);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  font-weight: 700;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--card-bg, #f8f9fa);
  border: 1px solid rgba(255, 165, 0, 0.1);
  box-shadow: 0 4px 16px rgba(3, 22, 51, 0.05);
  transition: all 0.3s ease;
}

.product-item:hover {
  background-color: var(--card-hover-bg, #e9ecef);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(3, 22, 51, 0.1);
  border-color: rgba(255, 165, 0, 0.2);
}

.product-icon {
  font-size: 2.5rem;
  width: 60px;
  text-align: center;
  align-self: center;
}

.product-info h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color, #031633);
  font-size: 1.1rem;
  font-weight: 600;
}

.product-info p {
  margin: 0 0 1rem 0;
  color: var(--text-secondary, #666);
  font-size: 0.9rem;
}

.product-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.tag {
  background-color: #FFA500;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.product-status {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.product-status.active {
  background-color: #d4edda;
  color: #155724;
}

.product-status.development {
  background-color: #fff3cd;
  color: #856404;
}

.product-status.beta {
  background-color: #d1ecf1;
  color: #0c5460;
}

.product-metrics {
  text-align: center;
  align-self: center;
}

.metric-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-color, #031633);
}

.metric-label {
  font-size: 0.8rem;
  color: var(--text-secondary, #666);
  text-transform: uppercase;
}

.roadmap-timeline {
  position: relative;
}

.roadmap-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #FFA500 0%, #031633 100%);
}

.timeline-item {
  position: relative;
  padding-left: 3rem;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: 7px;
  top: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--border-color, #e9ecef);
  border: 3px solid var(--bg-color, #fff);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeline-item.completed .timeline-marker {
  background-color: #28a745;
}

.timeline-item.active .timeline-marker {
  background-color: #FFA500;
  animation: pulse 2s infinite;
}

.timeline-content h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color, #031633);
  font-weight: 600;
}

.timeline-content p {
  margin: 0;
  color: var(--text-secondary, #666);
  font-size: 0.9rem;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .products-section {
    grid-template-columns: 1fr;
  }

  .product-item {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}

/* Enhanced Dashboard Grid - Equal Heights */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: stretch;
  /* Forzar altura igual */
}

.dashboard-grid>.dashboard-card,
.dashboard-grid>.chart-section {
  display: flex;
  flex-direction: column;
  min-height: 350px;
  /* Altura mínima consistente */
}

/* Enhanced Card Content Distribution */
.dashboard-card .card-content,
.chart-section .chart-layout {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* Cambiar a row para layout horizontal */
}

/* Interactive Chart Styling */
.chart-container {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 280px;
}

.chart-canvas {
  border-radius: 8px;
  cursor: crosshair;
  transition: all 0.2s ease;
  background: var(--chart-bg, rgba(255, 255, 255, 0.02));
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
}

.chart-canvas:hover {
  filter: brightness(1.05);
  border-color: var(--primary-color, #FFA500);
  box-shadow: 0 0 10px var(--primary-glow, rgba(255, 165, 0, 0.3));
}

/* Tooltip Styling */
.chart-tooltip {
  position: fixed;
  background: var(--tooltip-bg);
  color: var(--tooltip-text);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--tooltip-border);
  backdrop-filter: blur(8px);
  transform: translate(-50%, -100%);
  margin-top: -12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-family: 'Montserrat', sans-serif;
}

.chart-tooltip.visible {
  opacity: 1;
  transform: translate(-50%, -100%) translateY(-4px);
}

.chart-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--tooltip-bg);
}

/* Mobile tooltip adjustments */
@media (max-width: 768px) {
  .chart-tooltip {
    padding: 14px 18px;
    font-size: 14px;
    border-radius: 10px;
    min-width: 150px;
    text-align: center;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  .chart-tooltip::after {
    border-width: 8px;
  }
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tooltip-date {
  font-weight: 600;
  font-size: 12px;
  color: #ffffff !important;
  opacity: 0.9;
}

.tooltip-value {
  font-weight: 700;
  font-size: 14px;
  color: #ffffff !important;
}

/* Chart Metrics Enhancement */
.chart-metric-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--metric-bg, rgba(255, 255, 255, 0.05));
  border-radius: 6px;
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  transition: all 0.2s ease;
}

.chart-metric-item:hover {
  background: var(--metric-hover-bg, rgba(255, 255, 255, 0.08));
  border-color: var(--primary-color, #FFA500);
}

.chart-metric-icon {
  font-size: 18px;
  opacity: 0.8;
}

/* Theme-specific variables */
:root {
  --tooltip-bg: rgba(0, 0, 0, 0.98);
  --tooltip-text: #ffffff;
  --tooltip-border: rgba(255, 255, 255, 0.2);
  --chart-bg: rgba(255, 255, 255, 0.02);
  --metric-bg: rgba(255, 255, 255, 0.05);
  --metric-hover-bg: rgba(255, 255, 255, 0.08);
  --primary-glow: rgba(255, 165, 0, 0.3);
}

[data-theme="light"] {
  --tooltip-bg: rgba(30, 30, 30, 0.98);
  --tooltip-text: #ffffff;
  --tooltip-border: rgba(255, 255, 255, 0.1);
  --chart-bg: rgba(0, 0, 0, 0.02);
  --metric-bg: rgba(0, 0, 0, 0.03);
  --metric-hover-bg: rgba(0, 0, 0, 0.05);
  --primary-glow: rgba(255, 165, 0, 0.2);
}

[data-theme="dark"] {
  --tooltip-bg: rgba(20, 20, 20, 0.98);
  --tooltip-text: #ffffff;
  --tooltip-border: rgba(255, 255, 255, 0.15);
  --chart-bg: rgba(255, 255, 255, 0.02);
  --metric-bg: rgba(255, 255, 255, 0.05);
  --metric-hover-bg: rgba(255, 255, 255, 0.08);
  --primary-glow: rgba(255, 165, 0, 0.4);
}
</style>
