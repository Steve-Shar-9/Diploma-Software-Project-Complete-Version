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
export default class AdminAddProgramme extends Component {
    state = {
        // For entering new programme data
        programmeId: '',
        programmeName: '',
        programmeDepartment: '',
        programmeDescription: '',
    }

    joinData = () => {
        var programmeId = this.state.programmeId;
        var programmeName = this.state.programmeName;
        var programmeDepartment = this.state.programmeDepartment;
        var programmeDescription = this.state.programmeDescription;

        if (programmeId != '') {
            if (programmeName != '') {
                if (programmeDepartment != '') {
                    if (programmeDescription != '') {
                        firebase.database().ref('Programme/' + studentId).set({
                            programmeId,
                            programmeName,
                            programmeDepartment,
                            programmeDescription,
                        })

                        Alert.alert('Programme Registered Successfully !')

                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'AdminProgramme' })
                            ],
                        }))
                    } else {
                        Alert.alert("Please Enter Programme Description")
                    }
                } else {
                    Alert.alert("Please Enter Programme Department")
                }
            } else {
                Alert.alert("Please Enter Programme Name")
            }
        } else {
            Alert.alert("Please Enter Programme ID")
        }
    }

    // Get the programme information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.departmentContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Programme.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Register Programme</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'AdminProgramme' })
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
                                placeholder="Programme ID"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ programmeId: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ programmeName: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Department"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ programmeDepartment: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ programmeDescription: data })}
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