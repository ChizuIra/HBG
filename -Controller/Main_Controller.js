//initialisation du jeu
import { loadBalanceData } from "../-Model/Model_save.js";
import { acheterUnite } from "../-Model/Model_shop.js";
//import { MissionProgress } from "../-Model/Model_shop.js";

/*
    async function init(){
        const BalanceData = await loadBalanceData();
        console.log(BalanceData[0]);
    }
*/

// Main ressources 
var f = 0;
var c = 1;
var cDispo = c;

const tabMC = [
    { minValue: 0, maxValue: 50, currentValue: 0, maxWorker: 10, currentWorker: 0, prod: 1 },
    { minValue: 0, maxValue: 100, currentValue: 0, maxWorker: 25, currentWorker: 0, prod: 5 }
];

/////////////////////////////////////////////////

for (let i = 0; i < tabMC.length; i++) {
    document.getElementById("MC_" + i).setAttribute("max", tabMC[i].maxValue);
    document.getElementById("MC_" + i).setAttribute("value", tabMC[i].minValue);
    document.getElementById("MC_" + i + "_Allocated").textContent = tabMC[i].currentWorker;

    document.getElementById("MC_" + i + "_Btn+").onclick = function () { Dispatch(i, "+") };
    document.getElementById("MC_" + i + "_Btn-").onclick = function () { Dispatch(i, "-") };
}

/////////////////////////////////////////////////


function updateDisplay() {
    // Actualisation des Ressources
    document.getElementById("C").textContent = Math.floor(c);
    document.getElementById("cDispo").textContent = Math.floor(cDispo);
    document.getElementById("F").textContent = f.toFixed(2);

    // for (let i = 0; i < Tabunits.length; i++ ) {
    for (let i = 0; i < tabMC.length; i++) {
        document.getElementById("MC_" + i).setAttribute("value", tabMC[i].currentValue);
        document.getElementById("MC_" + i + "_Allocated").textContent = tabMC[i].currentWorker;
    }
}

/**
 * Fonction permettant de calculer l'avancement des missions
 * @param {Number} t Nombre utilisé pour représenté le tick dans le jeu
 */
function MissionProgress(t) {
    for (let i = 0; i < tabMC.length; i++) {
        if (tabMC[i].currentWorker > 0) {

            tabMC[i].currentValue = tabMC[i].currentValue + (tabMC[i].currentWorker * t);

            if (tabMC[i].currentValue >= tabMC[i].maxValue) {
                c += tabMC[i].prod;
                cDispo += tabMC[i].prod;
                tabMC[i].currentValue = 0;
            }
        }
    }
}

/**
 * Permet d'attribuer à la mission correspondante la valeur sélectionnée (+ ou -)
 * @param {Number} mission Correspond à la mission sélectionnée (Equivalent à TabMC[i].
 * @param {String} action Soit "+" soit "-", permet d'ajouter ou d'enlever à la mission i
 */
function Dispatch(mission, action) {
    var dispatchAmount = Number(document.getElementById("dispatchAmount").value);

    if (dispatchAmount > 0) {
        try {
            switch (action) {
                case "+":
                    if (cDispo >= dispatchAmount) {
                        tabMC[mission].currentWorker = tabMC[mission].currentWorker + dispatchAmount;
                        cDispo = cDispo - dispatchAmount;
                    }
                    break;
                case "-":
                    tabMC[mission].currentWorker = tabMC[mission].currentWorker - dispatchAmount;
                    cDispo = cDispo + dispatchAmount;
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

}

function tick(t) {
    MissionProgress(t);

}


updateDisplay([0, 0, []]); // Actualise l'interface avant de lancer la boucle.
let inter_ms = 16.66666667// 16.66666667 = 60 fps
setInterval(() => {
    updateDisplay(tick(inter_ms / 1000.0));
}, inter_ms);


/* Pour test voirs si les FPS accelere pas la vitesse du jeu
Buy(Tabunits,F,0,);
    for(let i=0;i < 120;i++){
        console.log("["+i+"]");
        tick(1);
    }
*/
//Amogus