import {Mission,f,c,cDispo,tabMC,tabMF} from "../Model/Mission_Model.js";
import {Dispatch} from "../Controller/Main_Controller.js";
import { Base_Vue } from "./Base_Vue.js";

export class Mission_Vue extends Base_Vue{

//<button onclick="Dispatch()" />
    createMission(M,tab){
        let string = "";
        for (let i = 0; i < tab.length; i++){
            string += "<div class='grid'>";
            string += this.createLabel(`${M}_${i}`);
            string += this.createProgress(`${M}_${i}`,`${tab[i].getPourcentValue()}`);
            string += this.createSpan(`${M}_${i}_currentWorker`,"0") + "/" + this.createSpan(`${M}_${i}_maxWorker`,"0");
            string += this.createBtn(`${M}_${i}_Btn+`,"+","") + this.createBtn(`${M}_${i}_Btn-`,"-","");
            string += "</div>";
        }
        return string;
    }

    initVue(){
        let string = "<div class='pico'>";
        string += this.createSelectAmount("Selection :","dispatchAmount");
        string += "<hr>";
        string += "<div id='app.mission'>"
        string += this.createMission("MC", tabMC);
        string += "<hr>";
        string += this.createMission("MF", tabMF);
        string += "</div>"
        string += "</div>"
        return string;
    }

    updateVue(){
        tabMC.forEach((e,i) =>{document.getElementById(`MC_${i}`).value = e.getPourcentValue()});
        tabMF.forEach((e,i) =>{document.getElementById(`MF_${i}`).value = e.getPourcentValue()});

        for (let i = 0; i < tabMC.length; i++){
            document.getElementById(`MC_${i}_currentWorker`).innerHTML = tabMC[i].getCurrentWorker();
            document.getElementById(`MC_${i}_maxWorker`).innerHTML = tabMC[i].getMaxWorker();
        }

        for (let i = 0; i < tabMF.length; i++){
            document.getElementById(`MF_${i}_currentWorker`).innerHTML = tabMF[i].getCurrentWorker();
            document.getElementById(`MF_${i}_maxWorker`).innerHTML = tabMF[i].getMaxWorker();
        }
    }

    optionVue(){
        this.initBtn("MC",tabMC);
        this.initBtn("MF",tabMF);
    }

    initBtn(M,tab){
        for (let i = 0; i < tab.length; i++){
            document.getElementById(`${M}_${i}_Btn+`).onclick = function () { Dispatch(i, '+', M) }; 
            document.getElementById(`${M}_${i}_Btn-`).onclick = function () { Dispatch(i, '-', M) };
        }
    }

}