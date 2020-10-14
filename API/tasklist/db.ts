const startupData = [
    { name: "more hugs", state: true },
    { name: "water plants", state: true },
    { name: "Amazon delivery", state: false },
    { name: "Decide where to go on holiday", state: false }
];

export const init = (seed?: any) => {
    const data = seed || startupData;
    return {
        getTasklist: () => {
            return data;
        }
    }
};

