import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Picker } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { Header, Overlay, CheckBox } from 'react-native-elements';
import { LocalAuthentication } from 'expo';
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
        this.testingFingerPrint()
        this.state = {
            isVisible: true,
            checkingState: '',
            wordWrong: '',
            sum: 0,
            counter: 0,
            subjectTook: [],
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
                    centerComponent={{ text: 'Enrolled Subject', style: { fontSize: 25, color: '#fff' } }}
                    rightComponent={<Feather name="home" size={25} color="white" onPress={() =>
                        this.props.navigation.openDrawer()

                    } />}
                    containerStyle={{
                        backgroundColor: '#2e2e38',
                        justifyContent: 'space-around',
                    }}
                />
                {/* abit buggy keep ask propmt again */}
                <Overlay
                    isVisible={this.state.isVisible}
                    // onBackdropPress={() => this.setState({ isVisible: false })}
                    windowBackgroundColor="rgba(0, 0, 0, 0.7)"
                    overlayBackgroundColor="white"
                    width="62%"
                    height="40%"
                >
                    <View style={styles.container}>
                        <Ionicons name="md-finger-print" size={60} color="black" />
                        <Text style={{ alignSelf: 'center' }}>Please scan your finger</Text>
                        {this.checkingState()}
                    </View>
                </Overlay>

                <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue) => this.setState({ language: itemValue })}
                >
                    <Picker.Item label="April intake" value="java" />
                    <Picker.Item label="June intake" value="js" />
                    <Picker.Item label="September intake" value="python" />
                    <Picker.Item label="December intake" value="haxe" />
                </Picker>

                <FlatList
                    data={this.state.flatListData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>

                        <TouchableOpacity
                            style={styles.list}
                            onPress={() =>

                                this.selectItem(item.description.data.price, item.description.data.id, item.description.data.name)
                            }>

                            <View style={{ flexDirection: 'row', paddingLeft: 10, backgroundColor: 'white', height: 49, borderRadius: 5, }}>
                                <View style={{ flex: 1, color: 'black', fontSize: 20 }}>
                                    <Text>{item.description.data.name}  {item.description.data.id}</Text>
                                </View>
                                <View style={{ flex: 1, paddingRight: 10 }}>
                                    <Text style={{ textAlign: 'right' }}>RM{item.description.data.price}</Text>
                                </View>
                            </View>
                            <Text></Text>

                        </TouchableOpacity>
                    }
                />

                <TouchableOpacity
                    onPress={() => this.subjectEnrolled()}
                    style={styles.buttonFloating}>
                    <AntDesign name="check" size={47} color="white" style={{ bottom: -5, right: -5, }} />
                </TouchableOpacity>



            </View>
        );
    }
    subjectEnrolled = () => {
        alert("The Fee for This semester is RM" + this.state.sum + "\n" + this.state.subjectTook);
        this.props.navigation.navigate('home');
    }

    selectItem = async (price, id, name) => {
        if (this.state.counter < 5) {
            this.state.counter += 1;
            this.state.sum += price;

            //get the number
            var index = this.state.flatListData.findIndex(obj => obj.description.data.id === id)

            //For the splicing thing
            var itemArray = this.state.flatListData;

            //Cutting out
            itemArray.splice(index, 1)

            //Reload
            this.setState({ flatListData: itemArray })
            console.log("Rm", this.state.sum);

            //Get the data set the thing to (subjectTook state)
            var newName = name + ": " + id + "\n";
            this.state.subjectTook.push(newName);
            console.log(this.state.subjectTook);
        }
        else {
            alert("cant take 6 sub")
        }
    };


    runTheFlatlist = () => {
        firebase.database().ref('users/' + 'c188211/enrollSub').on('value', (snapshot) => {
            var items = [];
            snapshot.forEach((child) => {
                items.push({
                    id: child.key,
                    description: { data: child.val().description, isSelect: false },
                    date: child.val().date,
                });

            });
            this.setState({ flatListData: items });
        });
    }

    hopefullywork = () => {
        if (this.state.language === 'April intake') {
            <Picker
                style={styles.picker} itemStyle={styles.pickerItem}
                selectedValue={this.state.language}
                onValueChange={(itemValue) => this.setState({ language: itemValue })}
            >
                <Picker.Item label="June intake" value="js" />
                <Picker.Item label="September intake" value="python" />
                <Picker.Item label="December intake" value="haxe" />
            </Picker>
        }

        else {
            <Picker
                style={styles.picker} itemStyle={styles.pickerItem}
                selectedValue={this.state.language}
                onValueChange={(itemValue) => this.setState({ language: itemValue })}
            >
                <Picker.Item label="April intake" value="java" />
                <Picker.Item label="June intake" value="js" />
                <Picker.Item label="September intake" value="python" />
                <Picker.Item label="December intake" value="haxe" />
            </Picker>
        }
    }

    checkingState = () => {
        if (this.state.checkingState === 'true') {
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 11 }}>{"\n\n\n"}</Text>
                    <AntDesign name="checkcircle" size={47} color="green" onPress={() => this.setState({ isVisible: false })} />
                    <Text style={{ fontSize: 10 }}>{"\n\n\n\n"}Press the icon to proceed</Text>
                </View>


            )
        }
        if (this.state.checkingState === 'false') {
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 11 }}>{"\n\n\n"}</Text>
                    <AntDesign name="exclamationcircle" size={47} color="red" onPress={() =>
                        this.wrongFingerprint()} />
                    <Text style={{ fontSize: 10, textAlign: 'center' }}>{"\n\n\n\n"}Wrong Fingerprint! {"\n"}Press icon to Try again</Text>
                    <Text style={{ color: 'red', fontSize: 13, textAlign: 'center' }}>{this.state.wordWrong}</Text>
                </View>
            )
        }
    }

    wrongFingerprint = () => {
        this.setState({ wordWrong: 'Scan now thank you.' })
        // this.props.navigation.navigate('home')
        this.testingFingerPrint();
    }

    testingFingerPrint = async () => {
        const result = await LocalAuthentication.authenticateAsync('Verify your bio id');
        console.log(result); //<-- {"error": "unknown", "message": "", "success": false}
        if (result.success) {
            this.setState({ checkingState: 'true' });
        }
        if (result.error === 'authentication_failed') {
            this.setState({ checkingState: 'false' })
        }

        if (result.error === 'user_cancel') {
            this.testingFingerPrint()
        }

    }
}

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
        padding: 3,
        margin: 1,
        backgroundColor: 'transparent',
        height: 64,
        justifyContent: 'space-around',
        paddingLeft: 6,
        elevation: 0,
        borderRadius: 5,
    },
    selected: {
        alignItems: 'center',
        padding: 3,
        margin: 2,
        backgroundColor: 'white',
        height: 30,
        justifyContent: 'space-around',
        paddingLeft: 6,
        elevation: 0,
        borderRadius: 5,
    },

    button: {
        backgroundColor: '#841584',
        borderColor: 'red',
        width: '60%',
        height: '40%',
        textAlign: 'center',
        alignItems: 'center',

    },
    buttonFloating: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 14,
        right: 14,
        // borderColor:'grey' 
    }
});