import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, StatusBar, StyleSheet, Keyboard, Alert} from 'react-native';
import {FontAwesome, Feather} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {getFromServer} from '../server';
import {styles, styleColors} from '../styles';

const SignInContainer = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleEmailChange = (text) => {
        setEmail(text.trim());
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const handleForgotPassword = () => {
        // TODO
        Alert.alert('Zabudnuté heslo!', 'Zabudli ste svoje heslo :(', [{text: 'Ok'}]);
    }

    const handleSignIn = () => {
        if (email.length == 0 || password.length == 0) {
            Alert.alert('Nesprávne údaje!', 'Email a heslo nesmú byť prázdne.', [{text: 'Ok'}]);
            return;
        }
        getFromServer(`http://18.196.156.172/token?email=${email}&password=${password}`, (status, data) => {
            if (status == 200) {
                props.dispatch({type: 'SIGN_IN', token: data['token']})
                props.navigation.navigate('signedIn');
            } else {
                Alert.alert('Nesprávne údaje!', 'Zadali ste nesprávny email alebo heslo', [{text: 'Ok'}]);
            }
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.page, {alignItems: 'center', justifyContent: 'center'}]}>
            <StatusBar backgroundColor={styleColors.bgColor} barStyle='dark-content'/>
                <View style={{width: 250}}>
                    {/* EMAIL begin */}
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={styles.text1}>Email</Text>
                        <View style={styles.signInput}>
                            <FontAwesome name={'user-o'} color={'#000000'} size={20}/>
                            <TextInput 
                                placeholder={'Tvoj email'}
                                placeholderTextColor={styleColors.grayColor}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                autoCompleteType={'email'}
                                keyboardType={'email-address'}
                                textContentType={'emailAddress'}
                                onChangeText={handleEmailChange}
                            />
                        </View>
                    </View>
                    {/* EMAIL end */}
                    {/* PASSWORD begin */}
                    <View style={{alignItems: 'flex-start', marginTop: 35}}>
                        <Text style={styles.text1}>Heslo</Text>
                        <View style={styles.signInput}>
                            <Feather name={'lock'} color={'#000000'} size={20}/>
                            <TextInput
                                placeholder={'Tvoje heslo'}
                                placeholderTextColor={styleColors.grayColor}
                                secureTextEntry={secureTextEntry}
                                style={styles.textInput}
                                autoCapitalize={'none'}
                                onChangeText={handlePasswordChange}
                            />
                            <TouchableOpacity onPress={() => {setSecureTextEntry(!secureTextEntry);}}>
                                {secureTextEntry ? 
                                <Feather name='eye-off' color={styleColors.mainColor} size={20}/>
                                :
                                <Feather name='eye' color={styleColors.mainColor} size={20}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={{marginTop: 10}}
                        onPress={handleForgotPassword}
                    >
                        <Text style={{color: styleColors.mainColor}}>Zabudli ste heslo?</Text>
                    </TouchableOpacity>
                    {/* PASSWORD end */}
                    {/* BUTTONS begin */}
                    <TouchableOpacity 
                        style={{marginTop: 30, backgroundColor: styleColors.mainColor, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 5}} 
                        onPress={handleSignIn}
                    >
                        <Text style={[styles.text2, {color: '#ffffff'}]}>Prihlásiť</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 50, alignItems: 'center'}}>
                        <Text style={styles.text1}>Este nemate ucet?</Text>
                        <TouchableOpacity
                            style={{marginTop: 20}}
                            onPress={() => props.navigation.navigate('signUp')}
                        >
                            <Text style={[styles.text2, {color: styleColors.mainColor}]}>Registrovať</Text>
                        </TouchableOpacity>
                    </View>
                    {/* BUTTONS end */}
                </View>
            </View>
      </TouchableWithoutFeedback>
    );
};

const SignIn = connect(state => ({globalState: state}))(SignInContainer);

export {SignIn};