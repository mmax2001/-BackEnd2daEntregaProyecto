import express from 'express';
import config from './config/config.js';
import { routerProducts,routerCarts } from './routers/indexRouters.js';
import { ExpressHandlebars } from 'express-handlebars';


const app = express();

//app.use(express.static(__dirname + '/public'))
app.use(express.static('/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.server.routes.products, routerProducts);
app.use(config.server.routes.carts, routerCarts);

//Lineas para Handlebars
// app.engine('hbs', ExpressHandlebars.engine({
//     extname:'.hbs',
//     defaultLayout:'index.hbs',
//     layoutsDir:'/views/layouts',
//     partialsDir:'/views/partials' //ruta a los parciales
// }));
// app.set('view engine', 'hbs');
// app.set('views', './views');

// let hbsHelper = handlebars.create({});

// hbsHelper.handlebars.registerHelper('discountIVA', function (price) {
//     return price+price*0.21
// })

//const PORT=process.env.PORT||8080
const server = app.listen(config.server.PORT,()=>console.log(`Servidor http escuchando en la direccion y puerto http://localhost:${config.server.PORT}`))
server.on("error",error=>console.log(`Error en el servidor ${error}`))
