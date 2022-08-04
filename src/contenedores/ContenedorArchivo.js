//const { timeStamp } = require('console');
//const fs = require('fs');
import * as fs from 'fs/promises';
//Declaro la clase Contenedor con los metodos requeridos


class ContenedorArchivo{
    constructor(fileName){
        this.rutaArchivo=`./data/${fileName}.json`;
        this.elementos=[];
    }

    async leerArchivoAsync() {
        //const fs = require('fs');
        try {
            let contenido = await fs.readFile(this.rutaArchivo,'utf-8');
            this.elementos=contenido;
            return this.elementos;
        }
        catch(err){
           const arrayDeContenido = []
           await fs.writeFile(this.rutaArchivo, JSON.stringify(arrayDeContenido))
           return arrayDeContenido           
        }
    }

    async save(newObject){

        let time=new Date().toLocaleString()
        try {
            await this.leerArchivoAsync();
            console.log(this.rutaArchivo)
            let newID;
            let arrayDeContenido=[];
            if (this.elementos == '[]') {
                newID=1; //sin usar uuidV4
                const objToAdd = {...newObject,id:newID,timeStamp:time};  
                arrayDeContenido.push(objToAdd);  
            } else {
                arrayDeContenido=JSON.parse(this.elementos||'{}');
                console.log("Esto tiene el JSON", arrayDeContenido)
                const elementoIndex = arrayDeContenido.findIndex((elemento) => elemento.codigo == newObject.codigo);
                console.log("EL NRO ES",elementoIndex)
                if (elementoIndex === -1 || newObject.length==0) { 
                    newID=(arrayDeContenido[arrayDeContenido.length-1].id)+1;
                    const objToAdd = {...newObject,id:newID,timeStamp:time};  
                    arrayDeContenido.push(objToAdd);                      
                }else{
                    arrayDeContenido[elementoIndex] = {...arrayDeContenido[elementoIndex],...newObject,timeStamp:time}; //copie el elemento en esa posicion y le paso la nueva info
                }
            }                    
            await fs.writeFile(this.rutaArchivo, JSON.stringify(arrayDeContenido,null,3)) //null para no reemplazar el contenido y 3 por el espacio entre lineas
            return newID;                
        }
        catch (error) {
            console.log(error)
            return error
        }       
    }

    async update(newProd,ID){
        //Se define en las clases derivadas ProductosDaoArchivo
        //y CarritosDaoArchivo
        // try{
        //     await this.leerArchivoAsync();
        //     if(this.elementos.length>0){
        //         const elementoIndex = this.elementos.findIndex((elemento) => elemento.id == ID);
        //         if (elementoIndex === -1) return { error: true };
        //         this.elementos[elementoIndex] = {...this.elementos[elementoIndex],...newProd,}; //copie el elemento en esa posicion y le paso la nueva info
        //         return this.elementos[elementoIndex]
        //     }
        //     else{
        //         return null;
        //     }
        // } catch (error) {
        //     console.log(error)    
        // }
    }

    async getById(ID){

        try{
            await this.leerArchivoAsync();
            let contenidoArray=JSON.parse(this.elementos||'{}');
            if(contenidoArray.length>0){                     
                const elementoBuscado=contenidoArray.filter(elemento=>elemento.id==ID);                
                if(elementoBuscado.length){
                    //console.log("EL CONTENIDO ES ",elementoBuscado);
                    return elementoBuscado;
                }
                else{
                    return null;
                }
            }
            return null  
        } 
        catch (error) {
            console.log(error)    
        }
    }

    async getAll(){

        try {
            await this.leerArchivoAsync();
            return JSON.parse(this.elementos||'{}');    
        } 
        catch (error) {
           console.log(error)  
        }
        
    }

    async deleteById(ID){
        
        try{
            await this.leerArchivoAsync();
            let arrayDeContenido=JSON.parse(this.elementos||'{}');     
            const indexOfID=arrayDeContenido.findIndex(elemento=>{return elemento.id==ID});
            console.log(indexOfID);
            if(indexOfID!=-1) {
                const elementoBuscado=arrayDeContenido.filter(elemento=>elemento.id!=ID);
                await fs.writeFile(this.rutaArchivo, JSON.stringify(elementoBuscado))
                console.log(`Se borro exitosamente el elemento con id : ${ID}`)
                return ID;
            }
            else{
                 console.log("No se encuentra el ID");
                 return null;
            }
        }
        catch (error){
            console.log(error)
        }    

    }

    async deleteAll(){
        
        try {
            const vaciarArchivo = JSON.stringify([]);
            await fs.writeFile(this.rutaArchivo,vaciarArchivo);
            console.log("Contenido borrado correctamente");
        } catch (error) {
            console.log(error)
        }
    }

}

//module.exports = ContenedorArchivo
export default ContenedorArchivo;

//Defino objetos y pruebas para testear los metodos del objeto Contenedor

// let testObject1={                                                                                                                                                    
//       title: 'Globo Terráqueo',                                                                                                                          
//       price: 345.67,
//       codigo:110,                                                                                                                                     
//       thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                                                                                                                 
//       timeStamp:''
//     };                                                                                                                                                    

// let testObject2={
//         title:"Pincel",
//         price:123.45,
//         codigo:115,
//         thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",            
//         timeStamp:''
//     };

// let testObject3={
//         title: "Calculadora",
//         price: 234.56,
//         codigo:120,
//         thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//         timeStamp:''
//     };

// const prueba = async () => {

//     const testContenedor = new ContenedorArchivo("productos");

//     //Pruebo la lectura del archivo
//     await testContenedor.leerArchivoAsync();
//     console.log("El contenido del archivo es : ", testContenedor.elementos);

//     //Pruebo guardar en el archivo el objeto tesObject1
//     let prodSave1 = await testContenedor.save(testObject1);
//     console.log(prodSave1)

//     //Pruebo guardar en el archivo el objeto tesObject3
//     let prodSave3 = await testContenedor.save(testObject3);
//     console.log(prodSave3)

//     //Pruebo obtener todos los productos
//     let contentFile = await testContenedor.getAll();
//     console.log("Los elementos del archivo son : ",contentFile);

//     //Pruebo obtener el id del producto #2
//     let prodByID = await testContenedor.getById(2);
//     console.log("El elemento con el ID buscado es : ",prodByID);

//     //Pruebo guardar en el archivo el objeto tesObject2
//     let prodSave2 = await testContenedor.save(testObject2);
//     console.log(prodSave2)

//     //Pruebo borrar el objeto con ID 3
//     // let deleteProdByID=await testContenedor.deleteById(3);
//     // console.log(deleteProdByID);

//     //Pruebo borrar todos los productos del archivo
//     // let resultDelete= await testContenedor.deleteAll();
//     // console.log(resultDelete);

// };

// prueba();