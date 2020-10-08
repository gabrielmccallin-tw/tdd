import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { postTasks } from "../services/Tasklist";
/** @jsx jsx */

export default ({ name, state }: { name: string; state: boolean }) => {
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
    };

    const styleMarked = {
        name: {
            ...style.name,
            textDecoration: "line-through",
        },
    };

    const nameStyle = (state: boolean) => {
        return state ? styleMarked.name : style.name;
    };

    const checked = (state: boolean) => {
        return state ? (
            <div css={style.checked}>
                <i className="fas fa-check-circle"></i>
            </div>
        ) : (
            <div>
                <i className="far fa-circle"></i>
            </div>
        );
    };

    const [updatedState, setUpdateState] = useState(state);

    const clicked = () => {
        postTasks({ name, state: !updatedState });
        setUpdateState(!updatedState);
    };

    return (
        <li css={style.list} onClick={clicked}>
            <div css={style.task}>
                <div css={style.check}>{checked(updatedState)}</div>
                <div css={nameStyle(updatedState)}>{name}</div>
            </div>
            <hr css={style.margin} />
        </li>
    );
};
