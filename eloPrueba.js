const main = document.querySelector("main");
const elosActuales = document.querySelectorAll(".selectEloActual");
const elosDeseados = document.querySelectorAll(".selectEloDesejado");
const imagenesActuales = document.querySelectorAll(".imgEloAct img");
const imagenesDeseadas = document.querySelectorAll(".imgEloDes img");
const divisionesActuales = document.querySelectorAll(".selectDivActual");
const divisionesDeseadas = document.querySelectorAll(".selectDivDesejado");

const selectFila = document.querySelector(".selectFila");
const imagenFila = document.querySelector(".imgFila img");

const expElos = document.querySelector(".expElos");
const continuarCompra = document.querySelector(".continuarCompra");
const icon = document.querySelector('.continuarCompra i'); // Get the icon element

const extra = document.querySelector(".extra");

const price = document.querySelector(".preçoMayus");

const champsCheckbox = document.getElementById("champs");
const horariosCheckbox = document.getElementById("horarios");
const streamCheckbox = document.getElementById("stream");
const entregaCheckbox = document.getElementById("entrega");
const compra = document.querySelector(".compra");




const imagenesPorFila = {
        SoloDuo: "img/emotes/1.png",
        flex: "img/emotes/2.png"
};

const elos = {
        10: "challenger",
        9: "grandmaster",
        8: "master",
        7: "diamond",
        6: "emerald",
        5: "platinum",
        4: "gold",
        3: "silver",
        2: "bronze",
        1: "iron"
};

const eloData = {
        "iron": {
                value: 1,
                pricePerDivision: 7.10,
                divisionCount: 4 //Preço total 28,4
        },
        "bronze": {
                value: 2,
                pricePerDivision: 8.20,
                divisionCount: 4 //Preço total 32,8
        },
        "silver": {
                value: 3,
                pricePerDivision: 12.10,
                divisionCount: 4 //Preço total 48,4
        },
        "gold": {
                value: 4,
                pricePerDivision: 14.50,
                divisionCount: 4 //Preço total 58
        },
        "platinum": {
                value: 5,
                pricePerDivision: 21.40,
                divisionCount: 4 //Preço total 85,6
        },
        "emerald": {
                value: 6,
                pricePerDivision: 43.60,
                divisionCount: 4 //Preço total 174,4
        },
        "diamond": {
                value: 7,
                pricePerDivision: 62,
                divisionCount: 4 //Preço total 248
        },
        "master": {
                value: 8,
                pricePerDivision: 495,
                divisionCount: 1
        },
        "grandmaster": {
                value: 9,
                pricePerDivision: 930,
                divisionCount: 1
        },
        "challenger": {
                value: 10
        }
};

// Apply percentage increases based on selected checkboxes
const checkboxIncreases = {
        champs: 0.1, // +10% for "Escolha seus Campeões"
        horarios: 0.05, // +5% for "Defina os Horários"
        stream: 0.3, // +30% for "Stream Privada"
        entrega: 0.4, // +40% for "Redução de prazo de entrega"
};

const imagenesPorElo = {
        iron: "img/elos/hierro.png", 
        bronze: "img/elos/bronce.png",
        silver: "img/elos/plata.png",
        gold: "img/elos/oro.png",
        platinum: "img/elos/platino.png",
        emerald: "img/elos/esmeralda.png",
        diamond: "img/elos/diamante.png",
        master: "img/elos/master.png",
        grandmaster: "img/elos/grandmaster.png",
        challenger: "img/elos/challenger.png"
};

selectFila.addEventListener("change", updateImagenFila);

updateImagenFila();
updateDivisiones("iron", divisionesActuales[0]);
updateImagen("iron", imagenesActuales[0]);

updateDivisiones("iron", divisionesDeseadas[0]);
updateImagen("iron", imagenesDeseadas[0]);

elosActuales.forEach(selectElo => {
        selectElo.addEventListener("change", () => {
                const elo = selectElo.value;
                updateDivisiones(elo, divisionesActuales[selectElo.dataset.index]);
                updateImagen(elo, imagenesActuales[selectElo.dataset.index]);
        });
});

elosDeseados.forEach(selectElo => {
        selectElo.addEventListener("change", () => {
                const elo = selectElo.value;
                updateDivisiones(elo, divisionesDeseadas[selectElo.dataset.index]);
                updateImagen(elo, imagenesDeseadas[selectElo.dataset.index]);
        });
});

elosActuales.forEach((selectElo, index) => selectElo.dataset.index = index);
elosDeseados.forEach((selectElo, index) => selectElo.dataset.index = index);
      

elosActuales.forEach(selectElo => {
        selectElo.addEventListener("change", updateExpElos);
});

elosDeseados.forEach(selectElo => {
        selectElo.addEventListener("change", updateExpElos);
});

divisionesActuales.forEach(selectDivision => {
        selectDivision.addEventListener("change", updateExpElos);
});

divisionesDeseadas.forEach(selectDivision => {
        selectDivision.addEventListener("change", updateExpElos);
});


champsCheckbox.addEventListener('change', updateTotalCostCheckbox);
// Add event listener for horariosCheckbox
horariosCheckbox.addEventListener('change', updateTotalCostCheckbox);
// Add event listener for streamCheckbox
streamCheckbox.addEventListener('change', updateTotalCostCheckbox);
// Add event listener for entregaCheckbox
entregaCheckbox.addEventListener('change', updateTotalCostCheckbox);
updateExpElos();

let visible = false;

continuarCompra.addEventListener("click", function(){
        visible = !visible;
        if (visible) {
                icon.style.transform = 'rotate(90deg)'; // Rotate 90 degrees
        } else {
                icon.style.transform = 'rotate(0deg)'; // Reset to 0 degrees
        }
        extra.style.display = visible ? "flex" : "none";
        // extra.style.scale = visible ? "1" : "0";
        // extra.style.height = visible ? "50vh" : "0";
        main.style.height = visible ? "auto" : "100vh";

});

function updateExpElos() {
        let eloActual = elosActuales[0].value;
        let divisionActual = divisionesActuales[0].value;
        let eloDeseado = elosDeseados[0].value;
        let divisionDeseada = divisionesDeseadas[0].value;

        let esEloValido= true;

        if(eloData[eloDeseado].value < eloData[eloActual].value){
                esEloValido = false;
        } else if (eloData[eloDeseado].value === eloData[eloActual].value) {
                if (divisionDeseada >= divisionActual) {
                        esEloValido = false;
                }
        }

        let textoExpElos = "";
        let totalCost = 0;

        if (esEloValido) {
                if (eloActual) {
                        textoExpElos += '<span class="negrita">' + `${getNombreElo(eloActual,mostrarDivision(divisionActual))}` + '</span>' ;
                }
        
                if (eloDeseado) {
                        textoExpElos += ' para o <span class="negrita">' + `${getNombreElo(eloDeseado,mostrarDivision(divisionDeseada))}` + '</span>';
                }
                totalCost = calculateTotalCost(eloActual, eloDeseado, divisionActual, divisionDeseada);
                price.textContent = totalCost.toFixed(2);
                updateTotalCostCheckbox();
        }else{
                textoExpElos = "O elo desejado deve ser maior que o atual. Revise as opções selecionadas.";
                price.innerHTML = " ";
                updateTotalCostCheckbox();
        }
        expElos.innerHTML = textoExpElos;
}
      
function getNombreElo(elo, divisionActual) {
        switch (elo) {
                case "challenger":
                case "grandmaster":
                case "master":
                        return elo;
                default:
                        return elo + " " + divisionActual;
        }
}
      
function mostrarDivision(division) {
        if (division === "") {
                return "";
        } else {
                return " " + division;
        }
}

function calculateTotalCost(currentElo, desiredElo, currentDivision, desiredDivision) {
        let totalCost = 0;
      
        if (eloData[currentElo].value < eloData[desiredElo].value) {

                //calculate cost from the initial elo's divisions
                const divisionsToBoost1 = currentDivision;
                totalCost += divisionsToBoost1 * eloData[currentElo].pricePerDivision;
                // Iterate through intermediate elos
                for (let elo = eloData[currentElo].value+1; elo < eloData[desiredElo].value; elo++) {
                        // Calculate cost for divisions to reach next elo
                        const divisionsToNextElo = eloData[elos[elo]].divisionCount;
                        totalCost += divisionsToNextElo * eloData[elos[elo]].pricePerDivision;
                }
                let divisionsToBoost2 = 0;
                if(desiredElo !== "master" && desiredElo !== "grandmaster" && desiredElo !== "challenger"){
                        divisionsToBoost2 = Math.abs(eloData[desiredElo].divisionCount - desiredDivision);
                        totalCost += divisionsToBoost2 * eloData[desiredElo].pricePerDivision;
                }

        } else if (currentElo === desiredElo) {
                // Handle same elo
                const divisionsToBoost = Math.abs(currentDivision - desiredDivision);
                totalCost += divisionsToBoost * eloData[currentElo].pricePerDivision;
        }

        return totalCost;
}

function updateTotalCostCheckbox(){
        // Calculate total percentage increase
        console.log("click");
        let totalPercentageIncrease = 0;
        if (champsCheckbox.checked) {
                totalPercentageIncrease += checkboxIncreases.champs;
        }
        if (horariosCheckbox.checked) {
                totalPercentageIncrease += checkboxIncreases.horarios;
        }
        if (streamCheckbox.checked) {
                totalPercentageIncrease += checkboxIncreases.stream;
        }
        if (entregaCheckbox.checked) {
                totalPercentageIncrease += checkboxIncreases.entrega;
        }

        let finalPrice = price.textContent;
        if(finalPrice !== " "){
                finalPrice = finalPrice.replace(/[^0-9.,-]/g, "");
                finalPrice = parseFloat(finalPrice);
                console.log(typeof(finalPrice));
                // Apply the total percentage increase to the base cost
                const adjustedTotalCost = finalPrice + (finalPrice * totalPercentageIncrease);
                let adjustedTotalCostNumber = parseFloat(adjustedTotalCost);
                compra.innerHTML = 'R$ ' + adjustedTotalCostNumber.toFixed(2);
        } else{
                compra.innerHTML = 'R$ ';
        }
}


function updateDivisiones(elo, selectDivision) {
        selectDivision.innerHTML = ""; // Clear existing options
      
        const divisiones = getDivisiones(elo);
      
        if (divisiones.length === 1) {
                // Handle single option case
                const opcion = document.createElement("option");
                opcion.value = 1; // Set value to 1 for single option
                opcion.textContent = divisiones[0];
                selectDivision.appendChild(opcion);
        } else {
                // Handle multiple options case (4 to 1 values)
                divisiones.forEach((division, index) => {
                        const opcion = document.createElement("option");
                        opcion.value = 4 - index; // Values from 4 to 1
                        opcion.textContent = division;
                        selectDivision.appendChild(opcion);
                });
        }
}

function getDivisiones(elo) {
        switch (elo) {
                case "challenger":
                case "grandmaster":
                case "master":
                        return ["I"];
                default:
                        return ["IV", "III", "II", "I"];
        }
}

function updateImagen(elo, imagen) {
        imagen.src = imagenesPorElo[elo] || "";
}
    
function updateImagenFila() {
        const filaSeleccionada = selectFila.value;
        imagenFila.src = imagenesPorFila[filaSeleccionada] || "";
}