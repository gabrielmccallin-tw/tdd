import { jsx } from "@emotion/core";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
/** @jsx jsx */

export type taskType = {
    name: string;
    state: boolean;
};

export type callbackType = ({ name, state }: taskType) => void;

export default ({
    name,
    state,
    callback,
}: {
    name: string;
    state: boolean;
    callback: callbackType;
}) => {
    const style = {
        list: {
            margin: "1rem",
            listStyle: "none",
            cursor: "pointer",
        },
        task: {
            display: "flex",
            alignItems: "center",
        },
        margin: {
            marginBottom: "1rem",
            marginTop: "1rem",
            border: "1px solid #f3f3f3",
        },
        name: {
            color: "darkslategrey",
        },
        check: {
            marginRight: "1rem",
            transform: "translate(0px, 2px)",
        },
        checked: {
            color: "green",
        },
        unchecked: {
            color: "lightgrey",
        },
    };

    const styleMarked = {
        name: {
            ...style.name,
            textDecoration: "line-through",
        },
    };

    const toggleNameStyle = (state: boolean) => {
        return state ? styleMarked.name : style.name;
    };

    const toggleCheck = (state: boolean) => {
        return state ? checked() : unchecked();
    };

    const unchecked = () => {
        return <FaCheckCircle color="green"/>;
    };

    const checked = () => {
        return <FaRegCircle color="lightgray"/>;
    };

    const [updatedState, setUpdateState] = useState(state);

    const clickHandler = () => {
        const newState = !updatedState;
        callback({name, state: newState});
        setUpdateState(newState);
    };

    return (
        <li css={style.list} onClick={clickHandler}>
            <div css={style.task}>
                <div css={style.check}>{toggleCheck(updatedState)}</div>
                <div data-id="name" css={toggleNameStyle(updatedState)}>
                    {name}
                </div>
            </div>
            <hr css={style.margin} />
        </li>
    );
};
