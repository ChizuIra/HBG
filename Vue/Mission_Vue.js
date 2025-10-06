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
    createSpan(info){
        return `<span> ${info} </span>`;
    }
    createBtn(M,i,operator){
        return `<button id='${M}_${i}_Btn${operator}' >${operator}</button>`;
    }

    createMission(M,tab){
        let string = "";
        for (let i = 0; i < tab.length; i++){
            string += "<div class='grid'>";
            string += this.createLabel(M,i,tab[i]);
            string += this.createProgress(M,i,tab[i]);
            string += this.createSpan(tab[i].getCurrentWorker()) + "/" + this.createSpan(tab[i].getMaxWorker());
            string += this.createBtn(M,i,"+") + this.createBtn(M,i,"-");
            string += "</div>";
        }
        return string;
    }

    initVue(){
        console.log("initVue");
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
        console.log("updateVue");
        let string = "";
        string += this.createMission("MC", tabMC);
        string += "<hr>";
        string += this.createMission("MF", tabMF);
        //string += this.optionVue()
        return string;
    }

    optionVue(){
        this.initBtn("MC",tabMC);
        this.initBtn("MF",tabMF);
    }

    initBtn(M,tab){
        let string ="";
        string += "<script>"
        string += "import { Dispatch } from '../Controller/Main_Controller.js';"
        for (let i = 0; i < tab.length; i++){
            string += `document.getElementById('${M}_${i}_Btn+').onclick = function () { Dispatch(i, '+', M) };`; // ya un probleme dans ton appel ici (Hapax-sensei)
            string += `document.getElementById('${M}_${i}_Btn-').onclick = function () { Dispatch(i, '-', M) };`;
        }
        string +="</script>"
        return string;
    }

}