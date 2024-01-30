export const auth2 = (req, res, next) => {
    if (req.session.usuario) {
        res.status(401).redirect('/api/perfil'); 
        return;
    }

    next();
};

export class RegistroController{
    constructor(){}

    static async registroRender (req,res){

        let { errorMessage } = req.query;
        let { message } = req.query;
        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('registro', { errorMessage, message, login : false }); 
    }

    static async registroError (req,res){

        return res.redirect('/api/registro?errorMessage=Error en el proceso de registro')
    }

    static async registro (req,res){

        let {email}=req.body
        res.redirect(`/api/login?message=Usuario ${email} registrado correctamente`)
        
    }

}