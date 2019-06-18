import React from 'react';
import { Alert, TouchableOpacity, View, Text, TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SimpleLineIcons } from '@expo/vector-icons';

import * as firebase from "firebase";

console.disableYellowBox = true;

//Setting up Firebase connection
const config = {
    apiKey: "AIzaSyBwTAwwF1Di-9Bt2-sJUuzyi6s8SaYPPxk",
    authDomain: "angelappfordatabase.firebaseapp.com",
    databaseURL: "https://angelappfordatabase.firebaseio.com",
    projectId: "angelappfordatabase",
    storageBucket: "",
    messagingSenderId: "758356549275"
};

try {
    firebase.initializeApp(config);
    console.log("Logged into app");
} catch (e) {
    console.log('App reloaded, so firebase did not re-initialize');
}

///////////////////// Password Base64 Encrytion /////////////////////
FormatFunctionAtob = (input) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }

        block = block << 8 | charCode;
    }

    return output;
}

export default class LoginScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            usernameIco: 'rgba(255,255,255,0.5)',
            passwordIco: 'rgba(255,255,255,0.5)',
            inputBorderBottomColorUsername: 'rgba(255,255,255,0.2)',
            inputBorderBottomColorPassword: 'rgba(255,255,255,0.2)',
            isFocused: false,
            errorColor: 'transparent',
            errorMsg: 'All fields are required'
        }
    }

    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    handleInputFocusUsername = () => {
        this.setState({ isFocused: true, inputBorderBottomColorUsername: 'white', usernameIco: 'white', errorColor: 'transparent', inputBorderBottomColorPassword: 'rgba(255,255,255,0.2)', passwordIco: 'rgba(255,255,255,0.5)' })
    }

    handleInputBlurUsername = () => {
        this.setState({ isFocused: false, inputBorderBottomColorUsername: 'rgba(255,255,255,0.2)', usernameIco: 'rgba(255,255,255,0.5)' })
    }

    handleInputFocusPassword = () => {
        this.setState({ isFocused: true, inputBorderBottomColorPassword: 'white', passwordIco: 'white', errorColor: 'transparent', inputBorderBottomColorUsername: 'rgba(255,255,255,0.2)', usernameIco: 'rgba(255,255,255,0.5)' })
    }

    handleInputBlurPassword = () => {
        this.setState({ isFocused: false, inputBorderBottomColorPassword: 'rgba(255,255,255,0.2)', passwordIco: 'rgba(255,255,255,0.5)' })
    }

    handleUsername = (text) => {
        this.setState({ username: text })
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    login = (username, password) => {
        if(username === 'Admin' && password === '123'){
            pass = password;
        }else{
            // Convert password to base64 for further checking in Firebase
            pass = FormatFunctionAtob(password);
        }

        firebase.database().ref('Student').on('value', (snapshot) => {
            // var checkUsername = snapshot.val();
            var exists = 'False';
            var userPassword = '';

            snapshot.forEach((child) => {
                if (username === child.key){
                    exists = 'True';
                    userPassword = child.val().studentPassword;
                }
            })

            if (username === 'Admin' && pass === '123'){
                this.setState({ username: '', password: '' })
                this.props.navigation.navigate('Admin');
            } else if (exists === 'True' && pass === userPassword){
                this.setState({ username: '', password: '' })
                this.props.navigation.navigate('Home', { data: username });
            } else {
                if (!username && !pass) {
                    this.setState({ errorMsg: 'All fields are required', errorColor: '#ff1c76', isFocused: true, inputBorderBottomColorUsername: '#ff1c76', usernameIco: '#ff1c76', inputBorderBottomColorPassword: '#ff1c76', passwordIco: '#ff1c76' })
                } else if (exists !== 'True') {
                    if (username !== 'Admin'){
                        this.setState({ errorMsg: 'Incorrect Username', errorColor: '#ff1c76', isFocused: true, inputBorderBottomColorUsername: '#ff1c76', usernameIco: '#ff1c76' })
                    } else if(!userPassword){
                        if (pass !== '123'){
                            this.setState({ errorMsg: 'Incorrect Password', errorColor: '#ff1c76', isFocused: true, inputBorderBottomColorPassword: '#ff1c76', passwordIco: '#ff1c76' })
                        }
                    }
                }
            }
        });
    }

    render() {
        const { isFocused } = this.state

        return (
            <View style={styles.loginScreenContainer}>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={require('../images/background/bg3.jpg')}
                    blurRadius={50}
                >
                    <KeyboardAvoidingView behavior="position">
                        <View style={styles.center}>
                            <View style={styles.userIcon}>
                                <SimpleLineIcons name="people" size={90} style={[{ color: "white" }]} />
                            </View>
                        </View>
                        
                        <View style={[styles.rowContainer, { marginBottom: 30,}]}>
                            <View style={styles.inputIcon}>
                                <Icon name="user-circle" size={30} style={[{ color: this.state.usernameIco }]} />
                            </View>

                            <TextInput style={[styles.input, { borderColor: this.state.inputBorderBottomColorUsername }]}
                                defaultValue={this.state.username}
                                underlineColorAndroid="transparent"
                                placeholder="Username"
                                placeholderTextColor='rgba(255,255,255,0.3)'
                                autoCapitalize="none"
                                onChangeText={this.handleUsername}
                                onFocus={this.handleInputFocusUsername}
                                onBlur={this.handleInputBlurUsername} />
                            {isFocused}
                        </View>

                        <View style={[styles.rowContainer, { marginBottom: 25,}]}>
                            <View style={styles.inputIcon}>
                                <Icon name="lock" size={35} style={[{ color: this.state.passwordIco }]} />
                            </View>

                            <TextInput secureTextEntry={true} password={true} style={[styles.input, { borderColor: this.state.inputBorderBottomColorPassword }]}
                                defaultValue={this.state.password}
                                underlineColorAndroid="transparent"
                                placeholder="Password"
                                placeholderTextColor='rgba(255,255,255,0.3)'
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                onFocus={this.handleInputFocusPassword}
                                onBlur={this.handleInputBlurPassword} />
                            {isFocused}
                        </View>
                    </KeyboardAvoidingView>

                    <View style={styles.center}>
                        <Text style={[styles.errorTitle, { color: this.state.errorColor }]}>{this.state.errorMsg}</Text>
                    </View>
                </ImageBackground>

                <TouchableOpacity
                    onPress={() => this.login(this.state.username, this.state.password)}
                    style={styles.TouchableOpacityStyle}>
                    <View style={styles.center}>
                        <Text style={styles.text}>
                            Sign In
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginScreenContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    blurredBg: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        width: '100%',
        height: '100%',
    },

    userIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: 207,
        height: 207,
        borderWidth: 1,
        borderRadius: 207 / 2,
        borderColor: 'white',
        marginBottom: 60,
    },

    center: {
        alignItems: 'center',
    },

    rowContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },

    errorTitle: {
        fontSize: 17,
        marginBottom: 20,
    },

    inputIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '13%',
    },

    input: {
        marginLeft: '5%',
        width: '82%',
        paddingBottom: 10,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        color: 'white',
        fontSize: 17.5,
    },

    TouchableOpacityStyle: {
        width: '100%',
        position: 'absolute',
        bottom: 30,
    },

    text: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 60 / 2,
        padding: 15,
        borderColor: 'white',
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        // fontWeight: '800',
        overflow: 'hidden',
    },
});