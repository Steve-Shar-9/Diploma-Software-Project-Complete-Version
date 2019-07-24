import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, ImageBackground, ScrollView, BackHandler, Platform, ActivityIndicator, Image, ToastAndroid, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Overlay } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

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
export default class AdminAnnouncement extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Admin');
            this.array = []
            this.state.arrayHolder = []
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
            isFetching: false,
            isLoading: true,

            announcementTitle: '',
            announcementDepartment: '',
            announcementDescription: '',
            announcementPicture: '',
        }

        this.runTheFlatlist();

        this.moveAnimation = new Animated.ValueXY({ x: 10, y: 800 })
    }

    _moveBall = () => {
        Animated.spring(this.moveAnimation, {
            toValue: { x: 0, y: 15 },
        }).start()
    }

    // Get the announcement information on selection
    GetItem(item) {
        firebase.database().ref('Announcement/').on('value', (snapshot) => {
            var announcementDepartment = '';
            var announcementDescription = '';

            snapshot.forEach((child) => {
                if (item === child.key) {
                    announcementDepartment = child.val().announcementDepartment;
                    announcementDescription = child.val().announcementDescription;
                }
            });

            this.setState({ isVisible: true, announcementTitle: item, announcementDepartment: announcementDepartment, announcementDescription: announcementDescription })
        });
    }

    showDetailData = (announcementTitle, announcementPicture, announcementDepartment, announcementDescription) => {
        this.setState({ isVisible: true, announcementTitle: announcementTitle, announcementPicture: announcementPicture, announcementDepartment: announcementDepartment, announcementDescription: announcementDescription })
    }

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

    runTheFlatlist = () => {
        firebase.database().ref('Announcement/').on('value', (snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                items.push({
                    id: child.key,
                    description: child.val(),
                });
            });
            this.setState({ flatListData: items, isFetching: false, isLoading: false }, () => {
                this._moveBall();});
            console.log(items)
        });
    }

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

    render() {
        return (
            <View style={styles.announcementContainer} behavior='padding'>
                <NavigationEvents
                    onDidFocus={payload => {
                        // console.log('did focus', payload)
                        this.runTheFlatlist();
                    }}
                />

                <ImageBackground
                    source={require('../../images/background/Announcement.jpg')}
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
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Announcement</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.array = []
                                    this.state.arrayHolder = []
                                    this.props.navigation.navigate('AdminAddAnnouncement');
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
                        windowBackgroundColor="rgba(0, 0, 0, 0.7)"
                        overlayBackgroundColor="white"
                        width="82%"
                        height="80%"
                        overlayStyle={{ padding: 0, borderRadius: 10 }}
                    >
                        <View style={{ backgroundColor: '#ABDCFF', width: '100%', height: 50, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>{this.state.announcementTitle}</Text>
                        </View>

                        <Image
                            style={{ width: '100%', height: '54%', alignSelf: 'center', flex: 0, paddingLeft: '50%', marginTop: 5 }}
                            source={{ uri: this.state.announcementPicture }}
                        />

                        <View style={{ padding: 20 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18 }}>
                            {this.state.announcementDescription}</Text>
                        </View>

                        <View style={{ padding: 20, position: 'absolute', bottom: 0, right: 0 }}>
                            <Text style={{ textAlign: 'right', fontSize: 14, fontStyle: 'italic' }}>
                                - By Department of
                                <Text style={{ fontSize: 14, fontWeight: '800', fontStyle: 'italic' }}> {this.state.announcementDepartment}</Text>
                            </Text>
                        </View>
                    </Overlay>
                    {/* Overlay Screen END */}

                    {this.loadingIndicator()}

                    <ScrollView>
                        <Animated.View style={[styles.wrapper, this.moveAnimation.getLayout()]}>
                            <FlatList
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                data={this.state.flatListData}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={styles.list}
                                        onPress={() => this.showDetailData(item.id, item.description.announcementPicture, item.description.announcementDepartment, item.description.announcementDescription)}>
                                        <Image
                                            style={{ width: '100%', height: '74%',  borderRadius: 10 }}
                                            source={{ uri: item.description.announcementPicture }}
                                        />
                                        <Text style={{ color: 'black', fontSize: 20, padding: 3 }}>{item.id}</Text>
                                    </TouchableOpacity>
                                }
                            />
                        </Animated.View>
                    </ScrollView>
                </ImageBackground>
            </View>
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

    wrapper: {
        width: '100%',
        height: '100%',
        paddingBottom: 20,
    },

    list: {
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 6,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        backgroundColor: 'white',
        width: '95%',
        height: 200,
        elevation: 2,
        borderRadius: 10,
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
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
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