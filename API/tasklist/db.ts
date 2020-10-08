const data = [
    { name: "hugs with Hugs", state: true },
    { name: "Water plants", state: true },
    { name: "Amazon delivery", state: false },
    { name: "Decide where to go for holiday with Hugs", state: false }
];

export const get = () => {
    return data;
};

export const update = (item: { name: string, state: boolean }) => {
    Object.assign(data, data.map(el => el.name === item.name ? item : el))
    return data;
}
