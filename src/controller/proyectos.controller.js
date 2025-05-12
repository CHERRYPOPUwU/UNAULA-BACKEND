import Asesores from "../models/asesores.model.js";
import Estudiantes from "../models/estudiantes.model.js";
import Proyectos from "../models/proyectos.model.js";
import { successResponse } from "../utils/responseHandler.js";

/**
 * Gets all available projects.
 *
 * @async
 * @function getAllProjects
 * @ @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the list of projects.
 * @throws {Error} In case an error occurs in the database query.
 */
export const getAllProjects = async (req, res, next) => {
    try {
        const allProjects = await Proyectos.findAll({
            include: [
                { model: Asesores, attributes: ["nombre"] },
            ]
        });
        let allProjectsFormat = allProjects.map(project => formatProject(project));

        successResponse(res, allProjectsFormat);

    } catch (error) {
        next(error);
    }
}

/**
 * Gets the details of a specific project by its ID.
 *
 * @async
 * @function getProject
 * @param {Object} req - The HTTP request, must contain the project ID in the request body.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} Response with status code 200 and the details of the requested project.
 * @throws {Error} If an error occurs when searching for the project in the database.
 */
export const getProject = async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(40).json({ message: "the id is required" })

    try {

        const project = await Proyectos.findByPk(id,{
            include: [
                { model: Asesores, attributes: ["nombre"] },
            ]
        });

        if (project == null) return res.status(404).json({ message: "This project is not in the database, try another one!" })

        const estudiantesAsociados = await Estudiantes.findAll({
            where: { "id_proyecto": id },
            attributes: ['id', 'nombre']
        })

        let projectFormat = formatProject(project);
        projectFormat.estudiantes = estudiantesAsociados.length ? estudiantesAsociados : "No students assigned"
        
        successResponse(res, projectFormat)
    } catch (error) {
        next(error)
    }
}

export const getAllIncompletProject = async (req, res, next) => {

    const incompleteProjects = await Proyectos.findAll({
        include: [
            { model: Estudiantes, attributes: ['id', "nombre"], },
            { model: Asesores, attributes: ["nombre"] }
        ]
    });

    const incompleteProjectsFiltered = incompleteProjects.map(project => {
        const studentsCount = project.estudiantes.length;
        project = formatProject(project);
        project.numeroEstudiantes = studentsCount;
        return project;
    }).filter(project => project.numeroEstudiantes < 3);

    successResponse(res, incompleteProjectsFiltered);
}

/**
 * Create a new project in the database.
 *
 * @async
 * @function createProject
 * @param {Object} req - The HTTP request containing the request body with the new project data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} response with the 201 status code and the success message with the project data created.
 * @throws {Error} If fields are missing in the request body or if an error occurs when creating the project.
 */
export const createProject = async (req, res, next) => {
    const { nombre, tipo, tema, estado, id_asesor } = req.body;

    try {
        const existAsesor = await Asesores.findByPk(id_asesor);

        if (!existAsesor) return res.status(404).json({ message: "The consultant does not exist, select another one" });

        const createdProject = await Proyectos.create({
            nombre,
            tipo,
            tema,
            estado,
            id_asesor
        })

        successResponse(
            res,
            createdProject,
            "Project successfully created"
        )
    } catch (error) {
        next(error);
    }


}

/**
 * Update a project in the database.
 *
 * @async
 * @function updateProject
 * @param {Object} req - The HTTP request containing the request body and the request parameter with the new project data.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - The function to pass control to the next middleware in case of error.
 * @returns {Object} response with the 201 status code and the success message with the updated project data.
 * @throws {Error} If fields are missing in the request body or if an error occurs while updating the project.
 */
export const updateProject = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, tipo, tema, estado, id_asesor } = req.body;

    if (!id) return res.status(40).json({ message: "the id is mandatory" })

    try {

        const updatedProject = await Proyectos.findByPk(id)

        if (updatedProject == null) return res.status(404).json({ message: "This Project is not found in the database, try with another one" })

        const existAsesor = await Asesores.findByPk(id_asesor);

        if (!existAsesor) return res.status(404).json({ message: "The consultant does not exist, select another one" });

        updatedProject.nombre = nombre;
        updatedProject.tipo = tipo;
        updatedProject.tema = tema;
        updatedProject.estado = estado;
        updatedProject.id_asesor = id_asesor;

        await updatedProject.save();
        successResponse(res, updatedProject, "Project successfully implemented");
    } catch (error) {
        next(error);
    }

}

function formatProject(data) {
    data = {
        ...data.toJSON(),
        asesor: data.asesore.nombre
    }
    delete data.asesore;
    return data;
}