// listo el post para crear carrito
import { Router } from 'express';
import { CarritoController } from '../controller/carrito.controller.js';

export const router=Router()

router.post('/', CarritoController.createCart);
router.get('/:cid', CarritoController.getCartById);


// router.post('/:cid/product/:pid', async (req, res) => {
//     try {
//       const cartId = req.params.cid;
//       const productId = req.params.pid;
//       const quantity = req.body.quantity || 1;
  
//       if (!cartId || !productId) {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(400).json({ error: 'Se deben proporcionar un ID de carrito y un ID de producto válidos.' });
//         return;
//       }
  
//       const updatedCart = await cm.addProductToCart(cartId, productId, quantity);
//       console.log(`Producto : ${productId} agregado correctamente`)
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(updatedCart);
//     } catch (error) {
//       console.error(error);
//       res.setHeader('Content-Type', 'application/json');
//       res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
//     }
// });

// router.delete('/:cid/product/:pid', async (req, res) => {
//     try {
//         const cartId = req.params.cid;
//         const productId = req.params.pid;

//         if (!cartId || !productId) {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(400).json({ error: 'Se deben proporcionar un ID de carrito y un ID de producto válidos.' });
//             return;
//         }

//         const deleteProductToCart = await cm.deleteProductToCart(cartId, productId);
//         console.log(`Producto : ${productId} eliminado de ${cartId} correctamente`)
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json({message: `Producto : ${productId} eliminado de ${cartId} correctamente`});
//     } catch (error) {
//         console.error(error);
//         res.setHeader('Content-Type', 'application/json');
//         res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
//     }
// });

// router.delete('/:cid', async (req, res) => {
//     try {
//         const cartId = req.params.cid;
        

//         if (!cartId) {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(400).json({ error: 'Se deben proporcionar un ID de carrito válido.' });
//             return;
//         }

//         const deletedCart = await cm.deleteCart(cartId);
//         console.log(`Carrito: ${cartId} eliminado correctamente`)
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(deletedCart);
//     } catch (error) {
//         console.error(error);
//         res.setHeader('Content-Type', 'application/json');
//         res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
//     }
// });
  
