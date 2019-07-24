import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header, Overlay } from 'react-native-elements';
import { LinearGradient } from 'expo';

import * as firebase from "firebase";

///////////////////// Setting up Firebase connection /////////////////////
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
export default class AdminEvent extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Admin');
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    
    // Contructor
    constructor(props) {
        super(props);

        this.array = []

        this.state = {
            // Array for holding data from Firebase
            arrayHolder: [],
            isVisible: false,
            eventTitle: '',
            eventDepartment: '',
            eventDescription: '',
            eventDate: '',
            eventTime: '',
            eventVenue: '',
        }

        // Get the list of event from Firebase
        firebase.database().ref('Event/').on('value', (snapshot) => {
            this.array = []

            snapshot.forEach((child) => {
                console.log(child.key)
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
    }

    // Get the event information on selection
    GetItem(item) {
        firebase.database().ref('Event/').on('value', (snapshot) => {
            var eventDepartment = '';
            var eventDescription = '';
            var eventDate = '';
            var eventTime = '';
            var eventVenue = '';

            snapshot.forEach((child) => {
                if (item === child.key) {
                    eventDepartment = child.val().eventDepartment;
                    eventDescription = child.val().eventDescription;
                    eventDate = child.val().eventDate;
                    eventTime = child.val().eventTime;
                    eventVenue = child.val().eventVenue;
                }
            });

            this.setState({ isVisible: true, eventTitle: item, eventDepartment: eventDepartment, eventDescription: eventDescription, eventDate: eventDate, eventTime: eventTime, eventVenue: eventVenue })
        });
    }

    render() {
        return (
            <View style={styles.eventContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Timetable1.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        leftComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Admin');
                                }}
                            >
                                <View style={[{ flexDirection: 'row' }]}>
                                    <Icon name="arrow-left" size={22} style={styles.backBtn} />
                                </View>
                            </TouchableOpacity>}
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Events</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('AdminAddEvent');
                                }}
                            >
                                <View style={[{ flexDirection: 'row' }]}>
                                    <Icon name="plus" size={22} style={styles.addBtn} />
                                </View>
                            </TouchableOpacity>}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'space-around',
                            // height: 100,
                            borderBottomColor: "transparent",
                        }}
                    />

                    {/* Overlay Screen */}
                    <Overlay
                        isVisible={this.state.isVisible}
                        onBackdropPress={() => this.setState({ isVisible: false })}
                        windowBackgroundColor="rgba(0,0,0,0.7)"
                        overlayBackgroundColor="white"
                        width='85%'
                        height='80%'
                        overlayStyle={{ padding: 0, borderRadius: 10 }}
                    >
                        {/* Header Background */}
                        <LinearGradient
                            colors={['#FFAA85', '#B3315F']}
                            start={[0.0, 0.5]}
                            end={[1.0, 0.5]}
                            locations={[0.0, 1.0]}
                            style={styles.linearGradientStyles}>
                            <View style={{ marginTop: '8%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                                    {this.state.eventTitle}
                                </Text>
                            </View>
                        </LinearGradient>

                        {/* User Icon */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '55%' }}>
                            <View style={styles.userIcon}>
                                <Icon name="code" size={75} color="black" />
                            </View>
                        </View>

                        {/* Content */}
                        <ScrollView style={styles.overlayContentContainer}>
                            <View style={styles.overlayContentStyle}>
                                <Text style={styles.overlayContentStyleTitle}>
                                    Department:
                                </Text>
                                <Text style={styles.overlayContentStyleContent}>
                                    {this.state.eventDepartment}
                                </Text>
                            </View>

                            <View style={styles.overlayContentStyle}>
                                <Text style={styles.overlayContentStyleTitle}>
                                    Description:
                                </Text>
                                <Text style={styles.overlayContentStyleContent}>
                                    {this.state.eventDescription}
                                </Text>
                            </View>

                            <View style={styles.overlayContentStyle}>
                                <Text style={styles.overlayContentStyleTitle}>
                                    Date:
                                </Text>
                                <Text style={styles.overlayContentStyleContent}>
                                    {this.state.eventDate}
                                </Text>
                            </View>

                            <View style={styles.overlayContentStyle}>
                                <Text style={styles.overlayContentStyleTitle}>
                                    Time:
                                </Text>
                                <Text style={styles.overlayContentStyleContent}>
                                    {this.state.eventTime}
                                </Text>
                            </View>

                            <View style={styles.overlayContentStyle}>
                                <Text style={styles.overlayContentStyleTitle}>
                                    Venue:
                                </Text>
                                <Text style={styles.overlayContentStyleContent}>
                                    {this.state.eventVenue}
                                </Text>
                            </View>
                        </ScrollView>
                    </Overlay>
                    {/* Overlay Screen END */}

                    <ScrollView>
                        {this.array.map((item) => {
                            return (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={this.GetItem.bind(this, item.title)}
                                    onLongPress={() => {
                                        alert('Hi');
                                    }}
                                >
                                    <View style={styles.userIdIcon} >
                                        <MaterialCommunityIcons name="eventbrite" size={37} color="white" />
                                    </View>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </ImageBackground>
            </View>
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
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },

    backBtn: {
        paddingLeft: 20,
        width: 40,
        color: '#fff'
    },

    addBtn: {
        paddingRight: 20,
        width: 40,
        color: '#fff'
    },

    item: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '95%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgba(255,255,255,0.7)',
        marginTop: 6,
        marginBottom: 6,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        // flexDirection: 'row'
    },

    itemTitle: {
        color: 'white',
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        padding: 5,
    },

    userIdIcon: {
        padding: 5,
        // borderWidth: 1,
        // borderRadius: 60 / 2,
        // borderColor: 'white',
        marginLeft: 20,
        marginRight: 20,
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

    linearGradientStyles: {
        alignItems: 'center',
        height: '35%',
        width: '100%',
        position: 'absolute',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    userIcon: {
        backgroundColor: 'white',
        width: 140,
        height: 140,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        position: 'absolute',
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },

    overlayContentContainer: {
        marginTop: '25%',
    },

    overlayContentStyle: {
        backgroundColor: 'white',
        width: '95%',
        height: 'auto',
        elevation: 1,
        padding: 20,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },

    overlayContentStyleTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18,
    },

    overlayContentStyleContent: {
        textAlign: 'left',
    },
});