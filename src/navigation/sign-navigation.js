import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyle} from '../styles';
import {SignIn} from '../screens/sign-in';
import {SignUp} from '../screens/sign-up';
import {MainNavigation} from './main-navigation';

const Stack = createStackNavigator();

const SignNavigation = (props) => {
    return (
        <Stack.Navigator initialRouteName={'signIn'} screenOptions={stackStyle}>
            {/* SINGIN begin */}
            <Stack.Screen
                name={'signIn'}
                component={SignIn}
                options={() => ({
                    title: 'Prihlásenie',
                    headerShown: false
                })}
            />
            {/* SINGIN end */}
            {/* SIGNUP begin */}
            <Stack.Screen
                name={'signUp'}
                component={SignUp}
                options={{
                    title: 'Registrácia',
                }}
            />
            {/* SIGNUP end */}
            {/* ALREADY SIGNEDIN begin */}
            <Stack.Screen
                name={'signedIn'}
                component={MainNavigation}
                options={{headerShown: false}}
            />
            {/* ALREADY SIGNEDIN end */}
        </Stack.Navigator>
    )
}


export {SignNavigation}
