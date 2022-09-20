import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

type AuthContextData = {

}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext( { } as AuthContextData );

function AuthProvider( { children } : AuthProviderProps) {

    async function signIn(email:string, password:string) {
        
    }

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider , useAuth };

