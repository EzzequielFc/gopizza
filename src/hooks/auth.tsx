import React, { createContext, useContext, useState, ReactNode } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

type AuthcontextData = {
  signIn: (email: string, password:string) => Promise<void>;
  isLogging: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthcontextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLoging] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha!");
    }

    setIsLoging(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        console.log(account);
      })
      .catch((error) => {
        const { code } = error;
      })
      .finally(() => setIsLoging(false));
  }

  return <AuthContext.Provider value={{signIn,isLogging}}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
