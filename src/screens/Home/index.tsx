import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import happyEmoji from "../../assets/happy.png";
import { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";

import {
  Container,
  Header,
  GreetinEmoji,
  GreetinText,
  Greeting,
} from "./style";


export function Home() {
  const { COLORS } = useTheme();
  return (
    <Container>
      <Header>
        <Greeting>
          <GreetinEmoji source={happyEmoji} />
          <GreetinText>Olá, Admin</GreetinText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
    </Container>
  );
}
