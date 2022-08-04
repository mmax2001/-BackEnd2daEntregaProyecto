import mongoose from "mongoose";

const {Schema,model}=mongoose;

const storeCollection='products';

const productSchema = new Schema({
    nombre: {type:String,require:true,max:100},
    descripcion: {type:String,require:true},
    codigo: {type:Number,require:true},
    fotoURL: {type:String,require:true},
    precio: {type:Number,require:true},
    stock: {type:String,require:true},
    id: {type:Number,require:true},
    timeStamp: {type:Date,require:true},
});

const productModel=model(storeCollection,productSchema)

export default productModel;