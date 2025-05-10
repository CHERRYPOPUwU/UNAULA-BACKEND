\connect UNAULA;

-- Crear tabla de Carreras
CREATE TABLE carreras(
    id bigint primary key generated always as identity,
    nombre VARCHAR(255) NOT NULL,
    semestres INT NOT NULL,
    facultad VARCHAR(255) NOT NULL
);

-- Crear tabla de Asesores
CREATE TABLE asesores (
    id bigint primary key generated always as identity,
    nombre VARCHAR(255) NOT NULL,
    especialidad VARCHAR(255) NOT NULL,
    celular VARCHAR(15) NOT NULL
);

-- Crear tabla de Proyectos
CREATE TABLE proyectos (
    id bigint primary key generated always as identity,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    tema VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    id_asesor INT REFERENCES asesores(Id)
);

-- Crear tabla de Estudiantes
CREATE TABLE estudiantes (
    id bigint primary key generated always as identity,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    matriculado BOOLEAN NOT NULL,
    celular VARCHAR(15) NOT NULL,
    id_proyecto INT REFERENCES proyectos(id),
    id_carrera INT REFERENCES carreras(id)
);

-- Crear tabla de Fecha_Asesoria
CREATE TABLE fecha_asesoria (
    id bigint primary key generated always as identity,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    id_proyecto INT REFERENCES proyectos(id),
    id_asesor INT REFERENCES asesores(id)
);

--Creare tabla de usuario
CREATE TABLE usuarios(
    id bigint primary key generated always as identity,
    nombre VARCHAR(255) NOT NULL,
    documento bigint NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL
);