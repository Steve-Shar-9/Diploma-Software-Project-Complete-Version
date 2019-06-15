import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
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
    //with this means aldy inside the firebase
    firebase.initializeApp(config);
    console.log("Log into app");
} catch (e) {
    console.log('App reloaded, so firebase did not re-initialize');
}

export default class home extends Component {
    static navigationOptions = {
        header: null
    };

    componentWillMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false, text1: '', dataStoring: [], testArray: [], moreNote: '', NumberHolder: 1,
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
                    centerComponent={{ text: 'Home', style: { fontSize: 25, color: '#fff' } }}
                    rightComponent={<Feather name="home" size={25} color="white" onPress={() =>
                        this.props.navigation.openDrawer()

                    } />}
                    containerStyle={{
                        backgroundColor: '#2e2e38',
                        // justifyContent: 'space-around',
                    }}
                />

                {/* -------------This one is for input testing button--------------- */}

                <TouchableOpacity
                    style={styles.button}
                    // open tunnel to go into student id and give a data
                    onPress={() => this.firebaseDataSavingForHome('c188211/home')}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>input post</Text>
                </TouchableOpacity>

                <Text></Text>

                <TouchableOpacity
                    style={styles.button}
                    // open tunnel to go into student id and give a data
                    onPress={() => this.firebaseDataSavingForEnroll('c188211/enrollSub')}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>input sub</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                // onPress={() =>this.firebaseDataSavingForEnroll('c188211/enrollSub')}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Clear registered</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
        style={styles.button}
        onPress={() =>this.outputDataFunction('c188211/home')}
        >
          <Text style={{color:'white',alignSelf:'center'}}>Output</Text>
        </TouchableOpacity> */}

                {/* <TouchableOpacity
        style={styles.button}
        onPress={() =>this.deleteFunction('c188211/home')}
        >
          <Text style={{color:'white',alignSelf:'center'}}>deleteFunction</Text>
        </TouchableOpacity> */}

            </View>
        );
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
            this.setState({ flatListData: items });
            console.log(items)
        });
    }

    //----------------------------------SAVE--------------------------------
    firebaseDataSavingForHome = (userId) => {
        //----------------------------Random number generator----------------
        var RandomNumber = Math.floor(Math.random() * 10000) + 1;

        // var note="This is notes for people who want to enroll subject"
        // var photo='https://is.org.au/wp-content/uploads/2017/01/MaGz2.jpg'
        // var moreNote="You may go to ground floor and get the form and go to fifth floor for the register"

        // var note="Mobile workshop at 512."
        // var photo='https://is.org.au/wp-content/uploads/2016/11/group.jpg'
        // var moreNote="Please go find Joel and his brother Noah at second floor."

        // var note="Calculator will be selling at ground floor"
        // var photo='https://is.org.au/wp-content/uploads/2017/01/holidays.jpg'
        // var moreNote="Go find Shimon he is good in math and he is good with steve good boy."

        var note = "Meeting of DC at 517"
        var photo = 'https://is.org.au/wp-content/uploads/2017/01/jaspers.png'
        var moreNote = "Superman is die so please find another super man, okay?"

        // var note="Avenger End meeting at first floor"
        // var photo='https://is.org.au/wp-content/uploads/2017/01/MaGz2.jpg'
        // var moreNote="Blackwidow die so please find another girlfriend."

        db = firebase.database().ref('users/' + userId)
        //------------This will give the key id and the description--------
        db.child(RandomNumber).set({
            //-------------This is the data inside---------
            description: { note, photo, moreNote }
        }).then((data) => { alert('saved'); }).catch((error) => { alert('failed'); })
    }

    //----------------------------------SAVE-FIREBASE------------------------------
    firebaseDataSavingForEnroll = (userId) => {
        var RandomNumber = Math.floor(Math.random() * 10000) + 1;
        var name = "Taekwondo";
        var id = "TATA2010";
        var price = 1300;
        db = firebase.database().ref('users/' + userId)
        db.child(RandomNumber).set({
            description: { name, id, price }
        }).then((data) => { alert('saved'); }).catch((error) => { alert('failed'); })
    }

    //-------------------------------OUTPUT-------------------------------------------
    outputDataFunction = (userId) => {
        //-------with this can get into the path with 'ref' and behind part is format--------------
        firebase.database().ref('users/' + userId).on('value', (snapshot) => {
            // const description = snapshot.val().description;
            // alert("Description: " + description);
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

    //----This function is to delete firebase storage----------
    deleteFunction = () => {
        this.itemsRef = firebase.database().ref('users/' + 'c188211')
        this.itemsRef.child('description').remove()
    }
}

//------Just a normal style----------------
const styles = StyleSheet.create({
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
        // borderRadius:'',
    },
});