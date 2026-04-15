document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SYSTÈME D'ONGLETS (Pour les pages Projets et Bilan)
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer l'état actif partout
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Ajouter l'état actif au bouton cliqué et au contenu correspondant
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    /* ==========================================================================
       2. MODALES DES PROJETS
       ========================================================================== */
    const cards = document.querySelectorAll('.feature-card');
    const overlay = document.getElementById('modalOverlay');

    if (overlay && cards.length > 0) {
        cards.forEach((card, index) => {
            const button = card.querySelector('.open-details-btn');
            const modal = document.getElementById(`modal-${index}`);
            
            if (button && modal) {
                const closeBtn = modal.querySelector('.close-details-btn');
                
                // Ouvrir la modale
                button.addEventListener('click', function() {
                    modal.classList.add('active');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page derrière
                });
                
                // Fermer avec le bouton X
                if (closeBtn) {
                    closeBtn.addEventListener('click', function() {
                        modal.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }
                
                // Fermer en cliquant sur l'overlay (zone sombre)
                overlay.addEventListener('click', function() {
                    modal.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
                
                // Fermer avec la touche Échap
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && modal.classList.contains('active')) {
                        modal.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }

    /* ==========================================================================
       3. ANIMATIONS AU DÉFILEMENT (Intersection Observer)
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionnel: décommenter la ligne ci-dessous si on veut que l'animation ne se joue qu'une seule fois
                    // observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /* ==========================================================================
       4. EASTER EGG : BASKETBALL (Page À propos)
       ========================================================================== */
    const basketball = document.querySelector('.basketball-animation');
    
    if (basketball) {
        let clickCount = 0;
        
        basketball.addEventListener('click', function() {
            clickCount++;
            this.style.animation = 'bounce 0.5s ease-out';
            
            setTimeout(() => {
                this.style.animation = 'bounce 2s infinite ease-in-out';
            }, 500);
            
            if (clickCount === 5) {
                alert("🏀 Vous avez trouvé l'easter egg ! Vous êtes aussi persévérant qu'un joueur de basket ! 🏀");
                clickCount = 0;
            }
        });
    }

    /* ==========================================================================
       5. EFFET PARALLAXE SUR LE HERO (Bannière d'en-tête)
       ========================================================================== */
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.3; // Ajusté à -0.3 pour un effet un peu plus doux
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

});