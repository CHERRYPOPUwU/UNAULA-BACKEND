import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './database/database.js';
import { Carreras, Asesores, Proyectos, Estudiantes, FechaAsesoria, Usuario } from './models/index.js';
import {carreraRouter, asesoresRoutes, proyectosRoutes, estudiantesRouter, fechaAsesoriaRouter, informesRouter, usuariosRouter}  from './routes/index.js';



class Server {
    constructor() {
        this.app = express();
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    middlewares(){
        const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];
        this.app.use(cors({
            origin: function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                } else {
                    return callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }))
        this.app.use(json());
        this.app.use(morgan('dev'));
        this.app.use(cookieParser())
    }

    routes(){
        this.app.use("/api/carreras", carreraRouter);
        this.app.use("/api/asesores", asesoresRoutes);
        this.app.use("/api/proyectos", proyectosRoutes);
        this.app.use("/api/estudiantes", estudiantesRouter);
        this.app.use("/api/fechaAsesoria", fechaAsesoriaRouter);
        this.app.use("/api/informes", informesRouter);
        this.app.use("/api/usuarios", usuariosRouter);

        this.app.use((err, req, res, next) => { 
            console.log("This is the current error: ", err);
            return res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
        });
    }

    async connectDB(){
        try {
            await sequelize.authenticate()
            console.info("DB connection successful :)");

            //Synchronize the models with the DB
            sequelize.sync();

            //Relaciones entre los modelos
            Proyectos.belongsTo(Asesores, { foreignKey: "id_asesor"});
            Asesores.hasMany(Proyectos, { foreignKey: "id_asesor" });
            Estudiantes.belongsTo(Proyectos, {foreignKey: "id_proyecto"});
            Proyectos.hasMany(Estudiantes, {foreignKey: "id_proyecto"});
            Estudiantes.belongsTo(Carreras, {foreignKey: "id_carrera"});
            Carreras.hasMany(Estudiantes, {foreignKey: "id_carrera"});
            FechaAsesoria.belongsTo(Proyectos, { foreignKey: "id_proyecto" });
            Proyectos.hasMany(FechaAsesoria, { foreignKey: "id_proyecto" });
            FechaAsesoria.belongsTo(Asesores, {as: "asesor", foreignKey: "id_asesor" });
            Asesores.hasMany(FechaAsesoria, { foreignKey: "id_asesor" });
        } catch (error) {
            console.error("Could not connect to the DB because of the error:", error.message);
        }
    }

    listen(){
        this.app.listen(3000, ()=>{
            console.log("Application running successfully", process.env.PORT);
        })
    }
}

export default Server;