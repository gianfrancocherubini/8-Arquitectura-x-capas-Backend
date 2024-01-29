// listo el post para crear carrito
import { Router } from 'express';
import CarritoManager from '../dao/carritoManagerMongo.js';

const cm = new CarritoManager();


export const router=Router()

router.post('/', async (req, res) => {
    try {
        const newCart = await cm.createEmptyCart();
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ success: true, message: 'Carrito creado correctamente.', cart: newCart });
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Error al crear el carrito.' });
    }
});

// 659dc61465d5cf2afa74a075

router.get('/:cid', async (req, res) => {
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
        console.log(cart.items)
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Error al obtener el carrito.' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const quantity = req.body.quantity || 1;
  
      if (!cartId || !productId) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ error: 'Se deben proporcionar un ID de carrito y un ID de producto válidos.' });
        return;
      }
  
      const updatedCart = await cm.addProductToCart(cartId, productId, quantity);
      console.log(`Producto : ${productId} agregado correctamente`)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        if (!cartId || !productId) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ error: 'Se deben proporcionar un ID de carrito y un ID de producto válidos.' });
            return;
        }

        const deleteProductToCart = await cm.deleteProductToCart(cartId, productId);
        console.log(`Producto : ${productId} eliminado de ${cartId} correctamente`)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({message: `Producto : ${productId} eliminado de ${cartId} correctamente`});
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        

        if (!cartId) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ error: 'Se deben proporcionar un ID de carrito válido.' });
            return;
        }

        const deletedCart = await cm.deleteCart(cartId);
        console.log(`Carrito: ${cartId} eliminado correctamente`)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(deletedCart);
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
    }
});
  

router.get('*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({error: "Page not found"});
});