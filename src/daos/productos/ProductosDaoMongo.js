import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import productModel from "../../contenedores/Models/product.js";

class ProductosDaoMongo extends ContenedorMongoDb {
    constructor(){
        super("mongodb://localhost:27017/ecommerce",productModel);
    }
}

export default ProductosDaoMongo;