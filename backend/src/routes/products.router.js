// http://localhost:3014/home para acceder a todos los productos
// http://localhost:3014/home?category=computadoras para acceder a las computadoras
// http://localhost:3014/home?category=celulares  para acceder a los celulares
import validUrl from 'valid-url';
import { Router } from 'express';
import { ProductEsquema } from '../dao/models/products.model.js'

export const router=Router()
 
router.get('/', async (req, res) => {
    try {
        let page = parseInt(req.query.pagina) || 1;
        let category = req.query.category; 
        let query = {};

        if (category) {
            query.category = category;
        }

        let products = await ProductEsquema.paginate(query, { lean: true, limit: 2, page });
        let { totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = products;

        if (page > totalPages) {
            return res.redirect(`/home?pagina=${totalPages}${category ? `&category=${category}` : ''}`);
        }

        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('home', {
            products: products.docs,
            totalPages: products.totalPages,
            hasNextPage: products.hasNextPage,
            hasPrevPage: products.hasPrevPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: page,
            currentCategory: category,
            login: req.session.usuario?true:false
        });
        
    } catch (err) {
        console.error(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});


router.post('/', async (req, res) => {
    try {
        const newProductData = req.body;
        const requiredFields = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category'];

        for (const field of requiredFields) {
            if (!newProductData[field]) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `El campo '${field}' es obligatorio.` });
            }
        }

        // Validar URLs de imágenes
        const validThumbnails = newProductData.thumbnails.every(url => validUrl.isUri(url));

        if (!validThumbnails) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: 'La URL de la imagen no es válida.' });
        }

        const existingProducts = await ProductEsquema.findOne({ code: newProductData.code });
       
        if (existingProducts) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya existe un producto con el código '${newProductData.code}'.` });
        }

        await ProductEsquema.create(newProductData);
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ success: true, message: 'Producto agregado correctamente.', newProductData });
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: 'Error al agregar el producto.' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;

        // Buscar el producto existente por _id
        const existingProduct = await ProductEsquema.findById(productId);

        if (!existingProduct) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        // Verificar si la propiedad _id está presente en el cuerpo de la solicitud
        if ('_id' in req.body) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: 'No se puede modificar la propiedad "_id".' });
        }

        // Actualizar el producto utilizando findByIdAndUpdate
        const updateResult = await ProductEsquema.findByIdAndUpdate(productId, { $set: req.body });

        if (updateResult) {
            console.log('Producto actualizado:', updateResult);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ success: true, message: 'Modificación realizada.' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: 'No se concretó la modificación.' });
        }
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
});

router.get('*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({error: "Page not found"});
});