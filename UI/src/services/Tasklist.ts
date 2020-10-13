import { taskType } from "../components/Task";

const getTasks = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
};

const postTasks = async ({ url, body }: { url: string, body: taskType }) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body)
        });

        if (response.status >= 200 && response.status <= 299) {
            return await response.json();
        } else {
            const { statusText, status } = response;
            throw new Error(`[ERROR] ${status} ${statusText}`);
        }
    } catch (error) {
        throw error;
    }
};

export const init = (url: string) => ({
    update: ({ name, state }: taskType) => {
        return postTasks({ url, body: { name, state } })
    },
    get: () => {
        return getTasks(url);
    }
});