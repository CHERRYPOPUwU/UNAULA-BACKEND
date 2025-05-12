import PDFDocument  from 'pdfkit';
import Proyectos from '../models/proyectos.model.js';
import Asesores from '../models/asesores.model.js';
import Estudiantes from '../models/estudiantes.model.js';
import FechaAsesoria from '../models/fechaAsesoria.model.js';
import Carreras from '../models/carreras.model.js';


/**
 * Generates a PDF report of a specific project and returns it as a downloadable response.
 *
 * @async
 * @function generateProjectReport
 * @param {Object} req - HTTP request object, expects the project ID in `req.params.id`.
 * @param {Object} res - HTTP response object used to send back the PDF file.
 * @returns {Object} PDF file with status 200 or error message with appropriate status code.
 * @throws {Error} If the project is not found or if an error occurs while generating the PDF.
 */
export const generateProjectReport = async (req, res) => {
    const { id } = req.params;

    try {
        // Obtain the project and its relationships
        const proyecto = await Proyectos.findByPk(id,{
            include: [
                { model: Asesores },
                { model: Estudiantes, include: [Carreras] },
                { model: FechaAsesoria }
            ]
        });

        if (!proyecto) {
            return res.status(404).json({ mensaje: "Proyecto no encontrado" });
        }

        // Generate the PDF and return it as a response
        const pdfBuffer = await generarInformePDF(proyecto);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=informe_proyecto_${id}.pdf`);
        res.send(pdfBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al generar el informe" });
    }
};


/**
 * Generates a PDF document from the project data.
 *
 * @function generarInformePDF
 * @param {Object} proyecto - The project object including related asesor, estudiantes, and fechas.
 * @returns {Promise<Buffer>} A Promise that resolves with a buffer containing the generated PDF.
 * @throws {Error} If an error occurs during PDF generation.
 */
export function generarInformePDF(proyecto) {
    return new Promise((resolve, reject) => {
        proyecto = proyecto.toJSON();
        const doc = new PDFDocument();
    
        // Convert PDF to a buffer and return
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
    
        // Título y datos principales del proyecto
        doc.fontSize(20).text(`Informe del Proyecto: ${proyecto.nombre}`, { align: 'center' });
        doc.fontSize(12).text(`Tipo: ${proyecto.tipo}`);
        doc.text(`Tema: ${proyecto.tema}`);
        doc.text(`Estado: ${proyecto.estado}`);
    
        // Title and main data of the project
        doc.moveDown();
        doc.text(`Asesor: ${proyecto.asesore.nombre} - Especialidad: ${proyecto.asesore.especialidad}`);
    
        // Student information
        doc.moveDown();
        doc.fontSize(14).text("Estudiantes:");
        proyecto.estudiantes.forEach(estudiante => {
            doc.fontSize(12).text(`- ${estudiante.nombre} ${estudiante.apellidos} (${estudiante.carrera.nombre})  - Celular: (${estudiante.celular})`);
        });
    
        // Consulting dates
        doc.moveDown();
        doc.fontSize(14).text("Fechas de Asesoría:");
        proyecto.fecha_asesoria.forEach(fecha => {
            doc.fontSize(12).text(`- ${fecha.fecha} a las ${fecha.hora}`);
        });
    
        // Finalize and return PDF as a buffer
        doc.end();
        return new Promise((resolve) => doc.on('end', () => resolve(Buffer.concat(buffers))));
    })
}