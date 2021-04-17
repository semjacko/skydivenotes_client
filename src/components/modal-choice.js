import React, {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import {styleColors, styles} from '../styles';
import {ScrollPicker} from './scrollpicker';
import {ModalUpperButtons} from "./modal-buttons";
import {ModalAdd} from "./modal-add";

const ModalChoice = ({isVisible, hide, plus, onPlus, onConfirm, data, value}) => {
    const [scrollPickerData, setScrollPickerData] = useState([...data]);
    const [choice, setChoice] = useState(value);
    const [isModalAdd, setIsModalAdd] = useState(false);

    useEffect(() => {
        setChoice(value);
        setScrollPickerData([...data])
    }, [isVisible])

    return (
        <Modal
            style={{margin: 0}}
            isVisible={isVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            onBackButtonPress={() => { hide(); }}
        >
            <View style={styles.bottomModal}>
                <View style={styles.bottomModalView}>
                    <ModalUpperButtons
                        onConfirm={() => {
                            onConfirm(choice);
                            hide();
                        }}
                        onCancel={() => {
                            hide();
                        }}
                    />
                    <View style={{alignSelf: 'stretch', alignItems: 'center', paddingHorizontal: 30}}>
                        <ScrollPicker
                            data={scrollPickerData}
                            initialKey={value.id}
                            width={200}
                            highlightColor={styleColors.mainColor}
                            onSelect={(val) => { setChoice(val) }}
                        />
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
        </Modal>
    );
}


export {ModalChoice};

    /*
    if (sorted) {
        data =
            typeof(data[0]) === 'number'
                ? data.sort((e1,e2) => e1 - e2)
                : data.sort((e1, e2) => e1.toString().toLowerCase() > e2.toString().toLowerCase());
    }
    */