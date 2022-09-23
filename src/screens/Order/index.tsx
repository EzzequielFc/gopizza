import React, { useState } from "react";
import { Container, Header, Photo, Sizes } from "./style";

import { PIZZA_TYPES } from "../../utils/pizzaTypes";

import { ButtonBack } from "../../components/ButtonBack";
import { RadioButton } from "../../components/RadioButton";

export function Order() {
  const [size, setSize] = useState("");
  return (
    <Container>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>

      <Photo source={{ uri: "https://github.com/ezzequielfc.png" }} />

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
    </Container>
  );
}
