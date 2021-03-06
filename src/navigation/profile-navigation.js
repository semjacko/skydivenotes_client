import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {MaterialIcons} from '@expo/vector-icons';

import {stackStyle, styleColors} from '../styles';
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
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }} >
                            <MaterialIcons name={'menu'} size={40} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { navigation.navigate('settings'); }} >
                            <MaterialIcons name={'edit'} size={30} color={styleColors.textColorSpecial} />
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
                    title: 'Nastavenia',
                    headerTitleAlign: 'center'
                }}
            />
            {/* Nastavenia end */}
        </Stack.Navigator>
    )
}


export {ProfileNavigation}
