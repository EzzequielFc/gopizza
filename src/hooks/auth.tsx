import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLogging: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = "@gopizza:users";

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha.");
    }

    setIsLogging(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };

              await AsyncStorage.setItem(
                USER_COLLECTION,
                JSON.stringify(userData)
              );
              setUser(userData);
            }
          })
          .catch(() =>
            Alert.alert("Login", "Não foi possivel achar os dados do usuario")
          );
      })
      .catch((error) => {
        const { code } = error;

        if (code === "auth/user-not-found" || code == "auth/wrong-password") {
          return Alert.alert("Login", "E-mail e/ou senha inválida.");
        } else {
          return Alert.alert("Login", "Não foi possível realizar o login");
        }
      })
      .finally(() => setIsLogging(false));
  }

  async function loadUserStorageData() {
    setIsLogging(true);

    const storadUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storadUser) {
      const userData = JSON.parse(storadUser) as User;
      console.log(userData);
      setUser(userData);
    }

    setIsLogging(false);
  }

  async function signOut() {
    await auth().signOut(); 
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }
  
  useEffect( () => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isLogging,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
