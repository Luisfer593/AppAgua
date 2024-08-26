import { Usuarios } from '../models/usuarios.js';  // Importar el modelo `Usuarios`
import bcrypt from 'bcrypt';  // Para encriptar la contraseña

class UsuariosService {
  // Validaciones
  validateUsuarioData(data) {
    const { nombre, cedula, direccion, telefono, rol, password_hash } = data;

    if (!nombre || nombre.length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres.');
    }

    if (!cedula || cedula.length < 5) {
      throw new Error('La cédula debe tener al menos 5 caracteres.');
    }

    if (!rol || !['Administrador', 'Tesorera', 'Cliente'].includes(rol)) {
      throw new Error('El rol debe ser uno de: Administrador, Tesorera, Cliente.');
    }

    if (password_hash && password_hash.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    // Validaciones adicionales como formato de teléfono, etc.
  }

  // Obtener todos los usuarios
  async getUsuarios() {
    try {
      return await Usuarios.findAll();
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  // Obtener un usuario por ID
  async getUsuarioById(id) {
    try {
      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  }

  // Crear un nuevo usuario
  async createUsuario(data) {
    try {
      this.validateUsuarioData(data);

      // Verificar si la cédula ya existe
      const existingUsuario = await Usuarios.findOne({ where: { cedula: data.cedula } });
      if (existingUsuario) {
        throw new Error('La cédula ya está registrada.');
      }

      // Encriptar la contraseña
      if (data.password_hash) {
        data.password_hash = await bcrypt.hash(data.password_hash, 10);
      }

      const usuario = await Usuarios.create(data);
      return usuario;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  // Actualizar un usuario existente
  async updateUsuario(id, data) {
    try {
      this.validateUsuarioData(data);

      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar si se intenta actualizar la cédula a un valor ya existente
      if (data.cedula) {
        const existingUsuario = await Usuarios.findOne({ where: { cedula: data.cedula } });
        if (existingUsuario && existingUsuario.id_usuario !== id) {
          throw new Error('La cédula ya está registrada.');
        }
      }

      // Encriptar la contraseña si se proporciona
      if (data.password_hash) {
        data.password_hash = await bcrypt.hash(data.password_hash, 10);
      }

      await usuario.update(data);
      return usuario;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  // Eliminar un usuario
  async deleteUsuario(id) {
    try {
      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      await usuario.destroy();
      return { message: 'Usuario eliminado' };
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  }

  // Autenticación de usuario
  async authenticateUsuario(credentials) {
    try {
      const { cedula, password } = credentials;
      const usuario = await Usuarios.findOne({ where: { cedula } });
      if (!usuario) {
        throw new Error('Credenciales inválidas');
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, usuario.password_hash);
      if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
      }

      return usuario;
    } catch (error) {
      throw new Error(`Error en la autenticación: ${error.message}`);
    }
  }
}

// Exportar una instancia de la clase
export default new UsuariosService();
