import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'

const Parachutes = ({route}) => {
    console.log(`${route.name}:${route.params?.token}`);

    //TODO data z databazy
    /*useEffect(() => {
        fetch(`http://18.196.156.172/user`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            })
            .catch((err) => console.log(err));
    }, [])*/

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.page}>
                <StatusBar backgroundColor={styleColors.mainColor} barStyle="light-content"/>
                <Text>Padaky</Text>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}


export {Parachutes};