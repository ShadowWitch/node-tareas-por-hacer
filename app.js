
// requires
const {argv} = require('./config/yargs');
const {crear, getListado, actualizar, borrar} = require('./por-hacer/por-hacer')
const colors = require('colors')

let comando = argv._[0];
// console.log(argv);

switch(comando){
    case 'crear':
        let tarea = crear(argv.descripcion)
        console.log(tarea);
        break;
    case 'listar':
        let listado = getListado();

        if(listado.length === 0) {
            console.log('>>> ', 'ERROR'.bgRed, 'Se produjo un error en la Base de Datos');
            return;
        };

        listado.forEach(tarea => {
            const {descripcion, completado} = tarea;
            console.log('============Por Hacer============='.green);
            console.log(descripcion);
            console.log(completado);
            console.log('=================================='.green);
        })
        // console.log(listado);

        break;
    case 'actualizar':

        if(argv.completado !== 'true' && argv.completado != 'false' && argv.completado != true && argv.completado != false){
            return console.log("El completado solo puede ser true o false"); // Dejara de seguir ejecutando el programa, ya que al NO estar en una funcion entonces se deja de ejecutar todo
        }

        let actualizado = actualizar(argv.descripcion, JSON.parse(argv.completado)); // Lo del "JSON.parse()" se lo agregue yo, ya que me lo pasaba como string el dato
        if(actualizado){    
            console.log('Dato actualizado correctamente.');
        }else{
            console.log('ERROR'.bgRed, 'No se encontro el registro.');
        }
        break;
    
    case 'borrar':

        let borrado = borrar(argv.descripcion);
        if(borrado){
            console.log('Dato borrado con exito.');
        }else{
            console.log('ERROR'.bgRed, 'No se encontro el dato a eliminar.');
        }

        break;

    default:
        console.log('ERROR'.bgRed, 'Comando desconocido');
        break;
    }





// qwe