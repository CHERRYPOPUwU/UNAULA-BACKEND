\connect unaula;

-- Insertar datos en la tabla de Carreras
INSERT INTO carreras (nombre, semestres, facultad)
VALUES 
    ('Ingeniería de Sistemas', 10, 'Facultad de Ingeniería'),
    ('Administración de Empresas', 8, 'Facultad de Ciencias Económicas'),
    ('Derecho', 9, 'Facultad de Ciencias Jurídicas');

-- Insertar datos en la tabla de Asesores
INSERT INTO asesores (nombre, especialidad, celular)
VALUES 
    ('Carlos Pérez', 'Ingeniería de Software', '123456789'),
    ('Ana Gómez', 'Derecho Corporativo', '987654321'),
    ('Luis Martínez', 'Finanzas', '555666777');

-- Insertar datos en la tabla de Proyectos
INSERT INTO proyectos (nombre, tipo, tema, estado, id_asesor)
VALUES 
    ('Sistema de Gestión de Proyectos', 'Tesis', 'Desarrollo de un sistema para gestión de proyectos', 'Aprobado', 1),
    ('Análisis de Riesgos Legales', 'Investigación', 'Estudio de riesgos en derecho corporativo', 'En proceso', 2),
    ('Plan de Negocios para Startup', 'Plan de Negocios', 'Desarrollo de un plan de negocios para una nueva startup', 'Aprobado', 3);

-- Insertar datos en la tabla de Estudiantes
INSERT INTO estudiantes (nombre, apellidos, edad, matriculado, celular, id_proyecto, id_carrera)
VALUES 
    ('Juan', 'García', 22, TRUE, '123123123', 1, 1),
    ('María', 'López', 24, TRUE, '321321321', 2, 2),
    ('Pedro', 'Martínez', 23, TRUE, '555888555', 3, 3);

-- Insertar datos en la tabla de Fecha_Asesoria
INSERT INTO fecha_asesoria (fecha, hora, id_proyecto, id_asesor)
VALUES 
    ('2024-10-10', '09:00:00', 1, 1),
    ('2024-10-15', '14:30:00', 2, 2),
    ('2024-10-20', '11:00:00', 3, 3);

-- Insertar datos en la tabla de usuarios
INSERT INTO usuarios (nombre, documento, password, rol)
VALUES 
    ('Jose Daniel',1027540540,'1027540540', 'Administrativo'),
    ('Pepito Perez',104564304,'104564304', 'Estudiante'),
    ('Juanito Lopez',102890100,'102890100', 'Asesor');