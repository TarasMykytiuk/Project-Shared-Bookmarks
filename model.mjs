export class Model {
    #currentUser;
    constructor() {
        this.#currentUser = null
    }

    getCurrentUser() {
        return this.#currentUser;
    }

    setCurrentUser(userId) {
        this.#currentUser = userId;
    }

    addBookmark(userId, bookmark) {
        let data = this.getData(userId);
        if (!data) { data = [] };
        data.push(bookmark);
        this.setData(userId, data);
        return this.getData(userId);
    }

    /**
     * Get a list of user ids
     *
     * @returns {string[]} List of user id strings
     */
    getUserIds() {
        return ["1", "2", "3", "4", "5"];
    }

    /**
     * Get data associated with a specific user.
     *
     * @param {string} userId The user id to get data for
     * @returns {any | null} The data associated with the user
     */
    getData(userId) {
        return JSON.parse(localStorage.getItem(`stored-data-user-${userId}`));
    }

    /**
     * Store data for a specific user.
     *
     * @param {string} userId The user id to store data for
     * @param {any} data The data to store
     */
    setData(userId, data) {
        localStorage.setItem(`stored-data-user-${userId}`, JSON.stringify(data));
    }

    /**
     * Clears all data associated with a specific user. NOTE: This is provided to help with development, and is not required in the final code
     *
     * @param {string} userId The user id to clear associated data for
     */
    clearData(userId) {
        localStorage.removeItem(`stored-data-user-${userId}`);
    }
}