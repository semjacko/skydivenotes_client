import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'
import {getStoredData, date2USformat, date2SKformat} from '../components/functions';
import {Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {DataRow} from '../components/data-row';
import {ModalText} from '../components/modal-text';
import {ModalChoice} from '../components/modal-choice';
import {DatePicker} from '../components/date-picker';
import {putToServer} from '../server';

const LICENSES = [{key: 0, value: 'Študent'}, {key: 1, value: 'A'}, {key: 2, value: 'B'}, {key: 3, value: 'C'}, {key: 4, value: 'D'}];
const WEIGHTS = [...Array(150).keys()].map((e) => ({key: e+1, value: e+1}));
const ALTITUDES = [800, 1200, 1500, 2000, 3000, 4000];

const SettingsContainer = (props) => {
    const [parachutes, setParachutes] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [dropzones, setDropzones] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modals, setModals] = useState({
        isModalName: false,
        isModalWeight: false,
        isModalLicense: false,
        isModalLicenseExpiration: false,
        isModalMedicalExpiration: false,
        isModalParachute: false,
        isModalCategory: false,
        isModalAltitude: false,
        isModalPlane: false,
        isModalDropzone: false,
    });

    const toggleModal = (modalVisibility) => {
        setModals({
            ...modals,
            ...modalVisibility
        });
    }

    const handleUserChanges = (user) => {
        let newUserData = {
            ...props.globalState.user,
            ...user
        }
        putToServer('https://skydivenotes.sk/user', {user: newUserData}, {'Authorization': props.globalState.token}, (status, data) => {
                if (status == 200) {
                    props.dispatch({type: 'UPDATE_USER', user: newUserData})
                } else {
                    Alert.alert('Odoslanie na server zlyhalo!', 'Údaje sa nepodarilo odoslať na server. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);
                }
        });
    }

    return (
        <ScrollView style={styles.page}>
            <StatusBar backgroundColor={styleColors.mainColor} barStyle="light-content"/>
            {/* NASTAVOVANIE PROFILU begin */}
            {/* OSOBNE INFO begin */}
            <Text style={[styles.text1, {marginLeft: 10, fontWeight: 'bold', marginTop: 15, marginBottom: 10}]}>Osobné informácie</Text>
            <DataRow
                label={'Meno'}
                value={props.globalState.user['fullname']}
                icon={<Ionicons name="person" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalName: true});}}
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Váha'}
                value={`${props.globalState.user['personalWeight']} kg`}
                icon={<MaterialCommunityIcons name="weight-kilogram" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalWeight: true});}}
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Licencia'}
                value={props.globalState.user['license']} editable={true}
                icon={<MaterialCommunityIcons name={'license'} size={22} color={'#000000'} />}
                onEdit={() => {toggleModal({isModalLicense: true});}}
            />
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <Text style={[styles.text1, {marginLeft: 10, fontWeight: 'bold', marginTop: 15, marginBottom: 10}]}>Dátumy platností</Text>
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Zdravotná'}
                value={date2SKformat(props.globalState.user['medicalExpiration'])}
                icon={<FontAwesome5 name="book-medical" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalMedicalExpiration: true});}}

            />
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Licencia'}
                value={date2SKformat(props.globalState.user['licenseExpiration'])}
                icon={<FontAwesome name="drivers-license" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalLicenseExpiration: true});}}
            />
            {/* OSOBNE INFO end */}
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <Text style={[styles.text1, {marginLeft: 10, fontWeight: 'bold', marginTop: 15, marginBottom: 10}]}>Osobné nastavenia</Text>
            <DataRow
                label={'Padák'}
                value={props.globalState.user['parachuteID']}
                icon={<MaterialCommunityIcons name="parachute" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalParachute: true});}}
            />
            <DataRow
                label={'Kategória'}
                value={props.globalState.user['categoryID']}
                icon={<MaterialIcons name={'category'} size={22} color={'#000000'}/>}
                editable={true}
                onEdit={() => {toggleModal({isModalCategory: true});}}
            />
            <DataRow
                label={'Výška'}
                value={`${props.globalState.user['altitude']}m`}
                icon={<MaterialIcons name={'height'} size={22} color={'#000000'}/>}
                editable={true}
                onEdit={() => {toggleModal({isModalAltitude: true});}}
            />
            <DataRow
                label={'Lietadlo'}
                value={props.globalState.user['planeID']}
                icon={<MaterialCommunityIcons name={'airplane'} size={22} color={'#000000'}/>}
                editable={true}
                onEdit={() => {toggleModal({isModalPlane: true});}}
            />
            <DataRow
                label={'Letisko'}
                value={props.globalState.user['dropzoneID']}
                icon={<MaterialCommunityIcons name={'airport'} size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalDropzone: true});}}
            />
            {/* NASTAVOVANIE PROFILU end */}
            <TouchableHighlight 
                activeOpacity={0.6} 
                underlayColor={styleColors.mainColor}
                onPress={() => {props.dispatch({type: 'SIGN_OUT'});}}
            >
                <View style={styles.editableRow}>
                    <MaterialCommunityIcons name={'logout'} size={22} color={styleColors.red} />
                    <View style={{flex: 1, marginLeft: 20, marginRight: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.text1, {color: styleColors.red}]}>Odhlásiť</Text>
                    </View>
                </View>
            </TouchableHighlight>
            {/* SETTINGS end */}
            <ModalText
                isVisible={modals.isModalName}
                hide={() => toggleModal({isModalName: false})}
                title={'Nastavenie mena'}
                value={props.globalState.user['fullname']}
                placeholder={'Meno Priezvisko'}
                onConfirm={(value) => {handleUserChanges({fullname: value})}}
            />
            <ModalChoice
                isVisible={modals.isModalWeight}
                hide={() => toggleModal({isModalWeight: false})}
                data={WEIGHTS}
                value={WEIGHTS.find(e => e.value == props.globalState.user['personalWeight'])}
                plus={false}
                onConfirm={(obj) => {handleUserChanges({personalWeight: obj.value})}}
            />
            <ModalChoice
                isVisible={modals.isModalLicense}
                hide={() => toggleModal({isModalLicense: false})}
                data={LICENSES}
                value={LICENSES.find(e => e.value == props.globalState.user['license'])}
                plus={false}
                onConfirm={(obj) => {handleUserChanges({license: obj.value})}}
            />
            <DatePicker
                isVisible={modals.isModalMedicalExpiration}
                hide={() => toggleModal({isModalMedicalExpiration: false})}
                initialDate={props.globalState.user['medicalExpiration']}
                onConfirm={(date) => {handleUserChanges({medicalExpiration: date})}}
            />
            <DatePicker
                isVisible={modals.isModalLicenseExpiration}
                hide={() => toggleModal({isModalLicenseExpiration: false})}
                initialDate={props.globalState.user['licenseExpiration']}
                onConfirm={(date) => {handleUserChanges({licenseExpiration: date})}}
            />{/*
            <ModalChoice
                isVisible={modals.isModalParachute}
                hide={() => toggleModal({isModalParachute: false})}
                data={parachutes}
                valueKey={props.globalState.user['parachute']}
                plus={false}
                onConfirm={(value) => {console.log(value)}}
            />
            <ModalChoice
                isVisible={modals.isModalCategory}
                hide={() => toggleModal({isModalCategory: false})}
                data={categories}
                valueKey={props.globalState.user['category']}
                plus={false}
                onConfirm={(value) => {console.log(value)}}
            />
            <ModalChoice
                isVisible={modals.isModalAltitude}
                hide={() => toggleModal({isModalAltitude: false})}
                data={ALTITUDES}
                valueKey={props.globalState.user['altitude']}
                plus={false}
                onConfirm={(value) => {console.log(value)}}
            />
            <ModalChoice
                isVisible={modals.isModalPlane}
                hide={() => toggleModal({isModalPlane: false})}
                data={planes}
                valueKey={props.globalState.user['plane']}
                plus={false}
                onConfirm={(value) => {console.log(value)}}
            />
            <ModalChoice
                isVisible={modals.isModalDropzone}
                hide={() => toggleModal({isModalDropzone: false})}
                data={dropzones}
                valueKey={props.globalState.user['dropzone']}
                plus={false}
                onConfirm={(value) => {console.log(value)}}
            />*/}
        </ScrollView> 
    );
}

const Settings = connect(state => ({globalState: state}))(SettingsContainer);

export {Settings};