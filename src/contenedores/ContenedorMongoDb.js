import mongoose from "mongoose";
import productModel from "./Models/product.js";

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
            const response=await this.modelDB.create(newProduct);
            return response;
        } catch (error) {
            console.error("Error to create ",error)    
        }
    }

    async getById(id){
        console.log("GETBYID")
        try {
            const response=await this.modelDB.findById(id);
            console.log(response)
            return response;
        } catch (error) {
            return error;
        }
    }
    
    
    // async save(newProduct){
    //     console.log("ADD");
    //     try {
    //         let lastID;
    //         lastID=await this.getLastID();
    //         newProduct.id=lastID+1;
    //         await this.modelDB.create(newProduct);
    //         // const prodSaved=new this.modelDB(newProduct);
    //         // let response=await prodSaved.save();
    //         //console.log(response)
    //     } catch (error) {
    //         console.error("Error to create ",error)    
    //     }
    // }

    // async getLastID(){
    //     try {
    //         let totalProducts;
    //         totalProducts = await this.modelDB.count();
    //         console.log(totalProducts);
    //         return totalProducts;
    //     } catch (error) {
    //         console.log("Error ",error);
    //     }
    // }

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

    async update(newData,id){
        console.log("UPDATE")
        try {
            const response = await this.modelDB.findByIdAndUpdate(id, newData, {
            new: true,
            });
        return response;
        } catch (error) {
        return error;
        }
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

// // const miConexionMongo=new ContenedorMongoDb(config.UrlMongoDB,productModel)
// const miConexionMongo=new ContenedorMongoDb('mongodb://localhost:27017/ecommerce',productModel)
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
// await miConexionMongo.getById("62f13a5f5c9482e4ec1db344");
// await miConexionMongo.update(prod2,'62f140cbb99c70c09b396bdf');
//await miConexionMongo.delete('62f140cbb99c70c09b396bdf');

