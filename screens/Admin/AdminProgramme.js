import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, ImageBackground, ScrollView, BackHandler } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
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
export default class AdminProgramme extends Component {
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
            programmeName: '',
            programmeDepartment: '',
            programmeDescription: '',
        }

        // Get the list of Department from Firebase
        firebase.database().ref('Programme/').on('value', (snapshot) => {
            snapshot.forEach((child) => {
                console.log(child.key)
                this.array.push({ title: child.key });
                this.setState({ arrayHolder: [...this.array] })
            })
        })
    }

    // Get the programme information on selection
    GetItem(item) {
        firebase.database().ref('Programme/').on('value', (snapshot) => {
            var programmeDepartment = '';
            var programmeDescription = '';

            snapshot.forEach((child) => {
                if (item === child.key) {
                    programmeDepartment = child.val().programmeDepartment;
                    programmeDescription = child.val().programmeDescription;
                }
            });

            this.setState({ isVisible: true, programmeName: item, programmeDepartment: programmeDepartment, programmeDescription: programmeDescription })
        });
    }

    render() {
        return (
            <View style={styles.programmeContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Programme.jpg')}
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
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Programme</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.array = []
                                    this.state.arrayHolder = []
                                    this.props.navigation.navigate('AdminAddProgramme');
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                            {this.state.programmeName}
                            {'\n'}
                        </Text>

                        <Text style={{ textAlign: 'left', fontSize: 17 }}>
                            Department: {this.state.programmeDepartment}
                            {'\n'}
                            Description: {this.state.programmeDescription}
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
    programmeContainer: {
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