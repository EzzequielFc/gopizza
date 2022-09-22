import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import happyEmoji from "../../assets/happy.png";
import { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Search } from "../../components/Search";
import {
  Container,
  Header,
  GreetinEmoji,
  GreetinText,
  Greeting,
  MenuHeader,
  MenuItensNumber,
  Title,
} from "./style";
import { ProductCard } from "../../components/ProductCard";

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

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItensNumber>10 pizzas</MenuItensNumber>
      </MenuHeader>

      <ProductCard
        data={{
          id: "1",
          name: "Pizza",
          description: "assajklfas",
          photo_url: "https://github.com/ezzequielfc.png",
        }}
      />
    </Container>
  );
}
