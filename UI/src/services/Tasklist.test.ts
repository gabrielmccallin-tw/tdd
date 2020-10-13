import fetchMock from "jest-fetch-mock";
import { init } from "./Tasklist";

const fixture = { body: { data: "12345" } };
const url = "";
const errorResponse = "database 💔";

describe("services", () => {
    const { getTaskList, updateTaskList } = init(url);
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe("get tasks", () => {
        it("should get list of tasks", async () => {
            fetchMock.mockResponseOnce(JSON.stringify(fixture));
            const response = await getTaskList();

            expect(response).toEqual(fixture);
        });

        it("should throw if call is unsuccessful", async () => {
            fetchMock.mockRejectOnce(Error(errorResponse));

            try {
                await getTaskList();
            } catch (error) {
                expect(error).toEqual(Error(errorResponse));
            }
        });

        it("should throw if call is is in response range outside of 200 - 299", async () => {
            const status = 404;
            const statusText = "🔍";
            fetchMock.mockResponseOnce(JSON.stringify({}), { status, statusText });

            try {
                await getTaskList();
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

            await updateTaskList(fixture[0]);

            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(fetchMock.mock.calls[0][1]).toEqual({method: "POST", body: JSON.stringify(fixture[0])});
        });

        it("should throw if call is unsuccessful", async () => {
            const fixture = {
                "name": "more hugs",
                "state": true
            };

            fetchMock.mockRejectOnce(Error(errorResponse));

            try {
                await updateTaskList(fixture);
            } catch (error) {
                expect(error).toEqual(Error(errorResponse));
            }
        });

        it("should throw if call is is in response range outside of 200 - 299", async () => {
            const fixture = {
                "name": "more hugs",
                "state": true
            };

            const status = 404;
            const statusText = "🔍";
            fetchMock.mockResponseOnce(JSON.stringify({}), { status, statusText });

            try {
                await updateTaskList(fixture);
            } catch (error) {
                expect(error).toEqual(Error(`[ERROR] ${status} ${statusText}`));
            }
        });
    });
});