import { Router } from 'express';
import passport from 'passport';
import { LoginController } from '../controller/login.controller.js';
export const router=Router()

router.get('/', auth2, LoginController.loginRender);

// ESTRATEGIA DE AUTENTICACION CON GITHUB
router.get('/github', passport.authenticate('github',{}), (req,res)=>{});
router.get('/callbackGithub', passport.authenticate('github',{failureRedirect:"/api/login/errorGithub"}), LoginController.loginCallBackGithub);
router.get('/errorGithub',LoginController.loginErrorGitHub);

// ESTRATEGIA DE AUTENTICACION LOCAL
router.get('/error',LoginController.loginLocalError);
router.post('/', passport.authenticate('login', {failureRedirect: '/api/login/error'}), LoginController.loginLocal);

