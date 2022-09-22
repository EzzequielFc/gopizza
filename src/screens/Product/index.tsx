import React, { useState } from "react";
import { Platform, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ProductNavigationProps } from "../../@types/navigation";

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

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;
  console.log("ID DO PRODUTO", id);

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
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

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
    .collection('pizzas')
    .add({
      name,
      name_insersitive:name.toLowerCase().trim(),
      description,
      prices_sizes: {
        p: priceSizeP,
        m: priceSizeM,
        g: priceSizeG
      },
      photo_url,
      photo_path: reference.fullPath
    })
    .then( () => Alert.alert("Cadastro", "Pizza cadastrada com sucesso."))
    .catch( () => Alert.alert("Cadastro", "Não foi possivel cadastradar a Pizza."))

    setIsLoading(false);
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
