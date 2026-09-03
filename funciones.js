/**
 * Controlador dinámico para conmutar las vistas (Pestañas)
 * Permite simular una SPA (Single Page Application) fluida.
 */
function switchTab(tabId) {
    // 1. Ocultar todas las secciones de vista del contenedor
    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.add('hidden');
    });

    // 2. Remover las clases activas de todos los botones de la barra superior
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-brand-primary', 'text-white', 'shadow-sm');
        btn.classList.add('text-gray-600', 'hover:text-brand-primary');
    });

    // 3. Revelar la sección requerida por el usuario
    const targetView = document.getElementById('view-' + tabId);
    if (targetView) {
        targetView.classList.remove('hidden');
    }
    
    // 4. Aplicar los estilos activos al botón seleccionado
    const activeBtn = document.getElementById('btn-' + tabId);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-600', 'hover:text-brand-primary');
        activeBtn.classList.add('bg-brand-primary', 'text-white', 'shadow-sm');
    }

    // 5. Scroll automático suave hacia la parte superior de la interfaz
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar y renderizar dinámicamente los iconos cargados por la librería Lucide
document.addEventListener("DOMContentLoaded", function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});