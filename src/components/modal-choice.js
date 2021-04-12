import React, {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Modal from 'react-native-modal';

import {styleColors, styles} from '../styles';
import {ScrollPicker} from './scrollpicker';
import {ModalUpperButtons} from "./modal-buttons";
import {ModalAdd} from "./modal-add";


const ModalChoice = ({isVisible, setIsVisible, type, plus, onPlus, onConfirm, data, value, search, sorted}) => {

    const [currData, setCurrData] = useState([...data]);
    const [scrollPickerData, setScrollPickerData] = useState([...data]);
    const [choice, setChoice] = useState(value);
    const [isModalAdd, setIsModalAdd] = useState(false);

    useEffect(() => {
        setChoice(value);
        setCurrData([...data])
        setScrollPickerData([...data])
    }, [isVisible])

    if (sorted) {
        data =
            typeof(data[0]) === 'number'
                ? data.sort((e1,e2) => e1 - e2)
                : data.sort((e1, e2) => e1.toString().toLowerCase() > e2.toString().toLowerCase());
    }

    return (
        <Modal
            style={{margin: 0}}
            isVisible={isVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            onBackButtonPress={() => { setIsVisible(!isVisible); }}
        >
            <ModalAdd
                isVisible={isModalAdd}
                setIsVisible={setIsModalAdd}
                title={'Nova kategoria'}
                onAdd={(text) => {
                    // TODO
                    setCurrData([...currData, text]);
                    setScrollPickerData([...currData, text])
                    onPlus(text);
                    setIsModalAdd(!setIsModalAdd);
                }}
            />
            <View style={styles.bottomModal}>
                <View style={styles.bottomModalView}>
                    <ModalUpperButtons
                        onConfirm={() => {
                            setIsVisible(!isVisible);
                            onConfirm(choice);
                        }}
                        onCancel={() => {
                            setIsVisible(!isVisible);
                        }}
                    />
                    <View style={{alignSelf: 'stretch', alignItems: 'center', paddingHorizontal: 30}}>
                        {search &&
                        <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', paddingHorizontal: 20, paddingVertical: 5, marginTop: 20, marginHorizontal: 100, borderBottomWidth: 1, borderColor: styleColors.mainColor}}>
                            <Ionicons name="search" size={20} color="#959595" style={{position: 'absolute', left: 10}}/>
                            <TextInput
                                placeholder={'Hľadať'}
                                keyboardType={'default'}
                                onChangeText={(text) => {
                                    let filteredData = currData.filter((element) => !text || element.toString().toLowerCase().includes(text.toLowerCase()));
                                    setChoice(filteredData[0]);
                                    setScrollPickerData([...filteredData]);
                                }}
                                style={{color: '#000000', marginLeft: 10}}
                            />
                        </View>
                        }
                        <ScrollPicker
                            data={scrollPickerData}
                            initialIndex={scrollPickerData.indexOf(choice)}
                            width={200}
                            highlightColor={styleColors.mainColor}
                            onSelect={(text) => { setChoice(text); }}
                        />
                        <Text>{type}</Text>
                        {plus &&
                        <TouchableOpacity
                            onPress={ () => {
                                // TODO modalne okno s prdianim
                                setIsModalAdd(!isModalAdd);
                            }}
                        >
                            <Ionicons name={'add-circle-sharp'} size={30} color={styleColors.mainColor} style={{marginBottom: 20}}/>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
}


export {ModalChoice};
