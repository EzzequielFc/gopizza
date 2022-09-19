import React from "react";

import AppLoading from "expo-app-loading"; // segurar a tela de splash
import { StatusBar } from "expo-status-bar";

import { ThemeProvider } from "styled-components/native";
import { AuthProvider, useAuth } from "./src/hooks/auth";

import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";

import theme from "./src/theme";

import { SignIn } from "./src/screens/Signin";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </ThemeProvider>
  );
}
