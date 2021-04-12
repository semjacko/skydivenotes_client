import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


const ScrollDownButton = ({flatList, isVisible, bottom, right, size, color}) => {
    if (!isVisible) {
        return null;
    }

    return (
        <TouchableOpacity
            style={{position: 'absolute', bottom: bottom, right: right}}
            onPress={() => {
                flatList.current.scrollToOffset(0);
            }}
        >
            <Ionicons name="chevron-down-circle-sharp" size={size} color={color} />
        </TouchableOpacity>
    );
};


export {ScrollDownButton};
