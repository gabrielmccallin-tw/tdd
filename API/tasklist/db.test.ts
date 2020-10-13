import { dbConnect, get } from './db';

describe("db", () => {
    it("should get all tasks", async () => {
        const method = "GET";
        const response = dbConnect({ method });

        expect(response).toEqual(get());
    });
    
    it("should update a task", async () => {
        const method = "POST";
        const body = { name: "more hugs", state: false };
        
        const response = dbConnect({ method, body });
    
        expect(response[0].state).toEqual(false);
    });
});