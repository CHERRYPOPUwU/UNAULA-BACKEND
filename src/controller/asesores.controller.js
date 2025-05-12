import { successResponse } from "../utils/responseHandler.js";
import Asesores from "../models/asesores.model.js";

/**
 * Gets all available consultants.
 * 
 * @async
 * @function getAllAssessors
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the list of advisors.
 * @throws {Error} In case an error occurs in the database query.
 */
export const getAllAsesores = async (req, res, next) => {
    try {
        const allAsesores = await Asesores.findAll();

        successResponse(res, allAsesores);
    } catch (error) {
        next(error);
    }
}

/**
 * Gets the details of a specific consultant by ID.
 * 
 * @async
 * @function getAdvisor
 * @param {Object} req - The HTTP request, must contain the advisor ID in the request body.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the details of the requested advisor.
 * @throws {Error} If an error occurs when searching for the advisor in the database.
 */
export const getAsesor = async (req, res , next) => {
    const {id} = req.params;

    if(!id) return res.status(40).json({message:"the id is mandatory"})

    try {

        const asesor = await Asesores.findByPk(id);

        if(asesor == null) return res.status(404).json({message:"This consultant is not in the database, try another one!"})

        successResponse(res, asesor)
    } catch (error) {
        next(error)
    }
}

/**
 * Create a new consultant in the database.
 *
 * @async
 * @function createAdvisor
 * @param {Object} req - The HTTP request containing the request body with the new advisor's data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with the 201 status code and the success message with the created advisor data.
 * @throws {Error} If fields are missing in the request body or if an error occurs when creating the advisor.
 */
export const createAsesor = async (req, res, next) => {
    const {nombre, especialidad, celular} = req.body;

    try {
        
        const createdAsesor = await Asesores.create({
            nombre, 
            especialidad,
            celular
        })

        successResponse(
            res,
            createdAsesor,
            "Successfully created consultant"
        )
    } catch (error) {
        next(error);
    }

    
}

/**
 * Update an Advisor in the database.
 *
 * @async
 * @function createAdvisor
 * @param {Object} req - The HTTP request containing the body and parameter of the request with the new advisor's data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with the 201 status code and the success message with the created advisor data.
 * @throws {Error} If fields are missing in the request body or if an error occurs when creating the advisor.
 */
export const updateAsesor = async (req, res, next) => {
    const {id} = req.params;
    const {nombre, especialidad, celular} = req.body;

    if(!id) return res.status(40).json({message:"the id is mandatory"})


    try {
        const updatedAsesor = await Asesores.findByPk(id)

        if(updatedAsesor == null) return res.status(404).json({message:"This consultant is not found in the database, try another one"})

        updatedAsesor.nombre = nombre;
        updatedAsesor.especialidad = especialidad; 
        updatedAsesor.celular = celular;

        updatedAsesor.save();
        successResponse(res, updatedAsesor, "Advisor Successfully Update");
    } catch (error) {
        next(error);
    }

} 