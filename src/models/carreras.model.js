import DataTypes from 'sequelize';
import sequelize from '../database/database.js';

const Carreras = sequelize.define(
    "carreras",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        semestres: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        facultad: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },{
        tablename: "carreras",
        timestamps: false
    }
);

export default Carreras;