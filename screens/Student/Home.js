import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Platform, FlatList, Image, ToastAndroid, ActivityIndicator, Animated, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';
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

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      text1: '',
      dataStoring: [],
      testArray: [],
      moreNote: '',
      NumberHolder: 1,
      isFetching: false,
      isLoading: true,

      announcementTitle: '',
      announcementDepartment: '',
      announcementDescription: '',
      announcementPicture: '',
    }
    this.runTheFlatlist();
    this.moveAnimation = new Animated.ValueXY({x:10, y:800})
    // this.moveAnimation = new Animated.ValueXY({x:156, y:10})
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

  _moveBall=()=>{
    Animated.spring(this.moveAnimation,{
      toValue:{x:0, y:15},
    }).start()
  }

  render() {
    // Spin animation
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <View style={{ height: '100%', width: '100%', backgroundColor: '#ededed' }}>
        <NavigationEvents
          // onWillFocus={payload => console.log('will focus',payload)}
          onDidFocus={payload => {
            console.log('did focus',payload)
            this.runTheFlatlist();
          }}
          // onWillBlur={payload => console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
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
            {/* <Image source={require('../../images/octo2.jpg')} style={{ height: 30, width: 30, borderRadius: 15, }} /> */}
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
        {/* ========DETAIL DATA RECEIVER=========*/}
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          windowBackgroundColor="rgba(0, 0, 0, 0.7)"
          overlayBackgroundColor="white"
          width="82%"
          // height="80%"
          overlayStyle={{ padding: 0, borderRadius: 10 }}
        >
          <View style={{ backgroundColor: '#ededed', width: '100%', height: 50, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>{this.state.announcementTitle}</Text>
          </View>

          <Image
            style={{ width: '100%', height: '54%', alignSelf: 'center', flex: 0, paddingLeft: '50%', marginTop: 5 }}
            source={{ uri: this.state.announcementPicture }}
          />

          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              {this.state.announcementDescription}</Text>
          </View>

          <View style={{ padding: 20, position: 'absolute', bottom: 0, right: 0 }}>
            <Text style={{ textAlign: 'right', fontSize: 14, fontStyle: 'italic' }}>
              - By Department of
                <Text style={{ fontSize: 14, fontWeight: '800', fontStyle: 'italic' }}> {this.state.announcementDepartment}</Text>
            </Text>
          </View>
        </Overlay>

        {this.loadingIndicator()}

        <ScrollView>
          <Animated.View style={[styles.wrapper, this.moveAnimation.getLayout()]}>
          <Text style={{fontSize:30,paddingLeft:17}}><Feather name="home" size={30} color="black"/> Home</Text>
            <FlatList
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              data={this.state.flatListData}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <TouchableOpacity
                  style={styles.list}
                  onPress={() => this.showDetailData(item.id, item.description.announcementPicture, item.description.announcementDepartment, item.description.announcementDescription)}>
                  <Image
                    style={{ width: '100%', height: '74%', borderRadius: 10 }}
                    source={{ uri: item.description.announcementPicture }}
                  />
                  <Text style={{ color: 'black', fontSize: 20, padding: 3 }}>{item.id}</Text>
                </TouchableOpacity>
              }
            />
          </Animated.View>
        </ScrollView>
      </View>
    );
  }


  loadingIndicator = () => {
    if (this.state.isLoading === true) {
      if (Platform.OS === 'ios') {
        return (
          <View style={{ marginTop: 200 }}>
            <ActivityIndicator size={'large'} color="#3390FF" animating={this.state.isLoading} />
          </View>
        )
      }
      else {
        return (
          <View style={{ marginTop: 200 }}>
            <ActivityIndicator size={57} color="#3390FF" animating={this.state.isLoading} />
          </View>
        )
      }

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
  showDetailData = (announcementTitle, announcementPicture, announcementDepartment, announcementDescription) => {
    this.setState({ isVisible: true, announcementTitle: announcementTitle, announcementPicture: announcementPicture, announcementDepartment: announcementDepartment, announcementDescription: announcementDescription })
  }

  //------------------------------DATA RELOADER-----------------------------
  runTheFlatlist = () => {
    firebase.database().ref('Announcement/').on('value', (snapshot) => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          id: child.key,
          description: child.val(),
        });
      });
      this.setState({ flatListData: items, isFetching: false, isLoading: false }, () => {
        this._moveBall();
      });
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

    db = firebase.database().ref('users/c188211')
    db.child(RandomNumber).set({
      description: { note, photo, moreNote }
    }).then((data) => { alert('saved'); }).catch((error) => { alert('failed'); })
  }

  //-------------------------------OUTPUT FUNCTION----------------------------
  outputDataFunction = (userId) => {
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
  //-------------------------------DELETE DATA FUNCTION-----------------
  deleteFunction = () => {
    this.itemsRef = firebase.database().ref('users/' + 'c188211')
    this.itemsRef.child('description').remove()
  }
}
//-------------------------------------STYLING----------------
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingBottom: 20,
  },

  list: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: '2.5%',
    marginRight: '2.5%',
    backgroundColor: 'white',
    width: '95%',
    height: 200,
    elevation: 2,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },

  centerHeader: {
    flexDirection: 'row',
  },
});