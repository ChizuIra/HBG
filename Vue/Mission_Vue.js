import {Mission,f,c,cDispo,tabMC,tabMF} from "../Model/Mission_Model.js";
import {Dispatch} from "../Controller/Main_Controller.js";

export class Mission_Vue{
    createSelectAmount(){
        return  `<label>Selection : </label><input id='dispatchAmount' type='number' min = '0'>`  
    }

    createLabel(M,i){  
        return `<label for ='${M}_${i}'> ${M}_${i} </label>`;
    }
    createProgress(M,i,Mission){
        return `<progress id='${M}_${i}' max ='100' value='${Mission.getPourcentValue()}'></progress>`;
    }
    createSpan(id,info){
        return `<span id='${id}'> ${info} </span>`;
    }
    createBtn(M,i,operator){
        return `<button id='${M}_${i}_Btn${operator}'>${operator}</button>`;
    }
//<button onclick="Dispatch()" />
    createMission(M,tab){
        let string = "";
        for (let i = 0; i < tab.length; i++){
            string += "<div class='grid'>";
            string += this.createLabel(M,i,tab[i]);
            string += this.createProgress(M,i,tab[i]);
            string += this.createSpan(`${M}_${i}_currentWorker`,"0") + "/" + this.createSpan(`${M}_${i}_maxWorker`,"0");
            string += this.createBtn(M,i,"+") + this.createBtn(M,i,"-");
            string += "</div>";
        }
        return string;
    }

    initVue(){
        let string = "";
        string += this.createSelectAmount();
        string += "<hr>";
        string += "<div id='app.mission'>"
        string += this.createMission("MC", tabMC);
        string += "<hr>";
        string += this.createMission("MF", tabMF);
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