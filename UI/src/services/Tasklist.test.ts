import fetchMock from "jest-fetch-mock";
import { init } from "./Tasklist";

const fixture = { body: { data: "12345" } };
const url = "";
const body = { name: "Water plants", state: false };
const errorResponse = "database 💔";

describe("Services", () => {
    const { get, update } = init(url);
    beforeEach(() => {
        fetchMock.resetMocks();
    });
    it("should return data if call is successful", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(fixture));
        const response = await update(body);

        expect(response).toEqual(fixture);
    });

    it("should throw if call is unsuccessful", async () => {
        fetchMock.mockRejectOnce(new Error(errorResponse));

        try {
            await update(body);
        } catch (error) {
            expect(error).toEqual(Error(errorResponse));
        }
    });

    it.only("should throw if call is is in response range outside of 200 - 299", async () => {
        const status = 404;
        const statusText = "🔍";
        fetchMock.mockResponseOnce(JSON.stringify({}), { status, statusText });

        try {
            await update(body);
        } catch (error) {
            expect(error).toEqual(Error(`[ERROR] ${status} ${statusText}`));
        }
    });
});