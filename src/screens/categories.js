import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles';
import {MaterialIcons} from '@expo/vector-icons';
import {getData, updateData} from '../server';
import {connect} from 'react-redux';
import {ModalText} from '../components/modal-text';

const CategoriesContainer = (props) => {
    const [categories, setCategories] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);  // update flatlistu
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [editItem, setEditItem] = useState({});

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getData({
                route: 'category',
                token: props.globalState.token,
                success: (data) => {
                    setCategories(data['categories']);
                },
                fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
        });
        return unsubscribe;
    }, [props.navigation]);

    const handleChanges = (updatedCategory) => {
        updateData({
            route: 'category',
            token: props.globalState.token,
            sendData: {category: updatedCategory},
            success: (data) => {setCategories(data['categories']);},
            fail: () => {Alert.alert('Odoslanie na server zlyhalo!', 'Údaje sa nepodarilo odoslať na server. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
        });
    }

    const renderItem = ({item}) => {
        return (
            <View style={styles.personalItem}>
                <Text style={styles.text1}>{item.title}</Text>
                <Text style={{position: 'absolute', bottom: 5, right: 5}}>Počet: {typeof(item.usedCount) === 'number' ? item.usedCount : 0}</Text>
                <TouchableOpacity
                    style={{position: 'absolute', top: 5, right: 5}}
                    onPress={() => {
                        setEditItem(item);
                        setIsModalEdit(!isModalEdit);
                    }}
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
                data={categories}
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
                {/* MODALNE UPRAVENIE PERSONAL ITEMU begin */}
                <ModalText
                    isVisible={isModalEdit}
                    hide={() => {setIsModalEdit(false);}}
                    title={'Upravenie názvu kategórie'}
                    value={editItem.title}
                    placeholder={'Názov'}
                    onConfirm={(text) => {handleChanges({...editItem, title: text});}}
                />
                {/* MODALNE UPRAVENIE PERSONAL ITEMU end */}
            </>
            {/* MODALNE end */}
        </View>
    );
}

const Categories = connect(state => ({globalState: state}))(CategoriesContainer);

export {Categories};