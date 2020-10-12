import { enableFetchMocks } from "jest-fetch-mock/types";
import { postTasks } from "./Tasklist";
// import fetchMock from "jest-fetch-mock";

describe("Services", () => {

    it.only("should return 200 if call is successful", async () => {
        // fetchMock.mockResponse(JSON.stringify({ data: '12345' }))

        const url = 'http://localhost:7071/api/tasklist';
        const body = { name: "Water plants", status: false };
        const response = await postTasks({ url, body });

        expect(response.status).toEqual(200);

    })
});