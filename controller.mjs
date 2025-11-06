export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.addOptions(this.model.getUserIds());
        this.view.bindUserSelect(() => this.handleUserSelect());
        this.view.bindFormSubmit(() => this.handleFormSubmit());
    }

    handleUserSelect() {
        const userId = this.view.elements.usrSelect.value;
        const data = this.model.getData(userId);
        this.view.disableDefaultOption();
        this.view.displayList(data);
    }

    handleFormSubmit() {
        const userId = this.view.elements.usrSelect.value;
        if (userId) {
            const bookmark = {
                url: this.view.elements.url.value,
                title: this.view.elements.title.value,
                description: this.view.elements.description.value,
                date: new Date()
            }
            const data = this.model.addBookmark(userId, bookmark);
            this.view.resetForm();
            this.view.displayList(data)
        } else {
            alert("You must select a user!");
        }
    }
}