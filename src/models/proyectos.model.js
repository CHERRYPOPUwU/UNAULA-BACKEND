import DataTypes from 'sequelize';
import sequelize from '../database/database.js';

const Proyectos = sequelize.define(
  "proyectos",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tema: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('Aprobado', 'En proceso'),
      allowNull: false,
    },
    id_asesor: {
      type: DataTypes.INTEGER,
      references: {
        model: "Asesores",
        key: "id",
      },
    },
  },
  {
    tableName: "proyectos",
    timestamps: false,
  }
);

export default Proyectos;