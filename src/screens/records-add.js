import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'
import {altitude2seconds, date2USformat, date2SKformat} from '../components/functions';
import {Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {DataRow} from '../components/data-row';
import {ModalText} from '../components/modal-text';
import {ModalChoice} from '../components/modal-choice';
import {DatePicker} from '../components/date-picker';
import {putToServer} from '../server';

const RecordsAddContainer = (props) => {
    const [modals, setModals] = useState({
        isModalDate: false,
        isModalAltitude: false,
        isModalParachute: false,
        isModalCategory: false,
        isModalPlane: false,
        isModalDropzone: false,
        isModalNote: false,
    });

    const toggleModal = (modalVisibility) => {
        setModals({
            ...modals,
            ...modalVisibility
        });
    }
    
    let dateRaw = new Date();
    /*const handleUserChanges = (user) => {
        let newRecordData = {
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
    }*/

    return (
        <ScrollView style={styles.page}>
            <StatusBar backgroundColor={styleColors.mainColor} barStyle="light-content"/>
            <DataRow
                label={'Dátum'}
                value={`${dateRaw.getDate()}/${dateRaw.getMonth() + 1}/${dateRaw.getFullYear()}`}
                icon={<FontAwesome name="calendar" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalDate: true});}}
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Zoskok'}
                value={`#${10}`}
                icon={<FontAwesome5 name="hashtag" size={22} color={styleColors.labelColor} />}
                editable={false}
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Výška'}
                value={props.globalState.user['altitude']} 
                icon={<MaterialIcons name={'height'} size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalAltitude: true});}}
            />
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Voľný pád'}
                value={`${altitude2seconds(props.globalState.user['altitude'])}s`}
                icon={<FontAwesome5 name="clock" size={22} color={styleColors.labelColor} />}
                editable={false}
            />
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Padák'}
                value={'UNDEFINED'}
                icon={<MaterialCommunityIcons name="parachute" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalParachute: true});}}
            />
            <DataRow
                label={'Kategória'}
                value={'UNDEFINED'}
                icon={<MaterialIcons name="category" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalCategory: true});}}
            />
            <DataRow
                label={'Lietadlo'}
                value={'UNDEFINED'}
                icon={<FontAwesome name={'plane'} size={22} color={'#000000'}/>}
                editable={true}
                onEdit={() => {toggleModal({isModalPlane: true});}}
            />
            <DataRow
                label={'Letisko'}
                value={'UNDEFINED'}
                icon={<MaterialCommunityIcons name={'airport'} size={22} color={'#000000'}/>}
                editable={true}
                onEdit={() => {toggleModal({isModalDropzone: true});}}
            />
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <View style={styles.editableRow}>
                <FontAwesome name={'cut'} size={22} color={'#000000'}/>
                <View style={{flex: 1, marginLeft: 20, marginRight: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.text1}>Odhod</Text>
                    <Text style={[styles.label, {color: styleColors.mainColor}]}>0</Text>
                </View>
            </View>
            <TouchableHighlight 
                activeOpacity={0.6} 
                underlayColor={styleColors.mainColor}
                onPress={() => {toggleModal({isModalNote: true});}}
            >
                <View style={styles.editableRow}>
                    <MaterialIcons name={'speaker-notes'} size={22} color={'#000000'}/> 
                    <View style={{flex: 1, marginLeft: 20, marginRight: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.text1}>Poznámka</Text>
                        <Text style={[styles.label, {color: styleColors.mainColor}]}>upraviť</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={22} color={styleColors.mainColor}/>
                </View>
            </TouchableHighlight>
            {/*
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
            />
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

const RecordsAdd = connect(state => ({ globalState: state }))(RecordsAddContainer);

export {RecordsAdd};