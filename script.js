// Arreglo de posibles líneas de código
const lineasCodigo = [
    'a = 1 + 2;',
    'console.log("1 + 2");',
    'b = 3 + 4;',
    'console.log("3 + 4");',
    'c = 5 + 6;',
    'console.log("5 + 6");',
    'd = a + b;',
    'console.log("Resultado:", d);'
];

// Función para obtener una línea de código aleatoria
function obtenerLineaAleatoria() {
    const indice = Math.floor(Math.random() * lineasCodigo.length);
    return lineasCodigo[indice];
}

// Función para inicializar los procesos
function inicializarProcesos(numProcesos) {
    const procesos = [];
    for (let i = 1; i <= numProcesos; i++) {
        // Crear un proceso con líneas de código aleatorias
        const proceso = {
            id: i,
            lineas: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, obtenerLineaAleatoria),
            indexLinea: 0 // Para llevar el control de la línea en ejecución
        };
        procesos.push(proceso);
    }
    return procesos;
}

// Función para iniciar la simulación
function iniciarSimulacion() {
    const numProcesos = parseInt(document.getElementById("numProcesos").value, 10) || 3;
    const procesos = inicializarProcesos(numProcesos);
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ''; // Limpiar resultados previos

    let procesosTerminados = 0;

    // Función que simula la ejecución de una línea por proceso en cada "ciclo"
    function ejecutarCiclo() {
        // Para cada proceso, ejecutamos una línea de código si aún tiene líneas restantes
        procesos.forEach(proceso => {
            if (proceso.indexLinea < proceso.lineas.length) {
                // Crear y mostrar una card con el estado del proceso actual
                const card = document.createElement("div");
                card.className = "card mb-2";
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">Proceso ${proceso.id}</h5>
                        <p class="card-text">Línea de código: ${proceso.lineas[proceso.indexLinea]}</p>
                    </div>
                `;
                resultadosDiv.appendChild(card);
                proceso.indexLinea++;
            } else if (proceso.indexLinea === proceso.lineas.length) {
                // Indicar que el proceso ha terminado
                const card = document.createElement("div");
                card.className = "card mb-2";
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">Proceso ${proceso.id}</h5>
                        <p class="card-text">Terminado</p>
                    </div>
                `;
                resultadosDiv.appendChild(card);
                proceso.indexLinea++; // Incrementar para no volver a marcarlo como terminado
                procesosTerminados++;
            }
        });

        // Continuar el ciclo si hay procesos pendientes
        if (procesosTerminados < procesos.length) {
            setTimeout(ejecutarCiclo, 1000); // Ejecutar el siguiente ciclo después de 1 segundo
        }
    }

    // Iniciar la primera ejecución de ciclos
    ejecutarCiclo();
}
