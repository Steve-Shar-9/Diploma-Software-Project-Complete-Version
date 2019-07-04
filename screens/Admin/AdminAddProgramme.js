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
export default class AdminAddProgramme extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('AdminProgramme');
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
        // For entering new programme data
        programmeName: '',
        // programmeDepartment: '',
        programmeDescription: '',
    }

    joinData = () => {
        var programmeName = this.state.programmeName;
        // var programmeDepartment = this.state.programmeDepartment;
        var programmeDescription = this.state.programmeDescription;

        if (programmeName != '') {
            // if (programmeDepartment != '') {
                if (programmeDescription != '') {
                    firebase.database().ref('Programme/' + programmeName).set({
                        // programmeDepartment,
                        programmeDescription,
                    })

                    Alert.alert('Programme Registered Successfully !')

                    this.setState({
                        programmeName: '',
                        // programmeDepartment: '',
                        programmeDescription: '',
                    })
                    
                    this.array = []
                    this.state.arrayHolder = []

                    this.props.navigation.navigate('AdminProgramme');
                } else {
                    Alert.alert("Please Enter Programme Description")
                }
            // } else {
            //     Alert.alert("Please Enter Programme Department")
            // }
        } else {
            Alert.alert("Please Enter Programme Name")
        }
    }

    // Get the programme information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.departmentContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Programme.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Register Programme</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.array = []
                                    this.state.arrayHolder = []
                                    this.props.navigation.navigate('AdminProgramme');
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
                                placeholder="Name"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ programmeName: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                multiline={true}
                                onChangeText={data => this.setState({ programmeDescription: data })}
                                style={styles.textInputStyle}
                            />

                            {/* <Text style={styles.departmentTextStyle}>Select a Department:</Text> */}

                            {/* <Picker
                                selectedValue={this.state.programmeDepartment}
                                style={styles.item}
                                itemStyle={{ backgroundColor: "transparent", color: "white", borderColor: 'rgba(255,255,255,0.3)', height: 50 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ programmeDepartment: itemValue })} >
                                {this.array.map((item) => {
                                    return (<Picker.Item label={item.title} value={item.title} />)
                                })}
                            </Picker> */}

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
    departmentContainer: {
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

    item: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        width: '90%',
        marginLeft: '5%',
        marginBottom: 20
    },

    departmentTextStyle: {
        height: 55,
        width: '90%',
        marginTop: 12,
        fontSize: 20,
        color: 'white'
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