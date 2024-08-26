import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conexion.js';

export const Logins = sequelize.define('logins', {
  id_login: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id_usuario',
    },
    onDelete: 'CASCADE',  // Elimina los registros de login asociados cuando se borra el usuario
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: false,  // Desactiva la creación automática de campos `createdAt` y `updatedAt`
  tableName: 'logins',  // Asegura que el nombre de la tabla sea exactamente 'logins'
});

