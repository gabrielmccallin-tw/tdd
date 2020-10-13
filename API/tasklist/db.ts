export const data = [
    { name: "more hugs", state: true },
    { name: "water plants", state: true },
    { name: "Amazon delivery", state: false },
    { name: "Decide where to go on holiday", state: false }
];

export const get = () => {
    return data;
};

export const update = (item: { name: string, state: boolean }) => {
    Object.assign(data, data.map(el => el.name === item.name ? item : el))
    return data;
}
