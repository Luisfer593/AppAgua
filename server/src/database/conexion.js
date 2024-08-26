import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'AppAgua', // Nombre de la base de datos
  'postgres',   // Nombre de usuario
  '123456',      // Contraseña
  {
    host: 'localhost', // Host de la base de datos
    dialect: 'postgres', // Dialecto de la base de datos
  }
);

export default sequelize;

// True: se regenera toda la base de datos
// False: se mantiene la base de datos actual
export const regenerarBD = false;
