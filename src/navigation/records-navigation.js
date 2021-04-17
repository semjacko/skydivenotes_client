import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DeviceEventEmitter, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {RecordsDetail} from '../screens/records-detail';
import {Records} from '../screens/records';
import {stackStyle, styleColors} from '../styles';
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
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
                            <MaterialIcons name={'menu'} size={40} color={styleColors.textColorSpecial}/>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { navigation.navigate('recordsAdd'); }}>
                            <MaterialIcons name={'add'} size={30} color={styleColors.textColorSpecial}/>
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
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        // po stlaceni smetiaka sa emitne event DeleteRecordPressed ktory potom zachyti komponent RecordsDetail
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit('DeleteRecordPressed'); }}>
                            <MaterialIcons name={'delete'} size={30} color={styleColors.textColorSpecial}/>
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
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        // po stlaceni kazetky sa emitne savePressed event ktory potom zachyti komponent RecordsAdd
                        <TouchableOpacity onPress={() => { DeviceEventEmitter.emit('SaveRecordPressed'); }}>
                            <MaterialIcons name={'save'} size={30} color={styleColors.textColorSpecial}/>
                        </TouchableOpacity>)
                }}
            />
            {/* PRIDANIE ZAZNAMU end */}
        </Stack.Navigator>
    )
}


export {RecordsNavigation}
