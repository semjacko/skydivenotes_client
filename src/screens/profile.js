import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles';
import {calcWingLoad, date2SKformat, seconds2HHMMSS} from '../components/functions';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {getUserData} from '../server';

const LabeledValue = ({label, value, align}) => {
    return (
        <View style={{alignItems: align}}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.text1}>{value}</Text>
        </View>
    );
}

const ProfileContainer = (props) => {
    const [calculator, setCalculator] = useState({
        weight: '',
        wingSize: '',
        wingLoad: 0
    });

    useEffect(() => {
        getUserData({
            token: props.globalState.token,
            success: (userData) => {
                setCalculator({...calculator, weight: userData['personalWeight']});
                props.dispatch({type: 'UPDATE_USER', user: userData})
            },
            fail: () => {Alert.alert('Nepodarilo sa načítať!', 'Údaje sa nepodarilo načítať. Skontrolujte prosím vaše internetové pripojenie', [{text: 'Ok'}]);}
        });
    }, [])

    useEffect(() => {
        let weightFloat = parseFloat(calculator['weight']);
        let wingSizeFloat = parseFloat(calculator['wingSize']);
        if (wingSizeFloat <= 0 || isNaN(wingSizeFloat) || isNaN(weightFloat)) {
            setCalculator({...calculator, wingLoad: 0});
        } else {
            setCalculator({...calculator, wingLoad: calcWingLoad(weightFloat, wingSizeFloat)});
        }
    }, [calculator['weight'], calculator['wingSize']]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.page}>
                <StatusBar backgroundColor={styleColors.mainColor} barStyle="light-content"/>
                {/* ZAKLADNE INFO begin */}
                <View style={styles.profileInfo}>
                    {/* LICENCIA begin */}
                    <View style={styles.circle}>
                        <Text style={[styles.text4, {color: styleColors.textColorSpecial, fontWeight: 'bold'}]}>{props.globalState.user['license']}</Text>
                    </View>
                    {/* LICENCIA end */}
                    {/* ZOSKOKY INFO begin */}
                    <Text style={[styles.text2, {marginTop: 15}]}>{props.globalState.user['fullname']}</Text>
                    <View style={styles.profileJumpInfo}>
                        <LabeledValue label={'Zoskoky'} value={props.globalState.user['jumpsQty']} align={'center'}/>
                        <LabeledValue label={'Voľný pád'} value={seconds2HHMMSS(props.globalState.user['timeFreeFallSum'])} align={'center'}/>
                        <LabeledValue label={'Odhody'} value={props.globalState.user['cutawaySum']} align={'center'}/>
                    </View>
                    {/* ZOSKOKY INFO end */}
                    {/* PLATNOSTI begin */}
                    <View style={styles.profileLicenseInfo}>
                        <LabeledValue label={'Platnosť licencie'} value={date2SKformat(props.globalState.user['licenseExpiration'])} align={'flex-start'}/>
                        <LabeledValue label={'Platnosť zdravotnej'} value={date2SKformat(props.globalState.user['medicalExpiration'])} align={'flex-end'}/>
                    </View>
                    {/* PLATNOSTI end */}
                </View>
                {/* ZAKLADNE INFO end */}
                {/* KALKULACKA begin */}
                <View style={styles.profileInfo}>
                    <Text style={styles.text3}>Výpočet zaťaženia</Text>
                    <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
                        <MaterialCommunityIcons name="weight-kilogram" size={20} color={styleColors.textColorContent}/>
                        <TextInput
                            textAlign={'left'}
                            placeholder={'kg'}
                            keyboardType={'numeric'}
                            maxLength={3}
                            onChangeText={(text) => {
                                setCalculator({...calculator, weight: text});
                            }}
                            defaultValue={calculator['weight'].toString()}
                            style={{marginLeft: 10, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: styleColors.mainColor, width: 50}}
                        />
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
                        <MaterialCommunityIcons name="parachute" size={20} color={styleColors.textColorContent}/>
                        <TextInput
                            textAlign={'left'}
                            placeholder={'ft'}
                            maxLength={3}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                setCalculator({...calculator, wingSize: text});
                            }}
                            style={{marginLeft: 10, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: styleColors.mainColor, width: 50}}
                        />
                    </View>
                    <Text style={[styles.text4, {marginTop: 20, fontWeight: 'bold'}]}>{calculator['wingLoad']}</Text>
                </View>
                {/* KALKULACKA end */}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const Profile = connect(state => ({globalState: state}))(ProfileContainer);

export {Profile};