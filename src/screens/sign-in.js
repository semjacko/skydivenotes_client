import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, StatusBar, Keyboard, Alert} from 'react-native';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {signInUser} from '../server';
import {styles, styleColors} from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInContainer = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('@token').then((token) => {
            setLoading(false);
            if (token) {
                props.dispatch({type: 'SIGN_IN', token: token});
            }
        });
    }, []);

    if (loading) return null;

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
        signInUser({
            email: email, 
            password: password, 
            success: (token) => {
                try {
                    AsyncStorage.setItem('@token', token)
                } catch(e) {
                // TODO save error
                }
                props.dispatch({type: 'SIGN_IN', token: token});                  
            },
            fail:() => {Alert.alert('Nesprávne údaje!', 'Zadali ste nesprávny email alebo heslo', [{text: 'Ok'}]);}
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
                            <MaterialIcons name="alternate-email" size={20} color={styleColors.textColorContent}/>
                            <TextInput 
                                placeholder={'Tvoj email'}
                                placeholderTextColor={styleColors.labelColor}
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
                            <Feather name={'lock'} color={styleColors.textColorContent} size={20}/>
                            <TextInput
                                placeholder={'Tvoje heslo'}
                                placeholderTextColor={styleColors.labelColor}
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
                        <Text style={[styles.text2, {color: styleColors.textColorSpecial}]}>Prihlásiť</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 50, alignItems: 'center'}}>
                        <Text style={styles.text1}>Ešte nemáte účet?</Text>
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