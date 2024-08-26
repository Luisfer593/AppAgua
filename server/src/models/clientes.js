import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conexion.js';  // Asegúrate de que la conexión a la base de datos esté configurada
import { Usuarios } from './usuarios.js';  // Importar el modelo `Usuarios`

export const Clientes = sequelize.define('clientes', {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  codigo_cliente: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  direccion_cliente: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  telefono_cliente: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email_cliente: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Usuarios,
      key: 'id_usuario',
    },
    onDelete: 'SET NULL',  // Cuando se elimina un usuario, el campo `id_usuario` se establece en NULL
  },
}, {
  timestamps: false,
  tableName: 'clientes',
});
