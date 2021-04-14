import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'
import {getStoredData, date2USformat, date2SKformat} from '../components/functions';
import {Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';

const DataRow = ({label, value, icon, editable, onEdit}) => {
    return (
        <TouchableHighlight 
            activeOpacity={0.6} 
            underlayColor={"#AA0000"}
            onPress={onEdit}
        >
            <View style={styles.editableRow}>
            {icon}
            <View style={{flex: 1, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.text1}>{label}</Text>
                <Text style={styles.label}>
                        {value}
                </Text>
            </View>
            {editable && <MaterialIcons name="navigate-next" size={22} color={styleColors.mainColor}/>}
            </View>
        </TouchableHighlight>
    );
}

const SettingsContainer = (props) => {
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
                value={`${props.globalState.user['personalWeight']} kg`}
                icon={<MaterialCommunityIcons name="weight-kilogram" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalWeight(!isModalWeight);
                }}*/
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Licencia'}
                value={props.globalState.user['license']} editable={true}
                icon={<MaterialCommunityIcons name={'license'} size={22} color={'#000000'} />}
                /*onEdit={() => {
                    setIsModalLicense(!isModalLicense);
                }}*/
            />
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <Text style={[styles.text1, {marginLeft: 10, fontWeight: 'bold', marginTop: 15, marginBottom: 10}]}>Dátumy platností</Text>
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Zdravotná'}
                value={date2SKformat(props.globalState.user['medicalExpiration'])}
                icon={<FontAwesome5 name="book-medical" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalMedicalExpiration(!isModalMedicalExpiration);
                }}*/
            />
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Licencia'}
                value={date2SKformat(props.globalState.user['licenseExpiration'])}
                icon={<FontAwesome name="drivers-license" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalLicenseExpiration(!isModalLicenseExpiration);
                }}*/
            />
            {/* OSOBNE INFO end */}
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <Text style={[styles.text1, {marginLeft: 10, fontWeight: 'bold', marginTop: 15, marginBottom: 10}]}>Osobné nastavenia</Text>
            <DataRow
                label={'Padák'}
                value={props.globalState.user['parachuteID']}
                icon={<MaterialCommunityIcons name="parachute" size={22} color={'#000000'} />}
                editable={true}
                /*onEdit={() => {
                    setIsModalParachute(!isModalParachute);
                }}*/
            />
            <DataRow
                label={'Kategória'}
                value={props.globalState.user['categoryID']}
                icon={<MaterialIcons name={'category'} size={22} color={'#000000'}/>}
                editable={true}
                /* onEdit={() => {
                    setIsModalCategory(true);
                }}*/
            />
            <DataRow
                label={'Výška'}
                value={`${props.globalState.user['altitude']}m`}
                icon={<MaterialIcons name={'height'} size={22} color={'#000000'}/>}
                editable={true}
                /*onEdit={() => {
                    setIsModalAltitude(!isModalAltitude);
                }}*/
            />
            <DataRow
                label={'Lietadlo'}
                value={props.globalState.user['planeID']}
                icon={<MaterialCommunityIcons name={'airplane'} size={22} color={'#000000'}/>}
                editable={true}
                /* onEdit={() => {
                    setIsModalPlane(!isModalPlane);
                }}*/
            />
            <DataRow
                label={'Letisko'}
                value={props.globalState.user['dropzoneID']}
                icon={<MaterialCommunityIcons name={'airport'} size={22} color={'#000000'} />}
                editable={true}
                /* onEdit={() => {
                    setIsModalDropzone(!isModalDropzone);
                }}*/
            />
            {/* NASTAVOVANIE PROFILU end */}
            <DataRow
                label={'Odhlásiť'}
                icon={<MaterialCommunityIcons name={'logout'} size={22} color={'#000000'} />}
                onEdit={() => {
                    props.dispatch({type: 'SIGN_OUT'});
                }}
            />
        </ScrollView>
    );
}

const Settings = connect(state => ({globalState: state}))(SettingsContainer);

export {Settings};