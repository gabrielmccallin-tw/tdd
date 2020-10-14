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
        const fixture = [
            { name: "more hugs", state: true },
            { name: "no hugs 😢", state: true }
        ];
        const { getTasklist, updateTasklist } = init(fixture);
        
        const newItem = { name: "more hugs", state: false };
        updateTasklist(newItem);

        expect(getTasklist()[0]).toEqual(newItem);
    });
});