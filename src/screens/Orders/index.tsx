import * as React from 'react';
import { FlatList } from 'react-native';

import { Container,Header,Title } from './style';
import { OrderCard } from '../../components/OrderCard';
import { ItemSeparator } from '../../components/ItemSeparator';

export function Orders() {
    return (
        <Container>
            <Header>
                <Title>Pedidos Feitos</Title>
            </Header>

            <FlatList 
                data={['1','2','3']}
                keyExtractor={item => item}
                renderItem={({item, index}) => (
                    <OrderCard  index={index}/>
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />


        </Container>
    )
}