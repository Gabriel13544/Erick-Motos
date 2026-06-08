// Número de WhatsApp del dueño (con código de país)
const NUMERO_WHATSAPP = '5354214460'; // Sin + ni espacios

// Función para obtener las motos y colores seleccionados
function obtenerProductosSeleccionados() {
    const productosSeleccionados = [];
    
    // Obtener todos los checkboxes de productos
    const checkboxProductos = document.querySelectorAll('.checkbox-producto:checked');
    
    checkboxProductos.forEach(checkbox => {
        const contenedorProducto = checkbox.closest('.producto-compra');
        
        // Obtener el nombre de la moto desde el label
        const nombreMoto = contenedorProducto.querySelector('.nombre-producto')?.textContent || 'Moto';
        
        // Obtener colores seleccionados para esta moto
        const checkboxColores = contenedorProducto.querySelectorAll('.color-checkbox:checked');
        
        if (checkboxColores.length === 0) {
            return;
        }
        
        // Agregar cada color seleccionado con su moto
        checkboxColores.forEach(colorCheckbox => {
            // Extraer solo el color, sin el nombre de la moto
            const colorCompleto = colorCheckbox.value;
            const color = colorCompleto.split(' - ')[0]; // "Rojo - Moto Dakar" → "Rojo"
            
            productosSeleccionados.push({
                moto: nombreMoto,
                color: color
            });
        });
    });
    
    return productosSeleccionados;
}

// Función para validar que haya productos seleccionados
function validarSeleccion() {
    const productos = obtenerProductosSeleccionados();
    
    if (productos.length === 0) {
        alert('❌ Por favor, selecciona al menos una moto y su color.');
        return false;
    }
    
    return true;
}

// Función para formatear lista con "y"
function formatearLista(array) {
    if (array.length === 1) {
        return array[0];
    } else if (array.length === 2) {
        return `${array[0]} y ${array[1]}`;
    } else {
        return array.slice(0, -1).join(", ") + ' y ' + array[array.length - 1];
    }
}

// Función para crear el mensaje de WhatsApp
function crearMensaje() {
    const productos = obtenerProductosSeleccionados();
    
    // Extraer marcas y colores
    const marcas = productos.map(p => p.moto);
    const colores = productos.map(p => p.color);
    
    // Formatear listas
    const marcasFormato = formatearLista(marcas);
    const coloresFormato = formatearLista(colores);
    
    // Crear mensaje
    let mensaje = `Hola, estoy interesado en la moto de la marca ${marcasFormato} y de color ${coloresFormato}.`;
    
    return mensaje;
}

// Función para enviar a WhatsApp
function enviarPedidoWhatsApp() {
    // Validar selección
    if (!validarSeleccion()) {
        return;
    }
    
    // Crear mensaje
    const mensaje = crearMensaje();
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear URL de WhatsApp
    const urlWhatsapp = `https://wa.me/5354214460?text={mensajeCodificado}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsapp, '_blank');
}
