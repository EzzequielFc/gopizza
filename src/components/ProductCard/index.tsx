import * as React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Content,
  Description,
  Details,
  Image,
  Line,
  Name,
  Identification,
} from "./style";

export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

type Props = TouchableOpacityProps & {
  data: ProductProps;
};

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  );
}
