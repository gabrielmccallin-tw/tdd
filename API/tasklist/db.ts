export const init = (seed?: any) => {
    const data = seed || [];
    return {
        updateTasklist: (item: { name: string, state: boolean }) => {
            Object.assign(data, data.map(el => el.name === item.name ? item : el));
            return data;
        },
        getTasklist: () => {
            return data;
        }
    }
}
