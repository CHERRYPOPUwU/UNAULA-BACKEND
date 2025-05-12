import Usuario  from "../models/usuarios.model.js";
import { successResponse } from "../utils/responseHandler.js";


/**
 * Handles user login by verifying credentials and setting a cookie if successful.
 *
 * @async
 * @function login
 * @param {Object} req - HTTP request object containing `nombre` and `password` in the body.
 * @param {Object} res - HTTP response object used to return login status and messages.
 * @param {Function} next - Function to pass control to the next middleware in case of an error.
 * @returns {Object} JSON response indicating whether the login was successful or not.
 * @throws {Error} If an error occurs during database lookup or execution.
 */
export const login = async (req, res , next) => {
    const {nombre, password } = req.body;

    try {
        const usuario = await Usuario.findOne({
            where: {
                nombre
            }
        });

        if(!usuario){
            return res.status(400).json({ "login" : false, "message": "User not found"});
        }

        if(usuario.password !== password){
            return res.json({"login": false, "message": "Incorrect Password"})
        }
        console.log(nombre)
        res.cookie('token', nombre, {httpOnly: true,secure: true, sameSite: 'None'});
        return res.json({ "login": true});
    } catch (error) {
        next(error)
    }
}

/**
 * Creates a new user and stores the data in the database.
 *
 * @async
 * @function createUser
 * @param {Object} req - HTTP request object containing user data: `nombre`, `documento`, `password`, and `rol`.
 * @param {Object} res - HTTP response object used to return success message and created user data.
 * @param {Function} next - Function to pass control to the next middleware in case of an error.
 * @returns {Object} JSON response with the newly created user and success message.
 * @throws {Error} If an error occurs during user creation.
 */
export const createUser = async (req, res, next) => {
    const {nombre, documento, password, rol} = req.body;

    try {
        const createdUser = await Usuario.create({
            nombre,
            documento, 
            password,
            rol
        });

        successResponse(res, createdUser,"User successfully created");

    } catch (error) {
        next(error);
    }
}
