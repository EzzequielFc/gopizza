import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Container,
  Header,
  Photo,
  Sizes,
  Form,
  FormRow,
  InputGroup,
  Label,
  Price,
  Title,
} from "./style";

import { PIZZA_TYPES } from "../../utils/pizzaTypes";
import { useNavigation } from "@react-navigation/native";
import { ButtonBack } from "../../components/ButtonBack";
import { RadioButton } from "../../components/RadioButton";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Order() {
  const [size, setSize] = useState("");

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
        </Header>

        <Photo source={{ uri: "https://github.com/ezzequielfc.png" }} />

        <Form>
          <Title>Nome da Pizza</Title>
          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                selected={size === item.id}
                onPress={() => setSize(item.id)}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ 00,00</Price>

          <Button title="Confirmar pedido" />
        </Form>
      </ScrollView>
    </Container>
  );
}
