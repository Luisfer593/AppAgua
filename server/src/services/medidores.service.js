// services/medidores.service.js
import { Medidores } from '../models/medidores.js';  // Importar el modelo de medidores
import { Clientes } from '../models/clientes.js';  // Importar el modelo de clientes

class MedidoresService {
  // Validaciones
  static async validateMedidorData(data) {
    const { codigo_medidor, ubicacion_medidor, id_cliente } = data;

    if (!codigo_medidor || codigo_medidor.length < 3) {
      throw new Error('El código del medidor debe tener al menos 3 caracteres.');
    }

    if (ubicacion_medidor && ubicacion_medidor.length > 255) {
      throw new Error('La ubicación del medidor debe tener como máximo 255 caracteres.');
    }

    if (id_cliente) {
      // Verificar que el cliente existe
      const cliente = await Clientes.findByPk(id_cliente);
      if (!cliente) {
        throw new Error('El cliente especificado no existe.');
      }
    }
  }

  // Obtener todos los medidores
  static async getMedidores() {
    try {
      return await Medidores.findAll({ include: Clientes });
    } catch (error) {
      throw new Error(`Error al obtener medidores: ${error.message}`);
    }
  }

  // Obtener un medidor por ID
  static async getMedidorById(id) {
    try {
      const medidor = await Medidores.findByPk(id, { include: Clientes });
      if (!medidor) {
        throw new Error('Medidor no encontrado.');
      }
      return medidor;
    } catch (error) {
      throw new Error(`Error al obtener el medidor: ${error.message}`);
    }
  }

  // Crear un nuevo medidor
  static async createMedidor(data) {
    try {
      await this.validateMedidorData(data);

      // Verificar si el código del medidor ya existe
      const existingMedidor = await Medidores.findOne({ where: { codigo_medidor: data.codigo_medidor } });
      if (existingMedidor) {
        throw new Error('El código del medidor ya está registrado.');
      }

      const medidor = await Medidores.create(data);
      return medidor;
    } catch (error) {
      throw new Error(`Error al crear el medidor: ${error.message}`);
    }
  }

  // Actualizar un medidor existente
  static async updateMedidor(id, data) {
    try {
      await this.validateMedidorData(data);

      const medidor = await Medidores.findByPk(id);
      if (!medidor) {
        throw new Error('Medidor no encontrado.');
      }

      // Verificar si se intenta actualizar el código a un valor ya existente
      if (data.codigo_medidor) {
        const existingMedidor = await Medidores.findOne({ where: { codigo_medidor: data.codigo_medidor } });
        if (existingMedidor && existingMedidor.id !== id) {
          throw new Error('El código del medidor ya está registrado.');
        }
      }

      await medidor.update(data);
      return medidor;
    } catch (error) {
      throw new Error(`Error al actualizar el medidor: ${error.message}`);
    }
  }

  // Eliminar un medidor
  static async deleteMedidor(id) {
    try {
      const medidor = await Medidores.findByPk(id);
      if (!medidor) {
        throw new Error('Medidor no encontrado.');
      }
      await medidor.destroy();
      return { message: 'Medidor eliminado.' };
    } catch (error) {
      throw new Error(`Error al eliminar el medidor: ${error.message}`);
    }
  }
}

export default MedidoresService;
