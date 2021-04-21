import {StatusBar, View, Text, Switch, Keyboard, DeviceEventEmitter, ScrollView, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles'
import {getStoredData, date2USformat, date2SKformat, altitude2seconds} from '../components/functions';
import {Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {DataRow} from '../components/data-row';
import {ModalText} from '../components/modal-text';
import {ModalChoice} from '../components/modal-choice';
import {DatePicker} from '../components/date-picker';
import {updateRecord, deleteRecord, getParachutes, getPlanes, getDropzones, getCategories} from '../server';
import {ALTITUDES} from '../../constants';

const RecordsDetailContainer = (props) => {
    const [record, setRecord] = useState(props.route?.params?.record);
    const [jumpNumber, setJumpNumber] = useState(props.route?.params?.record?.jumpNumber);
    const [parachutes, setParachutes] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [dropzones, setDropzones] = useState([]);
    const [categories, setCategories] = useState([]);
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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getParachutes({
                token: props.globalState.token,
                success: (data) => {
                    setParachutes(data['parachutes']);
                },
                fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
            getPlanes({
                token: props.globalState.token,
                success: (data) => {
                    setPlanes(data['planes']);
                },
                fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
            getDropzones({
                token: props.globalState.token,
                success: (data) => {
                    setDropzones(data['dropzones']);
                },
                fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
            getCategories({
                token: props.globalState.token,
                success: (data) => {
                    setCategories(data['categories']);
                },
                fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
        });
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        // pridanie listeneru na event zo stack navigatora (kliknutie save vpravo hore)
        let listener = DeviceEventEmitter.addListener('DeleteRecordPressed', () => {
            deleteRecord({
                token: props.globalState.token,
                record: record,
                success: (data) => {
                    props.dispatch({type: 'UPDATE_RECORDS', records: data});
                    props.navigation.goBack();
                },
                fail: () => {Alert.alert('Odoslanie na server zlyhalo!', 'Údaje sa nepodarilo odoslať na server. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
            });
        });

        return () => {
            listener.remove();
        }
    }, [])


    useEffect(() => {
        updateRecord({
            token: props.globalState.token,
            record: record,
            success: (data) => {
                props.dispatch({type: 'UPDATE_RECORDS', records: data});
                setJumpNumber(data.find((e) => e.id == record.id).jumpNumber)
            },
            fail: () => {Alert.alert('Odoslanie na server zlyhalo!', 'Údaje sa nepodarilo odoslať na server. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
        });
    }, [record]); 

    return (
        <>
        <ScrollView style={styles.page}>
            <StatusBar backgroundColor={styleColors.mainColor} barStyle="light-content"/>
            <DataRow
                label={'Dátum'}
                value={date2SKformat(record['date'])}
                icon={<FontAwesome name="calendar" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalDate: true});}}
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Zoskok'}
                value={`#${jumpNumber}`}
                icon={<FontAwesome5 name="hashtag" size={22} color={styleColors.labelColor} />}
                editable={false}
            />
            <DataRow
                style={{display: 'flex', flex: 1}}
                label={'Výška'}
                value={record['altitude']} 
                icon={<MaterialIcons name={'height'} size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalAltitude: true});}}
            />
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Voľný pád'}
                value={`${record['timeFreeFall']}s`}
                icon={<FontAwesome5 name="clock" size={22} color={styleColors.labelColor} />}
                editable={false}
            />
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <DataRow
                style={{display: 'flex', flex: 1, marginLeft: 30}}
                label={'Padák'}
                value={record['parachuteTitle']}
                icon={<MaterialCommunityIcons name="parachute" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalParachute: true});}}
            />
            <DataRow
                label={'Kategória'}
                value={record['categoryTitle']}
                icon={<MaterialIcons name="category" size={22} color={'#000000'} />}
                editable={true}
                onEdit={() => {toggleModal({isModalCategory: true});}}
            />
            <DataRow
                label={'Lietadlo'}
                value={record['planeTitle']}
                icon={<FontAwesome name={'plane'} size={22} color={'#000000'}/>}
                editable={true}
                onEdit={() => {toggleModal({isModalPlane: true});}}
            />
            <DataRow
                label={'Letisko'}
                value={record['dropzoneTitle']}
                icon={<MaterialCommunityIcons name={'airport'} size={22} color={'#000000'}/>}
                editable={true}
                onEdit={() => {toggleModal({isModalDropzone: true});}}
            />
            <View style={{height: 1, alignSelf: 'stretch', backgroundColor: styleColors.faded}}></View>
            <View style={styles.editableRow}>
                <FontAwesome name={'cut'} size={22} color={'#000000'}/>
                <View style={{flex: 1, marginLeft: 20, marginRight: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.text1}>Odhod</Text>
                    <Switch
                        style={{transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]}}
                        trackColor={{true: styleColors.mainColor, false: styleColors.faded}}
                        thumbColor={styleColors.textColorSpecial}
                        onValueChange={(value) => {
                            setRecord({...record, 'cutaway': value});
                        }}
                        value={record['cutaway'] == 1}
                    />
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
                        <Text style={[styles.label, {color: styleColors.mainColor}]}>zobraziť</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={22} color={styleColors.mainColor}/>
                </View>
            </TouchableHighlight>
        </ScrollView>
                   
        <DatePicker
            isVisible={modals.isModalDate}
            hide={() => toggleModal({isModalDate: false})}
            initialDate={record['date']}
            onConfirm={(date) => {setRecord({...record, 'date': date});}}
        />
        <ModalChoice
            isVisible={modals.isModalAltitude}
            hide={() => toggleModal({isModalAltitude: false})}
            data={ALTITUDES}
            value={ALTITUDES.find(e => e.value == record['altitude'])}
            plus={false}
            onConfirm={(obj) => {setRecord({...record, 'altitude': obj.value, 'timeFreeFall': altitude2seconds(obj.value)});}}
        />
        
        <ModalChoice
            isVisible={modals.isModalParachute}
            hide={() => toggleModal({isModalParachute: false})}
            data={parachutes}
            value={{id: record['parachuteID']}}
            plus={false}
            onConfirm={(obj) => {setRecord({...record, 'parachuteID': obj.id, 'parachuteTitle': obj.title})}}
        />
        <ModalChoice
            isVisible={modals.isModalCategory}
            hide={() => toggleModal({isModalCategory: false})}
            data={categories}
            value={{id: record['categoryID']}}
            plus={false}
            onConfirm={(obj) => {setRecord({...record, 'categoryID': obj.id, 'categoryTitle': obj.title})}}
        />
        <ModalChoice
            isVisible={modals.isModalPlane}
            hide={() => toggleModal({isModalPlane: false})}
            data={planes}
            value={{id: record['planeID']}}
            plus={false}
            onConfirm={(obj) => {setRecord({...record, 'planeID': obj.id, 'planeTitle': obj.title})}}
        />
        <ModalChoice
            isVisible={modals.isModalDropzone}
            hide={() => toggleModal({isModalDropzone: false})}
            data={dropzones}
            value={{id: record['dropzoneID']}}
            plus={false}
            onConfirm={(obj) => {setRecord({...record, 'dropzoneID': obj.id, 'dropzoneTitle': obj.title})}}
        />
        </> 
    );
}

const RecordsDetail = connect(state => ({ globalState: state }))(RecordsDetailContainer);

export {RecordsDetail};