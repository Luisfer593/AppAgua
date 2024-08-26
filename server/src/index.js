import app from "./app.js";
import { regenerarBD, sequelize } from "./database/conexion.js";

if (regenerarBD) {
  // Importar modelos
  import('./models/usuarios.js');
  import('./models/clientes.js');
  import('./models/medidores.js');
  import('./models/consumos.js');
  import('./models/logins.js');
  import('./models/tarifas.js');
  import('./models/pagos.js');
}

async function main() {
  try {
    // Sincronizar la base de datos
    await sequelize.sync({ force: regenerarBD });
    // Iniciar el servidor
    app.listen(4000, () => {
      console.log("Serviidor escuchando en el puerto 4000");
    });
  } catch (error) {
    console.log("error al conectar a la base de datos:", error);
  }
}

main();
