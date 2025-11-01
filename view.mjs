export class View {
    constructor() {
        this.elements = {
            usrSelect: document.getElementById("user_select"),
            bookmarksList: document.getElementById("bookmarks_list")
        }
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

    clearList() {
        this.elements.bookmarksList.innerHTML = "";
    }

    addListItems(values) {
        const list = this.elements.bookmarksList;
        values.forEach(value => {
            const item = document.createElement("li");
            const topic = value.topic ? value.topic : "no topic";
            const date = value.date ? value.date : "no date";
            item.innerText = "Topic: " + topic + ", data: " + date + ".";
            list.appendChild(item);
        })
    }

}