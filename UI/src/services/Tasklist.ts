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

const updateTasks = async ({ url, body }: { url: string, body: { name: string, state: boolean } }) => {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    });
};

export const init = (url: string) => ({
    updateTaskList: ({ name, state }: { name: string, state: boolean }) => {
        return errorCheck(updateTasks, { url, body: { name, state } })
    },
    getTaskList: () => {
        return errorCheck(getTasks, url);
    }
});