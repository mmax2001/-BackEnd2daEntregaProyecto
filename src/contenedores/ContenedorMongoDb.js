import mongoose from "mongoose";
import productModel from "./Models/product.js";
import { config } from "../config/config.js";

class ContenedorMongoDb{
    constructor(URL, modelDB) {
        this.URL = URL;
        this.modelDB = modelDB;
    }

    async connectDB(){
        try {
        let rta= await mongoose.connect(this.URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB connected"); 
        } catch (error) {
            console.error("Error ",error)
        }
    }

    async save(newProduct){
        console.log("ADD");
        try {
            let lastID;
            lastID=await this.getLastID();
            newProduct.id=lastID+1;
            await this.modelDB.create(newProduct);
            // const prodSaved=new this.modelDB(newProduct);
            // let response=await prodSaved.save();
            //console.log(response)
        } catch (error) {
            console.error("Error to create ",error)    
        }
    }

    async getLastID(){
        try {
            let totalProducts;
            totalProducts = await this.modelDB.count();
            console.log(totalProducts);
            return totalProducts;
        } catch (error) {
            console.log("Error ",error);
        }
    }

    async getAll(){
        try {
            console.log("READ ALL")
            const elementList = await this.modelDB.find({})
            console.log({ elementList })
            return elementList;
            
        } catch (error) {
            console.log("Error ",error)
        }
    }

    async update(productProperty,ID){
        console.log("UPDATE");
        let userUpdate = await this.modelDB.updateOne(
            {id: ID},
       {$set: productProperty}
       )
       console.log(userUpdate);

    }

    async delete(IdToDelete){
        console.log('DELETE');
        const response = await this.modelDB.deleteOne({id:IdToDelete});
        console.log({ response });
    }

}

export default ContenedorMongoDb;

/* --------------------------------------- */
/*                TEST CLASS               */
/* --------------------------------------- */

const miConexionMongo=new ContenedorMongoDb(config.UrlMongoDB,productModel)
const prod1={
        nombre: "Escuadra",
        descripcion: "Esc 45 grados",
        codigo: 123,
        fotoURL: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        precio: 123.45,
        stock: 20,
        id: 111,
        timeStamp:new Date().toLocaleString()
    };

await miConexionMongo.connectDB();
await miConexionMongo.addProduct(prod1);
// await miConexionMongo.getLastID();
// await miConexionMongo.update(6,{nombre: 'Sacapuntas'});
// await miConexionMongo.delete(1);
// await miConexionMongo.getAll();

