import { ProductsController } from "../controller/products.controller.js";
import { CarritoController } from '../controller/carrito.controller.js';
import { RegistroController } from '../controller/registro.controller.js';
import { LoginController, auth2 } from '../controller/login.controller.js';
import { PerfilController } from '../controller/perfil.controller.js';
import { LogoutController } from '../controller/logout.controller.js';
import { auth } from '../controller/perfil.controller.js';
import { Router } from 'express';
export const router=Router();


router.get('/', ProductsController.getProducts);
router.get('/carrito', CarritoController.getCartById);
router.get('/registro', auth2, RegistroController.registroRender);
router.get('/perfil', auth, PerfilController.perfilUsuario);
router.get('/login', auth2, LoginController.loginRender);
router.get('/logout', LogoutController.logoutUsuario );