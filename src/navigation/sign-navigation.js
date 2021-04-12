import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {MaterialIcons} from '@expo/vector-icons';

import {stackStyle} from '../styles';
import {SignIn} from '../screens/sign-in';
import {SignUp} from '../screens/sign-up';
import {MainNavigation} from './main-navigation';


const Stack = createStackNavigator();

const SignNavigation = (props) => {
    return (
        <Stack.Navigator
            initialRouteName={'signIn'}
            screenOptions={stackStyle}
        >
            {/* PRIHLASENIE begin */}
            <Stack.Screen
                name={'signIn'}
                component={SignIn}
                options={() => ({
                    title: 'Prihlásenie',
                    headerLeft: () => null
                })}
            />
            {/* PRIHLASENIE end */}
            {/* REGISTRACIA begin */}
            <Stack.Screen
                name={'signUp'}
                component={SignUp}
                options={{
                    title: 'Registrácia',
                    headerLeft: () => null
                }}
            />
            {/* REGISTRACIA end */}
            {/* PRIHLASENY begin */}
            <Stack.Screen
                name={'signedIn'}
                component={MainNavigation}
                options={{headerShown: false}}
            />
            {/* PRIHLASENY end */}
        </Stack.Navigator>
    )
}


export {SignNavigation}
