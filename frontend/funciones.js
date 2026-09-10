/**
 * CONTROLADOR DE INTERFAZ DE USUARIO (SPA) - DONAFÁCIL
 * Gestiona el enrutamiento del lado del cliente y la renderización de componentes.
 */

/**
 * Conmuta la visibilidad de los módulos de la aplicación.
 * @param {string} tabId - Identificador único de la vista (inicio, login, dashboard, crear).
 */
function switchTab(tabId) {
    // Ocultar todas las secciones contenedoras
    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.add('hidden');
    });

    // Resetear estados visuales en los botones de navegación
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-brand-primary', 'text-white', 'shadow-sm');
        btn.classList.add('text-gray-600', 'hover:text-brand-primary');
    });

    // Mostrar el módulo solicitado por el usuario
    const targetView = document.getElementById('view-' + tabId);
    if (targetView) {
        targetView.classList.remove('hidden');
    }
    
    // Activar el botón correspondiente en la barra superior
    const activeBtn = document.getElementById('btn-' + tabId);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-600', 'hover:text-brand-primary');
        activeBtn.classList.add('bg-brand-primary', 'text-white', 'shadow-sm');
    }

    // Desplazamiento suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Inicialización de componentes gráficos tras la carga completa del DOM.
 */
document.addEventListener("DOMContentLoaded", function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});