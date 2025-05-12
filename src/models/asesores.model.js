import sequelize from "../database/database.js";
import DataTypes from 'sequelize';

const Asesores = sequelize.define('asesores', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
}, {
    tableName: 'asesores',
    timestamps: false
});

export default Asesores;