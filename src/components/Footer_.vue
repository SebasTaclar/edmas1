<template>
    <!-- FOOTER -->
    <section class="footer">
        <div class="footer-content">
            <div class="footer-logo">FODISERVICES</div>
            <p class="footer-text">
                Transformando negocios a través de soluciones innovadoras de outsourcing. 
                Tu éxito es nuestra misión. <br>Síguenos en nuestras redes sociales
            </p>

            <div class="social-links">
                <a href="" class="social-link" target="_blank">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png"  alt="Facebook" width="31" style="border-radius: 70px;">
                </a>
                <a href="" class="social-link">
                    <img src="https://cdn-icons-png.flaticon.com/512/3670/3670125.png" alt="Instagram" width="31" style="border-radius: 70px;">
                </a>
                <a href="#" class="social-link">
                    <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="Twitter" width="31" style="border-radius: 70px;">
                </a>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 FODISERVICES. Todos los derechos reservados. | Política de Privacidad | Términos de Servicio</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
    /* FOOTER */
    .footer {
        background: #031633;
        color: white;
        padding: 3rem 2rem 1rem;
        text-align: center;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
    }

    .footer-logo {
        font-size: 2rem;
        font-weight: 900;
        color: #FFA500;
        margin-bottom: 1rem;
    }

    .footer-text {
        opacity: 0.8;
        margin-bottom: 2rem;
    }

    .social-links {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .social-link {
        width: 35px;
        height: 35px;
        background: #FFA500;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1a237e;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .social-link:hover {
        transform: translateY(-3px);
        background: #ffffff;
    }

    .footer-bottom {
        border-top: 1px solid rgba(255, 160, 0, 0.3);
        padding-top: 1rem;
        opacity: 0.6;
    }

</style>
