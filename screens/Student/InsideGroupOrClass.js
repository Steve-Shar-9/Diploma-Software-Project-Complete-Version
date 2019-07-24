import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Platform, FlatList, Image, ToastAndroid, ActivityIndicator, AsyncStorage, Animated, Easing } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header, Overlay } from 'react-native-elements';
import * as firebase from 'firebase';
import { NavigationEvents } from 'react-navigation';

//Setting up the connection
const config = {
    apiKey: "AIzaSyBwTAwwF1Di-9Bt2-sJUuzyi6s8SaYPPxk",
    authDomain: "angelappfordatabase.firebaseapp.com",
    databaseURL: "https://angelappfordatabase.firebaseio.com",
    projectId: "angelappfordatabase",
    storageBucket: "",
    messagingSenderId: "758356549275"
};

try {
    firebase.initializeApp(config);
    console.log("Log into app");
} catch (e) {
    console.log('App reloaded, so firebase did not re-initialize');
}

export default class home extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.spin();

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.spinValue = new Animated.Value(0);
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const dbName = navigation.getParam('data', 'nothing inside');
        console.log('Group code: ', dbName);
        this.state = {
            isVisible: false, text1: '', dataStoring: [], testArray: [], moreNote: '', NumberHolder: 1, isFetching: false, isLoading: true,
        }
        this.runTheFlatlist();

        this.spinValue = new Animated.Value(0)
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
            <View style={{ height: '100%', backgroundColor: '#d9d9d9', width: '100%' }}>
                <NavigationEvents
                    onDidFocus={payload => {
                        console.log('did focus', payload)
                        this.runTheFlatlist();
                    }}
                />

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
                    containerStyle={{
                        backgroundColor: '#2e2e38',
                        borderBottomWidth: 0,
                        display: "flex",
                        shadowColor: "#2e2e38",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,
                        elevation: 8,
                        zIndex: 5
                    }}
                />

                <Text style={{ fontSize: 30, marginLeft: '2.5%' }}><MaterialCommunityIcons name="account-group" size={30} color="black" /> Group / Class</Text>

                {/* ========DETAIL DATA RECEIVER=========*/}
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    windowBackgroundColor="rgba(0, 0, 0, 0.7)"
                    overlayBackgroundColor="white"
                    width="82%"
                    overlayStyle={{ padding: 0, borderRadius: 10 }}
                >
                    <View style={{ backgroundColor: '#ededed', width: '100%', height: 50, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>{this.state.title}</Text>
                    </View>

                    <Image
                        style={{ width: '100%', height: '54%' }}
                        source={{ uri: this.state.photo }}
                    />

                    <View style={{ padding: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>
                            {this.state.moreNote}</Text>
                    </View>
                </Overlay>

                {this.loadingIndicator()}

                <ScrollView>
                    <View style={styles.wrapper}>
                        <FlatList
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            data={this.state.flatListData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={styles.list}
                                    onPress={() => this.showDetailData(item.description.moreNote, item.description.photo, item.description.note)}>
                                    <Image
                                        style={{ width: '70%', height: '74%', alignSelf: 'center', flex: 0, paddingLeft: '50%', paddingTop: '10%' }}
                                        source={{ uri: item.description.photo }}
                                    />
                                    <Text style={{ color: 'black', fontSize: 20 }}>{item.description.note}</Text>
                                </TouchableOpacity>
                            }
                        />

                        <Text style={{ textAlign: 'center', fontSize: 15, margin: 15 }}>End of the Page</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    loadingIndicator = () => {
        if (this.state.isLoading === true) {
            return (
                <View style={{ marginTop: 200 }}>
                    <ActivityIndicator size={57} color="#3390FF" animating={this.state.isLoading} />
                </View>
            )
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

    //-------------------------------SHOW DETAIL DATA------------------------
    showDetailData = (notes, phototo, name) => {
        this.setState({ isVisible: true, moreNote: notes, photo: phototo, title: name })
    }

    //------------------------------DATA RELOADER-----------------------------
    runTheFlatlist = () => {
        firebase.database().ref('users/' + 'c188211/group/57212331').on('value', (snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                items.push({
                    id: child.key,
                    description: child.val().description,
                    date: child.val().date,
                });
            });
            this.setState({ flatListData: items, isFetching: false, isLoading: false });
            console.log(items)
        });
    }

    //----------------------------------SAVE--------------------------------
    firebaseDataSaving = (userId) => {
        //----------------------------Random number generator----------------
        var RandomNumber = Math.floor(Math.random() * 10000) + 1;
        var note = "This is notes for people who want to enroll subject"
        var photo = 'https://is.org.au/wp-content/uploads/2017/01/MaGz2.jpg'
        var moreNote = "You may go to ground floor and get the form and go to fifth floor for the register"

        db = firebase.database().ref('users/' + userId)
        db.child(RandomNumber).set({
            description: { note, photo, moreNote }
        }).then((data) => { alert('saved'); }).catch((error) => { alert('failed'); })
    }

    //-------------------------------OUTPUT FUNCTION----------------------------
    outputDataFunction = (userId) => {
        firebase.database().ref('users/' + userId).on('value', (snapshot) => {
            var items = [];
            console.log(snapshot.val().description);
            snapshot.forEach((child) => {
                items.push({
                    id: child.key,
                    description: child.val().description,
                    date: child.val().date,
                });
            });
            console.log(items);
        });
    }

    //-------------------------------DELETE DATA FUNCTION-----------------
    deleteFunction = () => {
        this.itemsRef = firebase.database().ref('users/' + 'c188211')
        this.itemsRef.child('description').remove()
    }
}

//-------------------------------------STYLING----------------
const styles = StyleSheet.create({
    list: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 12,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        backgroundColor: 'white',
        width: '95%',
        height: 200,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },

    centerHeader: {
        flexDirection: 'row',
    },
});