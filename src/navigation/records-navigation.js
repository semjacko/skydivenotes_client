import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DeviceEventEmitter, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {RecordsDetail} from '../screens/records-detail';
import {Records} from '../screens/records';
import {stackStyle} from '../styles';
import {RecordsAdd} from "../screens/records-add";


const Stack = createStackNavigator();

const RecordsNavigation = ({route}) => {
    return (
        <Stack.Navigator
            initialRouteName={'records'}
            screenOptions={stackStyle}
        >
            {/* ZAZNAMY begin */}
            <Stack.Screen
                name={'records'}
                component={Records}
                options={({navigation}) => ({
                    title: 'Záznamy',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
                            <MaterialIcons name={'menu'} size={40} color={'#000000'}/>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { navigation.navigate('recordsAdd'); }}>
                            <MaterialIcons name={'add'} size={30} color={'#000000'}/>
                        </TouchableOpacity>
                    )
                })}
            />
            {/* ZAZNAMY end */}
            {/* DETAIL ZAZNAMU begin */}
            <Stack.Screen
                name={'recordsDetail'}
                component={RecordsDetail}
                options={ () => ({
                    title: 'Detail záznamu',
                    headerRight: () => (
                        // po stlaceni smetiaka sa emitne event DeleteRecordPressed ktory potom zachyti komponent RecordsDetail
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit('DeleteRecordPressed'); }}>
                            <MaterialIcons name={'delete'} size={30} color={'#000000'}/>
                        </TouchableOpacity>)
                })}
            />
            {/* DETAIL ZAZNAMU end */}
            {/* PRIDANIE ZAZNAMU begin */}
            <Stack.Screen
                name={'recordsAdd'}
                component={RecordsAdd}
                options={{
                    title: 'Pridanie záznamu',
                    headerRight: () => (
                        // po stlaceni kazetky sa emitne savePressed event ktory potom zachyti komponent RecordsAdd
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit('SaveRecordPressed'); }}>
                            <MaterialIcons name={'save'} size={30} color={'#000000'}/>
                        </TouchableOpacity>)
                }}
            />
            {/* PRIDANIE ZAZNAMU end */}
        </Stack.Navigator>
    )
}


export {RecordsNavigation}