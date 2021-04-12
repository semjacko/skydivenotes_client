import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Dimensions, Image, View} from 'react-native';
import React from 'react';
import {Entypo, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

import {styles, styleColors} from '../styles';
import {ProfileNavigation} from './profile-navigation';
import {RecordsNavigation} from './records-navigation';
import {AssetsNavigation} from './assets-navigation';


const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            {/* OBRAZOK PADAJ begin */}
            <Image
                style={{
                    width: 110,
                    height: 60,
                    resizeMode: 'contain',
                    marginLeft: 10,
                    marginBottom: 30,
                }}
                source={require('../../assets/padaj.png')}
            />
            {/* OBRAZOK PADAJ end */}
            {/* NAVIGACIA begin */}
            <DrawerItemList
                {...props}
                activeTintColor={'white'}
                inactiveTintColor={'black'}
                activeBackgroundColor={styleColors.mainColor}
            />
            {/* NAVIGACIA end */}
            {/* CIARA begin */}
            <View style={{height: 1, backgroundColor: styleColors.grayColor, marginTop: 10, marginBottom: 10}} />
            {/* CIARA end */}
        </DrawerContentScrollView>
    );
}


const MainNavigation = ({route}) => {
    return (
        <Drawer.Navigator
            initialRouteName="profile"
            drawerContent={(props) => (
                <CustomDrawerContent {...props}/>
            )}
            edgeWidth={Dimensions.get('window').width / 3}
            drawerStyle={styles.sideMenu}
        >
            {/* PROFIL begin */}
            <Drawer.Screen
                name={'profile'}
                component={ProfileNavigation}
                options={{
                    title: 'Profil',
                    drawerIcon:({ color, size }) => (
                        <MaterialIcons color={color} size={size} name={'person'} />
                    ),
                }}
            />
            {/* PROFIL end */}
            
            {/*
            {/* ZAZNAMY begin 
            <Drawer.Screen
                name={'records'}
                component={RecordsNavigation}
                options={{
                    title: 'Záznamy',
                    drawerIcon:({ color, size }) => (
                        <Entypo color={color} size={size} name={'text-document'} />
                    )
                }}
            />
            {/* ZAZNAMY end 
            {/* MOJE begin 
            <Drawer.Screen
                name={'assets'}
                component={AssetsNavigation}
                options={{
                    title: 'Moje',
                    drawerIcon:({ color, size }) => (
                        <MaterialCommunityIcons color={color} size={size} name={'bag-personal'} />
                    )
                }}
            />
            {/* MOJE end */}
            {/* ODHLASIT begin */}
            {/* TODO */}
            {/* ODHLASIT end */}
        </Drawer.Navigator>
    );
}


export {MainNavigation}
