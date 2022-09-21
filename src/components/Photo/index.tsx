import * as React from 'react';

import { Image, Placeholder, Placeholdertitle } from './style';

type Props = {
    uri: string | null;
}

export function Photo( {uri} : Props) {
    if(uri) {
        return <Image source={{uri}} />
    }

    return (
        <Placeholder>
            <Placeholdertitle>Nenhuma foto {'\n'} carregada</Placeholdertitle>
        </Placeholder>
    )
}