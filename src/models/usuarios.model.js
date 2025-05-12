import DataTypes from 'sequelize';
import sequelize from '../database/database.js';

const Usuario = sequelize.define(
  "usuarios",
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
    documento: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('Estudiante', 'Profesor', 'Asesor', 'Administrativo'),
      allowNull: false,
    }
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Usuario;