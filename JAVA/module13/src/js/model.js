import { EventEmitter } from "events";
import { LOCALSTORAGE } from './storage';


export default class Model extends EventEmitter {
    constructor(linksArr = []) {
        super();
        this.linksArr = linksArr;
    }

    addCard(text) {
   
        if (!this.checkValue(text, this.linksArr)) {
            this.linksArr.unshift({ url: text });
            LOCALSTORAGE.set("linksArr", this.linksArr);
        } else {
            alert("This link is in the list of bookmarks alredy");
        }
        return this.linksArr;
    }

    checkValue(value, arr) {
        return arr.some(el => el.url === value);
    }

    removeCard(e) {
            e.target.parentNode.remove();
    
            this.linksArr = this.linksArr.filter(
                el => el.url != e.target.previousElementSibling.innerText
            );
            LOCALSTORAGE.set("linksArr", this.linksArr);
    }

    loadLink() {
        if (LOCALSTORAGE.get("linksArr") === undefined) return;
        this.linksArr = LOCALSTORAGE.get("linksArr");

        return this.linksArr
    }

}