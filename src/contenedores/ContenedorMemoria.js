
//Declaro la clase Contenedor con los metodos requeridos

class ContenedorMemoria{
constructor(){
        this.elementList=[];
    }

    getAll(){
        return this.elementList;
    }

    getByID(ID){
        if(this.elementList.length>0){             
                const elementToFind=this.elementList.filter(element=>element.id===ID);             
                if(elementToFind){
                    return elementToFind;
                }
                else{
                    return null;
                }
            }
        return null 
    }

    deleteByID(ID){
        const indexOfID=this.elementList.findIndex(element=>{return element.id==ID});
            console.log(indexOfID);
            if(indexOfID!=-1) {
                const prodNonDelete=this.elementList.filter(element=>element.id!=ID);
                //console.log(`Se borro exitosamente el elemento con id : ${ID}`);
                this.elementList=prodNonDelete
                return this.elementList;
            }
            else{
                return null
            }
    }

    save(newElement){
        let newID;
        let time=new Date().toLocaleString()
        if (this.elementList.length === 0) {
            newID=1;
        } 
        else{
            newID=(this.elementList[this.elementList.length-1].id)+1; 
        }
        const prodToAdd = {...newElement,id:newID,timeStamp:time}; 
        this.elementList.push(prodToAdd);
        return newID;
    }

    update(newElement,ID){
        // if(this.elementList.length>0){
        //     const elementIndex = this.elementList.findIndex((product) => product.id == ID);
        //     if (elementIndex === -1) return { error: true };
        //     this.elementList[elementIndex] = {...this.elementList[elementIndex],...newElement,}; //copie el elemento en esa posicion y le paso la nueva info
        //     //Sino actualizar asi :
        //     // const prodToUpdate=this.elementList.find(product=>product.id===ID)
        //     // console.log("ESTO DEVUELVE METODO UPDATE",prodToUpdate);
        //     // if (prodToUpdate!=undefined){
        //     //     prodToUpdate.title=newElement.title
        //     //     prodToUpdate.price=newElement.price
        //     //     prodToUpdate.thumbnail=newElement.thumbnail;
        //     // } 
        //     // else{
        //     //     return null;
        //     // }
        // }
        // else{
        //     return null;
        // }
    }

}
export default ContenedorMemoria;
//module.exports = ContenedorMemoria

//TEST DE METODOS DE LA CLASE
// const prodTest=new ContenedorMemoria;
// let prod=[
//     {
//       title: "Calculadora",
//       price: 234.56,
//       thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//       id: 2
//     },
//     {
//       title: "Globo Terráqueo",
//       price: 345.67,
//       thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//       id: 3
//     }
// ]

// prodTest.elementList=prod;
// console.log(prodTest.getAll())
// console.log(prodTest.getByID(2))
// let testObject2={
//     title:"Pincel",
//     price:123.45,
//     thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",            
// };
// prodTest.save(testObject2)
// console.log(prodTest.getAll());
// prodTest.update(testObject2,2)
// console.log(prodTest.getAll())
// prodTest.deleteByID(2)
// console.log(prodTest.getAll())    


