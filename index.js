const {cursos} = require ('./datos');
const fs = require('fs');

const opciones = {
    id:{
        demand: true,
        alias: 'i'
    },
    nombre:{
        demand: true,
        alias: 'n'
    },
    cedula:{
        demand: true,
        alias: 'c'
    }
}

const argv = require('yargs').command('Inscribir', 'Inscribir un curso', opciones).argv;

//listar cursos:
function mostrarCursos(){
    for (let i = 0; i < cursos.length; i++) {
        const curso = cursos[i];
        console.log('El curso '+curso.nombre+' identificado con el id '+curso.id+
                    ' tiene una duración de '+curso.duracion+' y un costo de '+curso.valor);        
    }
}

function hacerInscripcion(id, nombre, cedula){
    let curso = cursos.find(function (curso) {
        return curso.id == id
      })
      if (curso == undefined) {
        console.log("Ingrese id del curso correspondiente");
      } else {
        crearArchivo(cedula, nombre, curso);
    }
}

//creación de archivo luego de inscripcion:
function crearArchivo(cedula, nombre, curso){
    texto = 'El estudiante: ' + nombre + '\n' +
             'identificado con documento ' + cedula + '\n' +
             'se ha inscrito al curso ' + curso.nombre;
    fs.writeFile('archivoInscripcion.txt', texto, (err) => {
        if (err){
            console.log('No se ha creado el archivo');
        }else{
        console.log('Se ha creado el archivo');
        }
    });
}

//Inicio del proceso de inscripcion o mostrar cursos:
if (argv._[0] == "Inscribir") {
    var { i, n, c } = argv;
    hacerInscripcion(i, n, c);
}else{
    mostrarCursos();
}