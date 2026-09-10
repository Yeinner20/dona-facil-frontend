CREATE DATABASE IF NOT EXISTS donafacil;
USE donafacil;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    tipo_usuario VARCHAR(50) NOT NULL
);

CREATE TABLE organizacion (
    id_organizaciones INT AUTO_INCREMENT PRIMARY KEY,
    nombre_organizacion VARCHAR(150) NOT NULL,
    direccion VARCHAR(205) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(150) NOT NULL,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE campana (
    id_campana INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    meta_recaudacion DECIMAL(12,2) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    id_organizacion INT,
    FOREIGN KEY (id_organizacion) REFERENCES organizacion(id_organizaciones) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE donacion (
    id_donacion INT AUTO_INCREMENT PRIMARY KEY,
    monto DECIMAL(12,2) NOT NULL,
    fecha_donacion DATE NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    id_usuario INT,
    id_campana INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_campana) REFERENCES campana(id_campana) ON DELETE RESTRICT ON UPDATE CASCADE
);