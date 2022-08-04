import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js';
import carritoModel from '../../contenedores/Models/cart.js';

class CarritoDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("mongodb://localhost:27017/ecommerce",carritoModel);
  }
}

export { CarritoDaoMongoDb };