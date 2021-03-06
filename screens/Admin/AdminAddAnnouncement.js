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
export default class AdminAddAnnouncement extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('AdminAnnouncement');
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
            PickerSelectedVal: '',
            // For entering new announcement data
            announcementTitle: '',
            announcementDescription: '',
            announcementPicture: '',
            announcementDepartment: '',
        }

        // Get the list of announcement from Firebase
        firebase.database().ref('Department/').on('value', (snapshot) => {
            snapshot.forEach((child) => {
                console.log(child.key)

                if (count === 0) {
                    this.setState({ announcementDepartment: child.key })
                }

                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
    }

    joinData = () => {
        var announcementTitle = this.state.announcementTitle;
        var announcementDescription = this.state.announcementDescription;
        var announcementPicture = this.state.announcementPicture;
        var announcementDepartment = this.state.announcementDepartment;

        if (announcementTitle != '') {
            if (announcementDescription != '') {
                if (announcementPicture != '') {
                    if (announcementDepartment != '') {
                        firebase.database().ref('Announcement/' + announcementTitle).set({
                            announcementDescription,
                            announcementPicture,
                            announcementDepartment,
                        })

                        Alert.alert('Announcement Registered Successfully !')

                        this.setState({
                            announcementTitle: '',
                            announcementDescription: '',
                            announcementPicture: '',
                            // announcementDepartment: '',
                        })
                        
                        // this.array = []
                        // this.state.arrayHolder = []

                        this.props.navigation.navigate('AdminAnnouncement');
                    } else {
                        Alert.alert("Please Enter Announcement Department")
                    }
                } else {
                    Alert.alert("Please Enter Announcement Picture URL")
                }
            } else {
                Alert.alert("Please Enter Announcement Description")
            }
        } else {
            Alert.alert("Please Enter Announcement Title")
        }
    }

    // Get the announcement information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.announcementContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Announcement.png')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                    <Header
                        statusBarProps={{ barStyle: 'light-content' }}
                        placement="left"
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Add Announcement</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    // this.array = []
                                    // this.state.arrayHolder = []
                                    this.props.navigation.navigate('AdminAnnouncement');
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
                                defaultValue={this.state.announcementTitle}
                                placeholder="Title"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                onChangeText={data => this.setState({ announcementTitle: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.announcementDescription}
                                placeholder="Description"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                multiline={true}
                                onChangeText={data => this.setState({ announcementDescription: data })}
                                style={styles.textInputStyle}
                            />

                            <TextInput
                                defaultValue={this.state.announcementPicture}
                                placeholder="Picture URL"
                                placeholderTextColor={'rgba(255,255,255,0.3)'}
                                multiline={true}
                                onChangeText={data => this.setState({ announcementPicture: data })}
                                style={styles.textInputStyle}
                            />

                            <Text style={styles.departmentTextStyle}>Select a Department:</Text>

                            <Picker
                                selectedValue={this.state.announcementDepartment}
                                style={styles.item}
                                itemStyle={{ backgroundColor: "transparent", color: "white", borderColor: 'rgba(255,255,255,0.3)', height: 50 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ announcementDepartment: itemValue })} >
                                {this.array.map((item) => {
                                    return (<Picker.Item label={item.title} value={item.title} />)
                                })}
                            </Picker>

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
        width: '100%'
    },

    headerTitleText: {
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
        borderRadius: 70/2,
        marginTop: 15,
        marginBottom: 12
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
});