
const fs = require('fs')

let listadoPorHacer = [];

const guardarDB = () =>{
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) =>{
        if(err) throw new Error('No se pudo grabar', err);
    })
}


const cargarDB = () =>{

    try {
        listadoPorHacer = require('../db/data.json'); // En caso de que el documento este 'vacio' o genere algun problema...
        
    } catch (error) {
        listadoPorHacer = []; // Para que si se produce un error arriba, entonces dejara de ejecutar eso y trabajaremos con un "array" vacio
        // console.log('No se puede leer', error);
    }
}


const crear = (descripcion) =>{
    cargarDB() // Metemos la info en el array que viene del "data.json"

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer)
    guardarDB();

    return porHacer;
}


const getListado = () =>{
    // let datos;
    // try {
    //     datos = require('../db/data.json')
    // } catch (error) {
    //     datos = {
    //         error: true
    //     }
    // }

    cargarDB(); // Cargamos los datos en el "array" primeramente, y ya por ultimo lo retornamos con los datos cargados

    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) =>{
    cargarDB();

    let  res = listadoPorHacer.findIndex(element => element.descripcion === descripcion)
    // console.log(res);

    if(res !== -1) {
        listadoPorHacer[res].completado = completado; 
        guardarDB();
        return true;
    }else{
        return false;
    }

}


const borrar = (descripcion) =>{
    cargarDB();

    let newArr = listadoPorHacer.filter(element => element.descripcion !== descripcion)
    // console.log(newArr);

    if(listadoPorHacer.length === newArr.length){ // En caso de que no haya encontrado el dato (Osea que si tienen el mismo tamano es porque NO encontro los datos)
        return false;
    }else{
        listadoPorHacer = newArr;
        guardarDB();
        return true;
    }

    // console.log('Por', listadoPorHacer);
    // guardarDB();
    

   
}




module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}








// qwe