import assert from "node:assert";
import test from "node:test";
//mock local storage with node module
import { LocalStorage } from "node-localstorage";
globalThis.localStorage = new LocalStorage("./scratch");

import { Model } from "./model.mjs";
const model = new Model();

test("Valid bookmark must be added with all fields", () => {
    const bookmark = {
        url: "https://www.test-url",
        title: "test-title",
        description: "test-description",
        date: new Date(2024, 2, 10, 2, 30)//just for example
    }
    const userId = "0";//non existent user
    model.clearData(userId);//clear test data
    const data = model.addBookmark(userId, bookmark);//when model adds bookmark it returns all data for that user
    assert.deepStrictEqual(data, [{ url: "https://www.test-url", title: "test-title", description: "test-description", date: '2024-03-10T00:30:00.000Z' }]);
    model.clearData(userId);//clear test data
});

test("A bookmark with empty fields must not be added", () => {
    const userId = "0";
    model.clearData(userId);

    const bookmarkNoFields = {
        url: "",
        title: "",
        description: "",
        date: new Date(2024, 2, 10, 2, 30)
    }
    let data = model.addBookmark(userId, bookmarkNoFields);
    assert.deepStrictEqual(data, []);
    model.clearData(userId);

    const bookmarkNoUrl = {
        url: "",
        title: "test-title",
        description: "test-description",
        date: new Date(2024, 2, 10, 2, 30)
    }

    data = model.addBookmark(userId, bookmarkNoUrl);
    assert.deepStrictEqual(data, []);
    model.clearData(userId);

    const bookmarkNoTitle = {
        url: "https://www.test-url",
        title: "",
        description: "test-description",
        date: new Date(2024, 2, 10, 2, 30)
    }
    data = model.addBookmark(userId, bookmarkNoTitle);
    assert.deepStrictEqual(data, []);
    model.clearData(userId);

    const bookmarkNoDescription = {
        url: "https://www.test-url",
        title: "test-title",
        description: "",
        date: new Date(2024, 2, 10, 2, 30)
    }
    data = model.addBookmark(userId, bookmarkNoDescription);
    assert.deepStrictEqual(data, []);
    model.clearData(userId);
});

test("A bookmark empty fields check", () => {
    const userId = "0";
    model.clearData(userId);

    const bookmark = {
        url: "https://www.test-url",
        title: "test-title",
        description: "test-description",
        date: new Date(2024, 2, 10, 2, 30)//just for example
    }
    assert.equal(model.isFieldsFilled(bookmark), true);

    const bookmarkNoFields = {
        url: "",
        title: "",
        description: "",
        date: new Date(2024, 2, 10, 2, 30)
    }
    assert.throws(
        () => { model.isFieldsFilled(bookmarkNoFields); },
        { message: "All field are required!" }
    );
});

test("A bookmark with invalid url must not be added", () => {
    const bookmark = {
        url: "invalid - url",
        title: "test-title",
        description: "test-description",
        date: new Date(2024, 2, 10, 2, 30)
    }
    const userId = "0";
    model.clearData(userId);
    const data = model.addBookmark(userId, bookmark);
    assert.deepStrictEqual(data, []);
    model.clearData(userId);
});

test("Url validation check", () => {
    let url = "https://www.test-url";
    assert.equal(model.isValidUrl(url), true);
    url = "invalid - url";
    assert.throws(
        () => { model.isValidUrl(url); },
        { message: "Bookmark link must be a valid url!" }
    );
});