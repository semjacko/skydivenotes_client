import React, {useRef, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';

const ITEMS_COUNT = 5;  // naraz je vidno 5 itemov
const HEIGHT = 200;

const opacities = {
    0: 1,
    1: 0.6,
    2: 0.2,
};

const textSizes = {
    0: 20,
    1: 16,
    2: 12,
};

// data je pole [{key, value}, {key, value}...]
const ScrollPicker = ({width, highlightColor, data, initialKey, onSelect, style}) => {
    const itemHeight = HEIGHT / ITEMS_COUNT;
    const flatList = useRef();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const initialIndex = data.findIndex(e => e.id == initialKey);

    const onScroll = (event) => {
        let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
        if (index < 0) {
            index = 0;
        } else if (index >= data.length) {
            index = data.length - 1;
        }
        setSelectedIndex(index)
        onSelect(data[index]);
    }

    const renderItem = ({item, index}) => {
        let gap = Math.abs(index - selectedIndex);
        gap = gap > 2 ? 2 : gap;
        let color = gap === 0 ? highlightColor : '#000000';
        let fontWeight = gap === 0 ? 'bold' : 'normal';

        return (
            <TouchableOpacity
                style={{alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', height: itemHeight}}
                onPress={() => {
                    flatList.current.scrollToIndex({index: index, animated: true, viewPosition: 0});
                }}
            >
                <Text style={{fontSize: textSizes[gap], opacity: opacities[gap], fontWeight: fontWeight, color: color}}>{item.value ? item.value : item.title}</Text>
            </TouchableOpacity>
        );
    }

    const keyExtractor = (item) => item.id.toString();

    return (
        <View style={[style, {height: HEIGHT, width: width}]}>
            <FlatList
                contentContainerStyle={{paddingVertical: itemHeight * 2}}
                data={data}
                ref={flatList}
                showsVerticalScrollIndicator={false}
                snapToInterval={itemHeight}
                getItemLayout={(data, index) =>
                    ({length: itemHeight, offset: itemHeight * index, index})
                }
                initialScrollIndex={initialIndex}
                maxToRenderPerBatch={8}
                decelerationRate={'normal'}
                onScroll={onScroll}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </View>
    );
}

export { ScrollPicker }
