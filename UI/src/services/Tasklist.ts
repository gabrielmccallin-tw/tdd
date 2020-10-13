import { taskType } from "../components/Task";

const errorCheck = async <T>(call: (args: T) => Promise<Response>, args: T) => {
    try {
        const response = await call(args);

        if (response.status >= 200 && response.status <= 299) {
            return await response.json();
        } else {
            const { statusText, status } = response;
            throw new Error(`[ERROR] ${status} ${statusText}`);
        }
    } catch (error) {
        throw error;
    }
}

const getTasks = async (url: string) => {
    return await fetch(url);
};

const updateTasks = async ({ url, body }: { url: string, body: taskType }) => {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    });
};

export const init = (url: string) => ({
    update: ({ name, state }: taskType) => {
        return errorCheck(updateTasks, { url, body: { name, state } })
    },
    get: () => {
        return errorCheck(getTasks, url);
    }
});