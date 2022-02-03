
// Obtenemos acceso al resumen, la tabla y la informacion del json
const summary = document.querySelector(".summary");
const table = document.querySelector(".information");
request = fetch("archivo.json");

const roles = ["Ejecutivo", "Encargado", "Gestor", "Operador"] // Array de roles

// Array donde se guardan los numeros del resumen, se inicializa con ceros
var summaryArray = [[], [], [], []];
for(let i=0; i<4;i++) { 
    for(let j=0; j<12; j++) summaryArray[i][j] = 0;
}

// Funcion que asigna un numero a cada rol
const numeroRol = (rol) => {
    return roles.indexOf(rol);
}

// Para formar las fechas como deseamos
const formatDate = (d) => {
    let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);

    return `${day} ${month}`;
};

/** Manejo del request */
request
    .then(res => res.json())
    .then(res => {

        // Ordenamos la informacion del json segun rol y fecha de creacion
        res.sort((a, b) => {
            if(a.rol == b.rol) {
                return new Date(a["fecha creacion"]) > new Date(b["fecha creacion"])? 1 : -1
            }
            return a.rol > b.rol? 1 : -1;
        })

        // Para cada elemento creamos su fila de la tabla
        res.forEach(info => {
            dateObject = new Date(info["fecha creacion"])

            let tr = document.createElement("tr");
            tr.innerHTML  += `
            <td>${info.rut}</td>
            <td>${info.nombre}</td>
            <td>${info.correo}</td>
            <td>${info.telefono}</td>
            <td>${info.rol}</td>
            <td>${info.empresa}</td>
            <td>${formatDate(dateObject)}</td>
            <td><i class="fas fa-trash"></i></td>`
            table.appendChild(tr);

            // Para cada elemento, agregamos su informacion al resumen
            summaryArray[numeroRol(info.rol)][dateObject.getMonth()] +=1;
        });

        // Para cada rol, creamos su fila en la tabla
        let counterRol = 0;
        summaryArray.forEach(rol => {
            let tr = document.createElement("tr");
            tr.innerHTML+=`<td>${roles[counterRol]}</td>`;
            counterRol++;
            for(let i=0; i<12; i++) tr.innerHTML += `<td>${rol[i]}</td>`;
            summary.appendChild(tr);
        });
    });
