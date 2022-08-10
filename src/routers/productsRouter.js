import { productosDao} from "../daos/index.js";
import { Router } from "express";
import adminControl from "../middlewares/adminControl.js";
import ERRORS from "../utils/errors.js";

const routerProducts=Router()
const productsApi=productosDao

//Metodo GET total
// Defino la ruta http://localhost:8080/api/productos
// para obtener la lista completa de los productos usando la clase
// ContenedorAPI
routerProducts.get('/productos', async (req, res) => {
    try {
        const resultado = await productsApi.getAll()
        if(resultado.length>=1){            
            //res.render('main',{resultado,title:'Listado de Productos'})
            res.send(resultado)
        } else {            
            //res.render('main',{alertMessage: titleErrors.ERRORS.messages.errorProducts})
            res.send({alertMessage: ERRORS.messages.errorProducts})

        }
        //res.render('layout');

    } catch (error) {
        res.send(error)
    }
})

//Metodo GET parcial
// Defino la ruta http://localhost:8080/api/productos/:id
// para obtener el producto con ese id
routerProducts.get('/productos/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const resultado = await productsApi.getById(id);
        if(resultado.length==1){            
            //res.render('main',{resultado,title:'Producto Buscado'})
            res.send(resultado)
        }
        else{
            res.json({error: 'producto no encontrado'});
            //res.render('main',{alertMessage:titleErrors.ERRORS.messages.errorProduct})
        }
    } catch (error) {
        res.send(error)
    }
})

//Metodo POST
//Defino la ruta http://localhost:8080/api/productos 
//para agregar un producto
routerProducts.post('/productos',adminControl,async (req, res)=> {
    try{
        let producto = req.body;
        console.log(producto)        
        if(!producto.nombre==producto.codigo==''){
            console.log("ENTRO")
            newID=await productsApi.save(producto);
            res.json({ result: 'Se guardo el producto con el siguiente ID', producto,ID:newID})
        }
        res.send(newID)
        res.redirect('/');
        
    } catch (error) {
        res.send(error)
    }
});

//Metodo PUT
//Defino la ruta http://localhost:8080/api/productos/:id 
//para actualizar un producto
routerProducts.put('/productos/:id',adminControl,async (req, res)=> {
    try {
        let id = parseInt(req.params.id)
        let producto = req.body;
        const productToFind=await productsApi.getById(id)
        console.log("SE Actualizar con estos datos",producto)
        console.log("EL PRODUCTO A ACTUALIZAR ES",productToFind)
        console.log("ID de producto a actualizar",productToFind[0].id)
        if(productToFind.length==1){
            //await productsApi.update(producto[0],productToFind[0].id)
            await productsApi.save(producto);
            res.json({ result: 'se actualizo correctamente',producto: await productsApi.getById(id) })        
        }else{
            res.json({error: 'producto no encontrado'}); 
        }
    } catch (error) {
        res.send(error)
    }

});

//Metodo DELETE
//Defino la ruta http://localhost:8080/api/productos/:id 
//para eliminar un producto
routerProducts.delete('/productos/:id',adminControl,async (req, res)=> {
    try {
        let id = parseInt(req.params.id)
        const producto = await productsApi.getById(id);
        if(producto){
            await productsApi.deleteById(id);
            res.json({result:'Se borro exitosamente'})
        }
        else{
            if(producto == null){
                res.json({error: 'producto no encontrado'})
            }
        }        
    } catch (error) {
        res.send(error)
    }
    
});

export default routerProducts;
