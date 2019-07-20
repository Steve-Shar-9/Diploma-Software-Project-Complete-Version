import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  ScrollView, BackHandler,ToastAndroid, ActivityIndicator, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
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
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }

    //--------------------LOADING FUNCTION-----------------------
    loadingIndicator = () => {
        if (this.state.isLoading === true) {
            if (Platform.OS === 'ios') {
                return (
                    <View style={{ marginTop: 200 }}>
                        <ActivityIndicator size={'large'} color="#3390FF" animating={this.state.isLoading} />
                    </View>
                )
            }
            else {
                return (
                    <View style={{ marginTop: 200 }}>
                        <ActivityIndicator size={57} color="#3390FF" animating={this.state.isLoading} />
                    </View>
                )
            }

        }
        else {
            return (null)
        }
    }
    //--------------------REFRESH FUNCTION-----------------------
    onRefresh() {
        console.log('refreshing')
        this.setState({ isFetching: true }, function () {
            this.fetchData()
        });
    }
    fetchData() {
        if (Platform.OS === 'ios') {
            alert('refreshed');
        }
        else {
            ToastAndroid.showWithGravityAndOffset(
                'Refreshed',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
        this.runTheFlatlist();
    }

    // Contructor
    constructor(props) {
        super(props);

        this.array = []

        this.state = {
            // Default
            isVisible: false,
            isFetching: false,
            isLoading: true,
            // Join Icon
            joinStatus: '',
            joinIcon: 'minus',
            joinIconColor: '#ff1c76',
            iconTitle: 'Not joined yet...',
            iconTitleColor: '#ff1c76',
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
            this.state.arrayHolder = []

            snapshot.forEach((child) => {
                console.log(child.key)
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
    }

    // Get the event information on selection
    GetItem(item) {
        // Get the main list of events only
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

        // Initialize the join status
        firebase.database().ref('Event/' + item + '/Joined/').on('value', (snapshot) => {
            var joinStatus = 'False';

            snapshot.forEach((child) => {
                if (child.val().StudentID === 'C1700007') {
                    joinStatus = 'True';
                    this.setState({
                        joinIcon: 'check',
                        joinIconColor: '#8aff4c',
                        iconTitle: 'Joined !',
                        iconTitleColor: '#8aff4c',
                    })
                }
            });

            if (joinStatus !== 'True') {
                this.setState({
                    joinIcon: 'minus',
                    joinIconColor: '#ff1c76',
                    iconTitle: 'Not joined yet...',
                    iconTitleColor: '#ff1c76',
                })
            }

            this.setState({ joinStatus: joinStatus})
        });
    }

    JoinEvent = () => {
        if (this.state.joinIcon === 'minus') {
            
            var randomResult = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 20; i++) {
                randomResult += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            firebase.database().ref('Event/' + this.state.eventTitle + '/Joined/' + randomResult).set({
                StudentID: 'C1700007'
            })

            this.setState({
                joinIcon: 'check',
                joinIconColor: '#8aff4c',
                iconTitle: 'Joined !',
                iconTitleColor: '#8aff4c',
            })

            // ToastAndroid.showWithGravityAndOffset(
            //     'You have successfully joined \'' + this.state.eventTitle + '\' !',
            //     ToastAndroid.LONG,
            //     ToastAndroid.BOTTOM,
            //     25,
            //     50,
            // );
        }else {
            var code = '';

            firebase.database().ref('Event/' + this.state.eventTitle + '/Joined/').on('value', (snapshot) => {

                snapshot.forEach((child) => {
                    if (child.val().StudentID === 'C1700007') {
                        code = child.key;
                    }
                });
            })

            firebase.database().ref('Event/' + this.state.eventTitle + '/Joined/' + code).child('StudentID').remove();

            this.setState({
                joinIcon: 'minus',
                joinIconColor: '#ff1c76',
                iconTitle: 'Not joined yet...',
                iconTitleColor: '#ff1c76',
            })

            // ToastAndroid.showWithGravityAndOffset(
            //     'You have unjoined \'' + this.state.eventTitle + '\' ! :(',
            //     ToastAndroid.LONG,
            //     ToastAndroid.BOTTOM,
            //     25,
            //     50,
            // );
        }
    }

    render() {
        return (
            <View style={styles.eventContainer} behavior='padding'>
               
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        barStyle="dark-content"
                        leftComponent={<Feather name="menu" size={25} color="white" onPress={() => this.props.navigation.openDrawer()} />}
                        centerComponent={{ text: 'Event manager', style: { fontSize: 25, color: '#fff' } }}
                        rightComponent={<Feather name="home" size={25} color="white" onPress={() =>
                        this.props.navigation.openDrawer()

                        } />}
                        containerStyle={{
                        backgroundColor: '#2e2e38',
                        }}
                    />

                    {/* Overlay Screen */}
                    <Overlay
                        isVisible={this.state.isVisible}
                        onBackdropPress={() => this.setState({ isVisible: false })}
                        windowBackgroundColor="rgba(0,0,0,0.7)"
                        overlayBackgroundColor="white"
                        width='85%'
                        height='90%'
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
                            <TouchableOpacity
                                style={styles.userIcon}
                                onPress={ this.JoinEvent.bind() }
                            >
                                <Feather name={this.state.joinIcon} size={75} color={this.state.joinIconColor} />
                                <Text style={{textAlign: 'center', color: this.state.iconTitleColor, marginTop: -10}} >{this.state.iconTitle}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Content */}
                        <ScrollView>
                            <View style={styles.overlayContentContainer}>
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
                            </View>
                        </ScrollView>
                    </Overlay>
                    {/* Overlay Screen END */}

                    <ScrollView>
                        {this.array.map((item) => {
                            return (
                                <Text
                                    style={styles.item}
                                    onPress={this.GetItem.bind(this, item.title)}
                                >
                                    {item.title}
                                </Text>)
                        })}
                    </ScrollView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    eventContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#d9d9d9',
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

    drawerBtn: {
        paddingLeft: 20,
        width: 40,
        color: '#fff'
    },

    item: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        backgroundColor:'white',
        width: 383,
        height: 85,
        margin:5,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        elevation: 1,
    },

    linearGradientStyles: {
        alignItems: 'center',
        height: 190,
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
        marginTop: 90,
        marginBottom: 40,
        textAlign: 'left',
        justifyContent: 'center',
        alignItems: 'center',
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