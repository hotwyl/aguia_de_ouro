/**
 * Jogos Bíblicos - Main Application Script (Vanilla JS)
 */

const app = {
    init() {
        this.setupMobileMenu();
        this.setupCookieBanner();
        this.setCurrentYear();
    },

    setupMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const icon = document.getElementById('menu-icon');

        if (btn && menu && icon) {
            btn.addEventListener('click', () => {
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !isExpanded);
                menu.classList.toggle('hidden');
                
                if (isExpanded) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                }
            });
        }
    },

    setupCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        const btn = document.getElementById('accept-cookies');
        
        if (banner && btn) {
            const hasAccepted = localStorage.getItem('cookies_accepted');
            if (!hasAccepted) {
                // Show banner after a short delay
                setTimeout(() => {
                    banner.classList.remove('translate-y-full');
                }, 1000);
            }

            btn.addEventListener('click', () => {
                localStorage.setItem('cookies_accepted', 'true');
                banner.classList.add('translate-y-full');
            });
        }
    },

    setCurrentYear() {
        const el = document.getElementById('current-year');
        if (el) {
            el.textContent = new Date().getFullYear();
        }
    },

    /**
     * Shows a generic information notice using SweetAlert2.
     * Checks globalThis to avoid lint warnings per user preferences.
     * @param {string} text Notice text
     */
    showNotice(text) {
        if (globalThis.Swal) {
            Swal.fire({
                title: 'Aviso',
                text: text,
                icon: 'info',
                confirmButtonColor: '#3b82f6', // primary-500
                confirmButtonText: 'OK'
            });
        } else {
            alert(text);
        }
    },

    /**
     * Shows a help dialog using SweetAlert2.
     * @param {string} text Help text
     */
    showHelp(text) {
        if (globalThis.Swal) {
            Swal.fire({
                title: 'Como Jogar',
                text: text,
                icon: 'question',
                confirmButtonColor: '#3b82f6', // primary-500
                confirmButtonText: 'Entendi'
            });   
        } else {
            alert(text);
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
