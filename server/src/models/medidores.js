// models/medidores.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conexion.js';
import { Clientes } from './clientes.js'; // Importar el modelo `Clientes`

export const Medidores = sequelize.define('medidores', {
  id_medidor: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  codigo_medidor: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  ubicacion_medidor: {
    type: DataTypes.STRING(255),
  },
  fecha_instalacion: {
    type: DataTypes.DATE,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Clientes,
      key: 'id_cliente',
    },
    onDelete: 'SET NULL', // Cuando se elimina un cliente, se establece el valor de id_cliente en NULL
  },
}, {
  timestamps: false,
  tableName: 'medidores',
});
