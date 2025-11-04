import assert from "node:assert";
import test from "node:test";
//mock local storage with node module
import { LocalStorage } from "node-localstorage";
globalThis.localStorage = new LocalStorage("./scratch");

import { Model } from "./model.mjs";
const model = new Model();

test("Add bookmark function check", () => {
    const bookmark = {
        url: "test-url",
        title: "test-title",
        description: "test-description",
        date: new Date(2024, 2, 10, 2, 30)//just for example
    }
    const userId = "0"//non existent user
    model.clearData(userId);//clear test data
    const data = model.addBookmark(userId, bookmark);//when model adds bookmark it returns all data for that user
    assert.deepStrictEqual(data, [{ url: "test-url", title: "test-title", description: "test-description", date: '2024-03-10T00:30:00.000Z' }]);
    model.clearData(userId);//clear test data
});