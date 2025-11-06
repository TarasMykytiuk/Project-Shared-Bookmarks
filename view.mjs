export class View {
    constructor() {
        this.elements = {
            usrSelect: document.getElementById("user_select"),
            bookmarksList: document.getElementById("bookmarks_list"),
            form: document.getElementById("form"),
            url: document.getElementById("url"),
            title: document.getElementById("title"),
            description: document.getElementById("description"),
            formSubmit: document.getElementById("form_submit")
        }
    }

    bindUserSelect(handler) {
        this.elements.usrSelect.addEventListener("change", (event) => {
            handler();
        });
    }

    bindFormSubmit(handler) {
        this.elements.formSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            handler();
        });
    }

    addOptions(values) {
        const select = this.elements.usrSelect;
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.innerText = value;
            select.appendChild(option);
        });
    }

    disableDefaultOption() {
        this.elements.usrSelect.firstElementChild.setAttribute("disabled", true);
    }

    clearList() {
        this.elements.bookmarksList.innerHTML = "";
    }

    formatDate(date) {
        date = new Date(date);
        const timeOfDay = String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0");
        const calendarDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        return "Bookmark created: " + timeOfDay + " - " + calendarDate;
    }

    createBookmarkDom(url, title, description, formattedDate) {
        const div = document.createElement("div");
        const titleHeader = document.createElement("h3");
        const titleLink = document.createElement("a");
        titleLink.setAttribute("href", url);
        titleLink.textContent = title;
        titleHeader.appendChild(titleLink);
        const descriptionDom = document.createElement("p");
        descriptionDom.textContent = description;
        const dateDom = document.createElement("p");
        dateDom.textContent = formattedDate;
        div.appendChild(titleHeader);
        div.appendChild(descriptionDom);
        div.appendChild(dateDom);
        return div;
    }

    addListItems(values) {
        const list = this.elements.bookmarksList;
        values.sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(value => {
                const url = value.url;
                const title = value.title;
                const description = value.description;
                const date = value.date;
                const item = this.createBookmarkDom(url, title, description, this.formatDate(date))
                list.appendChild(item);
            })
    }

    displayList(data) {
        this.clearList();
        if (data) {
            this.addListItems(data);
        } else {
            this.elements.bookmarksList.textContent = "Selected user has no bookmarks.";
        }
    }

    resetForm() {
        this.elements.form.reset();
    }
}