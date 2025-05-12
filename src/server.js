import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './database/database.js';
import { Carreras } from './models/index.js';



class Server {
    constructor() {
        this.app = express();
        this.middlewares();
        this.connectDB();
    }

    middlewares(){
        this.app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }))
        this.app.use(json());
        this.app.use(morgan('dev'));
        this.app.use(cookieParser())
    }



    async connectDB(){
        try {
            await sequelize.authenticate()
            console.info("DB connection successful :)");

            //Synchronize the models with the DB
            sequelize.sync();

           
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