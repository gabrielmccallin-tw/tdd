import React, { useEffect, useState } from "react";
import { css, jsx, Global } from "@emotion/core";
import Task from "./components/Task";
import { getTasks } from "./services/Tasklist";
/** @jsx jsx */

export default () => {
    const [list, setList] = useState([]);

    const renderList = (list: { name: string; state: boolean }[]) => {
        return list.map(({ name, state }) => {
            return <Task name={name} state={state} />;
        });
    };

    useEffect(() => {
        const getAPI = async () => {
            setList(await getTasks());
        };

        getAPI();
    }, []);

    return (
        <React.Fragment>
            <Global
                styles={{
                    body: {
                        fontFamily: "Nunito",
                        fontSize: "1.2rem"
                    },
                }}
            />
            <ul
                css={css({
                    margin: 0,
                    padding: 0,
                })}
            >
                {renderList(list)}
            </ul>
        </React.Fragment>
    );
};
