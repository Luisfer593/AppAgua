import PagosService from "../services/pagos.service.js"; // Importa el servicio de pagos

// Crear un nuevo pago
export const createPago = async (req, res) => {
  try {
    // Validar datos del cuerpo de la solicitud
    const nuevoPago = await PagosService.createPago(req.body);
    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error("Error al crear el pago:", error);
    res.status(500).json({ error: error.message || "Error al crear el pago" });
  }
};

// Obtener todos los pagos
export const getPagos = async (req, res) => {
  try {
    const pagos = await PagosService.getPagos();
    res.status(200).json(pagos);
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    res.status(500).json({ error: error.message || "Error al obtener los pagos" });
  }
};

// Obtener un pago por ID
export const getPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await PagosService.getPagoById(id);
    if (pago) {
      res.status(200).json(pago);
    } else {
      res.status(404).json({ error: "Pago no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    res.status(500).json({ error: error.message || "Error al obtener el pago" });
  }
};

// Actualizar un pago por ID
export const updatePago = async (req, res) => {
  try {
    const { id } = req.params;
    const pagoActualizado = await PagosService.updatePago(id, req.body);
    if (pagoActualizado) {
      res.status(200).json(pagoActualizado);
    } else {
      res.status(404).json({ error: "Pago no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    res.status(500).json({ error: error.message || "Error al actualizar el pago" });
  }
};

// Eliminar un pago por ID
export const deletePago = async (req, res) => {
  try {
    const { id } = req.params;
    await PagosService.deletePago(id);
    res.status(204).send(); // 204 No Content para eliminación exitosa
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    res.status(500).json({ error: error.message || "Error al eliminar el pago" });
  }
};
