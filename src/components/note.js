import React from 'react';
import {Text, TextInput, View} from 'react-native';

import {styleColors, styles} from '../styles';


const Note = ({onChange}) => {
    return (
        <View style={{alignSelf: 'stretch', alignItems: 'flex-start', justifyContent: 'flex-start', marginVertical: 8}}>
            <Text style={styles.label}>Poznámka:</Text>
            <TextInput
                style={{
                    height: 70,
                    alignSelf: 'stretch',
                    paddingVertical: 10,
                    textAlignVertical: 'top',
                    paddingHorizontal: 10,
                    borderColor: styleColors.mainColor,
                    borderWidth: 1,
                    marginTop: 4,
                    backgroundColor: '#dfdfdf',
                }}
                placeholder={'Poznámka k zoskoku'}
                keyboardType={'default'}
                multiline={true}
                onChangeText={(text) => {
                    onChange(text);
                }}
            />
        </View>
    );
}


export {Note};
