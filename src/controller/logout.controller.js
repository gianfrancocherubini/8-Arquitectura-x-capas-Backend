export class LogoutController {
    constructor(){}

    static async logoutUsuario(req,res){

        console.log('Logout del usuario:', req.session.usuario)
        req.session.destroy(error => {
            if (error) {
                res.status(500).redirect('/api/login?error=fallo en el logout');
                return;
            }
            
            res.redirect('/api/login');
        });
    
    }

}