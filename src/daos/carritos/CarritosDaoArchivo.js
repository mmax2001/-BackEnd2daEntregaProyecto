import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
import * as fs from "fs/promises";

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('carritos');
    }

    async update(newProd,ID){
        try{
            await this.leerArchivoAsync();
            let contenidoDeCarritos=JSON.parse(this.carritos||'{}');
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
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(contenidoDeCarritos,null,3)) //null para no reemplazar el contenido y 3 por el espacio entre lineas
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
            let contenidoDeCarritos=JSON.parse(this.carritos||'{}');
            if(contenidoDeCarritos.length>0){                     
                const CarritoParaActualizar=contenidoDeCarritos.find(carrito=>carrito.id==IDcarrito);
                if(CarritoParaActualizar!=undefined){
                    let productosAdejar=CarritoParaActualizar.productos.filter(producto=>producto.id!=IDproducto);                                    
                    if(productosAdejar.length==CarritoParaActualizar.productos.length){
                        return null;
                    }else{
                        CarritoParaActualizar.productos=productosAdejar;
                        await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(contenidoDeCarritos,null,3)) //null para no reemplazar el contenido y 3 por el espacio entre lineas
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