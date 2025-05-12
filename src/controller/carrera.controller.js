import Carreras from "../models/carreras.model.js";
import { successResponse } from "../utils/responseHandler.js";

/**
 * Gets all available careers.
 *
 * @async
 * @function getAllCareers
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the list of Careers.
 * @throws {Error} In case an error occurs in the database query.
 */
export const getAllCarreras = async (req, res, next) => {

    try {
        const carreras = await Carreras.findAll();
        return successResponse(res, carreras);

    } catch (error) {
        next(error);
    }

}

/**
 * Gets the details of a specific career by its ID.
 *
 * @async
 * @function getCareer
 * @param {Object} req - The HTTP request, must contain the Career ID in the request body.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the details of the requested Career.
 * @throws {Error} If an error occurs when searching for the Career in the database.
 */
export const getCarrera = async (req, res, next ) => {
    const {id} = req.params;

    if(!id) return res.status(40).json({message:"the id is mandatory"})

    try {

        const carrera = await Carreras.findByPk(id);

        if(carrera == null) return res.status(404).json({message:"This Career is not found in the database, try another Career."})

        successResponse(res, carrera)
    } catch (error) {
        next(error)
    }
}

/**
 * Creates a new Career in the database.
 *
 * @async
 * @function createCareer
 * @param {Object} req - The HTTP request containing the request body with the new Career data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with the 201 status code and the success message with the created Career data.
 * @throws {Error} If there are missing fields in the request body or if an error occurs when creating the Career.
 */
export const createCarrera = async (req, res, next) => {
    const {nombre, semestres, facultad} = req.body;

    try {
        
        const createdCarrera = await Carreras.create({
            nombre, 
            semestres,
            facultad
        })

        successResponse(
            res,
            createdCarrera,
            "Successfully created career"
        )
    } catch (error) {
        next(error);
    }

    
}

/**
 * Update a career in the database.
 *
 * @async
 * @function createcareer
 * @param {Object} req - The HTTP request containing the request body and the request parameter with the new career data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with the 201 status code and the success message with the created career data.
 * @throws {Error} If there are missing fields in the request body or if an error occurs when creating the career.
 */
export const updateCarrera = async (req, res, next) => {
    const {id} = req.params;
    const {nombre, semestres, facultad} = req.body;

    if(!id) return res.status(40).json({message:"the id is mandatory"})


    try {
        const updateCarrera = await Carreras.findByPk(id)

        if(updateCarrera == null) return res.status(404).json({message:"This race is not found in the database, try another race."})

        updateCarrera.nombre = nombre;
        updateCarrera.semestre = semestres; 
        updateCarrera.facultad = facultad;

        updateCarrera.save();
        successResponse(res, updateCarrera, "Career Successfully Update");
    } catch (error) {
        next(error);
    }

}

