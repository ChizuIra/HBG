import { c, cDispo, f } from "../Model/Mission_Model.js";
import { Base_Vue } from "./Base_Vue.js";

export class Menu_Vue extends Base_Vue{
    initVue(){
        let string ="<aside><nav>";
        string += this.createUl(
            "<strong>Ressources</strong>",
            "Foi :" + this.createSpan("F","0"),
            "Croyants :" + this.createSpan("C","0"),
            "Dispo :" + this.createSpan("cDispo","0")
            );
        string += this.createUl(
            this.createBtn("Mission","Mission","class='secondary'"),
            this.createBtn("Tab2","Tab2","class='secondary'"),
            this.createBtn("Tab3","Tab3","class='secondary'")
        );
        string += "</nav></aside>";
        return string;
    }

    updateVue(){
        document.getElementById("F").innerHTML = f;
        document.getElementById("C").innerHTML = c;
        document.getElementById("cDispo").innerHTML = cDispo;
    }

    optionVue(){
        return;
    }
}