import { LogoutController } from '../controller/logout.controller.js';
import { Router } from 'express';

export const router=Router()

router.get('/', LogoutController.logoutUsuario );
