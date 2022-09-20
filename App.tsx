import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as SplashCreen from "expo-splash-screen"; // segurar tela de splash

import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";

import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";

import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import * as Font from "expo-font";
import theme from "./src/theme";

import { SignIn } from "./src/screens/Signin";
import { AuthProvider, useAuth } from "./src/hooks/auth";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashCreen.preventAutoHideAsync();
        await Font.loadAsync({ DMSans_400Regular, DMSerifDisplay_400Regular });
      } catch {
        // handle error
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashCreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
}
