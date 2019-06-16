import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header } from 'react-native-elements';

import * as firebase from "firebase";

///////////////////// Setting up Firebase connection /////////////////////
const config = {
    apiKey: "AIzaSyBZhZaTch4WqFmyFMR6__TolzUpSPCvw08",
    authDomain: "diploma-software-project.firebaseapp.com",
    databaseURL: "https://diploma-software-project.firebaseio.com",
    storageBucket: "diploma-software-project.appspot.com",
    messagingSenderId: "1092827450895"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

///////////////////// Default class /////////////////////
export default class AdminAddStudent extends Component {
    state = {
        // For entering new student data
        studentId: '',
        studentName: '',
        studentIc: '',
        studentPassword: '',
        studentEmail: '',
        studentGender: '',
        studentNationality: '',
        studentHp: '',
        studentAdmissionDate: '',
        studentProgramme: '',
        studentAddress: '',
    }

    // Get the data from user's input from 'NEW' tab
    joinData = () => {
        var studentId = this.state.studentId;
        var studentName = this.state.studentName;
        var studentIc = this.state.studentIc;
        var studentPassword = this.state.studentPassword;
        var studentEmail = this.state.studentEmail;
        var studentGender = this.state.studentGender;
        var studentNationality = this.state.studentNationality;
        var studentHp = this.state.studentHp;
        var studentAdmissionDate = this.state.studentAdmissionDate;
        var studentProgramme = this.state.studentProgramme;
        var studentAddress = this.state.studentAddress;

        if (studentId != '') {
            if (studentName != '') {
                if (studentIc != '') {
                    if (studentPassword != '') {
                        if (studentEmail != '') {
                            if (studentGender != '') {
                                if (studentNationality != '') {
                                    if (studentHp != '') {
                                        if (studentAdmissionDate != '') {
                                            if (studentProgramme != '') {
                                                if (studentAddress != '') {
                                                    firebase.database().ref('Student/' + studentId).set({
                                                        studentId,
                                                        studentName,
                                                        studentIc,
                                                        studentPassword,
                                                        studentEmail,
                                                        studentGender,
                                                        studentNationality,
                                                        studentHp,
                                                        studentAdmissionDate,
                                                        studentProgramme,
                                                        studentAddress
                                                    })

                                                    Alert.alert('Student Registered Successfully !')

                                                    this.props.navigation.dispatch(StackActions.reset({
                                                        index: 0,
                                                        actions: [
                                                            NavigationActions.navigate({ routeName: 'AdminStudent' })
                                                        ],
                                                    }))
                                                } else {
                                                    Alert.alert("Please Enter Address")
                                                }
                                            } else {
                                                Alert.alert("Please Enter Programme")
                                            }
                                        } else {
                                            Alert.alert("Please Enter Admission Date")
                                        }
                                    } else {
                                        Alert.alert("Please Enter Contact Number")
                                    }
                                } else {
                                    Alert.alert("Please Enter Nationality")
                                }
                            } else {
                                Alert.alert("Please Enter Gender")
                            }
                        } else {
                            Alert.alert("Please Enter Email")
                        }
                    } else {
                        Alert.alert("Please Enter Password")
                    }
                } else {
                    Alert.alert("Please Enter Identity Number")
                }
            } else {
                Alert.alert("Please Enter Student Name")
            }
        } else {
            Alert.alert("Please Enter Student ID")
        }
    }

    // Get the student information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.studentContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Student.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Register Student</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'AdminStudent' })
                                        ],
                                    }))
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
                                placeholder="Student ID"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentId: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentName: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Identity Number"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentIc: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentPassword: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentEmail: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Gender"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentGender: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Nationality"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentNationality: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Contact Number"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentHp: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Admission Date"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentAdmissionDate: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Programme"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentProgramme: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Address"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentAddress: data })}
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
    studentContainer: {
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
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 12,
        marginBottom: 12
    },

    buttonText: {
        color: '#32323d',
        textAlign: 'center',
        fontSize: 20,
    },
});