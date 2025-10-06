export var f = 0;
export var c = 1;
export var cDispo = c;

export class Mission {
    constructor(minValue, maxValue, maxWorker, prod) {
        this._minValue = minValue; // pas de get
        this._maxValue = maxValue; // pas de get
        this._maxWorker = maxWorker;  
        this._prod = prod; // pas de get
        this._currentValue = minValue;  
        this._currentWorker = 0;
    }
    /**
     * @param {Number} quantity 
     */
    assignWorker(quantity) {
        this._currentWorker += quantity;
        cDispo -= quantity;
    }

    getCurrentWorker() {
        return this._currentWorker;
    }
    getCurrentValue() {
        return this._currentValue;
    }

    getMaxWorker(){
        return this._maxWorker;
    }

    getPourcentValue(){
        return 100*this._currentValue / (this._maxValue-this._minValue);
    }

    workProd(time) {
        this._currentValue += this._currentWorker * time;
        if (this._currentValue < this._maxValue) return 0;
        this._currentValue = 0;
        return this._prod;
    }
    getLimit(action) {
        if (action === '+') {
            return Math.min(cDispo, this._maxWorker - this._currentWorker);
        } else if (action === '-') {
            return this._currentWorker;
        }
    }
}

export const tabMC = [
    // minValue , maxValue , maxWorker , prod
    new Mission(0, 10, 1, 1),
    new Mission(0, 100, 5, 1),
    new Mission(0, 500, 10, 1),
    new Mission(0, 1000, 30, 1)
];

export const tabMF = [
    new Mission(0, 10, 1, 1),
    new Mission(0, 100, 5, 1),
    new Mission(0, 500, 10, 1),
    new Mission(0, 1000, 30, 1)
];


/**
 * Fonction permettant de calculer l'avancement des missions
 * @param {Number} t Nombre utilisé pour représenté le pas de temps depuis la dernière update
 */
export function MissionProgress(t) {

    let updateTabMC = UpdateTab(tabMC, t);
    c += updateTabMC;
    cDispo += updateTabMC;
    f += UpdateTab(tabMF, t);
}

/**
 * Fonction qui scroll chaque tab de Mission pour calculer la prod total
 * @param {*} Tab Tab de Mission a calculer
 * @param {*} t Nombre utilisé pour représenté le pas de temps depuis la dernière update
 * @returns {Number} Return la somme de la prod des Missions
 */
function UpdateTab(Tab, t) {
    let sum = 0;
    for (let curr of Tab) {

        sum += curr.workProd(t);

    }
    return sum;

}