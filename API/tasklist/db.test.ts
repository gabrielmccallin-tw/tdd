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
    
    it("should update a task", async () => {
        const { updateTasklist } = init([{ name: "more hugs", state: true }]);
        const body = { name: "more hugs", state: false };

        // returns whole list from db
        const response = updateTasklist(body);

        expect(response).toEqual([{ name: "more hugs", state: false }]);
    });
});