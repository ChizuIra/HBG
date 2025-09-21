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

//Main ressources 
let F = 0;
let C = 1;
let CDispo = C;

const TabMC = [
    { MinValue: 0, MaxValue: 50, CurrentValue: 0, MaxWorker: 10, CurrentWorker: 10 , Prod: 1 },
    { MinValue: 0, MaxValue: 100, CurrentValue: 0, MaxWorker: 25, CurrentWorker: 0 , Prod: 5 }
];

console.log(TabMC);

/////////////////////////////////////////////////

for (let i = 0; i < TabMC.length; i++) {
    document.getElementById("MC_" + i).setAttribute("max", TabMC[i].MaxValue);
    document.getElementById("MC_" + i).setAttribute("value", TabMC[i].MinValue);
    document.getElementById("MC_" + i + "_Allocated").textContent = TabMC[i].CurrentWorker;

    document.getElementById("MC_" + i + "_Btn+").onclick = function() {Disptach(i,"+")};
    document.getElementById("MC_" + i + "_Btn-").onclick = function() {Disptach(i,"-")};
}



/////////////////////////////////////////////////


function updateDisplay() { //Actualisation de l'affichage
    //Actualisation des Ressources
    document.getElementById("C").textContent = Math.floor(C);
    document.getElementById("CDispo").textContent = Math.floor(CDispo);
    document.getElementById("F").textContent = F.toFixed(2);

    // for (let i = 0; i < Tabunits.length; i++ ) {
    for (let i = 0; i < TabMC.length; i++) {
        document.getElementById("MC_" + i).setAttribute("value", TabMC[i].CurrentValue);
        document.getElementById("MC_" + i + "_Allocated").textContent = TabMC[i].CurrentWorker;
    }
}

function MissionProgress(t){
    for (let i = 0; i < TabMC.length; i++) {
        if(TabMC[i].CurrentWorker > 0){
            
            TabMC[i].CurrentValue = TabMC[i].CurrentValue + (TabMC[i].CurrentWorker * t);

            if(TabMC[i].CurrentValue >= TabMC[i].MaxValue){
                C += TabMC[i].Prod;
                CDispo += TabMC[i].Prod;
                TabMC[i].CurrentValue = 0;
            }
        } 
    }
}

function Disptach(i,Action){
    var DispatchAmount = document.getElementById("DispatchAmount");

    switch (Action){
        case "+" :
            if(Cdispo >= DispatchAmount){
            TabMC[i].CurrentWorker = TabMC[i].CurrentWorker + DispatchAmount;
            CDispo = CDispo - DispatchAmount;
            }
            break;
        case "-" :
            //if(){
            TabMC[i].CurrentWorker = TabMC[i].CurrentWorker - DispatchAmount;
            //}
            break;
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