import React from "react";
import Task from "../components/Task";

export default ({
    list,
    update,
}: {
    list: { name: string; state: boolean }[];
    update: any;
}) => {
    const renderList = (list: { name: string; state: boolean }[]) => {
        return list.map(({ name, state }, index) => {
            return (
                <Task name={name} state={state} callback={update} key={index} />
            );
        });
    };

    return <React.Fragment>{renderList(list)}</React.Fragment>;
};
