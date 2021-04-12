import React, {useEffect, useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {styleColors, styles} from '../styles';
import {Ionicons} from '@expo/vector-icons';


// po potvrdeni vola fuknciu onAdd a vklada do nej input (ak nie je prazdny)
const ModalAdd = ({isVisible, setIsVisible, title, onAdd}) => {
    let textInput = React.createRef();
    let [inp, setInp] = useState('');

    // aby sa vzdy po objaveni modalu inicializoval input
    useEffect(() => {
        setInp('')
    }, [isVisible]);

    return (
        <Modal
            animationType="fade"
            visible={isVisible}
            onShow={() => {
                textInput.current.focus();
            }}
        >
            <View style={styles.centeredModal}>
                <View style={styles.modalView}>
                    <View style={{alignSelf: 'stretch', alignItems: 'flex-end'}}>
                        <TouchableOpacity
                            style={{alignSelf: 'flex-end'}}
                            onPress={() => {
                                setIsVisible(!isVisible);
                            }}
                        >
                            <Ionicons name="close" size={30} color={styleColors.mainColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>
                            {title}
                        </Text>
                        <TextInput
                            ref={textInput}
                            placeholder={'Názov'}
                            keyboardType={'default'}
                            onChangeText={(text) => { setInp(text)}}
                            style={{height: 40, alignSelf: 'stretch', borderColor: styleColors.mainColor, borderBottomWidth: 1, paddingHorizontal: 20, marginVertical: 30, marginHorizontal: 20}}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setIsVisible(!isVisible);
                                onAdd(inp);
                            }}
                        >
                            <Text style={{color: styleColors.mainColor, fontSize: 25, marginTop: 40, marginBottom: 20}}>
                                Pridať
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export {ModalAdd};
