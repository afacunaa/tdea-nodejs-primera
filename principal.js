const fs = require('fs');

const opciones = {
	id: {
		alias: 'i',
		demand: true
	},
	nombre: {
		alias: 'n',
		demand: true
	},
	cedula: {
		alias: 'c',
		demand: true
	}
}

const argv = require('yargs').command('inscribir', 'Inscribir alguna asignatura', opciones).argv;

let cursos = [
	{
		id: 1,
		nombre: 'Historia',
		duracion: 60,
		valor: 50000
	},
	{
		id: 2,
		nombre: 'Geografía',
		duracion: 30,
		valor: 25000
	},
	{
		id: 3,
		nombre: 'Programación',
		duracion: 120,
		valor: 100000
	},
	{
		id: 4,
		nombre: 'Primeros auxilios',
		duracion: 30,
		valor: 37000
	},
];

let mostrarCurso = (curso, callback) => {
	let texto = 'Nombre del curso: ' + curso.nombre + '\nIdentificador: ' + curso.id + '\n' +
			'Duración: ' + curso.nombre + ' horas\nValor: $' + curso.valor + '\n';
	console.log(texto);
}

let encontrarCurso = (cursos, id, callback) => {
	let indice = -1;
	for (let i=0; i<cursos.length; i++) {
		if (cursos[i].id == id) 
			indice = i;
	}
	callback(cursos[indice]);
}

let crearArchivo = (curso, argv) => {
	let texto = 'El estudiante ' + argv.nombre + ' con cedula ' + argv.cedula + ' fue matriculado exitosamente en el curso ' + 
			curso.nombre + ' con una duración de ' + curso.duracion + ' horas, con un valor de $' + curso.valor + '\n';
	fs.writeFile('matriculas.txt', texto, (err) => {
		if (err) throw (err);
		console.log('Archivo creado correctamente');
	});
}

if (argv.id) {
	let cursoDeseado = encontrarCurso(cursos, argv.i, function(cursoDeseado){
		if (cursoDeseado) {
			//console.log(cursoDeseado);
			crearArchivo(cursoDeseado, argv);
		} else {
			console.log('ERROR: El curso ' + argv.id + ' no fue encontrado');
		}
	})
} else {
	for (var i=0; i<cursos.length; i++){
		(function(i) {
			setTimeout(function() {
				mostrarCurso(cursos[i]);
			}, 2000*i);
		})(i)
	}
}