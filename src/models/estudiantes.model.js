import DataTypes from 'sequelize';
import sequelize from '../database/database.js';

const Estudiantes = sequelize.define('estudiantes', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    matriculado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: 'proyectos',
            key: 'id'
        }
    },
    id_carrera: {
        type: DataTypes.INTEGER,
        references: {
            model: 'carrera',
            key: 'id'
        }
    }
}, {
    tableName: 'estudiantes', 
    timestamps: false
});

export default Estudiantes;
