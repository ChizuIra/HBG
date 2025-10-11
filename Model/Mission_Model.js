export var f = 50;
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
        this._upgrade = 0;
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

    getMaxWorker() {
        return this._maxWorker;
    }

    getPourcentValue() {
        return 100 * this._currentValue / (this._maxValue - this._minValue);
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

    UpgradeMaxWorker() {
        let upgradeCost = 5 * 1.6 ^this._upgrade;
        if (f < upgradeCost) return;
        f -= upgradeCost;
        this._upgrade += 1;
        this._maxWorker += this._upgrade;

        console.log("Cost : " + upgradeCost);
        console.log("upgrade : " + this._upgrade );
        console.log("maxWorker : " + this._maxWorker );
        console.log("--------" );


    }
}

export const tabMC = [
    // minValue , maxValue , maxWorker , prod
    new Mission(0, 10, 5, 1),
    new Mission(0, 10, 7, 1),
    new Mission(0, 10, 9, 1),
    new Mission(0, 10, 11, 1),
    new Mission(0, 10, 13, 1),
    new Mission(0, 10, 15, 1),
    new Mission(0, 10, 17, 1),
    new Mission(0, 10, 19, 1)
];

export const tabMF = [
    new Mission(0, 10, 5, 1),
    new Mission(0, 10, 7, 3),
    new Mission(0, 10, 9, 10),
    new Mission(0, 10, 11, 33),
    new Mission(0, 10, 13, 110),
    new Mission(0, 10, 15, 360),
    new Mission(0, 10, 17, 1200),
    new Mission(0, 10, 19, 3960)
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
