import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';

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
export default class AdminDepartment extends Component {
    // Contructor
    constructor(props) {
        super(props);

        // Get the list of Department from Firebase
        firebase.database().ref('Department/').on('value', (snapshot) => {
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
            }
    }

    // Get the department information on selection
    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <View style={styles.studentContainer} behavior='padding'>
                <ImageBackground
                    source={require('../../images/background/Department.jpg')}
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
                        centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>Department</Text></View>}
                        rightComponent={
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'AdminAddDepartment' })
                                        ],
                                    }))
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

                    <ScrollView>
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
                        />
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