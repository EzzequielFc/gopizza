import * as React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container, Button, ButtonClear, Input, InputArea } from "./style";
import theme from "../../theme";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onSearch, onClear, ...rest }: Props) {
    const { COLORS } = useTheme();
  return (
    <Container>
      <InputArea>
        <Input placeholder="pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
            <Feather name="x" size={16}/>
        </ButtonClear>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather name="search" size={16} color={COLORS.TITLE}/>
      </Button>
    </Container>
  );
}
