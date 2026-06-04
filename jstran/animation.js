// Función para animar la transición entre páginas
function crearTransicion(url) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);
    
    // Esperar a que termine la animación y luego cambiar de página
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

// Agregar evento a todos los enlaces internos
document.addEventListener('DOMContentLoaded', () => {
    const enlaces = document.querySelectorAll('a[href]');
    
    enlaces.forEach(enlace => {
        // Solo para enlaces internos (que no abran en nueva pestaña)
        if (!enlace.target && !enlace.onclick && !enlace.href.includes('http') && !enlace.href.includes('wa.me')) {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                crearTransicion(enlace.href);
            });
        }
    });
});

// Animación de entrada suave cuando se carga la página
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.6s ease-in-out';
});