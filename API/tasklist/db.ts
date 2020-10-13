const data = [
    { name: "more hugs", state: true },
    { name: "water plants", state: true },
    { name: "Amazon delivery", state: false },
    { name: "Decide where to go on holiday", state: false }
];

export const get = () => {
    return data;
};

const update = (item: { name: string, state: boolean }) => {
    Object.assign(data, data.map(el => el.name === item.name ? item : el));
    return data;
};

export const dbConnect = ({method, body}: {method: string, body?: any}) => {
    try {
        if (method === "POST") {
            update(body);
        }
        return get();
    } catch (error) {
        throw error;
    }
};
