import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {styles, styleColors} from '../styles';

const DataRow = ({label, value, icon, editable, onEdit}) => {
    return (
        <TouchableHighlight 
            activeOpacity={0.6} 
            underlayColor={styleColors.mainColor}
            onPress={onEdit}
        >
            <View style={styles.editableRow}>
            {icon}
            <View style={{flex: 1, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.text1}>{label}</Text>
                <Text style={styles.label}>
                        {value}
                </Text>
            </View>
            {editable && <MaterialIcons name="navigate-next" size={22} color={styleColors.mainColor}/>}
            </View>
        </TouchableHighlight>
    );
}

export {DataRow};