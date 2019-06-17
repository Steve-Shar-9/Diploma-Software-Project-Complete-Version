import React from 'react';
import { Alert, TouchableOpacity, View, Text, TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

console.disableYellowBox = true;

export default class LoginScreen extends React.Component {
    state = {
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

    login = (username, pass) => {
        if (username === 'Admin' && pass === '123') {
            this.setState({ username: '' })
            this.setState({ password: '' })
            this.props.navigation.navigate('Admin');
        } else if (username === 'Hi' && pass === '123') {
            this.setState({ username: '' })
            this.setState({ password: '' })
            this.props.navigation.navigate('Home', { data: username });
        } else {
            if (!username && !pass) {
                this.setState({ errorMsg: 'All fields are required', errorColor: '#ff1c76', isFocused: true, inputBorderBottomColorUsername: '#ff1c76', usernameIco: '#ff1c76', inputBorderBottomColorPassword: '#ff1c76', passwordIco: '#ff1c76' })
            } else if (username !== 'Admin' && username !== 'Hi') {
                this.setState({ errorMsg: 'Incorrect Username', errorColor: '#ff1c76', isFocused: true, inputBorderBottomColorUsername: '#ff1c76', usernameIco: '#ff1c76' })
            } else if (!pass || pass !== '123') {
                this.setState({ errorMsg: 'Incorrect Password', errorColor: '#ff1c76', isFocused: true, inputBorderBottomColorPassword: '#ff1c76', passwordIco: '#ff1c76' })
            }
        }
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
                                <Icon name="users" size={70} style={[{ color: "white" }]} />
                            </View>
                        </View>
                        
                        <View style={[styles.rowContainer, { marginBottom: 30,}]}>
                            <View style={styles.inputIcon}>
                                <Icon name="user-circle" size={30} style={[{ color: this.state.usernameIco }]} />
                            </View>

                            <TextInput style={[styles.input, { borderColor: this.state.inputBorderBottomColorUsername }]}
                                // defaultValue="Steve"
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
                                // defaultValue="123"
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
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
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