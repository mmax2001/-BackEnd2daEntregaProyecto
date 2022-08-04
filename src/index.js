import express from 'express';
import { config } from './config/config.js';
import { productsRouter,cartsRouter } from './routers/indexRouters.js';

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.server.routes.products, productsRouter);
app.use(config.server.routes.carts, cartsRouter);

//const PORT=process.env.PORT||8080
const server = app.listen(config.server.PORT,()=>console.log(`Servidor http escuchando en la direccion y puerto http://localhost:${server.adress().PORT}`))
server.on("error",error=>console.log(`Error en el servidor ${error}`))
