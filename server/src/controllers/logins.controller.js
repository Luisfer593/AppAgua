import AuthService from "../services/logins.service.js";

// Crear login (esto no debería estar en el controlador si el login es para autenticación, pero si necesitas crear registros de login, este es el formato)
export const createLogin = async (req, res) => {
  try {
    const { id_usuario, username, password_hash } = req.body;
    // Aquí se debería validar que `password_hash` es válido, y en muchos casos no se crea un login así directamente
    const nuevoLogin = await AuthService.createLogin({ id_usuario, username, password_hash });
    res.status(201).json(nuevoLogin);
  } catch (error) {
    console.error("Error al crear el login:", error);
    res.status(500).json({ error: "Error al crear el login" });
  }
};

// Obtener todos los logins (esto es para administración, puede no ser necesario en la mayoría de las aplicaciones)
export const getLogins = async (req, res) => {
  try {
    const logins = await AuthService.getAllLogins();
    res.status(200).json(logins);
  } catch (error) {
    console.error("Error al obtener los logins:", error);
    res.status(500).json({ error: "Error al obtener los logins" });
  }
};

// Obtener un login por ID (esto puede no ser necesario si no estás manejando la autenticación por login ID)
export const getLoginById = async (req, res) => {
  try {
    const { id } = req.params;
    const login = await AuthService.getLoginById(id);
    if (login) {
      res.status(200).json(login);
    } else {
      res.status(404).json({ error: "Login no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el login:", error);
    res.status(500).json({ error: "Error al obtener el login" });
  }
};

// Actualizar un login (esto puede no ser necesario si el login solo se maneja con autenticación y no se actualiza directamente)
export const updateLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, username, password_hash } = req.body;
    const loginActualizado = await AuthService.updateLogin(id, { id_usuario, username, password_hash });
    if (loginActualizado) {
      res.status(200).json(loginActualizado);
    } else {
      res.status(404).json({ error: "Login no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el login:", error);
    res.status(500).json({ error: "Error al actualizar el login" });
  }
};

// Eliminar un login (esto puede ser necesario para eliminar registros de login)
export const deleteLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await AuthService.deleteLogin(id);
    if (eliminado) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Login no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el login:", error);
    res.status(500).json({ error: "Error al eliminar el login" });
  }
};
