import * as Handlebars from './handlebars';
import { EventEmitter } from "events";

export default class Veiw extends EventEmitter {
    constructor() {
        super();
        this.cardList = document.querySelector(".card-list");
        this.sourse = document.querySelector(".template").innerHTML.trim();
        this.template = Handlebars.compile(this.sourse);
        this.form = document.querySelector(".form");
        this.input = this.form.querySelector("#input");

        this.cardList.addEventListener("click", this.handleRemove.bind(this));
        this.form.addEventListener("submit", this.handleAdd.bind(this));
        document.addEventListener("DOMContentLoaded", this.onPreload.bind(this));
    }

    handleAdd(e) {
        e.preventDefault();

        const {value} = this.input;
        if(value === '') return;

        this.emit('add', value);
    }

    handleRemove(e) {
        e.preventDefault();
        if (e.target.classList.value === "button") {
            this.emit('remove', e);
        }
    }

    onPreload() {
        this.emit('preload');
    }

    makeMarkUp(arr) {

        this.cardList.innerHTML = "";

        let markUp = arr.reduce((acc, link) => acc + this.template(link), "");

        this.cardList.insertAdjacentHTML("afterbegin", markUp);
        this.form.reset();
    }

    removeCard(e) {
        e.target.parentNode.remove();
    }

    loadLinks(arr) {
        this.makeMarkUp(arr);
    }
}