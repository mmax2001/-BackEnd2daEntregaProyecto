import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
import * as fs from "fs/promises";

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('carritos');
    }

    async save(newObject){

        let time=new Date().toLocaleString()
        try {
            await this.leerArchivoAsync();
            let newID;
            let products=[];
            if (this.elementos.length == 0) {
                newID=1; //sin usar uuidV4
                const objToAdd = {...newObject,id:newID,timeStamp:time};  
                products.push(objToAdd);  
            } else {
                products=JSON.parse(this.elementos||'{}');
                console.log("Esto tiene el JSON", products)
                const productIndex = products.findIndex((product) => product.id == newObject.id);
                console.log("EL NRO ES",productIndex)
                if (productIndex === -1 || newObject.length==0) { 
                    newID=(products[products.length-1].id)+1;
                    const objToAdd = {...newObject,id:newID,timeStamp:time};  
                    products.push(objToAdd);                      
                }else{
                    products[productIndex] = {...products[productIndex],...newObject,timeStamp:time}; //copie el producto en esa posicion y le paso la nueva info
                }
            }                    
            await fs.writeFile(this.rutaArchivo, JSON.stringify(products,null,3)) //null para no reemplazar el contenido y 3 por el espacio entre lineas
            return newID;                
        }
        catch (error) {
            console.log(error)
            return error
        }       
    }
    
    async update(newProd,ID){
        try{
            await this.leerArchivoAsync();
            let contenidoDeCarritos=JSON.parse(this.elementos||'{}');
            //console.log("EL CONTENIDO DEL ARCHIVO DE CARRITOS ES",contenidoDeCarritos)
            const CarritoParaActualizar=contenidoDeCarritos.find(carrito=>carrito.id==ID)
            //console.log("ESTO TIENE EL CARRITO BUSCADO",CarritoParaActualizar);
            //console.log("EL ID DEL PRODUCTO A ACTUALIZAR ES",newProd.id)

            if (CarritoParaActualizar!=undefined){                
                newProd.timeStamp=new Date().toLocaleString();
                let prodToUpdateIndex=CarritoParaActualizar.productos.findIndex(carrito=>carrito.id==newProd.id)
                if (prodToUpdateIndex != -1){
                    CarritoParaActualizar.productos[prodToUpdateIndex]=newProd
                }else{
                    CarritoParaActualizar.productos.push(newProd);
                }                
                await fs.writeFile(this.rutaArchivo, JSON.stringify(contenidoDeCarritos,null,3)) //null para no reemplazar el contenido y 3 por el espacio entre lineas
                return newProd
            } 
            else{
                return null;
            }

        } catch (error) {
            console.log(error)    
        }
    }    

    async deleteByIdProd(IDcarrito,IDproducto){
        
        try{
            await this.leerArchivoAsync();
            let contenidoDeCarritos=JSON.parse(this.elementos||'{}');
            if(contenidoDeCarritos.length>0){                     
                const CarritoParaActualizar=contenidoDeCarritos.find(carrito=>carrito.id==IDcarrito);
                if(CarritoParaActualizar!=undefined){
                    let productosAdejar=CarritoParaActualizar.productos.filter(producto=>producto.id!=IDproducto);                                    
                    if(productosAdejar.length==CarritoParaActualizar.productos.length){
                        return null;
                    }else{
                        CarritoParaActualizar.productos=productosAdejar;
                        await fs.writeFile(this.rutaArchivo, JSON.stringify(contenidoDeCarritos,null,3)) //null para no reemplazar el contenido y 3 por el espacio entre lineas
                        return productosAdejar
                    }
                }else{
                    return null;
                }
            }
            return null  
        } 
        catch (error) {
            console.log(error)    
        }  

    }
}

export default CarritosDaoArchivo;