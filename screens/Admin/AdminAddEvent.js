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
export default class AdminAddEvent extends Component {
    state = {
        // For entering new event data
        eventId: '',
        eventTitle: '',
        eventDate: '',
        eventTime: '',
        eventDepartment: '',
        eventDescription: '',
    }

    joinData = () => {
        var eventId = this.state.eventId;
        var eventTitle = this.state.eventTitle;
        var eventDate = this.state.eventDate;
        var eventTime = this.state.eventTime;
        var eventDepartment = this.state.eventDepartment;
        var eventDescription = this.state.eventDescription;

        if (eventId != '') {
            if (eventTitle != '') {
                if (eventDate != '') {
                    if (eventTime != '') {
                        if (eventDepartment != '') {
                            if (eventDescription != '') {
                                firebase.database().ref('Department/' + eventId).set({
                                    eventId,
                                    eventTitle,
                                    eventDate,
                                    eventTime,
                                    eventDepartment,
                                    eventDescription,
                                })

                                Alert.alert('Event Registered Successfully !')

                                this.props.navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'AdminEvent' })
                                    ],
                                }))
                            } else {
                                Alert.alert("Please Enter Event Description")
                            }
                        } else {
                            Alert.alert("Please Enter Event Department")
                        }
                    } else {
                        Alert.alert("Please Enter Event Time")
                    }
                } else {
                    Alert.alert("Please Enter Event Date")
                }
            } else {
                Alert.alert("Please Enter Event Title")
            }
        } else {
            Alert.alert("Please Enter Event ID")
        }
    }

    // Get the event information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.eventContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Events.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Register Events</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'AdminEvent' })
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
                                placeholder="Event ID"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ eventId: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Title"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ eventTitle: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Date"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ eventDate: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Time"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ eventTime: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Department"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ eventDepartment: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ eventDescription: data })}
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
    eventContainer: {
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