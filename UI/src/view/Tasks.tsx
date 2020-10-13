import React from "react";
import Task from "../components/Task";

export default ({
    list
}: {
    list: { name: string; state: boolean }[];
}) => {
    const renderList = (list: { name: string; state: boolean }[]) => {
        return list.map(({ name, state }, index) => {
            return (
                <Task name={name} state={state} key={index} />
            );
        });
    };

    return <React.Fragment>{renderList(list)}</React.Fragment>;
};
