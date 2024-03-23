import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)

    return(
        <AuthContext.Provider value={{'name': 'Sravan'}}>
            {children}
        </AuthContext.Provider>
    )
}