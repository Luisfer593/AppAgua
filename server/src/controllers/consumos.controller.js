// controllers/consumos.controller.js
import ConsumosService from '../services/consumos.service.js'; // Importar el servicio

// Crear un nuevo consumo
export const createConsumo = async (req, res) => {
  try {
    const { id_medidor, lectura_anterior, lectura_actual, fecha_lectura } = req.body;
    const nuevoConsumo = await ConsumosService.createConsumo({
      id_medidor,
      lectura_anterior,
      lectura_actual,
      fecha_lectura,
    });
    res.status(201).json(nuevoConsumo);
  } catch (error) {
    console.error("Error al crear el consumo:", error);
    res.status(500).json({ error: "Error al crear el consumo" });
  }
};

// Obtener todos los consumos
export const getConsumos = async (req, res) => {
  try {
    const consumos = await ConsumosService.getConsumos();
    res.status(200).json(consumos);
  } catch (error) {
    console.error("Error al obtener los consumos:", error);
    res.status(500).json({ error: "Error al obtener los consumos" });
  }
};

// Obtener un consumo por ID
export const getConsumoId = async (req, res) => {
  try {
    const { id } = req.params;
    const consumo = await ConsumosService.getConsumoById(id);
    res.status(200).json(consumo);
  } catch (error) {
    console.error("Error al obtener el consumo:", error);
    res.status(500).json({ error: "Error al obtener el consumo" });
  }
};

// Actualizar un consumo por ID
export const updateConsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_medidor, lectura_anterior, lectura_actual, fecha_lectura } = req.body;
    const consumoActualizado = await ConsumosService.updateConsumo(id, {
      id_medidor,
      lectura_anterior,
      lectura_actual,
      fecha_lectura,
    });
    res.status(200).json(consumoActualizado);
  } catch (error) {
    console.error("Error al actualizar el consumo:", error);
    res.status(500).json({ error: "Error al actualizar el consumo" });
  }
};

// Eliminar un consumo por ID
export const deleteConsumo = async (req, res) => {
  try {
    const { id } = req.params;
    await ConsumosService.deleteConsumo(id);
    res.status(204).json();
  } catch (error) {
    console.error("Error al eliminar el consumo:", error);
    res.status(500).json({ error: "Error al eliminar el consumo" });
  }
};
