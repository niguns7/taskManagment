import {createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskContectProvider = ({children}) => {
    const [initialmonth, setInitialmonth] = useState("");
    const [initialyear, setInitialyear] = useState("");
    // const [selected, setSelected] = useState(false)

    return (
        <TaskContext.Provider  value={{
            setInitialmonth,
            initialmonth,
            setInitialyear,
            initialyear,
            // setSelected,
            // selected
          }}>
        {children}
        </TaskContext.Provider>
    );

}

