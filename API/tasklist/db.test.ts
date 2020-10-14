import { init } from './db';

describe("db", () => {
    it("should get empty list", async () => {
        const { getTasklist } = init([]);
        const response = getTasklist();
        
        expect(response).toEqual([]);
    });

    it("should get tasks list", async () => {
        const fixture = [
            { name: "more hugs", state: true },
            { name: "no hugs 😢", state: true }
        ];

        const { getTasklist } = init(fixture);
        const response = getTasklist();
        
        expect(response).toEqual(fixture);
    });
});