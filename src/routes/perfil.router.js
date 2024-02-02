import { Router } from 'express';
import { auth } from '../controller/perfil.controller.js';
import { PerfilController } from '../controller/perfil.controller.js';

export const router=Router()
// hago el middle para proteger la ruta perfil si es que el usuario no hizo el loguin

router.get('/', auth, PerfilController.perfilUsuario);


