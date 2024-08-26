// controllers/tarifas.controller.js
import TarifaService from '../services/tarifas.service.js'; // Importar el servicio de tarifas

// Crear una nueva tarifa
export const createTarifa = async (req, res) => {
  try {
    const { tarifa_base, tarifa_exceso, fecha_inicio, fecha_fin, monto_reconexion, monto_registro_socio, imagen_junta, nombre_aplicacion } = req.body;
    const nuevaTarifa = await TarifaService.createTarifa({
      tarifa_base,
      tarifa_exceso,
      fecha_inicio,
      fecha_fin,
      monto_reconexion,
      monto_registro_socio,
      imagen_junta,
      nombre_aplicacion
    });
    res.status(201).json(nuevaTarifa);
  } catch (error) {
    console.error("Error al crear la tarifa:", error);
    res.status(500).json({ error: "Error al crear la tarifa" });
  }
};

// Obtener todas las tarifas
export const getTarifas = async (req, res) => {
  try {
    const tarifas = await TarifaService.getTarifas();
    res.status(200).json(tarifas);
  } catch (error) {
    console.error("Error al obtener las tarifas:", error);
    res.status(500).json({ error: "Error al obtener las tarifas" });
  }
};

// Obtener una tarifa por ID
export const getTarifaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarifa = await TarifaService.getTarifaById(id);
    if (tarifa) {
      res.status(200).json(tarifa);
    } else {
      res.status(404).json({ error: "Tarifa no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la tarifa:", error);
    res.status(500).json({ error: "Error al obtener la tarifa" });
  }
};

// Actualizar una tarifa por ID
export const updateTarifa = async (req, res) => {
  try {
    const { id } = req.params;
    const { tarifa_base, tarifa_exceso, fecha_inicio, fecha_fin, monto_reconexion, monto_registro_socio, imagen_junta, nombre_aplicacion } = req.body;
    const tarifaActualizada = await TarifaService.updateTarifa(id, {
      tarifa_base,
      tarifa_exceso,
      fecha_inicio,
      fecha_fin,
      monto_reconexion,
      monto_registro_socio,
      imagen_junta,
      nombre_aplicacion
    });
    if (tarifaActualizada) {
      res.status(200).json(tarifaActualizada);
    } else {
      res.status(404).json({ error: "Tarifa no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar la tarifa:", error);
    res.status(500).json({ error: "Error al actualizar la tarifa" });
  }
};

// Eliminar una tarifa por ID
export const deleteTarifa = async (req, res) => {
  try {
    const { id } = req.params;
    await TarifaService.deleteTarifa(id);
    res.status(204).send(); // Cambio aquí: 204 No Content para eliminación exitosa
  } catch (error) {
    console.error("Error al eliminar la tarifa:", error);
    res.status(500).json({ error: "Error al eliminar la tarifa" });
  }
};
