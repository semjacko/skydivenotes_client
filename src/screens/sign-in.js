import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar, Alert} from 'react-native';
import {FontAwesome, Feather} from '@expo/vector-icons';
import {connect} from 'react-redux';

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

    const handleSignIn = () => {

        if (email.length == 0 || password.length == 0) {
            Alert.alert('Nesprávne údaje!', 'Email a heslo nesmie byť prázdne.', [{text: 'Ok'}]);
            return;
        }
        
        fetch(`http://18.196.156.172/token?email=${email}&password=${password}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                props.dispatch({type: 'SIGN_IN', token: json['token']})
                props.navigation.navigate('signedIn');
            })
            .catch((err) => console.log(err));
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={styleColors.bgColor} barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Vitajte!</Text>
            <Text style={styles.text_header2}>Toto je zatiaľ len testovacia verzia!!!</Text>
        </View>
          <View 
            style={styles.footer}
          >
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={styleColors.mainColor}
                    size={20}
                />
                <TextInput 
                    placeholder="Tvoj email"
                    placeholderTextColor="#999999"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={handleEmailChange}
                />
            </View>

            <Text style={[styles.text_footer, {marginTop: 35}]}>Heslo</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={styleColors.mainColor}
                    size={20}
                />
                <TextInput 
                    placeholder="Tvoje heslo"
                    placeholderTextColor="#999999"
                    secureTextEntry={secureTextEntry}
                    style={[styles.textInput, {color: 'black'}]}
                    autoCapitalize="none"
                    onChangeText={handlePasswordChange}
                />
                <TouchableOpacity onPress={() => {setSecureTextEntry(!SecureTextEntry);}}>
                    {secureTextEntry ? 
                    <Feather name="eye-off" color="grey" size={20}/>
                    :
                    <Feather name="eye" color="grey" size={20}/>
                    }
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={{color: styleColors.mainColor, marginTop:15}}>Zabudli ste heslo?</Text>
            </TouchableOpacity>

            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {
                        backgroundColor: styleColors.mainColor,
                    }]}
                    onPress={handleSignIn}
                >
                <View style={styles.signIn}>
                    <Text style={[styles.textSign, {
                        color:'#ffffff'
                    }]}>Prihlásiť</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('signUp')}
                    style={[styles.signIn, {
                        borderColor: styleColors.mainColor,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: styleColors.mainColor
                    }]}>Registrácia</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
};

let SignIn = connect(state => ({ globalState: state }))(SignInContainer);











const styleColors = {
    bgColor: '#3b3b3b',
    mainColor: '#f5a207',
    secondColor: '#dfdfdf',
    grayColor: '#707070',
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: styleColors.bgColor,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: styleColors.secondColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: styleColors.secondColor,
        fontWeight: 'bold',
        fontSize: 30
    },
    text_header2: {
        color: styleColors.secondColor,
        fontSize: 20
    },
    text_footer: {
        color: styleColors.bgColor,
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#c5c5c5',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

  export {SignIn};