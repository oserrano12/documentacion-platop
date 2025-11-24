// Funcionalidad para la galería de imágenes
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="modal-img">
        <div class="modal-caption" id="modal-caption"></div>
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');

    // Abrir modal al hacer clic en una imagen
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-img');
            const caption = this.querySelector('.gallery-caption');
            
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalCaption.textContent = caption.textContent;
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    // Inicializar galería
    initGallery();
    
    // ... resto del código existente ...
});
