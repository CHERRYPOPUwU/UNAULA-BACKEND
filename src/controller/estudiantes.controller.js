import {Carreras, Estudiantes, Proyectos} from "../models/index.js";
import { successResponse } from "../utils/responseHandler.js";


/**
 * Gets all available students.
 *
 * @async
 * @function getAllStudents
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the list of students.
 * @throws {Error} In case an error occurs in the database query.
 */
export const getAllEstudiantes = async (req,res, next) => {
    try {
        const allEstudiantes = await Estudiantes.findAll({
            include: [
                {model: Proyectos, attributes: ["nombre"]},
                {model: Carreras, attributes: ["nombre"]}
            ]
        });

        if(allEstudiantes == null){
            return res.status(400).json({ messahe: "No students registered"})
        }

        const allEstudiantesGoodFormat = allEstudiantes.map(estudiante => formatEstudiante(estudiante));

        successResponse(res, allEstudiantesGoodFormat);

    } catch (error) {
        next(error);
    }
}

/**
 * Gets the details of a specific student by ID.
 *
 * @async
 * @function getProject
 * @param {Object} req - The HTTP request, must contain the student ID in the request body.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the details of the requested student.
 * @throws {Error} If an error occurs when searching for the student in the database.
 */
export const getEstudiante = async (req, res ,next) => {

    const {id} = req.params;

    try {
        let estudent = await Estudiantes.findByPk(id,{
            include: [
                {model: Proyectos, attributes: ["nombre"]},
                {model: Carreras, attributes: ["nombre"]}
            ]
        })

        if(estudent == null) return res.status(404).json({message:"This Student is not in the database, try another one!"})

        estudent = formatEstudiante(estudent);
        successResponse(res, estudent)

    } catch (error) {
        next(error)
    }
}


/**
 * Create a new student in the database.
 *
 * @async
 * @function createStudent
 * @param {Object} req - The HTTP request containing the request body with the new student's data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} response with the 201 status code and the success message with the student data created.
 * @throws {Error} If fields are missing in the request body or if an error occurs when creating the student.
 */
export const createEstudiante = async (req, res, next) => {
    const {nombre, apellidos, edad, matriculado, celular, id_proyecto, id_carrera } = req.body;

    try {
        const existProyecto = await Proyectos.findByPk(id_proyecto);
        if(!existProyecto) return res.status(404).json({message:"The project does not exist, select another one"});

        const estudiantesAsociados = await Estudiantes.count({where: {id_proyecto}})
        if(estudiantesAsociados == 3)return res.status(400).json({message: "This project already has three student partners"});

        const existCarrera = await Carreras.findByPk(id_carrera);
        if(!existCarrera) return res.status(404).json({message:"Career does not exist, select another"});

        const createdEstudiante = await Estudiantes.create({
            nombre, apellidos, edad, matriculado, celular, id_proyecto, id_carrera
        })

        successResponse(
            res,
            createdEstudiante,
            "Student successfully created"
        )
    } catch (error) {
        next(error);
    }

    
}

/**
 * Update a Student in the database.
 *
 * @async
 * @function updateStudent
 * @param {Object} req - The HTTP request containing the body and parameter of the request with the new student's data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} response with the 201 status code and the success message with the updated student data.
 * @throws {Error} If fields are missing in the request body or if an error occurs while updating the student.
 */
export const updateEstudiante = async (req, res, next) => {
    const {id} = req.params;
    const {nombre, apellidos, edad, matriculado, celular, id_proyecto, id_carrera } = req.body;

    if(!id) return res.status(40).json({message:"the id is required"})

    try {

        const updatedEstudiante = await Estudiantes.findByPk(id)

        if(updatedEstudiante == null) return res.status(404).json({message:"This student is not found in the database, try another one"})

        const existProyecto = await Proyectos.findByPk(id_proyecto);
        if(!existProyecto) return res.status(404).json({message:"The project does not exist, select another one"});

        const estudiantesAsociados = await Estudiantes.count({where: {id_proyecto}})
        if(estudiantesAsociados == 3 && id_proyecto !== updatedEstudiante.id_proyecto){
            return res.status(400).json({message: "This project already has three student partners"});
        }
        const existCarrera = await Carreras.findByPk(id_carrera);
        if(!existCarrera) return res.status(404).json({message:"Career does not exist, select another one"});
        
        updatedEstudiante.nombre = nombre;
        updatedEstudiante.apellidos = apellidos; 
        updatedEstudiante.edad = edad; 
        updatedEstudiante.matriculado = matriculado;
        updatedEstudiante.celular = celular;
        updatedEstudiante.id_proyecto = id_proyecto;
        updatedEstudiante.id_carrera = id_carrera;

        await updatedEstudiante.save();
        successResponse(res, updatedEstudiante, "Student Successfully Updated");
    } catch (error) {
        next(error);
    }

} 

function formatEstudiante(data){
    return {
        ...data.toJSON(),
        proyecto: data.proyecto.nombre,
        carrera: data.carrera.nombre
    }
}