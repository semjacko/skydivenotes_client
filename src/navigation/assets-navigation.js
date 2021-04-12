import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';

import {stackStyle, tabStyle, styleColors} from '../styles';
import {Parachutes} from '../screens/parachutes';
import {Planes} from '../screens/planes';
import {Dropzones} from '../screens/dropzones';
import {Categories} from '../screens/categories';


const Tab = createBottomTabNavigator();

const AssetsNavigation = ({route}) => {
    return (
        <Tab.Navigator tabBarOptions={tabStyle}>
            {/* PADAKY begin */}
            <Tab.Screen
                name={'parachutes'}
                component={ParachutesTopMenu}
                options={{
                    title: 'Padáky',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name={'parachute'} size={30} color={color} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ fontSize: 12, color: color }}>Padáky</Text>
                    )
                }}
            />
            {/* PADAKY end */}
            {/* LETISKA begin */}
            <Tab.Screen
                name={'dropzones'}
                component={DropzonesTopMenu}
                options={{
                    title: 'Dropzóny',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name={'airport'} size={30} color={color} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ fontSize: 12, color: color }}>Letiská</Text>
                    )
                }}
            />
            {/* LETISKA end */}
            {/* LIETADLA begin */}
            <Tab.Screen
                name={'planes'}
                component={PlanesTopMenu}
                options={{
                    title: 'Lietadlá',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name={'airplane'} size={30} color={color} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ fontSize: 12, color: color }}>Lietadlá</Text>
                    )
                }}
            />
            {/* LIETADLA end */}
            {/* KATEGORIE begin */}
            <Tab.Screen
                name={'categories'}
                component={CategoriesTopMenu}
                options={{
                    title: 'Kategórie',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name={'category'} size={30} color={color} />
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text style={{ fontSize: 12, color: color }}>Kategórie</Text>
                    )
                }}
            />
            {/* KATEGORIE end */}
        </Tab.Navigator>
    );
}


const Stack = createStackNavigator();

const ParachutesTopMenu = ({route}) => {
    return (
        <Stack.Navigator screenOptions={stackStyle}>
            {/* MOJE begin */}
            <Stack.Screen
                name={'parachutesStack'}
                component={Parachutes}
                options={({navigation}) => ({
                    title: 'Moje padáky',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }} >
                            <MaterialIcons name={'menu'} size={40} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit(`AddParachutePressed`) }} >
                            <MaterialIcons name={'add'} size={30} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    )
                })}
            />
            {/* MOJE end */}
        </Stack.Navigator>
    );
}

const DropzonesTopMenu = ({route}) => {
    return (
        <Stack.Navigator screenOptions={stackStyle}>
            {/* MOJE begin */}
            <Stack.Screen
                name={'dropzonesStack'}
                component={Dropzones}
                options={({navigation}) => ({
                    title: 'Moje letiská',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }} >
                            <MaterialIcons name={'menu'} size={40} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit(`AddDropzonePressed`) }} >
                            <MaterialIcons name={'add'} size={30} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    )
                })}
            />
            {/* MOJE end */}
        </Stack.Navigator>
    );
}

const PlanesTopMenu = ({route}) => {
    return (
        <Stack.Navigator screenOptions={stackStyle}>
            {/* MOJE begin */}
            <Stack.Screen
                name={'planesStack'}
                component={Planes}
                options={({navigation}) => ({
                    title: 'Moje lietadlá',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }} >
                            <MaterialIcons name={'menu'} size={40} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit(`AddPlanePressed`) }} >
                            <MaterialIcons name={'add'} size={30} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    )
                })}
            />
            {/* MOJE end */}
        </Stack.Navigator>
    );
}
const CategoriesTopMenu = ({route}) => {
    return (
        <Stack.Navigator screenOptions={stackStyle}>
            {/* MOJE begin */}
            <Stack.Screen
                name={'categoriesStack'}
                component={Categories}
                options={({navigation}) => ({
                    title: 'Moje kategórie',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }} >
                            <MaterialIcons name={'menu'} size={40} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit(`AddCategoryPressed`) }} >
                            <MaterialIcons name={'add'} size={30} color={styleColors.textColorSpecial} />
                        </TouchableOpacity>
                    )
                })}
            />
            {/* MOJE end */}
        </Stack.Navigator>
    );
}


export {AssetsNavigation}
