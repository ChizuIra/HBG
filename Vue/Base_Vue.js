export class Base_Vue {
    initVue() {
        return "";
    }
    updateVue() {
        return;
    }
    createSelectAmount(info,id) {
        return `<label>${info} </label><input id='${id}' type='number' min = '0'>`
    }
    createLabel(info) {
        return `<label for ='${info}'> ${info} </label>`;
    }
    createProgress(id_info, value_info) {
        return `<progress id='${id_info}' max ='100' value='${value_info}'></progress>`;
    }
    createSpan(id_info, inner_info) {
        return `<span id='${id_info}'> ${inner_info} </span>`;
    }
    createBtn(id_info, inner_info , class_info) {
        return `<button id='${id_info}' ${class_info}>${inner_info}</button>`;
    }
    createLi(content){
        return `<li>${content}</li>`;
    }
    createUl(...elements){
        let string = "";
        elements.forEach(element => {
            string += this.createLi(element);
        });
        return string;
    }
}