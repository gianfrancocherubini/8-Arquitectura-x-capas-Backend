import { ProductEsquema } from "./models/products.model.js";

export class ProductsMongoDao {

    async get(query) {
        const products = await ProductEsquema.find({ ...query, deleted: false }).lean();
        return products;
    }
    async getByCategory(category){
        const productsCategory = await ProductEsquema.findOne({category, deleted: false});
        return productsCategory;
    }

    async getById(productId){
        const product = await ProductEsquema.findById({_id: productId, deleted: false});
        return product;
    }

    async getByCode (productByCode){
        const productCode = await ProductEsquema.findOne({code: productByCode})
        return productCode;
    }

    async create(product){
        const newProduct = await ProductEsquema.create(product);
        return newProduct;
    }

    async unpdateProduct(productId, updatedData) {
        const updateProduct = await ProductEsquema.findByIdAndUpdate( { _id: productId },
        { $set: updatedData }
        )
        return updateProduct;
    }


}