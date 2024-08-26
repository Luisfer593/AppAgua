import usuarioService from '../services/usuarios.service.js';  // Importar el servicio

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por ID
export const getUsuarioId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.getUsuarioById(id);
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const { nombre, cedula, direccion, telefono, rol, password_hash } = req.body;

    // Verifica que todos los campos necesarios están presentes
    if (!nombre || !cedula || !rol) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Crea el nuevo usuario
    const nuevoUsuario = await usuarioService.createUsuario({ nombre, cedula, direccion, telefono, rol, password_hash });

    // Responde con éxito y mensaje personalizado
    res.status(201).json({
      message: "Usuario agregado correctamente",
      usuario: nuevoUsuario
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Actualizar un usuario por ID
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, direccion, telefono, rol, password_hash } = req.body;

    // Verificar si el usuario existe
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar el usuario
    const usuarioActualizado = await usuarioService.updateUsuario(id, { nombre, cedula, direccion, telefono, rol, password_hash });
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario por ID
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario existe
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuarioService.deleteUsuario(id);
    res.status(204).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// Iniciar sesión
export const loginUsuario = async (req, res) => {
  try {
    const { cedula, password } = req.body;
    const usuario = await usuarioService.authenticateUsuario({ cedula, password });
    res.status(200).json({ message: "Inicio de sesión exitoso", usuario });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Cambiar contraseña
export const changePasswordUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaPassword } = req.body;

    // Verificar si el usuario existe
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Encriptar la nueva contraseña
    usuario.password_hash = await bcrypt.hash(nuevaPassword, 10);
    await usuario.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};
