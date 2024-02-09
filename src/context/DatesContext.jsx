import { createContext, useState } from "react";

const DatesContext = createContext(null)

export function DatesContextProvider ({children}){

    const [dates, setDates] = useState([])

    return <DatesContext.Provider value={{dates, setDates}}>
        {children}
    </DatesContext.Provider>
}

export default DatesContext