// services/tarifas.service.js
import { Tarifas } from '../models/tarifas.js'; // Importar el modelo de Tarifas

// Validaciones
const validateTarifaData = (data) => {
  const { tarifa_base, tarifa_exceso, monto_reconexion, monto_registro_socio } = data;

  if (tarifa_base <= 0) {
    throw new Error('La tarifa base debe ser mayor a 0.');
  }

  if (tarifa_exceso < 0) {
    throw new Error('La tarifa de exceso no puede ser negativa.');
  }

  if (monto_reconexion < 0) {
    throw new Error('El monto de reconexión no puede ser negativo.');
  }

  if (monto_registro_socio < 0) {
    throw new Error('El monto de registro de socio no puede ser negativo.');
  }
};

class TarifaService {
  // Obtener todas las tarifas
  static async getTarifas() {
    try {
      return await Tarifas.findAll();
    } catch (error) {
      throw new Error(`Error al obtener tarifas: ${error.message}`);
    }
  }

  // Obtener una tarifa por ID
  static async getTarifaById(id) {
    try {
      const tarifa = await Tarifas.findByPk(id);
      if (!tarifa) {
        throw new Error('Tarifa no encontrada');
      }
      return tarifa;
    } catch (error) {
      throw new Error(`Error al obtener la tarifa: ${error.message}`);
    }
  }

  // Crear una nueva tarifa
  static async createTarifa(data) {
    try {
      validateTarifaData(data);
      const tarifa = await Tarifas.create(data);
      return tarifa;
    } catch (error) {
      throw new Error(`Error al crear la tarifa: ${error.message}`);
    }
  }

  // Actualizar una tarifa existente
  static async updateTarifa(id, data) {
    try {
      validateTarifaData(data);
      const tarifa = await Tarifas.findByPk(id);
      if (!tarifa) {
        throw new Error('Tarifa no encontrada');
      }
      await tarifa.update(data);
      return tarifa;
    } catch (error) {
      throw new Error(`Error al actualizar la tarifa: ${error.message}`);
    }
  }

  // Eliminar una tarifa
  static async deleteTarifa(id) {
    try {
      const tarifa = await Tarifas.findByPk(id);
      if (!tarifa) {
        throw new Error('Tarifa no encontrada');
      }
      await tarifa.destroy();
      return { message: 'Tarifa eliminada' };
    } catch (error) {
      throw new Error(`Error al eliminar la tarifa: ${error.message}`);
    }
  }
}

export default TarifaService;
