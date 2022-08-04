import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class ProductosDaoMemoria extends ContenedorMemoria{
    constructor(){
        super();
    }

    update(newProd,ID){
        if(this.elementList.length>0){
            const elementIndex = this.elementList.findIndex((product) => product.id == ID);
            if (elementIndex === -1) return { error: true };
            this.elementList[elementIndex] = {...this.elementList[elementIndex],...newProd,}; //copie el elemento en esa posicion y le paso la nueva info
            //Sino actualizar asi :
            // const prodToUpdate=this.elementList.find(product=>product.id===ID)
            // console.log("ESTO DEVUELVE METODO UPDATE",prodToUpdate);
            // if (prodToUpdate!=undefined){
            //     prodToUpdate.title=newProd.title
            //     prodToUpdate.price=newProd.price
            //     prodToUpdate.thumbnail=newProd.thumbnail;
            // } 
            // else{
            //     return null;
            // }
        }
        else{
            return null;
        }
    }
}

export default ProductosDaoMemoria;