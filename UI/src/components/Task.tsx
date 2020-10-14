import { jsx } from "@emotion/core";
import React from "react";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { callbackType } from "../view/Tasks";
/** @jsx jsx */

export default ({
    name,
    state,
    callback,
}: {
    name: string;
    state: boolean;
    callback?: callbackType;
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
        return <FaRegCircle color="lightgray" />;
    };

    const checked = () => {
        return <FaCheckCircle color="green" />;
    };

    return (
        <li css={style.list}>
            <div css={style.task}>
                <div css={style.check}>{toggleCheck(state)}</div>
                <div data-id="name" css={toggleNameStyle(state)}>
                    {name}
                </div>
            </div>
            <hr css={style.margin} />
        </li>
    );
};
