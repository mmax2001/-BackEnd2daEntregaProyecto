import {config} from "../config/config.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritosDaoMemoria from "./carritos/CarritosDaoMemoria.js";
import ProductosDaoArchivo from "./productos/ProductosDaoArchivo.js";
import CarritosDaoArchivo from "./carritos/CarritosDaoArchivo.js";
import ProductosDaoMongo from "./productos/ProductosDaoMongo.js";
import CarritoDaoMongoDb  from "./carritos/CarritosDaoMongo.js";


let productosDao;
let carritosDao;

switch (config.selectedDB) {
  case 'mongodb':
    MongoDb.init();
    productosDao = new ProductosDaoMongo();
    carritosDao = new CarritoDaoMongoDb();
    break;
  case 'memoria':
    productosDao = new ProductosDaoMemoria();
    carritosDao = new CarritosDaoMemoria();
    break;

  default:
    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
}

export { productosDao, carritosDao };

console.log("ESTO TIENE",productosDao);
console.log("BASE",config.selectedDB)