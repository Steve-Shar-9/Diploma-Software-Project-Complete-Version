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
export default class AdminAddAnnouncement extends Component {
    state = {
        // For entering new announcement data
        announcementId: '',
        announcementTitle: '',
        announcementDescription: '',
        announcementDepartment: '',
    }

    joinData = () => {
        var announcementId = this.state.announcementId;
        var announcementTitle = this.state.announcementTitle;
        var announcementDescription = this.state.announcementDescription;
        var announcementDepartment = this.state.announcementDepartment;

        if (announcementId != '') {
            if (announcementTitle != '') {
                if (announcementDescription != '') {
                    if (announcementDepartment != '') {
                        firebase.database().ref('Student/' + studentId).set({
                            announcementId,
                            announcementTitle,
                            announcementDescription,
                            announcementDepartment,
                        })

                        Alert.alert('Announcement Registered Successfully !')

                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'AdminAnnouncement' })
                            ],
                        }))
                    } else {
                        Alert.alert("Please Enter Announcement Department")
                    }
                } else {
                    Alert.alert("Please Enter Announcement Desciption")
                }
            } else {
                Alert.alert("Please Enter Announcement Title")
            }
        } else {
            Alert.alert("Please Enter Announcement ID")
        }
    }

    // Get the announcement information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.announcementContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Announcement.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Add Announcement</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'AdminAnnouncement' })
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
                                placeholder="Announcement ID"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ announcementId: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Title"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ announcementTitle: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ announcementDescription: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Department"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ announcementDepartment: data })}
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
    announcementContainer: {
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