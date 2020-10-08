export const getTasks = async () => {
    const response = await fetch("http://localhost:7071/api/tasklist");

    return await response.json();
};

export const postTasks = async (body: any) => {
    const response = await fetch("http://localhost:7071/api/tasklist", {
        method: "POST",
        body: JSON.stringify(body)
    });

    return await response.json();
};
