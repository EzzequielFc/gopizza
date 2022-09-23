import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { UserStackRoutes } from './user.stack.routes';
import { SignIn } from '../screens/Signin';

export function Routes() {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {user ? <UserStackRoutes/> : <SignIn />}
        </NavigationContainer>
    )
}