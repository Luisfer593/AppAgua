// controllers/medidores.controller.js
import MedidoresService from '../services/medidores.service.js';  // Importar el servicio

// Obtener todos los medidores
export const getMedidores = async (req, res) => {
  try {
    const medidores = await MedidoresService.getMedidores();
    res.status(200).json(medidores);
  } catch (error) {
    console.error("Error al obtener los medidores:", error);
    res.status(500).json({ error: "Error al obtener los medidores" });
  }
};

// Obtener un medidor por ID
export const getMedidorById = async (req, res) => {
  try {
    const { id } = req.params;
    const medidor = await MedidoresService.getMedidorById(id);
    res.status(200).json(medidor);
  } catch (error) {
    console.error("Error al obtener el medidor:", error);
    res.status(500).json({ error: "Error al obtener el medidor" });
  }
};

// Crear un nuevo medidor
export const createMedidor = async (req, res) => {
  try {
    const { codigo_medidor, ubicacion_medidor, id_cliente } = req.body;
    const nuevoMedidor = await MedidoresService.createMedidor({ codigo_medidor, ubicacion_medidor, id_cliente });
    res.status(201).json(nuevoMedidor);
  } catch (error) {
    console.error("Error al crear el medidor:", error);
    res.status(500).json({ error: "Error al crear el medidor" });
  }
};

// Actualizar un medidor por ID
export const updateMedidor = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo_medidor, ubicacion_medidor, id_cliente } = req.body;
    const medidorActualizado = await MedidoresService.updateMedidor(id, { codigo_medidor, ubicacion_medidor, id_cliente });
    res.status(200).json(medidorActualizado);
  } catch (error) {
    console.error("Error al actualizar el medidor:", error);
    res.status(500).json({ error: "Error al actualizar el medidor" });
  }
};

// Eliminar un medidor por ID
export const deleteMedidor = async (req, res) => {
  try {
    const { id } = req.params;
    await MedidoresService.deleteMedidor(id);
    res.status(204).json({ message: 'Medidor eliminado' });
  } catch (error) {
    console.error("Error al eliminar el medidor:", error);
    res.status(500).json({ error: "Error al eliminar el medidor" });
  }
};
