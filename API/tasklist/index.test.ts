import { Context, HttpRequest } from "@azure/functions";
import endpoint from './index';
import { get } from './db';

const context = {
    log: (message: string) => {
        console.log(message)
    }
};

describe("integration test", () => {
    it("should get all tasks", async () => {
        await endpoint(context as Context, { method: "GET" } as HttpRequest);
        expect(context['res']['body']).toEqual(JSON.stringify(get()));
    });

    it("should update a task", async () => {
        const body = { name: "more hugs", state: false };

        await endpoint(context as Context, { method: "POST", body } as HttpRequest);

        const response = JSON.parse(context['res']['body']);
        const state = response[0].state;
        expect(state).toEqual(false);
    });
});