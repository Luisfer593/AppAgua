// services/pagos.service.js
import { Pagos } from '../models/pagos.js'; // Importar el modelo de Pagos
import { Medidores } from '../models/medidores.js'; // Importar el modelo de Medidores
import { Tarifas } from '../models/tarifas.js'; // Importar el modelo de Tarifas

class PagosService {
  // Validaciones
  static validatePagoData(data) {
    const { lectura_anterior, lectura_actual, estado_pago } = data;

    if (lectura_actual <= lectura_anterior) {
      throw new Error('La lectura actual debe ser mayor a la lectura anterior.');
    }

    if (!['Pagado', 'Pendiente', 'Mora'].includes(estado_pago)) {
      throw new Error('El estado del pago debe ser "Pagado", "Pendiente" o "Mora".');
    }
  }

  // Calcular el consumo total y exceso
  static async calculateCostos(lectura_anterior, lectura_actual) {
    try {
      const tarifa = await Tarifas.findOne({
        order: [['fecha_inicio', 'DESC']], // Obtener la tarifa más reciente
      });

      if (!tarifa) {
        throw new Error('No se encontró una tarifa válida.');
      }

      const consumo_total = lectura_actual - lectura_anterior;
      const tarifa_base = tarifa.tarifa_base;
      const tarifa_exceso = tarifa.tarifa_exceso;

      let exceso = 0;
      let total = 0;

      if (consumo_total > tarifa_base) {
        exceso = consumo_total - tarifa_base;
        total = tarifa_base * tarifa_base + exceso * tarifa_exceso;
      } else {
        total = consumo_total * tarifa_base;
      }

      return {
        consumo_total,
        exceso,
        total,
        monto_reconexion: tarifa.monto_reconexion,
        monto_registro_socio: tarifa.monto_registro_socio,
      };
    } catch (error) {
      throw new Error(`Error al calcular los costos: ${error.message}`);
    }
  }

  // Crear un nuevo pago
  static async createPago(data) {
    try {
      this.validatePagoData(data);

      const medidor = await Medidores.findByPk(data.id_medidor);
      if (!medidor) {
        throw new Error('Medidor no encontrado');
      }

      const costos = await this.calculateCostos(data.lectura_anterior, data.lectura_actual);

      const monto_reconexion = medidor.reconexion ? costos.monto_reconexion : 0;

      const pago = await Pagos.create({
        ...data,
        consumo_total: costos.consumo_total,
        exceso: costos.exceso,
        total: costos.total + monto_reconexion,
      });

      return pago;
    } catch (error) {
      throw new Error(`Error al crear el pago: ${error.message}`);
    }
  }

  // Actualizar un pago existente
  static async updatePago(id, data) {
    try {
      this.validatePagoData(data);

      const pago = await Pagos.findByPk(id);
      if (!pago) {
        throw new Error('Pago no encontrado');
      }

      const costos = await this.calculateCostos(data.lectura_anterior, data.lectura_actual);

      const monto_reconexion = pago.reconexion ? costos.monto_reconexion : 0;

      await pago.update({
        ...data,
        consumo_total: costos.consumo_total,
        exceso: costos.exceso,
        total: costos.total + monto_reconexion,
      });

      return pago;
    } catch (error) {
      throw new Error(`Error al actualizar el pago: ${error.message}`);
    }
  }

  // Obtener todos los pagos
  static async getPagos() {
    try {
      return await Pagos.findAll();
    } catch (error) {
      throw new Error(`Error al obtener pagos: ${error.message}`);
    }
  }

  // Obtener un pago por ID
  static async getPagoById(id) {
    try {
      const pago = await Pagos.findByPk(id);
      if (!pago) {
        throw new Error('Pago no encontrado');
      }
      return pago;
    } catch (error) {
      throw new Error(`Error al obtener el pago: ${error.message}`);
    }
  }

  // Eliminar un pago
  static async deletePago(id) {
    try {
      const pago = await Pagos.findByPk(id);
      if (!pago) {
        throw new Error('Pago no encontrado');
      }
      await pago.destroy();
      return { message: 'Pago eliminado' };
    } catch (error) {
      throw new Error(`Error al eliminar el pago: ${error.message}`);
    }
  }
}

export default PagosService;
