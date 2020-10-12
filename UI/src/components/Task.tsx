import { jsx } from "@emotion/core";
import React, { useState } from "react";
/** @jsx jsx */

export type callbackType = ({name, state}:{name: string, state: boolean}) => void;

export default ({
    name,
    state,
    callback,
}: {
    name: string;
    state: boolean;
    callback: any;
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
        return (<i css={style.unchecked} className="far fa-circle"></i>);
    };

    const [updatedState, setUpdateState] = useState(state);

    const clicked = () => {
        callback({ name, state: !updatedState });
        setUpdateState(!updatedState);
    };

    const checked = () => {
        return (<i css={style.checked} className="fas fa-check-circle"></i>);
    };

    return (
        <li css={style.list} onClick={clicked}>
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
