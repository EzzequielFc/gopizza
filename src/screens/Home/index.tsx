import React, { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import happyEmoji from "../../assets/happy.png";
import { useTheme } from "styled-components/native";
import { TouchableOpacity, Alert, FlatList } from "react-native";
import { Search } from "../../components/Search";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  GreetinEmoji,
  GreetinText,
  Greeting,
  MenuHeader,
  MenuItensNumber,
  Title,
  NewProductButton,
} from "./style";
import { ProductCard, ProductProps } from "../../components/ProductCard";

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");

  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insersitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'product' : 'order';
    navigation.navigate(route,{ id });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetinEmoji source={happyEmoji} />
          <GreetinText>Olá, Admin</GreetinText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons
            name="logout"
            color={COLORS.TITLE}
            size={24}
            onPress={signOut}
          />
        </TouchableOpacity>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItensNumber>{pizzas.length} pizzas</MenuItensNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      {
        user?.isAdmin &&
        <NewProductButton
          title="Cadastrar Pizza 🍕"
          type="secondary"
          onPress={handleAdd}
        />
      }
    </Container>
  );
}
