import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, AsyncStorage, Picker, ToastAndroid, ScrollView, Animated, Easing } from 'react-native';
import { Feather, AntDesign, MaterialIcons,Ionicons } from '@expo/vector-icons';
import { Header,Overlay } from 'react-native-elements';
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
        this.focusListener.remove();
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
        // this.moveAnimation = new Animated.ValueXY({x:10, y:800})
        this.runTheFlatlist();

        this.spinValue = new Animated.Value(0)
    }
    // _moveBall=()=>{
    //     Animated.spring(this.moveAnimation,{
    //       toValue:{x:10, y:15},
    //     }).start()
    //   }

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
            <View style={{ height: '100%', backgroundColor: '#d9d9d9', alignItems: 'center', justifyContent: 'center' }}>
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
                    // rightComponent={<Feather name="home" size={25} color="#2e2e38" onPress={() =>
                    //   this.props.navigation.openDrawer()
                    // } />}
                    containerStyle={{
                        backgroundColor: '#2e2e38',
                        // backgroundColor: 'white',
                        borderBottomWidth: 0,
                        display: "flex",
                        shadowColor: "#2e2e38",
                        shadowOffset: {
                            width: 3,
                            height: 4,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,
                        elevation: 8,
                        zIndex: 5
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

                <ScrollView style={styles.wrapper}>
                <Text style={{fontSize:30,paddingLeft:17}}><MaterialIcons name="class" size={30} color="black"/> Subject Enroll</Text>
                    <FlatList
                        data={this.state.flatListData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={styles.list}
                                onPress={() =>
                                    this.selectItem(item.description.data.price, item.description.data.id, item.description.data.name)
                                }>

                                <View style={{ flexDirection: 'row', paddingLeft: 10, backgroundColor: 'white', height: 49, borderRadius: 2, }}>
                                    <MaterialIcons name="class" size={39} color="black" />
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: 20, marginLeft: 5, }}>{item.description.data.name}{'\n'}{item.description.data.id}</Text>
                                    </View>
                                    <View style={{ flex: 1, paddingRight: 10 }}>
                                        <Text style={{ textAlign: 'right', fontSize: 20, marginLeft: 6, }}>RM{item.description.data.price}</Text>
                                    </View>
                                </View>
                                <Text></Text>
                            </TouchableOpacity>
                        }
                    />
                </ScrollView>

                <TouchableOpacity
                    onPress={() => this.subjectEnrolled()}
                    style={styles.buttonFloating}>
                    <AntDesign name="check" size={47} color="white" style={{ bottom: -5, right: -5, }} />
                </TouchableOpacity>
            </View>
        );
    }
    subjectEnrolled = async () => {
        // ----------------------Saving parts----------------------------
        try {
            await AsyncStorage.setItem('@SubEnroll:Sub', "The Fee for This semester is RM" + this.state.sum + "\n" + this.state.subjectTook);
            console.log('saved to localStorage');
            this.props.navigation.navigate('Home');
        } catch (error) {
            console.log('error saving data to localStorage');
        }


        ToastAndroid.showWithGravityAndOffset(
            "The Fee for This semester is RM" + this.state.sum + "\n" + this.state.subjectTook,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50,
        );

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
            this.setState({ flatListData: items }, () => {
                // this._moveBall();
            });
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
        this.setState({ wordWrong: 'Fingerprint not matched.' })
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

    centerHeader: {
        flexDirection: 'row',
    },

    wrapper: {
        width: '100%',
        height: '100%',
        marginTop: 5,
        marginBottom: 10,
    },
    
    list: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'white',
        width: '92%',
        height: 100,
        borderRadius: 10,
        marginTop: 8,
        marginRight: 8,
        marginLeft: '4%',
        marginRight: '4%',
        elevation: 1,
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