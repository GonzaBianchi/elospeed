const elosActuales = document.querySelectorAll(".selectEloActual");
const elosDeseados = document.querySelectorAll(".selectEloDesejado");
const imagenesActuales = document.querySelectorAll(".imgEloAct img");
const imagenesDeseadas = document.querySelectorAll(".imgEloDes img");
const divisionesActuales = document.querySelectorAll(".selectDivActual");
const divisionesDeseadas = document.querySelectorAll(".selectDivDesejado");
const expElos = document.querySelector(".expElos");
const compra = document.querySelector(".compra");
const continuarCompra = document.querySelector(".continuarCompra");
const extra = document.querySelector(".extra");
const main = document.querySelector("main");

const selectFila = document.querySelector(".selectFila");
const imagenFila = document.querySelector(".imgFila img");

const price = document.querySelector(".preçoMayus");

const champsCheckbox = document.getElementById("champs");
const horariosCheckbox = document.getElementById("horarios");
const streamCheckbox = document.getElementById("stream");
const entregaCheckbox = document.getElementById("entrega");


const imagenesPorFila = {
        SoloDuo: "img/emotes/1.png",
        flex: "img/emotes/2.png"
};


const elos = {
        challenger: 10,
        grandmaster: 9,
        master: 8,
        diamond: 7,
        platinum: 6,
        emerald: 5,
        gold: 4,
        silver: 3,
        bronze: 2,
        iron: 1
};

const eloData = {
        "iron": {
                pricePerDivision: 7.10,
                divisionCount: 4
        },
        "bronze": {
                pricePerDivision: 8.20,
                divisionCount: 4
        },
        "silver": {
                pricePerDivision: 12.10,
                divisionCount: 4
        },
        "gold": {
                pricePerDivision: 14.50,
                divisionCount: 4
        },
        "platinum": {
                pricePerDivision: 21.40,
                divisionCount: 4
        },
        "emerald": {
                pricePerDivision: 43.60,
                divisionCount: 4
        },
        "diamond": {
                pricePerDivision: 62,
                divisionCount: 4
        },
        "master": {
                pricePerDivision: 495,
                divisionCount: 1
        },
        "grandmaster": {
                pricePerDivision: 930,
                divisionCount: 1
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
      
updateExpElos();

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

let visible = false;

continuarCompra.addEventListener("click", function(){
        visible = !visible;
        extra.style.scale = visible ? "1" : "0";
        extra.style.height = visible ? "auto" : "0";
        main.style.height = visible ? "auto" : "120vh";
});

function updateExpElos() {
        let eloActual = elosActuales[0].value;
        let divisionActual = divisionesActuales[0].value;
        let eloDeseado = elosDeseados[0].value;
        let divisionDeseada = divisionesDeseadas[0].value;

        let esEloValido= true;

        if(elos[eloDeseado] < elos[eloActual]){
                esEloValido = false;
        } else if (elos[eloDeseado] === elos[eloActual]) {
                if (divisionDeseada >= divisionActual) {
                        esEloValido = false;
                }
        }

        let textoExpElos = "";
        let textoCompra = "";

        if (esEloValido) {
                if (eloActual) {
                        textoExpElos += '<span class="negrita">' + `${getNombreElo(eloActual,mostrarDivision(divisionActual))}` + '</span>' ;
                        textoCompra += 'Elo Boost ' + `${getNombreElo(eloActual,mostrarDivision(divisionActual))}` + ' Ao ';
                }
        
                if (eloDeseado) {
                        textoExpElos += ' para o <span class="negrita">' + `${getNombreElo(eloDeseado,mostrarDivision(divisionDeseada))}` + '</span>';
                        textoCompra += `${getNombreElo(eloDeseado,mostrarDivision(divisionDeseada))}`;
                }
                const totalCost = calculateTotalCost(eloActual, eloDeseado, divisionActual, divisionDeseada);
                price.textContent = ' R$ ' + totalCost.toFixed(2);
                textoCompra += ' R$ ' + totalCost.toFixed(2);
        }else{
                textoExpElos = "O elo desejado deve ser maior que o atual. Revise as opções selecionadas.";
                price.innerHTML = "R$";
        }
        expElos.innerHTML = textoExpElos;
        compra.textContent = textoCompra;
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
      
        console.log(currentElo, desiredElo);
        if (elos[currentElo] < elos[desiredElo]) {

                //calculate cost from the initial elo's divisions
                const divisionsToBoost1 = currentDivision;
                totalCost += divisionsToBoost1 * eloData[currentElo].pricePerDivision;
                console.log(totalCost);
                // Iterate through intermediate elos
                for (let elo in eloData) {
                        console.log(elo+ " - " + currentElo);
                        if (elo === desiredElo) {
                                console.log("este es el elo deseado " + elo + ", divisiones del elo: " + desiredDivision);
                                break; // Exit loop when reaching desired elo
                        } else if(elo !== currentElo){
                                console.log(elo);
                                // Calculate cost for divisions to reach next elo
                                const divisionsToNextElo = eloData[elo].divisionCount;
                                totalCost += divisionsToNextElo * eloData[elo].pricePerDivision;
                        }
                }
                console.log(totalCost);
                let divisionsToBoost2 = 0;
                if(desiredElo !== "master" && desiredElo !== "grandmaster" && desiredElo !== "challenger"){
                        divisionsToBoost2 = Math.abs(eloData[desiredElo].divisionCount - desiredDivision);
                        console.log(divisionsToBoost2 + " - " + desiredDivision);
                        totalCost += divisionsToBoost2 * eloData[desiredElo].pricePerDivision;
                }

        } else if (currentElo === desiredElo) {
                // Handle same elo
                const divisionsToBoost = Math.abs(currentDivision - desiredDivision);
                totalCost += divisionsToBoost * eloData[currentElo].pricePerDivision;
        }

        return totalCost;
}

function updateTotalCostCheckbox(totalCost){
        // Calculate total percentage increase
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

        // Apply the total percentage increase to the base cost
        const adjustedTotalCost = totalCost * (1 + totalPercentageIncrease);

        // Update the displayed price on the "Comprar" button
        const buyButtonPriceElement = document.getElementById("buy-button").children[1]; // Get the span element within the button
        buyButtonPriceElement.textContent = `R$${adjustedTotalCost.toFixed(2)}`; // Format to 2 decimal places

        // You can also return the adjustedTotalCost if you need it for other purposes
        return adjustedTotalCost;
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