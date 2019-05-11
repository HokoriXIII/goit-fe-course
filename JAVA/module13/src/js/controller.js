export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.on('add', this.addLink.bind(this));
        this.view.on('remove', this.removeLink.bind(this));
        this.view.on('preload', this.preloadLink.bind(this));
    }

    addLink(link) {
        const arr = this.model.addCard(link) ;
        this.view.makeMarkUp(arr);
    }

    removeLink(e) {
        this.model.removeCard(e);
        this.view.removeCard(e);
    }

    preloadLink() {
        const localStorageArr = this.model. loadLink();
        this.view.loadLinks(localStorageArr);
    }

}