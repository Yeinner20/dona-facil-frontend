/**
 * SERVICIO WEB API REST - DONAFÁCIL
 * Módulo de Autenticación y Registro de Usuarios
 * Evidencia: GA7-220501096-AA5-EV01
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Middlewares globales
app.use(cors()); // Habilita peticiones entre origen cruzado (Front-End -> Back-End)
app.use(express.json()); // Permite procesar solicitudes en formato JSON

/**
 * Base de datos volátil en memoria para pruebas de registro y login.
 * Incluye un usuario por defecto para validación directa.
 */
const usuariosBD = [
    {
        usuario: "admin@donafacil.org",
        contrasena: "123456",
        nombre: "Administrador DonaFácil"
    }
];

// ============================================================================
// SERVICIO WEB 1: REGISTRO DE USUARIOS
// ============================================================================
/**
 * @route   POST /api/registro
 * @desc    Registra un nuevo usuario en la plataforma
 * @access  Público
 */
app.post('/api/registro', (req, res) => {
    const { usuario, contrasena, nombre } = req.body;

    // Validación 1: Verificar que los campos requeridos no estén vacíos
    if (!usuario || !contrasena) {
        return res.status(400).json({
            estado: false,
            mensaje: "Error en el registro: Debe proporcionar usuario y contraseña."
        });
    }

    // Validación 2: Verificar si el usuario ya se encuentra registrado
    const usuarioExistente = usuariosBD.find(u => u.usuario === usuario);
    if (usuarioExistente) {
        return res.status(400).json({
            estado: false,
            mensaje: "Error en el registro: El usuario ya se encuentra registrado."
        });
    }

    // Almacenamiento del nuevo registro
    const nuevoUsuario = { usuario, contrasena, nombre: nombre || "Usuario General" };
    usuariosBD.push(nuevoUsuario);

    return res.status(201).json({
        estado: true,
        mensaje: "Registro realizado con éxito.",
        usuario: nuevoUsuario.usuario
    });
});

// ============================================================================
// SERVICIO WEB 2: INICIO DE SESIÓN / AUTENTICACIÓN
// ============================================================================
/**
 * @route   POST /api/login
 * @desc    Autentica un usuario verificando credenciales
 * @access  Público
 */
app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Validación 1: Datos incompletos en la solicitud
    if (!usuario || !contrasena) {
        return res.status(400).json({
            estado: false,
            mensaje: "Error en la autenticación: Credenciales incompletas."
        });
    }

    // Búsqueda del usuario en la base de datos
    const usuarioValido = usuariosBD.find(
        u => u.usuario === usuario && u.contrasena === contrasena
    );

    // Validación 2: Respuesta según el resultado de la autenticación
    if (usuarioValido) {
        // Respuesta cuando la autenticación es EXITOSA
        return res.status(200).json({
            estado: true,
            mensaje: "Autenticación satisfactoria",
            usuario: {
                correo: usuarioValido.usuario,
                nombre: usuarioValido.nombre
            }
        });
    } else {
        // Respuesta cuando la autenticación ES INCORRECTA
        return res.status(401).json({
            estado: false,
            mensaje: "Error en la autenticación"
        });
    }
});

// Inicialización del servidor de servicios web
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(` Servidor API DonaFácil ejecutándose en el puerto: ${PORT}`);
    console.log(` Endpoint Registro: POST http://localhost:${PORT}/api/registro`);
    console.log(` Endpoint Login:    POST http://localhost:${PORT}/api/login`);
    console.log(`=================================================`);
});