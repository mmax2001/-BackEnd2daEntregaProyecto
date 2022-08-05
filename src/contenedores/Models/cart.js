import mongoose from "mongoose";
import productModel from "./product.js";

const {Schema,model}=mongoose;

const storeCollection='carts';

const carritoSchema = new Schema({
  timestamp: { type: Date, required: true },
  productos: { type: [productModel.productSchema], required: true },
});

const carritoModel=model(storeCollection,carritoSchema)

export default carritoModel;