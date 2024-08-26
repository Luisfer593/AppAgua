import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conexion.js';  // Asegúrate de que la conexión a la base de datos esté configurada

export const Usuarios = sequelize.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  fecha_registro: {
    type: DataTypes.DATEONLY,  // Cambiado a DATEONLY para que coincida con el tipo DATE en SQL
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Se mantiene el valor predeterminado
  },
  rol: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Administrador', 'Tesorera', 'Cliente']], // Validación para asegurar que el rol está dentro de los valores permitidos
    },
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'usuarios',
});
