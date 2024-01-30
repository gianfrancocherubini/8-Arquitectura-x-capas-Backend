import { Cart } from './models/carrito.model.js';
import { ProductEsquema } from './models/products.model.js';


export class CarritoMongoDao {
    
    async createEmptyCart() {
        const newCart = new Cart({});
        await newCart.save();
        return newCart;
    }

    async getCartById(cartId) {
        const cart = await Cart.findById({_id: cartId}).populate('items.product').lean();
        return cart
    }
    
    async addProductToCart(cartId, productId, quantity) {
            const cart = await Cart.findById(cartId);
            const product = await ProductEsquema.findById(productId);

            if(!cart){
                console.log('Carrito no encontrado')
            }
            if(!product){
                console.log('Producto no encontrado')
            }

            const existingItemIndex = cart.items.findIndex(item => item.product.equals(productId));
        
            if (existingItemIndex !== -1) {
                cart.items[existingItemIndex].quantity += quantity || 1;
            } else {
                    cart.items.push ({
                    product: productId,
                    quantity: quantity || 1,
                });
            }
        
            await cart.save();
            const updatedCart = await Cart.findById(cartId);
            return updatedCart;
    }

    async deleteProductToCart(cartId, productId) {
        
            const cart = await Cart.findById(cartId);

            if(!cart){
                console.log('Carrito no encontrado')
            }
            const existingItemIndex = cart.items.findIndex(item => item.product.equals(productId));
        
            if (existingItemIndex !== -1) {
                // Elimina el producto del array de items
                cart.items.splice(existingItemIndex, 1);
            } else {
                console.log('Producto no encontrado en el carrito.');
            }
        
            // Llama a save para aplicar los cambios en la base de datos
            await cart.save();
            const updatedCart = await Cart.findById(cartId);
            return updatedCart;
    }

    async deleteCart(cartId) {

            const cart = await Cart.findById(cartId);
        
            if (!cart) {
                console.log('Carrito no encontrado.');
            }
            // Elimina el carrito directamente
            return await Cart.findByIdAndDelete(cartId);
        
    }
}

