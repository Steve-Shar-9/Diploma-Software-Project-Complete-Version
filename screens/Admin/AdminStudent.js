import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, ImageBackground, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Overlay } from 'react-native-elements';

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
            snapshot.forEach((child) => {
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
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
                    studentId = child.val().studentId;
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
                                    this.array = []
                                    this.state.arrayHolder = []
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
                        width="80%"
                        height="60%"
                    >
                        <Text style={{ textAlign: 'left', fontSize: 17 }}>
                            Student ID: {this.state.studentId}{'\n'}
                            Name: {this.state.studentName}{'\n'}
                            I.C.: {this.state.studentIc}{'\n'}
                            Email: {this.state.studentEmail}{'\n'}
                            Password: {this.state.studentPassword}{'\n'}
                            Gender: {this.state.studentGender}{'\n'}
                            Nationality: {this.state.studentNationality}{'\n'}
                            Contact Number: {this.state.studentHp}{'\n'}
                            Address: {this.state.studentAdress}{'\n'}
                            Admission Date: {this.state.studentAdmissionDate}{'\n'}
                            Programme: {this.state.studentProgramme}{'\n'}
                        </Text>
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
                        {/* <FlatList
                            data={this.state.arrayHolder}
                            width='100%'
                            extraData={this.state.arrayHolder}
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
});