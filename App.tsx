import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as SplashCreen from "expo-splash-screen"; // segurar tela de splash

import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";

import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";

import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import * as Font from "expo-font";
import theme from "./src/theme";


import { AuthProvider, useAuth } from "./src/hooks/auth";
import { Routes } from "./src/routes";
import { Order } from "./src/screens/Order";

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
      <StatusBar/>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Order />
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
}
