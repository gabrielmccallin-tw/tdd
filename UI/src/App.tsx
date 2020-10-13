import React, { useEffect, useState } from "react";
import { jsx, Global } from "@emotion/core";
import Tasks from "./view/Tasks";
import { init } from "./services/Tasklist";
/** @jsx jsx */

export default () => {
    const url = "http://localhost:7071/api/tasklist";

    const { getTaskList, updateTaskList } = init(url);
    const [list, setList] = useState([]);

    useEffect(() => {
        const getAPI = async () => {
            setList(await getTaskList());
        };

        getAPI();
    }, []);

    return (
        <React.Fragment>
            <Global
                styles={{
                    body: {
                        fontFamily: "Nunito",
                        fontSize: "1.2rem",
                    },
                }}
            />
            <ul
                css={{
                    margin: 0,
                    padding: 0,
                }}
            >
                <Tasks list={list} update={updateTaskList}/>
            </ul>
        </React.Fragment>
    );
};
