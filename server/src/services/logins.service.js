import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuarios } from '../models/usuarios.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRATION = '1h';

class AuthService {
  // Validar los datos de inicio de sesión
  static validateLoginData(data) {
    const { correo, contrasena } = data;
    if (!correo) {
      throw new Error('El correo es obligatorio.');
    }
    if (!contrasena) {
      throw new Error('La contraseña es obligatoria.');
    }
  }

  // Iniciar sesión como administrador
  static async loginAdmin(data) {
    try {
      this.validateLoginData(data);  // Validación de los datos
      const { correo, contrasena } = data;
      
      // Buscar al administrador por correo y rol
      const administrador = await Usuarios.findOne({ where: { correo, rol: 'Administrador' } });
      if (!administrador) {
        throw new Error('Administrador no encontrado.');
      }

      // Verificar la contraseña
      const contrasenaValida = await bcrypt.compare(contrasena, administrador.password_hash);
      if (!contrasenaValida) {
        throw new Error('Contraseña incorrecta.');
      }

      // Generar token JWT
      const token = jwt.sign({ id: administrador.id, tipo_usuario: administrador.tipo_usuario }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION
      });

      return { token, administrador };  // Retornar el token y el administrador
    } catch (error) {
      throw new Error(`Error al iniciar sesión del administrador: ${error.message}`);
    }
  }

  // Iniciar sesión como usuario
  static async loginUsuario(data) {
    try {
      this.validateLoginData(data);  // Validación de los datos
      const { correo, contrasena } = data;

      // Buscar al usuario por correo
      const usuario = await Usuarios.findOne({ where: { correo } });
      if (!usuario) {
        throw new Error('Usuario no encontrado.');
      }

      // Verificar la contraseña
      const contrasenaValida = await bcrypt.compare(contrasena, usuario.password_hash);
      if (!contrasenaValida) {
        throw new Error('Contraseña incorrecta.');
      }

      // Generar token JWT
      const token = jwt.sign({ id: usuario.id, tipo_usuario: usuario.tipo_usuario }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION
      });

      return { token, usuario };  // Retornar el token y el usuario
    } catch (error) {
      throw new Error(`Error al iniciar sesión del usuario: ${error.message}`);
    }
  }

  // Cambiar la contraseña del usuario
  static async changePassword(id, oldPassword, newPassword) {
    try {
      // Buscar al usuario por ID
      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado.');
      }

      // Verificar la contraseña actual
      const oldPasswordValid = await bcrypt.compare(oldPassword, usuario.password_hash);
      if (!oldPasswordValid) {
        throw new Error('Contraseña actual incorrecta.');
      }

      // Validar la nueva contraseña
      if (newPassword.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres.');
      }

      // Encriptar la nueva contraseña
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña en la base de datos
      await usuario.update({ password_hash: hashedNewPassword });

      return { message: 'Contraseña actualizada con éxito.' };
    } catch (error) {
      throw new Error(`Error al cambiar la contraseña: ${error.message}`);
    }
  }
}

export default AuthService;
