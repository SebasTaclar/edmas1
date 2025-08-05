<template>
    <!-- FOOTER -->
    <section class="footer">
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="/images/logo.png" alt="ED90+1 Logo" class="logo-img">
                    </div>
                    <p class="footer-description">
                        El fútbol es más que un deporte, es una pasión que nos une.
                    </p>
                </div>
                
                <div class="footer-section">
                    <h3>Enlaces Rápidos</h3>
                    <ul class="footer-links">
                        <li><a href="#ongoing_tournaments">Torneos</a></li>
                        <li><a href="#our_work">Nuestro Trabajo</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Síguenos</h3>
                    <div class="social-links">
                        <a href="https://facebook.com" class="social-link" target="_blank" rel="noopener">
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24">
                        </a>
                        <a href="https://instagram.com" class="social-link" target="_blank" rel="noopener">
                            <img src="https://cdn-icons-png.flaticon.com/512/3670/3670125.png" alt="Instagram" width="24">
                        </a>
                        <a href="https://twitter.com" class="social-link" target="_blank" rel="noopener">
                            <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="Twitter" width="24">
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 ED90+1. Todos los derechos reservados.</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
    /* FOOTER */
    .footer {
        background: #031633;
        color: white;
        padding: 4rem 2rem 1rem;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
    }

    .footer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 3rem;
        margin-bottom: 3rem;
    }

    .footer-section {
        text-align: left;
    }

    .footer-section h3 {
        color: #FFA500;
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
        font-weight: 600;
    }

    .logo-img {
        max-width: 150px;
        height: auto;
        margin-bottom: 1rem;
    }

    .footer-description {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .footer-links {
        list-style: none;
        padding: 0;
    }

    .footer-links li {
        margin-bottom: 0.8rem;
    }

    .footer-links a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-links a:hover {
        color: #FFA500;
    }

    .social-links {
        display: flex;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .social-link {
        width: 60px;
        height: 60px;
        background: linear-gradient(145deg, #031f4d, #021326);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 5px 5px 10px #021326,
                   -5px -5px 10px #031f4d;
        position: relative;
        overflow: hidden;
    }

    .social-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #FFA500, #FF4500);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .social-link:hover {
        transform: translateY(-5px);
    }

    .social-link:hover::before {
        opacity: 1;
    }

    .social-link img {
        width: 28px;
        height: 28px;
        filter: brightness(0) invert(1);
        position: relative;
        z-index: 1;
        transition: transform 0.3s ease;
    }

    .social-link:hover img {
        transform: scale(1.2);
    }

    .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 1.5rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .footer {
            padding: 3rem 1.5rem 1rem;
        }

        .footer-grid {
            gap: 2rem;
        }

        .footer-section {
            text-align: center;
        }

        .social-links {
            justify-content: center;
        }
    }

</style>
