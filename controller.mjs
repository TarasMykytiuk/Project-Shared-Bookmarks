export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        console.log("View: " + this.view.constructor.name + ", Model: " + this.model.constructor.name + ".");
    }
}