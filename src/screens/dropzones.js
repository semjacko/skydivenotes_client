import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles';
import {MaterialIcons} from '@expo/vector-icons';
import {getAssets} from '../server';
import {connect} from 'react-redux';

const DropzonesContainer = (props) => {
    const [dropzones, setDropzones] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);  // update flatlistu

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAssets({
                token: props.globalState.token,
                success: (data) => {setDropzones(data['dropzones']);},
                fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
        });
        return unsubscribe;
    }, [props.navigation]);

    const renderItem = ({item}) => {
        return (
            <View style={styles.personalItem}>
                <Text style={styles.text1}>{item.title}</Text>
                <Text style={{position: 'absolute', bottom: 5, right: 5}}>Počet: {'UNDEFINED'}</Text>
                <TouchableOpacity
                    style={{position: 'absolute', top: 5, right: 5}}
                    /*onPress={() => {
                        setItemKey(item.key);
                        setValue(item.title);
                        setPlaceholder(placeholders[routeName]);
                        setTitle(titlesEdit[routeName]);
                        setIsModalEdit(!isModalEdit);
                    }}*/
                >
                    <MaterialIcons name={'edit'} size={20} color={styleColors.mainColor}/>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.page}>
            <StatusBar backgroundColor={styleColors.mainColor} barStyle="light-content"/>
            <FlatList
                inverted={true}
                extraData={isUpdate}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}  // aby isiel odhora (je inverted)
                data={dropzones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            {/* MODALNE begin */}
            <>
                {/* MODALNE PRIDANIE PERSONAL ITEMU begin 
                <ModalAdd
                    isVisible={isModalAdd}
                    setIsVisible={setIsModalAdd}
                    title={titlesAdd[routeName]}
                    onAdd={(text) => {
                        addPersonalItem(text);
                    }}
                />
                {/* MODALNE PRIDANIE PERSONAL ITEMU end */}
                {/* MODALNE UPRAVENIE PERSONAL ITEMU begin 
                <ModalText
                    isVisible={isModalEdit}
                    setIsVisible={setIsModalEdit}
                    title={title}
                    value={value}
                    placeholder={placeholder}
                    onConfirm={(text) => {
                        editPersonalItem(text);
                    }}
                />
                {/* MODALNE UPRAVENIE PERSONAL ITEMU end */}
            </>
            {/* MODALNE end */}
        </View>
    );
}

const Dropzones = connect(state => ({globalState: state}))(DropzonesContainer);

export {Dropzones};