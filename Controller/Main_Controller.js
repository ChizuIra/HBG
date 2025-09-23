
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
    { minValue: 0, maxValue: 10, currentValue: 0, maxWorker: 5, currentWorker: 0, prod: 1 },
    { minValue: 0, maxValue: 100, currentValue: 0, maxWorker: 50, currentWorker: 0, prod: 5 },
    { minValue: 0, maxValue: 1000, currentValue: 0, maxWorker: 500, currentWorker: 0, prod: 50 },
    { minValue: 0, maxValue: 10000, currentValue: 0, maxWorker: 5000, currentWorker: 0, prod: 500 },
    { minValue: 0, maxValue: 100000, currentValue: 0, maxWorker: 50000, currentWorker: 0, prod: 5000 }
];

const tabMF = [
    { minValue: 0, maxValue: 10, currentValue: 0, maxWorker: 1, currentWorker: 0, prod: 1 },
    { minValue: 0, maxValue: 100, currentValue: 0, maxWorker: 2, currentWorker: 0, prod: 5 },
    { minValue: 0, maxValue: 1000, currentValue: 0, maxWorker: 3, currentWorker: 0, prod: 50 },
    { minValue: 0, maxValue: 10000, currentValue: 0, maxWorker: 4, currentWorker: 0, prod: 500 },
    { minValue: 0, maxValue: 100000, currentValue: 0, maxWorker: 5, currentWorker: 0, prod: 5000 }
];


/////////////////////////////////////////////////

for (let i = 0; i < tabMC.length; i++) {
    document.getElementById("MC_" + i).setAttribute("max", tabMC[i].maxValue);
    document.getElementById("MC_" + i).setAttribute("value", tabMC[i].minValue);
    document.getElementById("MC_" + i + "_Allocated").textContent = tabMC[i].currentWorker;
    document.getElementById("MC_"+ i + "_maxWorker").textContent = tabMC[i].maxWorker;

    document.getElementById("MC_" + i + "_Btn+").onclick = function () { Dispatch(i, "+") };
    document.getElementById("MC_" + i + "_Btn-").onclick = function () { Dispatch(i, "-") };

}

for (let i = 0; i < tabMF.length; i++) {
    document.getElementById("MF_" + i).setAttribute("max", tabMF[i].maxValue);
    document.getElementById("MF_" + i).setAttribute("value", tabMF[i].minValue);
    document.getElementById("MF_" + i + "_Allocated").textContent = tabMF[i].currentWorker;
    document.getElementById("MF_"+ i + "_maxWorker").textContent = tabMF[i].maxWorker;

    document.getElementById("MF_" + i + "_Btn+").onclick = function () { Dispatch(i, "+") };
    document.getElementById("MF_" + i + "_Btn-").onclick = function () { Dispatch(i, "-") };

}

/////////////////////////////////////////////////

function assignWorker(ressource, quantity) {
    ressource.currentWorker += quantity;
    cDispo -= quantity;
}

function updateElement(id, value) {
    document.getElementById(id).textContent = value;
}

function updateDisplay() {
    // Actualisation des Ressources
    updateElement("C",      Math.floor(c));
    updateElement("cDispo", Math.floor(cDispo));
    updateElement("F",      f.toFixed(2));

    // for (let i = 0; i < Tabunits.length; i++ ) {
    for (let i = 0; i < tabMC.length; i++) {
        document.getElementById(`MC_${i}`).setAttribute("value", tabMC[i].currentValue);
        updateElement(`MC_${i}_Allocated`, tabMC[i].currentWorker);
    }

    for (let i = 0; i < tabMF.length; i++) {
        document.getElementById(`MF_${i}`).setAttribute("value", tabMF[i].currentValue);
        updateElement(`MF_${i}_Allocated`, tabMF[i].currentWorker);
    }

}

/**
 * Fonction permettant de calculer l'avancement des missions
 * @param {Number} t Nombre utilisé pour représenté le pas de temps depuis la dernière update
 */
function MissionProgress(t) {
    for(let currMc of tabMC) {
        currMc.currentValue += currMc.currentWorker * t;

        if(currMc.currentValue < currMc.maxValue) continue;

        c += currMc.prod;
        cDispo += currMc.prod;
        currMc.currentValue = 0;
    }
}

/**
 * Permet de restreindre une valeur entre 2 nombres
 * @param{Number} Borne inférieur de la range
 * @param{Number} Le nombre à borner
 * @param{Number} Borne supérieur de la range
 */
function clamp(min, val, max) {
    return Math.max(min, Math.min(val,max));
}

/**
 * Permet d'attribuer à la mission correspondante la valeur sélectionnée (+ ou -)
 * @param {Number} mission Correspond à la mission sélectionnée (Equivalent à TabMC[i].
 * @param {String} action Soit "+" soit "-", permet d'ajouter ou d'enlever à la mission i
 */
function Dispatch(mission, action) {
    var dispatchAmount = +(document.getElementById("dispatchAmount").value);
    let current = tabMC[mission];
    const OPERATOR = {
        "+": (x) => +x,
        "-": (x) => -x,
    };
    Object.freeze(OPERATOR);

    if(dispatchAmount <= 0) return;

    let limit = 0;
    let operator = OPERATOR[action];

    if (action === '+') {
        limit = Math.min(cDispo, current.maxWorker - current.currentWorker);
    } else if (action === '-') {
        limit = current.currentWorker
    }

    let assignAmount = operator(
        clamp(
            0,
            dispatchAmount,
            limit
        )
    );

    assignWorker(current, assignAmount);
}

updateDisplay(); // Actualise l'interface avant de lancer la boucle.
let inter_ms = 1000 * 1/60; // 60 fps
setInterval(() => {
    updateDisplay();
    MissionProgress(inter_ms / 1000.0);
}, inter_ms);


/* Pour test voirs si les FPS accelere pas la vitesse du jeu
   Buy(Tabunits,F,0,);
   for(let i=0;i < 120;i++){
   console.log("["+i+"]");
   tick(1);
   }
*/
//Amogus
