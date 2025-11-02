export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.addOptions(this.model.getUserIds());

        this.view.elements.usrSelect.addEventListener("change", (event) => {
            this.handleUserSelect();
        });

        this.view.elements.formSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            this.handleFormSubmit();
        });
    }

    handleUserSelect() {
        const userId = this.view.elements.usrSelect.value;
        const data = this.model.getData(userId);
        this.view.displayList(data);
    }

    handleFormSubmit() {
        const userId = this.view.elements.usrSelect.value;
        if (userId) {
            const bookmark = {
                url: this.view.elements.url.value,
                topic: this.view.elements.topic.value,
                description: this.view.elements.url.value,
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