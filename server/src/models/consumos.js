// models/consumos.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conexion.js'; // Asegúrate de que la conexión a la base de datos esté configurada
import { Medidores } from './medidores.js'; // Importar el modelo `Medidores`

export const Consumos = sequelize.define('consumos', {
  id_consumo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_medidor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medidores, // Referencia al modelo `Medidores`
      key: 'id_medidor', // Clave primaria en el modelo `Medidores`
    },
    onDelete: 'CASCADE', // Cuando se elimina un medidor, también se eliminan los consumos asociados
  },
  lectura_anterior: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lectura_actual: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha_lectura: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'consumos',
});
