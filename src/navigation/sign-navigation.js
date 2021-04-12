import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyle} from '../styles';
import {SignIn} from '../screens/sign-in';
import {SignUp} from '../screens/sign-up';
import {MainNavigation} from './main-navigation';
import {Ionicons} from '@expo/vector-icons';

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
                options={({navigation}) => ({
                    title: null,
                    headerLeft: () => (
                        <TouchableOpacity 
                            style={{flexDirection: 'row', alignItems: 'center'}} 
                            onPress={() => { navigation.goBack(); }}
                        >
                            <Ionicons name="chevron-back" size={30} color={'#ffffff'}/>
                            <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 16, marginLeft: -4, marginBottom: 3}}>prihlásenie</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
            {/* SIGNUP end */}
            {/* ALREADY SIGNEDIN begin */}
            <Stack.Screen
                name={'signedIn'}
                component={MainNavigation}
                options={{headerShown: false, headerTitleAlign: 'center'}}
            />
            {/* ALREADY SIGNEDIN end */}
        </Stack.Navigator>
    )
}


export {SignNavigation}
