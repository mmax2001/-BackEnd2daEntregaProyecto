import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
import carritoModel from '../../contenedores/Models/cart.js';

class CarritosDaoMongo extends ContenedorMongoDb {
  constructor() {
    super("mongodb://localhost:27017/ecommerce",carritoModel);
  }
}

export default CarritosDaoMongo;