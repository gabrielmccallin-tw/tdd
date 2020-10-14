const startupData = [
    { name: "more hugs", state: true },
    { name: "water plants", state: true },
    { name: "Amazon delivery", state: false },
    { name: "Decide where to go on holiday", state: false }
];

export const init = (seed?: any) => {
    const data = seed || startupData;
    return {
        updateTasklist: (next: {name: string, state: boolean}) => {
            // if name prp is the same then overwrite with the incoming item
            Object.assign(data, data.map((current: {name: string, state: boolean}) => current.name === next.name ? next : current));
            return true;
        },
        getTasklist: () => {
            return data;
        }
    }
};

