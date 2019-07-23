import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput, ImageBackground, ScrollView, KeyboardAvoidingView, Picker, BackHandler } from 'react-native';
import { Header } from 'react-native-elements';

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

///////////////////// Password Base64 Encrytion /////////////////////
FormatFunctionAtob=(input)=>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }

        block = block << 8 | charCode;
    }

    return output;
}

FormatFunctionBtoa=(input)=>{
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);

        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        buffer = chars.indexOf(buffer);
    }

    return output;
}

///////////////////// Default class /////////////////////
export default class AdminAddStudent extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('AdminStudent');
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
            StudentProgrammePickerSelectedVal: '',
            // For entering new student data
            studentId: '',
            studentName: '',
            studentIc: '',
            studentPassword: '',
            studentEmail: '',
            studentGender: '',
            studentNationality: '',
            studentHp: '',
            studentAdmissionDate: '',
            studentProgramme: '',
            studentAddress: '',
        }

        // Get the list of announcement from Firebase
        firebase.database().ref('Programme/').on('value', (snapshot) => {
            snapshot.forEach((child) => {
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
    }

    // Get the data from user's input from 'NEW' tab
    joinData = () => {
        var studentId = this.state.studentId;
        var studentName = this.state.studentName;
        var studentIc = this.state.studentIc;
        var studentPassword = this.state.studentPassword;
        var studentEmail = this.state.studentEmail;
        var studentGender = this.state.studentGender;
        var studentNationality = this.state.studentNationality;
        var studentHp = this.state.studentHp;
        var studentAdmissionDate = this.state.studentAdmissionDate;
        var studentProgramme = this.state.studentProgramme;
        var studentAddress = this.state.studentAddress;

        if (studentId != '') {
            if (studentName != '') {
                if (studentIc != '') {
                    if (studentPassword != '') {
                        studentPassword = FormatFunctionAtob(studentPassword);

                        if (studentEmail != '') {
                            if (studentGender != '') {
                                if (studentNationality != '') {
                                    if (studentHp != '') {
                                        if (studentAdmissionDate != '') {
                                            if (studentProgramme != '') {
                                                if (studentAddress != '') {
                                                    firebase.database().ref('Student/' + studentId).set({
                                                        studentName,
                                                        studentIc,
                                                        studentPassword,
                                                        studentEmail,
                                                        studentGender,
                                                        studentNationality,
                                                        studentHp,
                                                        studentAdmissionDate,
                                                        studentProgramme,
                                                        studentAddress
                                                    })

                                                    Alert.alert('Student Registered Successfully !')

                                                    this.setState({
                                                    studentId: '',
                                                    studentName: '',
                                                    studentIc: '',
                                                    studentPassword: '',
                                                    studentEmail: '',
                                                    studentGender: '',
                                                    studentNationality: '',
                                                    studentHp: '',
                                                    studentAdmissionDate: '',
                                                    // studentProgramme: '',
                                                    studentAddress: '',})

                                                    // this.array = []
                                                    // this.state.arrayHolder = []

                                                    this.props.navigation.navigate('AdminStudent');
                                                } else {
                                                    Alert.alert("Please Enter Address")
                                                }
                                            } else {
                                                Alert.alert("Please Enter Programme")
                                            }
                                        } else {
                                            Alert.alert("Please Enter Admission Date")
                                        }
                                    } else {
                                        Alert.alert("Please Enter Contact Number")
                                    }
                                } else {
                                    Alert.alert("Please Enter Nationality")
                                }
                            } else {
                                Alert.alert("Please Enter Gender")
                            }
                        } else {
                            Alert.alert("Please Enter Email")
                        }
                    } else {
                        Alert.alert("Please Enter Password")
                    }
                } else {
                    Alert.alert("Please Enter Identity Number")
                }
            } else {
                Alert.alert("Please Enter Student Name")
            }
        } else {
            Alert.alert("Please Enter Student ID")
        }
    }

    // Get the student information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.studentContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Student.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Register Student</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    // this.array = []
                                    // this.state.arrayHolder = []
                                    this.props.navigation.navigate('AdminStudent');
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
                                defaultValue={this.state.studentId}
                                placeholder="Student ID"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentId: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentName}
                                placeholder="Name"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentName: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentIc}
                                placeholder="Identity Number"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentIc: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentPassword}
                                placeholder="Password"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentPassword: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentEmail}
                                placeholder="Email"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentEmail: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentGender}
                                placeholder="Gender"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentGender: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentNationality}
                                placeholder="Nationality"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentNationality: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentHp}
                                placeholder="Contact Number"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentHp: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.studentAdmissionDate}
                                placeholder="Admission Date"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentAdmissionDate: data })}
                                style={styles.textInputStyle}
                            />
                            
                            <Text style={styles.departmentTextStyle}>Select a Programme:</Text>

                            <Picker
                                selectedValue={this.state.studentProgramme}
                                style={styles.item}
                                itemStyle={{ backgroundColor: "transparent", color: "white", borderColor: 'rgba(255,255,255,0.3)', height: 50 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ studentProgramme: itemValue })} >
                                {this.array.map((item) => {
                                    return (<Picker.Item label={item.title} value={item.title} />)
                                })}
                            </Picker>

                            <TextInput
                                defaultValue={this.state.studentAddress}
                                placeholder="Address"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ studentAddress: data })}
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
        marginTop: 25,
        marginBottom: 12
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
});