import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import usuariosRoutes from "./routes/usuarios.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import medidoresRoutes from "./routes/medidores.routes.js";
import consumosRoutes from "./routes/consumos.routes.js";
import loginsRoutes from "./routes/logins.routes.js";
import tarifasRoutes from "./routes/tarifas.routes.js";
import pagosRoutes from "./routes/pagos.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware de registro para verificar los parámetros de la URL
app.use((req, res, next) => {
  console.log('URL:', req.url);
  console.log('Parámetros:', req.params);
  next();
});

// Ruta de estado
app.get('/status', (req, res) => {
  res.json({ status: 'OK' });
});

// Aquí puedes agregar más rutas o lógica específica
app.get('/test', (req, res) => {
  res.send('Ruta de prueba funciona');
});

// Routes
app.use('/usuarios', usuariosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/medidores', medidoresRoutes);
app.use('/consumos', consumosRoutes);
app.use('/logins', loginsRoutes);
app.use('/tarifas', tarifasRoutes);
app.use('/pagos', pagosRoutes);

export default app;
