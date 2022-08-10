import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import productModel from "../../contenedores/Models/product.js";

class ProductosDaoMongo extends ContenedorMongoDb {
    constructor(){
        super("mongodb://localhost:27017/ecommerce",productModel);
    }
}

export default ProductosDaoMongo;


/* --------------------------------------- */
/*                TEST CLASS               */
/* --------------------------------------- */

// const miConexionMongo=new ProductosDaoMongo;
// const prod1={
//         nombre: "Escuadra",
//         descripcion: "Esc 45 grados",
//         codigo: 123,
//         fotoURL: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//         precio: 123.45,
//         stock: 20,
//         cantidad: 11,
//         timeStamp:new Date().toLocaleString()
//     };
// const prod2={
//         nombre: "Escuadra 60",
//         descripcion: "Esc 60 grados",
//         codigo: 125,
//         fotoURL: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//         precio: 163.45,
//         stock: 20,
//         cantidad: 11,
//         timeStamp:new Date().toLocaleString()
//     };
// await miConexionMongo.connectDB();
// await miConexionMongo.save(prod1);
// await miConexionMongo.getAll();
// await miConexionMongo.getById("62f33858c37e2b0954e56768");
// await miConexionMongo.update(prod2,'62f33c5f85380ae45d7f34bb');
//await miConexionMongo.delete('62f140cbb99c70c09b396bdf');

