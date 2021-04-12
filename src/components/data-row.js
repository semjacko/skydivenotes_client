import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles, styleColors} from '../styles';


const DataRow = ({label, value, icon, editable, onEdit, style}) => {
    if (!editable) {
        return (
            <View style={[style, styles.editableRow]}>
                {icon}
                <View style={{flex: 1, marginLeft: 5}}>
                    <Text style={styles.label}>{label}</Text>
                    <View style={{alignSelf: 'stretch', borderBottomWidth: 1, borderColor: styleColors.grayColor}} >
                        <Text style={[styles.textWhite1, {color: styleColors.grayColor}]}>
                            {value}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={[style, styles.editableRow]}>
            {icon}
            <View style={{flex: 1, marginLeft: 5}}>
                <Text style={styles.label}>{label}</Text>
                <View style={{alignSelf: 'stretch', borderBottomWidth: 1, borderColor: styleColors.mainColor}} >
                    <TouchableOpacity onPress={onEdit}>
                        <Text style={styles.textBlack1}>
                            {value}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


export {DataRow};
