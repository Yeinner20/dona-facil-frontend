/**
 * SERVICIO WEB API REST COMPLETO - DONAFÁCIL
 * Módulos: Autenticación de Usuarios y Gestión CRUD de Donaciones
 * Evidencia: GA7-220501096-AA5-EV03
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Base de datos volátil en memoria - Usuarios
const usuariosBD = [
    {
        id: 1,
        usuario: "admin@donafacil.org",
        contrasena: "123456",
        nombre: "Administrador DonaFácil"
    }
];

// Base de datos volátil en memoria - Donaciones del Proyecto
const donacionesBD = [
    {
        id: 1,
        titulo: "Donación de Ropa de Invierno",
        categoria: "Ropa",
        descripcion: "Chaquetas y abrigos en excelente estado para adultos.",
        cantidad: 15,
        donante: "admin@donafacil.org",
        estado: "Disponible",
        fecha: "2026-03-01"
    },
    {
        id: 2,
        titulo: "Kits Escolares Básicos",
        categoria: "Educación",
        descripcion: "Cuadernos, lápices y colores para niños de primaria.",
        cantidad: 30,
        donante: "yeinner@donafacil.org",
        estado: "Disponible",
        fecha: "2026-03-10"
    }
];

// ============================================================================
// MÓDULO 1: SERVICIOS DE AUTENTICACIÓN Y REGISTRO
// ============================================================================

/**
 * @route   POST /api/registro
 * @desc    Registra un nuevo usuario en la plataforma
 */
app.post('/api/registro', (req, res) => {
    const { usuario, contrasena, nombre } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({
            estado: false,
            mensaje: "Validación fallida: El correo y la contraseña son obligatorios."
        });
    }

    const usuarioExistente = usuariosBD.find(u => u.usuario === usuario);
    if (usuarioExistente) {
        return res.status(400).json({
            estado: false,
            mensaje: "Validación fallida: El correo ya se encuentra registrado."
        });
    }

    const nuevoUsuario = {
        id: usuariosBD.length + 1,
        usuario,
        contrasena,
        nombre: nombre || "Usuario Donante"
    };
    usuariosBD.push(nuevoUsuario);

    return res.status(201).json({
        estado: true,
        mensaje: "Usuario registrado con éxito.",
        datos: { id: nuevoUsuario.id, usuario: nuevoUsuario.usuario }
    });
});

/**
 * @route   POST /api/login
 * @desc    Autentica un usuario verificando credenciales
 */
app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({
            estado: false,
            mensaje: "Validación fallida: Proporcione correo y contraseña."
        });
    }

    const usuarioValido = usuariosBD.find(
        u => u.usuario === usuario && u.contrasena === contrasena
    );

    if (usuarioValido) {
        return res.status(200).json({
            estado: true,
            mensaje: "Autenticación satisfactoria",
            usuario: {
                id: usuarioValido.id,
                correo: usuarioValido.usuario,
                nombre: usuarioValido.nombre
            }
        });
    } else {
        return res.status(401).json({
            estado: false,
            mensaje: "Error en la autenticación: Credenciales inválidas."
        });
    }
});

// ============================================================================
// MÓDULO 2: SERVICIOS REST COMPLETOS (CRUD) - GESTIÓN DE DONACIONES
// ============================================================================

/**
 * @route   GET /api/donaciones
 * @desc    Obtiene el listado completo de donaciones registradas
 */
app.get('/api/donaciones', (req, res) => {
    return res.status(200).json({
        estado: true,
        total: donacionesBD.length,
        datos: donacionesBD
    });
});

/**
 * @route   GET /api/donaciones/:id
 * @desc    Obtiene el detalle de una donación específica por su ID
 */
app.get('/api/donaciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const donacion = donacionesBD.find(d => d.id === id);

    if (!donacion) {
        return res.status(404).json({
            estado: false,
            mensaje: `No se encontró ninguna donación con el ID ${id}.`
        });
    }

    return res.status(200).json({
        estado: true,
        datos: donacion
    });
});

/**
 * @route   POST /api/donaciones
 * @desc    Crea y publica una nueva donación
 */
app.post('/api/donaciones', (req, res) => {
    const { titulo, categoria, descripcion, cantidad, donante } = req.body;

    // Validaciones de entrada de datos
    if (!titulo || !categoria || !cantidad || !donante) {
        return res.status(400).json({
            estado: false,
            mensaje: "Validación fallida: Los campos título, categoría, cantidad y donante son requeridos."
        });
    }

    const nuevaDonacion = {
        id: donacionesBD.length > 0 ? donacionesBD[donacionesBD.length - 1].id + 1 : 1,
        titulo,
        categoria,
        descripcion: descripcion || "Sin descripción proporcionada",
        cantidad: parseInt(cantidad),
        donante,
        estado: "Disponible",
        fecha: new Date().toISOString().split('T')[0]
    };

    donacionesBD.push(nuevaDonacion);

    return res.status(201).json({
        estado: true,
        mensaje: "Donación publicada con éxito.",
        datos: nuevaDonacion
    });
});

/**
 * @route   PUT /api/donaciones/:id
 * @desc    Actualiza la información o el estado de una donación existente
 */
app.put('/api/donaciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const donacionIndex = donacionesBD.findIndex(d => d.id === id);

    if (donacionIndex === -1) {
        return res.status(404).json({
            estado: false,
            mensaje: `No se encontró la donación con el ID ${id} para actualizar.`
        });
    }

    const { titulo, categoria, descripcion, cantidad, estado } = req.body;

    // Actualización selectiva de campos
    if (titulo) donacionesBD[donacionIndex].titulo = titulo;
    if (categoria) donacionesBD[donacionIndex].categoria = categoria;
    if (descripcion) donacionesBD[donacionIndex].descripcion = descripcion;
    if (cantidad) donacionesBD[donacionIndex].cantidad = parseInt(cantidad);
    if (estado) donacionesBD[donacionIndex].estado = estado;

    return res.status(200).json({
        estado: true,
        mensaje: "Donación actualizada correctamente.",
        datos: donacionesBD[donacionIndex]
    });
});

/**
 * @route   DELETE /api/donaciones/:id
 * @desc    Elimina un registro de donación del sistema
 */
app.delete('/api/donaciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const donacionIndex = donacionesBD.findIndex(d => d.id === id);

    if (donacionIndex === -1) {
        return res.status(404).json({
            estado: false,
            mensaje: `No se encontró la donación con el ID ${id} para eliminar.`
        });
    }

    const donacionEliminada = donacionesBD.splice(donacionIndex, 1);

    return res.status(200).json({
        estado: true,
        mensaje: "Donación eliminada con éxito del sistema.",
        datos: donacionEliminada[0]
    });
});

// Inicialización del Servidor Express
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(` Servidor API REST DonaFácil Ejecutándose en puerto: ${PORT}`);
    console.log(` Endpoints disponibles:`);
    console.log(`  - POST /api/registro`);
    console.log(`  - POST /api/login`);
    console.log(`  - GET    /api/donaciones`);
    console.log(`  - GET    /api/donaciones/:id`);
    console.log(`  - POST   /api/donaciones`);
    console.log(`  - PUT    /api/donaciones/:id`);
    console.log(`  - DELETE /api/donaciones/:id`);
    console.log(`=================================================`);
});