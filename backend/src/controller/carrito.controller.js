import { CarritoMongoDao } from "../dao/carritoManagerMongo.js";
import { ProductsMongoDao } from "../dao/productsManagerMongo.js";
const cm = new CarritoMongoDao();


 export class CarritoController {
    constructor(){}

    static async createCart(req, res) {
        try {
            const newCart = await cm.createEmptyCart();
            console.log('Carrito creado:', newCart);
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json({ success: true, message: 'Carrito creado correctamente.', cart: newCart });
        } catch (error) {
            console.error(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Error al crear el carrito.' });
        }
    }

    static async getCartById(req,res){
        try {
            const cartId = req.params.cid;
            
            if (!cartId) {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).json({ error: 'Se debe proporcionar un ID de carrito válido.' });
                console.log('Se debe proporcionar un ID de carrito válido.');
                return;
            }
            
            const cart = await cm.getCartById(cartId);
            
            if (!cart) {
                res.setHeader('Content-Type', 'application/json');
                res.status(404).json({ error: 'Carrito no encontrado.' });
                return;
            }
            
            res.setHeader('Content-Type', 'text/html');
            res.status(200).render('carrito', {carts : cart}) ;
            console.log('Carrito:', cart._id , 'con los items:', cart.items)
        } catch (error) {
            console.error(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Error al obtener el carrito.' });
        }
    }
}