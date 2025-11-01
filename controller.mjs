export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.addOptions(this.model.getUserIds());
        this.view.elements.usrSelect.addEventListener("change", (event) => {
            this.handleUserSelect();
        })
    }

    handleUserSelect() {
        const userId = this.view.elements.usrSelect.value;
        const data = this.model.getData(userId);
        this.view.clearList();
        this.view.addListItems(data);
    }
}