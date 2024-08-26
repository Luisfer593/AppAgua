// models/tarifas.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conexion.js'; // Asegúrate de que la conexión a la base de datos esté configurada

export const Tarifas = sequelize.define('tarifas', {
  id_tarifa: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  tarifa_base: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tarifa_exceso: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    defaultValue: '9999-12-31', // Valor predeterminado para fechas futuras
  },
  monto_reconexion: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  monto_registro_socio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imagen_junta: {
    type: DataTypes.BLOB('long'), // BYTEA en PostgreSQL
  },
  imagen_sello: {
    type: DataTypes.BLOB('long'), // BYTEA en PostgreSQL
  },
  nombre_aplicacion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'tarifas',
});
