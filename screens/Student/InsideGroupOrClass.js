import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Header, Overlay } from 'react-native-elements';
import * as firebase from 'firebase';

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
    // console.log("Log into app");
} catch (e) {
    // console.log('App reloaded, so firebase did not re-initialize');
}

export default class home extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const dbName = navigation.getParam('data', 'nothing inside');
        this.state = {
            isVisible: false, text1: '', dataStoring: [], testArray: [], moreNote: '', NumberHolder: 1, isFetching: false,
        }
        this.runTheFlatlist();
    }


    render() {
        return (
            <View style={{ height: '100%', backgroundColor: '#d9d9d9' }}>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="dark-content"
                    leftComponent={<Feather name="menu" size={25} color="white" onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={{ text: 'Group', style: { fontSize: 25, color: '#fff' } }}
                    rightComponent={<Feather name="home" size={25} color="white" onPress={() =>
                        this.props.navigation.openDrawer()

                    } />}
                    containerStyle={{
                        backgroundColor: '#2e2e38',
                    }}
                />

                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    windowBackgroundColor="rgba(52, 52, 52, 0.8)"
                    overlayBackgroundColor="white"
                    width="82%"
                    height="60%"
                >
                    <Image
                        style={{ width: '80%', height: '54%', alignSelf: 'center', flex: 0, paddingLeft: '50%', paddingTop: '10%' }}
                        source={{ uri: this.state.photo }}
                    />
                    <View style={styles.container}>
                        <Text style={{ alignSelf: 'center' }}>{this.state.moreNote}</Text>
                    </View>
                </Overlay>

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
                                    onPress={() => this.showDetailData(item.description.moreNote, item.description.photo)}>
                                    <Image
                                        style={{ width: '70%', height: '74%', alignSelf: 'center', flex: 0, paddingLeft: '50%', paddingTop: '10%' }}
                                        source={{ uri: item.description.photo }}
                                    />
                                    <Text style={{ color: 'black', fontSize: 20 }}>{item.description.note}</Text>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
    //--------------------REFRESH FUNCTION-----------------------
    onRefresh() {
        console.log('refreshing')
        this.setState({ isFetching: true }, function () {
            this.fetchData()
        });
    }
    fetchData() {
        alert('refreshed');
        this.runTheFlatlist();
    }

    //----This one is nothing if not mistaken-------
    functionSendParamToNote = (notes, phototo) => {
        this.setState({ isVisible: true, moreNote: notes, photo: phototo })
    }

    //----------------This one just take all out but i put at constructor-----------
    runTheFlatlist = () => {
        firebase.database().ref('users/' + 'c188211/home').on('value', (snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                items.push({
                    id: child.key,
                    description: child.val().description,
                    date: child.val().date,
                });
            });
            this.setState({ flatListData: items, isFetching: false });
        });
    }

    //----------------------------------SAVE--------------------------------
    firebaseDataSaving = (userId) => {

        // let num;
        // firebase.database().ref('users/c188211/countingPost').once('value', function (snapshot) {
        //   console.log(snapshot.val())
        //   num=snapshot.val()
        // });
        // let newNum=num+1;

        //----------------------------Random number generator----------------
        var RandomNumber = Math.floor(Math.random() * 10000) + 1;

        var note = "This is notes for people who want to enroll subject"
        var photo = 'https://is.org.au/wp-content/uploads/2017/01/MaGz2.jpg'
        var moreNote = "You may go to ground floor and get the form and go to fifth floor for the register"

        db = firebase.database().ref('users/' + userId)
        //------------This will give the key id and the description--------
        db.child(RandomNumber).set({
            //-------------This is the data inside---------
            description: { note, photo, moreNote }
        }).then((data) => { alert('saved'); }).catch((error) => { alert('failed'); })
    }

    //-------------------------------OUTPUT-------------------------------------------
    outputDataFunction = (userId) => {
        //-------with this can get into the path with 'ref' and behind part is format--------------
        firebase.database().ref('users/' + userId).on('value', (snapshot) => {
            // const description = snapshot.val().description;
            // alert("Description: " + description);
            var items = [];
            // console.log(snapshot.val().description);
            snapshot.forEach((child) => {
                items.push({
                    id: child.key,
                    description: child.val().description,
                    date: child.val().date,
                });
            });
            // console.log(items);
        });
    }

    //----This function is to delete firebase storage----------
    deleteFunction = () => {
        this.itemsRef = firebase.database().ref('users/' + 'c188211')
        this.itemsRef.child('description').remove()
    }
}

//------Just a normal style----------------
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 620,

    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    list: {
        alignItems: 'center',
        padding: 10,
        margin: 5,
        backgroundColor: 'white',
        height: 190,
        justifyContent: 'space-around',
        paddingLeft: 10,
        elevation: 1,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#841584',
        borderColor: 'red',
        width: '46%',
        height: '6%',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
});