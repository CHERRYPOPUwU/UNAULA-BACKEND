import Asesores from "../models/asesores.model.js";
import FechaAsesoria from "../models/fechaAsesoria.model.js";
import Proyectos from "../models/proyectos.model.js";
import { successResponse } from "../utils/responseHandler.js";


/**
 * Gets all available consulting dates.
 *
 * @async
 * @function getAllAdvisoryDate
 * @param {Object} req - HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in the event of an error.
 * @returns {Object} Response with status code 200 and the list of advisory dates.
 * @throws {Error} In case an error occurs in the database query.
 */
export const getAllFechaAsesoria = async (req, res, next) => {
    try {
        const allFechaAsesoria = await FechaAsesoria.findAll({
            include: [
                { model: Asesores, attributes: ["nombre"], as: "asesor" },
                { model: Proyectos, attributes: ["nombre"] },
            ]
        });


        let allData = allFechaAsesoria.map(data => {
            return formatFechaAsesoria(data);
        }
        );
        successResponse(res, allData);
    } catch (error) {
        next(error);
    }
};


/**
 * Create a new consulting date in the database.
 *
 * @async
 * @function createAdvisoryDate
 * @param {Object} req - The HTTP request containing the request body with the data of the new advisory date.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in the event of an error.
 * @returns {Object} response with the 201 status code and the success message with the created advisory date data.
 * @throws {Error} If fields are missing in the request body or if an error occurs when creating the advisory date.
 */
export const createFechaAsesoria = async (req, res, next) => {
    const { fecha, hora, id_proyecto, id_asesor } = req.body;

    try {
        const existAsesor = await Asesores.findByPk(id_asesor);
        if (!existAsesor) return res.status(404).json({ message: "The consultant does not exist, select another one" });

        const existProject = await Proyectos.findByPk(id_proyecto);
        if (!existProject) return res.status(404).json({ message: "The project does not exist, select another one" });

        if (existProject.id_asesor !== id_asesor) {
            return res.status(400).json({ message: "The consultant is not assigned to this project" });
        }

        const fechaHoy = new Date();
        const fechaAsesoria = new Date(fecha);
        fechaHoy.setHours(0, 0, 0, 0);
        fechaAsesoria.setHours(0, 0, 0, 0);

        if (fechaAsesoria < fechaHoy) {
            return res.status(400).json({ message: "The consulting date cannot be earlier than today." });
        }

        const createdFechaAsesoria = await FechaAsesoria.create({
            fecha,
            hora,
            id_proyecto,
            id_asesor
        })

        successResponse(
            res,
            createdFechaAsesoria,
            "Successfully created advisory date"
        )
    } catch (error) {
        next(error);
    }


}

/**
 * Update an advisory date in the database.
 *
 * @async
 * @function updateAdvisoryDate
 * @param {Object} req - The HTTP request containing the request body and the request parameter with the new advisory date data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} response with the 201 status code and the success message with the updated advisory date data.
 * @throws {Error} If there are missing fields in the request body or if an error occurs when updating the advisory date.
 */
export const updateFechaAsesoria = async (req, res, next) => {
    const { id } = req.params;
    const { fecha, hora, id_proyecto, id_asesor } = req.body;


    if (!id) return res.status(40).json({ message: "the id is mandatory" })

    try {

        const updatedFechaAsesoria = await FechaAsesoria.findByPk(id)

        if (updatedFechaAsesoria == null) return res.status(404).json({ message: "This consulting date is not found in the database, try another one." })

        const existAsesor = await Asesores.findByPk(id_asesor);
        if (!existAsesor) return res.status(404).json({ message: "The consultant does not exist, select another one" });

        const existProject = await Proyectos.findByPk(id_proyecto);
        if (!existProject) return res.status(404).json({ message: "The project does not exist, select another one" });

        if (existProject.id_asesor !== id_asesor) {
            return res.status(400).json({ message: "The consultant is not assigned to this project" });
        }

        const fechaHoy = new Date();
        const fechaAsesoria = new Date(fecha);
        fechaHoy.setHours(0, 0, 0, 0);
        fechaAsesoria.setHours(0, 0, 0, 0);

        if (fechaAsesoria < fechaHoy) {
            return res.status(400).json({ message: "The consulting date cannot be earlier than today." });
        }

        updatedFechaAsesoria.fecha = fecha;
        updatedFechaAsesoria.hora = hora;
        updatedFechaAsesoria.id_proyecto = id_proyecto;
        updatedFechaAsesoria.id_asesor = id_asesor;

        await updatedFechaAsesoria.save();
        successResponse(res, updatedFechaAsesoria, "Date of assessment successfully updated");
    } catch (error) {
        next(error);
    }

}

function formatFechaAsesoria(data) {
    return {
        ...data.toJSON(),
        asesor: data.asesor.nombre,
        proyecto: data.proyecto.nombre
    }
}