import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'
import {storeData, getStoredData, date2USformat, date2SKformat} from '../components/functions';
import {Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';

const DataRow = ({label, value, icon, editable, onEdit, style}) => {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#AA0000">
            <View style={styles.editableRow}>
            {icon}
            <View style={{flex: 1, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.textBlack1}>{label}</Text>
                <Text style={styles.label}>
                        {value}
                </Text>
            </View>
            <MaterialIcons name="navigate-next" size={22} color={styleColors.mainColor} />
            </View>
        </TouchableHighlight>
    );
}

const SettingsContainer = (props) => {
    const [user, setUser] = useState({
        email: '',
        fullname: '',
        license: '',
        licenseExpiration: '',
        medicalExpiration: '',
        personalWeight: 0,
        altitude: 0,
        categoryID: 0,
        dropzoneID: 0,
        planeID: 0
    });

    useEffect(() => {
        getStoredData('user')
            .then((res) => {
                setUser(res);
            });

    }, [])

    return (
        <ScrollView style={styles.page}>
            <StatusBar backgroundColor={styleColors.mainColor} barStyle="light-content"/>
            {/* NASTAVOVANIE PROFILU begin */}
            {/* OSOBNE INFO begin */}
            <Text style={[styles.textBlack1, {marginLeft: 10, fontWeight: 'bold', marginVertical: 15}]}>Osobné informácie</Text>
            <DataRow
                label={'Meno'}
                value={user['fullname']}
                icon={<Ionicons name="person" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                        setIsModalText(true);
                        setTitle('Nastavenie mena');
                        setPlaceholder('Meno');
                        setValue(name);
                    }}*/
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Váha'}
                value={`${user['personalWeight']} kg`}
                icon={<MaterialCommunityIcons name="weight-kilogram" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalWeight(!isModalWeight);
                }}*/
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Licencia'}
                value={user['license']} editable={true}
                icon={<MaterialCommunityIcons name={'license'} size={22} color={'#000000'} />}
                /*onEdit={() => {
                    setIsModalLicense(!isModalLicense);
                }}*/
            />
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.grayColor}}></View>
            <Text style={[styles.textBlack1, {marginLeft: 10, fontWeight: 'bold', marginVertical: 15}]}>Dátumy platností</Text>
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Zdravotná'}
                value={date2SKformat(user['medicalExpiration'])}
                icon={<FontAwesome5 name="book-medical" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalMedicalExpiration(!isModalMedicalExpiration);
                }}*/
            />
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Licencia'}
                value={date2SKformat(user['licenseExpiration'])}
                icon={<FontAwesome name="drivers-license" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalLicenseExpiration(!isModalLicenseExpiration);
                }}*/
            />
            {/* OSOBNE INFO end */}
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.grayColor}}></View>
            <Text style={[styles.textBlack1, {marginLeft: 10, fontWeight: 'bold', marginVertical: 15}]}>Osobné nastavenia</Text>
            <DataRow
                label={'Padák'}
                value={user['parachuteID']}
                icon={<MaterialCommunityIcons name="parachute" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalParachute(!isModalParachute);
                }}*/
            />
            <DataRow
                label={'Kategória'}
                value={user['categoryID']}
                icon={<MaterialIcons name={'category'} size={22} color={'#000000'}/>}
                editable={true}
                /* onEdit={() => {
                    setIsModalCategory(true);
                }}*/
            />
            <DataRow
                label={'Výška'}
                value={`${user['altitude']}m`}
                icon={<MaterialIcons name={'height'} size={22} color={'#000000'}/>}
                editable={true}
                /*onEdit={() => {
                    setIsModalAltitude(!isModalAltitude);
                }}*/
            />
            <DataRow
                label={'Lietadlo'}
                value={user['planeID']}
                icon={<MaterialCommunityIcons name={'airplane'} size={22} color={'#000000'}/>}
                editable={true}
                /* onEdit={() => {
                    setIsModalPlane(!isModalPlane);
                }}*/
            />
            <DataRow
                label={'Letisko'}
                value={user['dropzoneID']}
                icon={<MaterialCommunityIcons name={'airport'} size={22} color={'#000000'} />}
                editable={true}
                /* onEdit={() => {
                    setIsModalDropzone(!isModalDropzone);
                }}*/
            />
            {/* NASTAVOVANIE PROFILU end */}
        </ScrollView>
    );
}

let Settings = connect(state => ({globalState: state}))(SettingsContainer);

export {Settings};