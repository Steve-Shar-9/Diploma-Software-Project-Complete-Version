import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput, ImageBackground, Dimensions, StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';

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
export default class Student extends Component {
    // Contructor
    constructor(props) {
        super(props);

        // Get the list of student from Firebase
        firebase.database().ref('Student/').on('value', (snapshot) => {
            snapshot.forEach((child) => {
                console.log(child.key)
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })

        this.array = [],

        this.state = {
            // Array for holding data from Firebase
            arrayHolder: [],
            // For initializing the tabs
            index: 0,
            routes: [
                { key: 'first', title: 'List' },
                { key: 'second', title: 'New' },
            ],
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
                        if (studentEmail != '') {
                            if (studentGender != '') {
                                if (studentNationality != '') {
                                    if (studentHp != '') {
                                        if (studentAdmissionDate != '') {
                                            if (studentProgramme != '') {
                                                if (studentAddress != '') {
                                                    firebase.database().ref('Student/' + title).set({
                                                        studentId,
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
            <View style={styles.studentContainer}>
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
                                    this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Admin' })
                                        ],
                                    }))
                                }}
                            >
                                <View style={[{ flexDirection: 'row' }]}>
                                    <Icon name="arrow-left" size={22} style={styles.backBtn} />
                                </View>
                            </TouchableOpacity>}
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Student</Text></View>}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            justifyContent: 'space-around',
                            // height: 100,
                            borderBottomColor: "transparent",
                        }}
                    />

                    <TabView
                        navigationState={this.state}
                        renderScene={SceneMap({
                            ////////////////////// First Tab //////////////////////
                            first: () =>
                            <FlatList
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
                            />,
                            // END //
                            ////////////////////// Second Tab //////////////////////
                            second: () =>
                            <View style={styles.newForm}>
                                <ScrollView style={[{ width: '100%' }]}>
                                    <KeyboardAvoidingView behavior="position">
                                        <TextInput
                                            placeholder="Student ID"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentId: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Name"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentName: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Identity Number"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentIc: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Password"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentPassword: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Email"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentEmail: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Gender"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentGender: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Nationality"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentNationality: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Contact Number"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentHp: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Admission Date"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentAdmissionDate: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Programme"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentProgramme: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />

                                        <TextInput
                                            placeholder="Student Address"
                                            placeholderTextColor={'rgba(255,255,255,0.3)'}
                                            onChangeText={data => this.setState({ studentAddress: data })}
                                            style={styles.textInputStyle}
                                            autoCapitalize="none"
                                            underlineColorAndroid='transparent'
                                        />
                                    </KeyboardAvoidingView>
                                    <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.button} >
                                        <Text style={styles.buttonText}> Add </Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>,
                            // END //
                        })}
                        renderTabBar={props =>
                            <TabBar
                                {...props}
                                indicatorStyle={{ backgroundColor: 'white' }}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        }
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        style={styles.sceneContainer}
                    />
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
        marginLeft: -40,
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

    sceneContainer: {
        marginTop: StatusBar.currentHeight
    },

    scene: {
        width: '100%',
        height: '100%',
        flex: 1,
    },

    item: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
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