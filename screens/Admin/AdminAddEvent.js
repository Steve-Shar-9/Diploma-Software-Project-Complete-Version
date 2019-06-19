import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput, ImageBackground, ScrollView, KeyboardAvoidingView, Picker, BackHandler } from 'react-native';
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
export default class AdminAddEvent extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('AdminEvent');
            this.array = []
            this.state.arrayHolder = []
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    
    constructor() {
        super();

        this.array = []

        this.state = {
            // Array for holding data from Firebase
            arrayHolder: [],
            PickerSelectedVal: ''
        }

        // Get the list of announcement from Firebase
        firebase.database().ref('Department/').on('value', (snapshot) => {
            snapshot.forEach((child) => {
                console.log(child.key)
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
    }

    state = {
        // For entering new event data
        eventTitle: '',
        eventDate: '',
        eventTime: '',
        eventDepartment: '',
        eventDescription: '',
        eventVenue: ''
    }

    joinData = () => {
        var eventTitle = this.state.eventTitle;
        var eventDate = this.state.eventDate;
        var eventTime = this.state.eventTime;
        var eventVenue = this.state.eventVenue;
        var eventDepartment = this.state.eventDepartment;
        var eventDescription = this.state.eventDescription;

        if (eventTitle != '') {
            if (eventDate != '') {
                if (eventTime != '') {
                    if (eventVenue != '') {
                        if (eventDepartment != '') {
                            if (eventDescription != '') {
                                firebase.database().ref('Event/' + eventTitle).set({
                                    eventDate,
                                    eventTime,
                                    eventDepartment,
                                    eventDescription,
                                    eventVenue,
                                })

                                Alert.alert('Event Registered Successfully !')

                                this.setState({
                                    eventTitle: '',
                                    eventDate: '',
                                    eventTime: '',
                                    eventDepartment: '',
                                    eventDescription: '',
                                    eventVenue: ''
                                })

                                this.array = []
                                this.state.arrayHolder = []

                                this.props.navigation.navigate('AdminEvent');
                            } else {
                                Alert.alert("Please Enter Event Description")
                            }
                        } else {
                            Alert.alert("Please Enter Event Department")
                        }
                    } else {
                        Alert.alert("Please Enter Event Venue")
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
                                    this.array = []
                                    this.state.arrayHolder = []
                                    this.props.navigation.navigate('AdminEvent');
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
                                placeholder="Venue"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ eventVenue: data })}
                                style={styles.textInputStyle}
                            />

                            <Text style={styles.departmentTextStyle}>Select a Department:</Text>

                            <Picker
                                selectedValue={this.state.eventDepartment}
                                style={styles.item}
                                itemStyle={{ backgroundColor: "transparent", color: "white", borderColor: 'rgba(255,255,255,0.3)', height: 50 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ eventDepartment: itemValue })} >
                                {this.array.map((item) => {
                                    return (<Picker.Item label={item.title} value={item.title} />)
                                })}
                            </Picker>

                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                multiline={true}
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

    departmentTextStyle: {
        height: 55,
        width: '90%',
        marginTop: 12,
        fontSize: 20,
        color: 'white'
    },

    item: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        width: '90%',
        marginLeft: '5%',
        marginBottom: 20
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