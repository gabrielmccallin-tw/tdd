import fetchMock from "jest-fetch-mock";
import { init } from "./Tasklist";

const fixture = { body: { data: "12345" } };
const url = "";
const errorResponse = "database 💔";

describe("services", () => {
    const { get, update } = init(url);
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe("get tasks", () => {
        it("should get list of tasks", async () => {
            fetchMock.mockResponseOnce(JSON.stringify(fixture));
            const response = await get();

            expect(response).toEqual(fixture);
        });

        it("should throw if call is unsuccessful", async () => {
            fetchMock.mockRejectOnce(Error(errorResponse));

            try {
                await get();
            } catch (error) {
                expect(error).toEqual(Error(errorResponse));
            }
        });

        it("should throw if call is is in response range outside of 200 - 299", async () => {
            const status = 404;
            const statusText = "🔍";
            fetchMock.mockResponseOnce(JSON.stringify({}), { status, statusText });

            try {
                await get();
            } catch (error) {
                expect(error).toEqual(Error(`[ERROR] ${status} ${statusText}`));
            }
        });
    });

    describe("update tasks", () => {
        it("should return updated list on update of one task", async () => {
            const fixture = [{
                "name": "more hugs",
                "state": true
            }];

            fetchMock.mockResponseOnce(JSON.stringify(fixture));

            await update(fixture[0]);

            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(fetchMock.mock.calls[0][1]).toEqual({method: "POST", body: JSON.stringify(fixture[0])});
        });
    });
});