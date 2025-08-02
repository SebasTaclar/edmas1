<template>
   <!-- SECCIÓN SERVICIOS -->
    <section class="services-section" id="offerings">
        <div class="services-bg"></div>
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">Nuestros Servicios</h2>
                <p class="section-subtitle">
                    Empresa especializada en tercerización de procesos de producción, ensamble y producto terminado. Para las áreas de producción, ensamble y producto terminado
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">🧩</div>
                    <h3 class="service-title">Ensamble</h3>
                    <p class="service-description">
                        En bancos neumáticos para sub-ensambles de productos eléctricos y electrónicos.
                    </p>
                </div>

                <div class="service-card">
                    <div class="service-icon">⚙️</div>
                    <h3 class="service-title">Servicio</h3>
                    <p class="service-description">
                        Empacado, embolsado y sellado de partes y piezas eléctricas con suministro de empaque plástico (polietileno de alta y baja densidad).
                    </p>
                </div>

                <div class="service-card">
                    <div class="service-icon">🎨</div>
                    <h3 class="service-title">Pintura</h3>
                    <p class="service-description">
                        Servicio de Pintura en aerografía, para piezas con geometría especial.
                    </p>
                </div>

                <div class="service-card">
                    <div class="service-icon">🎯</div>
                    <h3 class="service-title">Otro Servicio</h3>
                    <p class="service-description">
                        Adaptaciones de procesos en sub enambles y procesos manueales para sistematizarlos
                    </p>
                </div>

                <div class="service-card">
                    <div class="service-icon">🖇️</div>
                    <h3 class="service-title">Servicio XXX</h3>
                    <p class="service-description">
                        XXXXXXXXXXXXXXXXXXXXXXX
                    </p>
                </div>

                <div class="service-card">
                    <div class="service-icon">🧰</div>
                    <h3 class="service-title">Servicio XXXX</h3>
                    <p class="service-description">
                        xxxxxxx
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OfferingsComponent',
});
</script>

<style scoped>
 /* SECCIÓN SERVICIOS */
        .services-section {
            background: linear-gradient(45deg, #f5f5f5, #e8e8e8);
            padding: 5rem 2rem;
            position: relative;
            overflow: hidden;
        }

        .services-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1;
        }

        .services-bg::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, #1a237e, transparent);
            border-radius: 50%;
        }

        .services-bg::after {
            content: '';
            position: absolute;
            bottom: -20%;
            left: -10%;
            width: 400px;
            height: 200px;
            background: linear-gradient(45deg, #ffa000, transparent);
            border-radius: 50% 50% 0 0;
        }

        .section-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-title {
            font-size: 3rem;
            font-weight: 900;
            color: #1a237e;
            margin-bottom: 1rem;
            text-transform: uppercase;
            position: relative;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, #ffa000, #ff8f00);
            border-radius: 2px;
        }

        .section-subtitle {
            font-size: 1.2rem;
            color: #666;
            max-width: 600px;
            margin: 0 auto;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .service-card {
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(90deg, #ffa000, #ff8f00);
        }

        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(26, 35, 126, 0.15);
        }

        .service-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #1a237e, #0d47a1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
            color: white;
        }

        .service-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1a237e;
            margin-bottom: 1rem;
        }

        .service-description {
            color: #5c5c5c;
            line-height: 1.6;
            text-align: justify;
        }
</style>
