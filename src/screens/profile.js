import {StatusBar, View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles, styleColors} from '../styles';
import {calcWingLoad, storeData, date2SKformat} from '../components/functions';
import {Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';

const LabeledValue = ({label, value, align}) => {
    return (
        <View style={{alignItems: align}}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.text1}>{value}</Text>
        </View>
    );
}

const ProfileContainer = (props) => {
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
    const [calculator, setCalculator] = useState({
        weight: '',
        wingSize: '',
        wingLoad: 0
    });

    useEffect(() => {
        fetch(`http://18.196.156.172/user`, {
            method: 'GET',
            headers: {
                'Authorization': props.globalState.token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setUser(json);
                setCalculator({...calculator, weight: json['personalWeight']});
                storeData('user', json);
            })
            .catch((err) => console.log(err));
    }, []);

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
                <View style={styles.profileMainInfo}>
                    {/* LICENCIA begin */}
                    <View style={styles.circle}>
                        <Text style={[styles.text4, {fontWeight: 'bold'}]}>{user['license']}</Text>
                    </View>
                    {/* LICENCIA end */}
                    {/* ZOSKOKY INFO begin */}
                    <Text style={[styles.text2, {marginTop: 15}]}>{user['fullname']}</Text>
                    <View style={styles.profileJumpInfo}>
                        <LabeledValue label={'Zoskoky'} value={254} align={'center'}/>
                        <LabeledValue label={'Voľný pád'} value={'1:30:40'} align={'center'}/>
                        <LabeledValue label={'Odhody'} value={2} align={'center'}/>
                    </View>
                    {/* ZOSKOKY INFO end */}
                    {/* PLATNOSTI begin */}
                    <View style={styles.profileLicenseInfo}>
                        <LabeledValue label={'Platnosť licencie'} value={date2SKformat(user['licenseExpiration'])} align={'flex-start'}/>
                        <LabeledValue label={'Platnosť zdravotnej'} value={date2SKformat(user['medicalExpiration'])} align={'flex-end'}/>
                    </View>
                    {/* PLATNOSTI end */}
                </View>
                {/* ZAKLADNE INFO end */}
                {/* KALKULACKA begin */}
                <View style={styles.profileCalculator}>
                    <Text style={styles.textBlack2}>Výpočet zaťaženia</Text>
                    <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
                        <MaterialCommunityIcons name="weight-kilogram" size={20} color={'#000000'}/>
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
                        <MaterialCommunityIcons name="parachute" size={20} color={'#000000'}/>
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
                    <Text style={[styles.textBlack3, {marginTop: 20}]}>{calculator['wingLoad']}</Text>
                </View>
                {/* KALKULACKA end */}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

let Profile = connect(state => ({globalState: state}))(ProfileContainer);

export {Profile};