import React from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar, Alert} from 'react-native';
import {FontAwesome, Feather} from '@expo/vector-icons';

const SignUp = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        emailCheck: false,
        emailEndEditing: false,
        passwordCheck: false,
        passwordEndEditing: false,
        secureTextEntry: true,
    });

    const handleEmailChange = (text) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setData({
            ...data,
            email: text,
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
            fullname: 'Test User',
            license: 'A', 
            licenseExpiration: '20200101', 
            medicalExpiration: '20200101', 
            personalWeight: 100,
            parachuteID: 1, 
            categoryID: 1, 
            dropzoneID: 1, 
            planeID: 1, 
            altitude: 3000
        }

        if (!data.emailCheck || !data.passwordCheck) {
            return;
        }

        await fetch(`http://18.196.156.172/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: user})
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                navigation.navigate('signedIn', {token: json.token});
            })
        // TODO get token and sign-in user
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
                    onEndEditing={handleEmailEndEditing}
                />
                {data.emailCheck ? 
                <View>
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </View>
                : null}
            </View>
            {data.emailEndEditing && !data.emailCheck ? 
            <View>
                <Text style={styles.errorMsg}>Nesprávny tvar emailu.</Text>
            </View>
            : null
            }
            

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Heslo</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={styleColors.mainColor}
                    size={20}
                />
                <TextInput 
                    placeholder="Tvoje heslo"
                    placeholderTextColor="#999999"
                    secureTextEntry={data.secureTextEntry}
                    style={[styles.textInput, {
                        color: 'black'//colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={handlePasswordChange}
                    onEndEditing={handlePasswordEndEditing}
                />
                <TouchableOpacity
                    onPress={() => {
                        setData({...data, secureTextEntry: !data.secureTextEntry});
                    }}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
                {data.passwordCheck ? 
                <View>
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                        style={{marginLeft: 10}}
                    />
                </View>
                : null}
            </View>
            {data.passwordEndEditing && !data.passwordCheck ?
            <View>
            <Text style={styles.errorMsg}>Heslo musí obsahovať najmenej 8 znakov</Text>
            </View>
            : null
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {
                        backgroundColor: styleColors.mainColor,
                    }]}
                    onPress={handleSignUp}
                >
                <View style={styles.signIn}>
                    <Text style={[styles.textSign, {
                        color:'#ffffff'
                    }]}>Registrovať</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('signIn')}
                    style={[styles.signIn, {
                        borderColor: styleColors.mainColor,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: styleColors.mainColor
                    }]}>Prihlásenie</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
};

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

  export {SignUp};