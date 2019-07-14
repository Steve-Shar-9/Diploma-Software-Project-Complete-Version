import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, BackHandler, Platform, ActivityIndicator, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Header, Overlay } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { NavigationEvents } from 'react-navigation';

import * as firebase from "firebase";

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
export default class Student extends Component {
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
            isLoading: true,
            // Array for holding data from Firebase
            arrayHolder: [],
            isVisible: false,
            studentId: '',
            studentName: '',
            studentIc: '',
            studentEmail: '',
            studentPassword: '',
            studentAdmissionDate: '',
            studentGender: '',
            studentNationality: '',
            studentHp: '',
            studentAddress: '',
            studentProgramme: '',
        }

        // Get the list of student from Firebase
        firebase.database().ref('Student/').on('value', (snapshot) => {
            this.array = []

            snapshot.forEach((child) => {
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
    }

    loadingIndicator = () => {
        if (this.state.isLoading === true) {
            if (Platform.OS === 'ios') {
                return (
                    <View style={{ marginTop: 50 }}>
                        <ActivityIndicator size={'large'} color="rgba(255,255,255,0.3)" animating={this.state.isLoading} />
                    </View>
                )
            }
            else {
                return (
                    <View style={{ marginTop: 50 }}>
                        <ActivityIndicator size={57} color="rgba(255,255,255,0.3)" animating={this.state.isLoading} />
                    </View>
                )
            }
        }
        else {
            return (null)
        }
    }

    // Get the student information on selection
    GetItem(item) {
        firebase.database().ref('Student').on('value', (snapshot) => {
            var studentId = '';
            var studentName = '';
            var studentIc = '';
            var studentEmail = '';
            var studentPassword = '';
            var studentAdmissionDate = '';
            var studentGender = '';
            var studentNationality = '';
            var studentHp = '';
            var studentAddress = '';
            var studentProgramme = '';

            snapshot.forEach((child) => {
                if (item === child.key) {
                    studentId = item;
                    studentName = child.val().studentName;
                    studentIc = child.val().studentIc;
                    studentEmail = child.val().studentEmail;
                    studentPassword = child.val().studentPassword;
                    studentAdmissionDate = child.val().studentAdmissionDate;
                    studentGender = child.val().studentGender;
                    studentNationality = child.val().studentNationality;
                    studentHp = child.val().studentHp;
                    studentAddress = child.val().studentAddress;
                    studentProgramme = child.val().studentProgramme;
                }
            });

            this.setState({ isVisible: true, studentId: studentId, studentName: studentName, studentIc: studentIc, studentEmail: studentEmail, studentPassword: studentPassword, studentAdmissionDate: studentAdmissionDate, studentGender: studentGender, studentNationality: studentNationality, studentHp: studentHp, studentAddress: studentAddress, studentProgramme: studentProgramme})
        });
    }

    render() {
        return (
            <View style={styles.studentContainer} behavior='padding'>
                <NavigationEvents
                onDidFocus={payload => {
                    this.setState({isVisible:false})
                }}
                />
                <ImageBackground
                    source={require('../../images/background/Student.jpg')}
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
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Student</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('AdminAddStudent');
                                }}
                            >
                                <View style={[{ flexDirection: 'row' }]}>
                                    <Icon name="plus" size={22} style={styles.addBtn} />
                                </View>
                            </TouchableOpacity>}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'space-around',
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
                        height='90%'
                        overlayStyle={{ padding: 0, borderRadius: 10 }}
                    >
                        {/* Header Background */}
                        <LinearGradient
                            colors={['#FFD3A5', '#FD6585']}
                            start={[0.0, 0.5]}
                            end={[1.0, 0.5]}
                            locations={[0.0, 1.0]}
                            style={styles.linearGradientStyles}>
                            <View style={{ marginTop: '5%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 30, color: 'white' }}>
                                    {this.state.studentName}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'white', marginTop: '2%' }}>
                                    {this.state.studentId}
                                </Text>
                            </View>
                        </LinearGradient>

                        {/* User Icon */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '55%' }}>
                            <View style={styles.userIcon}>
                                <Ionicons name="md-contacts" size={75} color="black" />
                            </View>
                        </View>

                        {/* Content */}
                        <ScrollView>
                            <View style={styles.overlayContentContainer}>
                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Identity Card No.
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentIc}
                                    </Text>
                                </View>

                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Email:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentEmail}
                                    </Text>
                                </View>

                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Password:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentPassword}
                                    </Text>
                                </View>

                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Gender:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentGender}
                                    </Text>
                                </View>

                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Nationality:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentNationality}
                                    </Text>
                                </View>

                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Contact Number:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentHp}
                                    </Text>
                                </View>

                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Address:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentAddress}
                                    </Text>
                                </View>

                                <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Admission Date:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentAdmissionDate}
                                    </Text>
                                </View>

                                {/* <View style={styles.overlayContentStyle}>
                                    <Text style={styles.overlayContentStyleTitle}>
                                        Programme:
                                    </Text>
                                    <Text style={styles.overlayContentStyleContent}>
                                        {this.state.studentProgramme}
                                    </Text>
                                </View> */}
                            </View>
                        </ScrollView>
                    </Overlay>
                    {/* Overlay Screen END */}

                    <ScrollView>
                        {/* {this.loadingIndicator()} */}

                        {this.array.map((item) => {
                            return (
                            <Text
                                style={styles.item}
                                onPress={this.GetItem.bind(this, item.title)}
                            >
                                {item.title}
                            </Text>)
                        })}

                        {/* <FlatList
                            data={this.state.arrayHolder}
                            width='100%'
                            extraData={this.state.array}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) =>
                                <Text
                                    style={styles.item}
                                    onPress={this.GetItem.bind(this, item.title)}
                                >
                                    {item.title}
                                </Text>
                            }
                        /> */}
                    </ScrollView>
                </ImageBackground>
            </View>
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

    searchBar: {
        width: '90%',
        padding: 15,
        paddingLeft: 25,
        backgroundColor: 'transparent',
        fontSize: 15,
        color: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
    },

    item: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
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