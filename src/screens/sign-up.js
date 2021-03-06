import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, StatusBar, Keyboard, Alert} from 'react-native';
import {FontAwesome, Feather, MaterialIcons} from '@expo/vector-icons';
import {styles, styleColors} from '../styles';
import {postToServer} from '../server';
import {connect} from 'react-redux';
import {URL} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpContainer = (props) => {
    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        fullnameEndEditing: false,
        emailCheck: false,
        emailEndEditing: false,
        passwordCheck: false,
        passwordEndEditing: false,
    });
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleFullnameChange = (text) => {
        setData({
            ...data,
            fullname: text.trim()
        });
    }

    const handleEmailChange = (text) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setData({
            ...data,
            email: text.trim(),
            emailCheck: re.test(text.trim().toLowerCase()),
        });
    }

    const handlePasswordChange = (text) => {
        setData({
            ...data,
            password: text,
            passwordCheck: text.trim().length >= 8
        });
    }
    
    const handleFullnameEndEditing = () => {
        setData({
            ...data, 
            fullnameEndEditing: true
        });
    }

    const handleEmailEndEditing = () => {
        setData({
            ...data, 
            emailEndEditing: true
        });
    }

    const handlePasswordEndEditing = () => {
        setData({
            ...data, 
            passwordEndEditing: true
        });
    }

    const handleSignUp = async () => {
        let user = {
            email: data.email, 
            password: data.password,
            fullname: data.fullname,
            license: '??tudent', 
            licenseExpiration: '20201010', 
            medicalExpiration: '20201010', 
            personalWeight: 75,
            parachuteID: -1, 
            categoryID: -1, 
            dropzoneID: -1, 
            planeID: -1, 
            altitude: 3000
        }

        if (!data.emailCheck || !data.passwordCheck || !data.fullname) {
            setData({
                ...data, 
                fullnameEndEditing: true,
                emailEndEditing: true,
                passwordEndEditing: true
            });
            return;
        }

        postToServer(`${URL}/user`, {user: user}, null, (status, data) => {
            if (status == 200) {
                try {
                    AsyncStorage.setItem('@token', data['token'])
                } catch(e) {
                // TODO save error
                }
                props.dispatch({type: 'SIGN_IN', token: data['token']})
            } else {
                Alert.alert('Email u?? existuje!', 'Zadan?? email u?? v datab??ze existuje', [{text: 'Ok'}]);
            }
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.page, {alignItems: 'center', justifyContent: 'center'}]}>
            <StatusBar backgroundColor={styleColors.mainColor} barStyle='light-content'/>
                <View style={{width: 250}}>
                    {/* NAME begin */}
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={styles.text1}>Meno</Text>
                        <View style={styles.signInput}>
                            <FontAwesome name={'user-o'} color={data.fullnameEndEditing && !data.fullname ? styleColors.red : styleColors.textColorContent} size={20}/>
                            <TextInput 
                                placeholder={'Tvoje meno'}
                                placeholderTextColor={styleColors.fadedColor}
                                style={styles.textInput}
                                autoCapitalize={'words'}
                                autoCompleteType={'name'}
                                textContentType={'name'}
                                onChangeText={handleFullnameChange}
                                onEndEditing={handleFullnameEndEditing}
                            />
                            {data.fullname ? 
                            <Feather name="check-circle" color={styleColors.green} size={20} />
                            : 
                            null
                            }
                        </View>
                    </View>
                    {data.fullnameEndEditing && !data.fullname ? 
                    <Text style={styles.textError}>Meno nesmie by?? pr??zdne</Text>
                    : null
                    }
                    {/* NAME end */}
                    {/* EMAIL begin */}
                    <View style={{alignItems: 'flex-start', marginTop: 35}}>
                        <Text style={styles.text1}>Email</Text>
                        <View style={styles.signInput}>
                            <MaterialIcons name="alternate-email" size={20} color={data.emailEndEditing && !data.emailCheck ? styleColors.red : styleColors.textColorContent} />
                            <TextInput 
                                placeholder={'Tvoj email'}
                                placeholderTextColor={styleColors.fadedColor}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                autoCompleteType={'email'}
                                keyboardType={'email-address'}
                                textContentType={'emailAddress'}
                                onChangeText={handleEmailChange}
                                onEndEditing={handleEmailEndEditing}
                            />
                            {data.emailCheck ? 
                            <Feather name="check-circle" color={styleColors.green} size={20} />
                            : 
                            null
                            }
                        </View>
                    </View>
                    {data.emailEndEditing && !data.emailCheck ? 
                    <Text style={styles.textError}>Nespr??vny tvar emailu.</Text>
                    : null
                    }
                    {/* EMAIL end */}
                    {/* PASSWORD begin */}
                    <View style={{alignItems: 'flex-start', marginTop: 35}}>
                        <Text style={styles.text1}>Heslo</Text>
                        <View style={styles.signInput}>
                            <Feather name={'lock'} color={data.passwordEndEditing && !data.passwordCheck ? styleColors.red : styleColors.textColorContent} size={20}/>
                            <TextInput
                                placeholder={'Tvoje heslo'}
                                placeholderTextColor={styleColors.fadedColor}
                                secureTextEntry={secureTextEntry}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={handlePasswordChange}
                                onEndEditing={handlePasswordEndEditing}
                            />
                            <TouchableOpacity onPress={() => {setSecureTextEntry(!secureTextEntry);}}>
                                {secureTextEntry ? 
                                <Feather name='eye-off' color={styleColors.mainColor} size={20}/>
                                :
                                <Feather name='eye' color={styleColors.mainColor} size={20}/>
                                }
                            </TouchableOpacity>
                            {data.passwordCheck ? 
                            <Feather name="check-circle" color={styleColors.green} size={20} style={{marginLeft: 10}}/>
                            : 
                            null
                            }
                        </View>
                        {data.passwordEndEditing && !data.passwordCheck ?
                        <Text style={styles.textError}>Heslo mus?? obsahova?? najmenej 8 znakov</Text>
                        : null
                        }
                    </View>
                    {/* PASSWORD end */}
                    {/* BUTTON begin */}
                    <TouchableOpacity 
                        style={{marginTop: 30, backgroundColor: styleColors.mainColor, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 5}} 
                        onPress={handleSignUp}
                    >
                        <Text style={[styles.text2, {color: styleColors.textColorSpecial}]}>Vytvori?? ????et</Text>
                    </TouchableOpacity>
                    {/* BUTTON end */}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const SignUp = connect(state => ({globalState: state}))(SignUpContainer);

export {SignUp};