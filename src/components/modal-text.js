import React, {useState, useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import {styleColors, styles} from '../styles';
import {ModalLowerButtons} from "./modal-buttons";

// po potvrdeni vola fuknciu onConfrim a vklada do nej input (ak nie je prazdny)
const ModalText = ({isVisible, hide, title, value, placeholder, onConfirm}) => {
    let textInput = React.createRef();
    let [inp, setInp] = useState(value.toString());

    // aby sa vzdy ked sa objavi modalne okno inicializoval input
    useEffect(() => {
        setInp(value.toString())
    }, [isVisible]);

    return (
        <Modal
            isVisible={isVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onModalShow={() => {
                textInput.current.focus();
            }}
            onBackButtonPress={() => { 
                hide(); 
            }}
        >
            <View style={styles.centeredModal}>
                <View style={[styles.modalView, {padding: 0}]}>
                    <Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
                    <TextInput
                        style={{height: 40, alignSelf: 'stretch', borderColor: styleColors.mainColor, paddingHorizontal: 20, borderBottomWidth: 1, marginTop: 20, marginBottom: 60, marginHorizontal: 40}}
                        ref={textInput}
                        placeholder={placeholder}
                        defaultValue={value.toString()}
                        keyboardType={'default'}
                        onChangeText={(text) => {
                            setInp(text);
                        }}
                    />
                    <ModalLowerButtons
                        onCancel={() => {
                            hide();
                        }}
                        onConfirm={() => {
                            onConfirm(inp || value);
                            hide();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}

export {ModalText};