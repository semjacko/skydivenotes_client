import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {MaterialIcons} from '@expo/vector-icons';

import {stackStyle} from '../styles';
import {Settings} from '../screens/settings';
import {Profile} from '../screens/profile';


const Stack = createStackNavigator();

const ProfileNavigation = ({route}) => {
    return (
        <Stack.Navigator
            initialRouteName={'profile'}
            screenOptions={stackStyle}
        >
            {/* PROFIL begin */}
            <Stack.Screen
                name={'profile'}
                component={Profile}
                options={({navigation}) => ({
                    title: 'Profil',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }} >
                            <MaterialIcons name={'menu'} size={40} color={'#000000'} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { navigation.navigate('settings'); }} >
                            <MaterialIcons name={'edit'} size={30} color={'#000000'} />
                        </TouchableOpacity>
                    )
                })}
            />
            {/* PROFIL end */}
            {/* Nastavenia begin */}
            <Stack.Screen
                name={'settings'}
                component={Settings}
                options={{
                    title: 'Nastavenia'
                }}
            />
            {/* Nastavenia end */}
        </Stack.Navigator>
    )
}


export {ProfileNavigation}
