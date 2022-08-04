import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class CarritosDaoMemoria extends ContenedorMemoria{
    constructor(){
        super();
    }

    update(newProd,ID){
                
        let contenidoDeCarritos=this.elementList;
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
                return this.elementList
            } 
            else{
                return null;
            }
        
    } 
    

}

export default CarritosDaoMemoria;