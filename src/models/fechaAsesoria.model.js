import DataTypes from 'sequelize';
import sequelize from '../database/database.js';

const FechaAsesoria = sequelize.define('fecha_asesoria', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Proyectos',
            key: 'id'
        }
    },
    id_asesor: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Asesores',
            key: 'id'
        }
    }
}, {
    tableName: 'fecha_asesoria',
    timestamps: false
});

export default FechaAsesoria;
