import { Clientes } from '../models/clientes.js';  // Importar el modelo Clientes

class ClienteService {
  // Crear un nuevo cliente con validaciones
  async createCliente(data) {
    const { nombre_cliente, codigo_cliente, direccion_cliente, telefono_cliente, email_cliente, id_usuario } = data;
    
    // Validación: verificar que el código del cliente (cédula) tenga 10 dígitos
    if (codigo_cliente.length !== 10 || isNaN(codigo_cliente)) {
      throw new Error('El código del cliente (cédula) debe tener exactamente 10 dígitos numéricos.');
    }
    
    try {
      // Crear el cliente después de pasar las validaciones
      const nuevoCliente = await Clientes.create({ nombre_cliente, codigo_cliente, direccion_cliente, telefono_cliente, email_cliente, id_usuario });
      return nuevoCliente;
    } catch (error) {
      throw new Error(`El cliente ya se encuentra registrado: ${error.message}`);
    }
  }

  // Obtener todos los clientes
  async getClientes() {
    try {
      return await Clientes.findAll();
    } catch (error) {
      throw new Error(`Error al obtener los clientes: ${error.message}`);
    }
  }

  // Obtener un cliente por ID
  async getClienteById(id) {
    try {
      const cliente = await Clientes.findByPk(id);
      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }
      return cliente;
    } catch (error) {
      throw new Error(`Error al obtener el cliente: ${error.message}`);
    }
  }

  // Actualizar un cliente con validaciones
  async updateCliente(id, data) {
    const { nombre_cliente, codigo_cliente, direccion_cliente, telefono_cliente, email_cliente, id_usuario } = data;

    // Validación: verificar que el código del cliente (cédula) tenga 10 dígitos
    if (codigo_cliente.length !== 10 || isNaN(codigo_cliente)) {
      throw new Error('El código del cliente (cédula) debe tener exactamente 10 dígitos numéricos.');
    }

    try {
      const [actualizado] = await Clientes.update(
        { nombre_cliente, codigo_cliente, direccion_cliente, telefono_cliente, email_cliente, id_usuario },
        { where: { id_cliente: id } }
      );
      if (actualizado) {
        return await Clientes.findByPk(id);
      } else {
        throw new Error('Cliente no encontrado');
      }
    } catch (error) {
      throw new Error(`Error al actualizar el cliente: ${error.message}`);
    }
  }

  // Eliminar un cliente
  async deleteCliente(id) {
    try {
      const eliminado = await Clientes.destroy({ where: { id_cliente: id } });
      if (!eliminado) {
        throw new Error('Cliente no encontrado');
      }
      return { message: 'Cliente eliminado' };
    } catch (error) {
      throw new Error(`Error al eliminar el cliente: ${error.message}`);
    }
  }
}

// Exportar una instancia de la clase ClienteService
export default new ClienteService();
