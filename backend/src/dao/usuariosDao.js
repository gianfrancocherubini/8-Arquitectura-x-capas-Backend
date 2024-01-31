import { UsuariosModelo } from "./models/usuarios.model.js";

export class UsuariosMongoDao {

     async getUsuarios(usuarioId){

        let usuarios = await UsuariosModelo.findById({_id: usuarioId, rol: "usuario"});
        return usuarios;

    }

    async getUsuarioAdmin(adminId){
        let administrador = await UsuariosModelo.findById({_id: adminId, rol: "administrador"});
        return administrador;
    }

    async gettodosUsuarios(usuarios){
        let todosUsuarios = await UsuariosModelo.find().lean();
        return todosUsuarios;
    }
}