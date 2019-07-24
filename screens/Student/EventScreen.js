import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, BackHandler, ToastAndroid, ActivityIndicator, Platform, AsyncStorage, Animated, Easing } from 'react-native';
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
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

        interval = setInterval(() => {
            AsyncStorage.getItem('userName').then((value) => this.setState({ 'userName': value }))
        }, 1000);

        this.spin();

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.spinValue = new Animated.Value(0);
        });
    }
    
    componentWillUnmount() {
        this.backHandler.remove();
        this.focusListener.remove();
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
            eventTitle: '',
            eventDepartment: '',
            eventDescription: '',
            eventDate: '',
            eventTime: '',
            eventVenue: '',

            userName: 'Anonymus',
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

        AsyncStorage.getItem('userName').then((value) => this.setState({ 'userName': value }))

        this.spinValue = new Animated.Value(0)
    }

    // Get the event information on selection
    GetItem = (item) => {
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
                if (child.val().StudentID === this.state.userName) {
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

            this.setState({ joinStatus: joinStatus })
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
                StudentID: this.state.userName
            })

            this.setState({
                joinIcon: 'check',
                joinIconColor: '#8aff4c',
                iconTitle: 'Joined !',
                iconTitleColor: '#8aff4c',
            })
        } else {
            var code = '';

            firebase.database().ref('Event/' + this.state.eventTitle + '/Joined/').on('value', (snapshot) => {

                snapshot.forEach((child) => {
                    if (child.val().StudentID === this.state.userName) {
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
        }
    }

    spin() {
        Animated.timing(
            this.spinValue,
            {
                toValue: 3,
                duration: 10000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    render() {
        // Spin animation
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View style={styles.eventContainer} behavior='padding'>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="dark-content"
                    leftComponent={<Feather name="menu" size={25} color="white" onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={
                    <View style={styles.centerHeader}>
                        <Animated.Image
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                transform: [{ rotate: spin }]
                            }}
                            source={require('../../images/octo2.jpg')}
                        />
                        <Text style={{ fontSize: 25, color: 'white', marginLeft: 10 }}>Turritopsis</Text>
                    </View>}
                    // rightComponent={<Feather name="home" size={25} color="#2e2e38" onPress={() =>
                    //   this.props.navigation.openDrawer()
                    // } />}
                    containerStyle={{
                        backgroundColor: '#2e2e38',
                        // backgroundColor: 'white',
                        borderBottomWidth: 0,
                        display: "flex",
                        shadowColor: "#2e2e38",
                        shadowOffset: {
                            width: 3,
                            height: 4,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,
                        elevation: 8,
                        zIndex: 5
                    }}
                />

                <Text style={{ fontSize: 20, margin: '4%' }}><MaterialCommunityIcons name="eventbrite" size={30} color="black" /> Event and Activity</Text>

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
                        <TouchableOpacity
                            style={styles.userIcon}
                            onPress={this.JoinEvent.bind()}
                        >
                            <Feather name={this.state.joinIcon} size={75} color={this.state.joinIconColor} />
                            <Text style={{ textAlign: 'center', color: this.state.iconTitleColor, marginTop: -10 }} >{this.state.iconTitle}</Text>
                        </TouchableOpacity>
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

                <ScrollView style={styles.wrapper}>
                <Text style={{fontSize:30,paddingLeft:17}}><MaterialIcons name="event" size={34} color="black"/> Event</Text>
                    {this.array.map((item) => {
                        return (
                            <TouchableOpacity
                                style={styles.item}
                                // onPress={this.GetItem.bind(this, item.title)}
                                onPress={() => this.GetItem(item.title)}
                            >
                                <MaterialIcons name="event" size={39} color="black" />
                                <Text style={styles.textStyling}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}

                    <Text style={{ textAlign: 'center', fontSize: 15, margin: 15 }}>End of the Page</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    eventContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ededed',
    },

    centerHeader: {
        flexDirection: 'row',
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

    wrapper: {
        width: '100%',
        height: '100%',
        marginTop: 5,
    },

    item: {
        padding: 20,
        color: 'black',
        backgroundColor: 'white',
        width: '92%',
        height: 85,
        borderRadius: 10,
        marginTop: 8,
        marginRight: 8,
        marginLeft: '4%',
        marginRight: '4%',
        elevation: 1,
        flexDirection: 'row'
    },
    
    textStyling: {
        fontSize: 20,
        marginTop: 6,
        marginLeft: 18,
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