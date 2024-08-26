// services/consumos.service.js
import { Consumos } from '../models/consumos.js'; // Importar el modelo de Consumos
import { Medidores } from '../models/medidores.js'; // Importar el modelo de Medidores
import { Tarifas } from '../models/tarifas.js'; // Importar el modelo de Tarifas

class ConsumosService {
  // Validaciones
  static validateConsumoData(data) {
    const { id_medidor, lectura_anterior, lectura_actual } = data;

    if (lectura_actual <= lectura_anterior) {
      throw new Error('La lectura actual debe ser mayor a la lectura anterior.');
    }

    if (!id_medidor) {
      throw new Error('El id del medidor es obligatorio.');
    }
  }

  // Calcular el costo de consumo
  static async calculateCostos(lectura_anterior, lectura_actual) {
    try {
      // Obtener la tarifa actual
      const tarifas = await Tarifas.findOne({
        order: [['fecha_inicio', 'DESC']], // Obtener la tarifa más reciente
      });

      if (!tarifas) {
        throw new Error('Tarifa no encontrada.');
      }

      const consumo_total = lectura_actual - lectura_anterior;
      const tarifa_base = tarifas.tarifa_base;
      const tarifa_exceso = tarifas.tarifa_exceso;

      let exceso = 0;
      let total = 0;

      if (consumo_total > tarifa_base) {
        exceso = consumo_total - tarifa_base;
        total = tarifa_base * tarifa_base + exceso * tarifa_exceso;
      } else {
        total = consumo_total * tarifa_base;
      }

      return { consumo_total, exceso, total };
    } catch (error) {
      throw new Error(`Error al calcular los costos: ${error.message}`);
    }
  }

  // Crear un nuevo consumo
  static async createConsumo(data) {
    try {
      this.validateConsumoData(data);

      const medidor = await Medidores.findByPk(data.id_medidor);
      if (!medidor) {
        throw new Error('Medidor no encontrado');
      }

      const costos = await this.calculateCostos(data.lectura_anterior, data.lectura_actual);

      const consumo = await Consumos.create({
        ...data,
        consumo_total: costos.consumo_total,
        exceso: costos.exceso,
        total: costos.total,
      });

      // Actualizar el estado del medidor
      await medidor.update({
        lectura_actual: data.lectura_actual,
      });

      return consumo;
    } catch (error) {
      throw new Error(`Error al crear el consumo: ${error.message}`);
    }
  }

  // Actualizar un consumo existente
  static async updateConsumo(id, data) {
    try {
      this.validateConsumoData(data);

      const consumo = await Consumos.findByPk(id);
      if (!consumo) {
        throw new Error('Consumo no encontrado');
      }

      const costos = await this.calculateCostos(data.lectura_anterior, data.lectura_actual);

      await consumo.update({
        ...data,
        consumo_total: costos.consumo_total,
        exceso: costos.exceso,
        total: costos.total,
      });

      // Actualizar el estado del medidor
      const medidor = await Medidores.findByPk(data.id_medidor);
      await medidor.update({
        lectura_actual: data.lectura_actual,
      });

      return consumo;
    } catch (error) {
      throw new Error(`Error al actualizar el consumo: ${error.message}`);
    }
  }

  // Obtener todos los consumos
  static async getConsumos() {
    try {
      return await Consumos.findAll();
    } catch (error) {
      throw new Error(`Error al obtener consumos: ${error.message}`);
    }
  }

  // Obtener un consumo por ID
  static async getConsumoById(id) {
    try {
      const consumo = await Consumos.findByPk(id);
      if (!consumo) {
        throw new Error('Consumo no encontrado');
      }
      return consumo;
    } catch (error) {
      throw new Error(`Error al obtener el consumo: ${error.message}`);
    }
  }

  // Eliminar un consumo
  static async deleteConsumo(id) {
    try {
      const consumo = await Consumos.findByPk(id);
      if (!consumo) {
        throw new Error('Consumo no encontrado');
      }
      await consumo.destroy();
      return { message: 'Consumo eliminado' };
    } catch (error) {
      throw new Error(`Error al eliminar el consumo: ${error.message}`);
    }
  }
}

export default ConsumosService;
