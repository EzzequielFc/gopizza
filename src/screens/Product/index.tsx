import React, { useState } from "react";
import { Platform, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ButtonBack } from "../../components/ButtonBack";
import { Photo } from "../../components/Photo";
import { Input } from "../../components/Input";

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  PickImageButton,
  Upload,
  Form,
  InpuGroup,
  InputGroupHeader,
  Label,
  MaxCharacters,
} from "./style";
import { InputPrice } from "../../components/InputPrice";
import { Button } from "../../components/Button";

export function Product() {
  const [image, setImage] = useState();

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        // setImage(result.uri);
      }
    }
  }
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Header>
        <ButtonBack />

        <Title>Cadastrar</Title>

        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>

      <Upload>
        <Photo uri={image} />
        <PickImageButton
          onPress={handlePickerImage}
          title="Carregar"
          type="secondary"
        />
      </Upload>

      <Form>
        <InpuGroup>
          <Label>Nome</Label>
          <Input />
        </InpuGroup>

        <InpuGroup>
          <InputGroupHeader>
            <Label>Descrição</Label>
            <MaxCharacters>0 de 60 caracteres</MaxCharacters>
          </InputGroupHeader>
          <Input multiline maxLength={60} style={{ height: 80 }} />
        </InpuGroup>

        <InpuGroup>
          <Label>Tamanhos e preços</Label>

          <InputPrice size="P" />
          <InputPrice size="M" />
          <InputPrice size="G" />
        </InpuGroup>

        <Button title="Caastrar pizza" />
      </Form>
      </ScrollView>
    </Container>
  );
}
