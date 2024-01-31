import { UsuariosModelo } from "./models/usuarios.model.js";

export class UsuariosMongoDao {
  async getUsuarios(usuarioId) {
    try {
      const usuarios = await UsuariosModelo.findById({ _id: usuarioId, rol: "usuario" });
      return usuarios;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  async getUsuarioAdmin(adminId) {
    try {
      const administrador = await UsuariosModelo.findById({ _id: adminId, rol: "administrador" });
      return administrador;
    } catch (error) {
      console.error("Error al obtener administrador:", error);
      throw error;
    }
  }

  async getTodosUsuarios() {
    try {
      const todosUsuarios = await UsuariosModelo.find().lean();
      return todosUsuarios;
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw error;
    }
  }
}