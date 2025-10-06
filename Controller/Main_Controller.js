import { MissionProgress,tabMC,tabMF,f,c,cDispo } from "../Model/Mission_Model.js";



/////////////////////////////////////////////////

function updateElement(id, value) {
    document.getElementById(id).textContent = value;
}

/**
 * Fonction qui actualise l'affichage
 */
function updateDisplay() {
    // Actualisation des Ressources
    updateElement("C",      Math.floor(c));
    updateElement("cDispo", Math.floor(cDispo));
    updateElement("F",      f.toFixed(2));

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
 * @param {String} missionType Soit "MC" soit "MF" , definis sur qu'elle liste de mission on travail
 */
export function Dispatch(mission, action , missionType) {
    console.log("BtnClicked");
    var dispatchAmount = +(document.getElementById("dispatchAmount").value);
    if(missionType === 'MC' ){var current = tabMC[mission];}
    if(missionType === 'MF' ){var current = tabMF[mission];}
    const OPERATOR = {
        "+": (x) => +x,
        "-": (x) => -x,
    };
    Object.freeze(OPERATOR);

    if(dispatchAmount <= 0) return;

    let operator = OPERATOR[action];

    let limit = current.getLimit(action);

    let assignAmount = operator(
        clamp(
            0,
            dispatchAmount,
            limit
        )
    );

    current.assignWorker(assignAmount);
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
