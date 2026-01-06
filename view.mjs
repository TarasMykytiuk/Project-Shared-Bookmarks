export class View {
    #elements
    constructor() {
        this.#elements = {
            usrSelect: document.getElementById("user_select"),
            langSelect: document.getElementById("lang_select"),
            bookmarksList: document.getElementById("bookmarks_list"),
            formContainer: document.getElementById("left"),
            form: document.getElementById("form"),
            url: document.getElementById("url"),
            title: document.getElementById("title"),
            description: document.getElementById("description"),
            formSubmit: document.getElementById("form_submit"),
            errorsDom: document.getElementById("errors")
        }
        this.locales = [
            "af-ZA",
            "ar-AE",
            "ar-SA",
            "bg-BG",
            "ca-ES",
            "cs-CZ",
            "da-DK",
            "de-AT",
            "de-CH",
            "de-DE",
            "el-GR",
            "en-AU",
            "en-CA",
            "en-GB",
            "en-IE",
            "en-IN",
            "en-NZ",
            "en-US",
            "es-AR",
            "es-CL",
            "es-CO",
            "es-ES",
            "es-MX",
            "et-EE",
            "fi-FI",
            "fr-BE",
            "fr-CA",
            "fr-CH",
            "fr-FR",
            "he-IL",
            "hi-IN",
            "hr-HR",
            "hu-HU",
            "id-ID",
            "it-CH",
            "it-IT",
            "ja-JP",
            "ko-KR",
            "lt-LT",
            "lv-LV",
            "ms-MY",
            "nb-NO",
            "nl-BE",
            "nl-NL",
            "pl-PL",
            "pt-BR",
            "pt-PT",
            "ro-RO",
            "ru-RU",
            "sk-SK",
            "sl-SI",
            "sv-SE",
            "th-TH",
            "tr-TR",
            "uk-UA",
            "vi-VN",
            "zh-CN",
            "zh-HK",
            "zh-TW"
        ];
        ;
    }

    populateUserSelect(values) {
        const select = this.#elements.usrSelect;
        this.addOptions(select, values)
    }

    populateLangSelect() {
        const select = this.#elements.langSelect;
        this.addOptions(select, this.locales)
        select.value = "en-GB";
    }

    addOptions(select, values) {
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.innerText = value;
            select.appendChild(option);
        });
    }

    bindUserSelect(handler) {
        this.#elements.usrSelect.addEventListener("change", (event) => {
            handler();
        });
    }

    bindLangSelect(handler) {
        this.#elements.langSelect.addEventListener("change", (event) => {
            handler();
        });
    }

    bindFormSubmit(handler) {
        this.#elements.formSubmit.addEventListener("click", (event) => {
            event.preventDefault();
            handler();
        });
    }

    readUserSelect() {
        return this.#elements.usrSelect.value;
    }

    readLangSelect() {
        return this.#elements.langSelect.value;
    }

    displayError(message) {
        this.#elements.errorsDom.textContent = message;
    }

    clearErrors() {
        this.#elements.errorsDom.textContent = "";
    }

    showForm() {
        this.#elements.formContainer.style.visibility = 'visible';
    }

    checkFormValidity() {
        return this.#elements.form.checkValidity()
    }

    collectFormData() {
        return {
            url: this.#elements.url.value,
            title: this.#elements.title.value,
            description: this.#elements.description.value,
            date: new Date()
        }
    }

    disableDefaultOption() {
        this.#elements.usrSelect.firstElementChild.setAttribute("disabled", true);
    }

    clearList() {
        this.#elements.bookmarksList.innerHTML = "";
    }

    formatDate(date, lang) {
        date = new Date(date);
        const timeOfDay = date.toLocaleTimeString(lang);
        const calendarDate = date.toLocaleDateString(lang);
        return "Bookmark created: " + timeOfDay + " - " + calendarDate;
    }

    createBookmarkDom(url, title, description, formattedDate) {
        const div = document.createElement("div");
        div.classList.add('bookmark');
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

    addListItems(values, lang) {
        const list = this.#elements.bookmarksList;
        values.sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(value => {
                const url = value.url;
                const title = value.title;
                const description = value.description;
                const date = value.date;
                const item = this.createBookmarkDom(url, title, description, this.formatDate(date, lang))
                list.appendChild(item);
            })
    }

    displayList(data, lang) {
        this.clearList();
        if (data && data.length !== 0) {
            this.addListItems(data, lang);
        } else {
            this.#elements.bookmarksList.textContent = "Selected user has no bookmarks.";
        }
    }

    resetForm() {
        this.#elements.form.reset();
    }
}