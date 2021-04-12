import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'
import {connect} from 'react-redux';

const RecordsContainer = (props) => {
    console.log(props);

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
                <Text onPress={() => props.dispatch({ type: 'UPDATE_TOKEN', token: 'TEST' })}>Zaznamy</Text>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

// Connect the screens to Redux
let Records = connect(state => ({ count: state.counter }))(RecordsContainer);

export {Records};