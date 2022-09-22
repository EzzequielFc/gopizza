import React, { useState } from "react";
import { Platform, TouchableOpacity, ScrollView, Alert } from "react-native";
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
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleAdd() {
    if(!name.trim()) {
      return Alert.alert("Cadastro","Informe o nome da pizza.");
    }

    if(!description.trim()) {
      return Alert.alert("Cadastro","Informe a descrição da pizza.");
    }

    if(!image) {
      return Alert.alert("Cadastro","Seleciona a imagem da pizza.");
    }

    if(!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert("Cadastro","Informe o preço de todos os tamanhos dapizza.");
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
            <Input onChangeText={setName} value={name} />
          </InpuGroup>

          <InpuGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InpuGroup>

          <InpuGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />

            <InputPrice
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />

            <InputPrice
              size="G"
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InpuGroup>

          <Button
            title="Caastrar pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
