import { Router } from "express";
import { productosDao,carritosDao } from "../daos/index.js";
import ERRORS from "../utils/errors.js";


const routerCarts=Router()
const productsApi=productosDao
const cartsApi=carritosDao

// -------------Configuro las rutas para el carrito---------------

//Metodo POST
//Defino la ruta http://localhost:8080/api/carrito 
//para crear un carrito y devolver su id
routerCarts.post('/carrito',async (req, res)=> {
    try{
        //const carritoInicial=[]
        const carritoInicial = {
            productos: [],
        };
        //let carritoInicial=new Carrito()
        const newCartID=await cartsApi.save(carritoInicial)
        res.json({result:`Se creo exitosamente el carrito con id ${newCartID}`})
    } catch (error) {
        res.send(error)
    }
});

//Metodo DELETE
//Defino la ruta http://localhost:8080/api/carrito/:id 
//para eliminar un carrito por su id
routerCarts.delete('/carrito/:id',async (req, res)=> {
    try {
        let id = parseInt(req.params.id)
        const carritoID = await cartsApi.deleteById(id);
        if(carritoID){
            let contenido=await cartsApi.getAll()
            //vacio el archivo para borra los caracteres []
            //los cuales no permiten crear nuevo contenido
            //cuando se comienza desde cero
            if(contenido.length==0){                
                cartsApi.deleteAll()
            }
            res.json({result:`Se borro exitosamente el carrito con id ${id}`})
        }
        else{
            if(producto == null){
                res.json({error: 'Carrito no encontrado'})
            }
        }        
    } catch (error) {
        res.send(error)
    }
    
});

//Metodo GET
//Defino la ruta http://localhost:8080/api/carrito/:id/productos 
//para listar los productos de un carrito por su id
routerCarts.get('/carrito/:id/productos',async (req, res)=> {
    try{
        let id = parseInt(req.params.id)
        const listado=await cartsApi.getById(id);
        //res.send({result:'Este es el contenido del carrito con ID:',id,listado})        
        res.send({result:`Estos son los productos del carrito con ID:#${id} y productos:${listado}`})
    } catch (error) {
        res.send(error)
    }
});

//Metodo POST
//Defino la ruta http://localhost:8080/api/carrito/:id/productos 
//para agregar un productos por su id
routerCarts.post('/carrito/:id/productos',async (req, res)=> {
    try{
        const id = parseInt(req.params.id)
        const productoPOST = req.body;
        console.log("EL PARAMETRO ID DE CARRITO ES",id)
        console.log("EL PARAMETRO DE ID DEL PRODUCTO ES",productoPOST.id)
        const producto = await ContenedorProductos.getById(productoPOST.id);
        console.log("ESTE ES EL PRODUCTO A AGREGAR",producto[0])
        // let cart = await cartsApi.getById(id);
        // console.log("ESTO TIENE CART",cart[0].productos)
        const prodToAdd = await cartsApi.update(producto[0],id);
        res.send(prodToAdd)
    } catch (error) {
        res.send(error)
    }
});

//Metodo DELETE
//Defino la ruta http://localhost:8080/api/carrito/:id/productos/:id_prod 
//para eliminar un producto por su id y por su id de carrito
routerCarts.delete('/carrito/:id/productos/:id_prod',async (req, res)=> {
    try {
        const { id, id_prod } = req.params;
        console.log(id,id_prod)
        const carritoBuscado = await cartsApi.getById(id);
        console.log("EL CARRITO A PROCESAR ES ",carritoBuscado)
        const prodDelete=await cartsApi.deleteByIdProd(id,id_prod)
        if(prodDelete!=null){
            res.json({result:`Se borro exitosamente del carrito con ID:${id},el producto con id:${id_prod}`})     
        }else{
            res.json({result:`No se encontro el producto buscado con ese id: #${id_prod}`})
        }
    } catch (error) {
        res.send(error)
    }
    
});

export default routerCarts;