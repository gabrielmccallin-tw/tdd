import { Context, HttpRequest } from "@azure/functions";
import endpoint from './index';
import { data } from './db';

const context = {
    log: (message: string) => {
        console.log(message)
    }
};

describe("integration test", () => {
    it("should get all tasks", async () => {
        await endpoint(context as Context, { method: "GET" } as HttpRequest);
        expect(context['res']['body']).toEqual(data);
    });

    it("should get all tasks", async () => {
        await endpoint(context as Context, { method: "GET" } as HttpRequest);
        expect(context['res']['body']).toEqual(data);
    });
});