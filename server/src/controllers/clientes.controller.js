import clienteService from '../services/clientes.service.js';  // Importar el servicio

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  try {
    const nuevoCliente = await clienteService.createCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await clienteService.getClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

// Obtener un cliente por ID
export const getClienteId = async (req, res) => {
  try {
    const cliente = await clienteService.getClienteById(req.params.id);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar un cliente por ID
export const updateCliente = async (req, res) => {
  try {
    const clienteActualizado = await clienteService.updateCliente(req.params.id, req.body);
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un cliente por ID
export const deleteCliente = async (req, res) => {
  try {
    await clienteService.deleteCliente(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
