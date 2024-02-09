import { createContext, useState } from "react";

const UserContext = createContext({
    loged:false,
    userId: undefined,
    admin: false,
    name: ''
})

export function UserContextProvider ({children}) {

    const [user, setUser] = useState({ 
        loged: false,
        userId: null,
        admin: false,
        name: ''
    })

    return <UserContext.Provider value={{user, setUser}} >
        {children}
    </UserContext.Provider>

}

export default UserContext