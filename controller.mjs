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
        const userId = this.view.readUserSelect();
        this.model.setCurrentUser(userId);
        const data = this.model.getData(userId);
        this.view.disableDefaultOption();
        this.view.showForm();
        this.view.displayList(data);
    }

    handleFormSubmit() {
        const userId = this.model.getCurrentUser();
        const bookmark = this.view.collectFromData()
        const data = this.model.addBookmark(userId, bookmark);
        this.view.resetForm();
        this.view.displayList(data);
    }
}