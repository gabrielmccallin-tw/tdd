import React from "react";
import Task from "../components/Task";

export type callbackType = ({
    name,
    state,
}: {
    name: string;
    state: boolean;
}) => void;

export default ({
    list,
    update
}: {
    list: { name: string; state: boolean }[];
    update: callbackType
}) => {
    const renderList = (list: { name: string; state: boolean }[]) => {
        return list.map(({ name, state }, index) => {
            return (
                <Task name={name} state={state} key={index} callback={update}/>
            );
        });
    };

    return <React.Fragment>{renderList(list)}</React.Fragment>;
};
