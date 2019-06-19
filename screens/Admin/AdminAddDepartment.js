import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput, ImageBackground, ScrollView, KeyboardAvoidingView, BackHandler } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header } from 'react-native-elements';

import * as firebase from "firebase";

///////////////////// Setting up Firebase connection /////////////////////
// const config = {
//     apiKey: "AIzaSyBZhZaTch4WqFmyFMR6__TolzUpSPCvw08",
//     authDomain: "diploma-software-project.firebaseapp.com",
//     databaseURL: "https://diploma-software-project.firebaseio.com",
//     storageBucket: "diploma-software-project.appspot.com",
//     messagingSenderId: "1092827450895"
// };

const config = {
    apiKey: "AIzaSyBwTAwwF1Di-9Bt2-sJUuzyi6s8SaYPPxk",
    authDomain: "angelappfordatabase.firebaseapp.com",
    databaseURL: "https://angelappfordatabase.firebaseio.com",
    projectId: "angelappfordatabase",
    storageBucket: "",
    messagingSenderId: "758356549275"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

///////////////////// Default class /////////////////////
export default class AdminAddDepartment extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('AdminDepartment');
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    
    state = {
        // For entering new department data
        departmentName: '',
        departmentEmail: '',
        departmentHp: '',
    }

    joinData = () => {
        var departmentId = this.state.departmentId;
        var departmentName = this.state.departmentName;
        var departmentEmail = this.state.departmentEmail;
        var departmentHp = this.state.departmentHp;

        if (departmentName != '') {
            if (departmentEmail != '') {
                if (departmentHp != '') {
                    firebase.database().ref('Department/' + departmentName).set({
                        departmentEmail,
                        departmentHp,
                    })

                    Alert.alert('Department Registered Successfully !')

                    this.props.navigation.navigate('AdminDepartment');
                } else {
                    Alert.alert("Please Enter Department Contact Number")
                }
            } else {
                Alert.alert("Please Enter Department Email")
            }
        } else {
            Alert.alert("Please Enter Department Name")
        }
    }

    // Get the department information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.departmentContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Department.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Register Department</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('AdminDepartment');
                                }}
                            >
                                <View style={[{ flexDirection: 'row' }]}>
                                    <Text style={[{ color: '#fff', fontSize: 15 }]}>Cancel</Text>
                                </View>
                            </TouchableOpacity>}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'space-around',
                            borderBottomColor: "transparent",
                        }}
                    />

                    <ScrollView>
                        <View style={styles.newForm}>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ departmentName: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ departmentEmail: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Contact Number"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ departmentHp: data })}
                                style={styles.textInputStyle}
                            />

                            <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.button} >
                                <Text style={styles.buttonText}> Add </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    departmentContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#32323d',
        alignItems: 'center',
    },

    overallBackgroundImage: {
        width: '100%',
        height: '100%',
    },

    headerTitle: {
        color: '#fff',
        textAlign: 'center',
        width: '100%'
    },

    headerTitleText: {
        marginRight: -40,
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },

    newForm: {
        width: '100%',
        alignItems: 'center',
    },

    textInputStyle: {
        height: 55,
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderRadius: 5,
        marginTop: 12,
        fontSize: 20,
        color: 'white'
    },

    button: {
        width: '90%',
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 70 / 2,
        marginTop: 15,
        marginBottom: 12
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
});