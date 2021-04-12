import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styleColors} from '../styles';


const ModalUpperButtons = ({onCancel, onConfirm}) => {
    return (
        <View
            style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#aaaaaa',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 30,
                paddingVertical: 10
            }}
        >
            <TouchableOpacity onPress={onCancel} >
                <Text style={{fontSize: 20, color: styleColors.mainColor}}>
                    Zrušiť
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} >
                <Text style={{fontSize: 20, color: styleColors.mainColor}}>
                    Potvrdiť
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const ModalLowerButtons = ({onCancel, onConfirm}) => {
    return (
        <View
            style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                backgroundColor: '#aaaaaa',
                borderTopWidth: 1,
                borderColor: '#8f8f8f',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20
            }}
        >
            <TouchableOpacity
                style={{display: 'flex', flex: 1, alignItems: 'center', paddingVertical: 20, borderBottomLeftRadius: 20}}
                onPress={onCancel}
            >
                <Text style={{fontSize: 20, color: styleColors.mainColor}} >
                    Zrušiť
                </Text>
            </TouchableOpacity>
            <View style={{width: 1, backgroundColor: '#8f8f8f'}}/>
            <TouchableOpacity
                style={{display: 'flex', flex: 1, alignItems: 'center', paddingVertical: 20, borderBottomRightRadius: 20}}
                onPress={onConfirm}
            >
                <Text style={{fontSize: 20, color: styleColors.mainColor}}>
                    Potvrdiť
                </Text>
            </TouchableOpacity>
        </View>
    );
}


export {ModalUpperButtons, ModalLowerButtons};
