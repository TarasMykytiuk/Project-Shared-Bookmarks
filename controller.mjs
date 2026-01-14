export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.populateUserSelect(this.model.getUserIds());
        this.view.bindUserSelect(() => this.handleUserSelect());
        this.view.bindFormSubmit((event) => this.handleFormSubmit(event));
    }

    handleUserSelect() {
        const userId = this.view.readUserSelect();
        this.model.setCurrentUser(userId);
        const data = this.model.getData(userId);
        this.view.disableDefaultOption();
        this.view.showForm();
        this.view.displayList(data);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.view.clearErrors();
        if (!this.view.checkFormValidity()) {
            this.view.displayError("All field are required!");
            return;
        }
        const bookmark = this.view.collectFormData();
        try {
            this.model.isValidUrl(bookmark.url);
        } catch (error) {
            this.view.displayError(error.message);
            return;
        }
        const userId = this.model.getCurrentUser();
        const bookmarksList = this.model.addBookmark(userId, bookmark);
        this.view.resetForm();
        this.view.displayList(bookmarksList);
    }
}