// models/pagos.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conexion.js'; // Asegúrate de que la conexión a la base de datos esté configurada
import { Medidores } from './medidores.js'; // Importar el modelo `Medidores`

export const Pagos = sequelize.define('pagos', {
  id_pago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  id_medidor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medidores,
      key: 'id_medidor',
    },
    onDelete: 'CASCADE',
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nombre_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nombre_tesorera: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado_pago: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Pagado', 'Pendiente', 'Mora']],
    },
  },
  lectura_anterior: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lectura_actual: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  consumo_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  exceso: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  firma_tesorera: {
    type: DataTypes.BLOB('long'), // BYTEA en PostgreSQL
  },
  numero_comprobante: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'pagos',
});
