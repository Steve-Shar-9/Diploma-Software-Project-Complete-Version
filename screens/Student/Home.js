import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Platform, FlatList, Image, ToastAndroid, ActivityIndicator, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Header, Overlay } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';

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

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false, text1: '', dataStoring: [], testArray: [], moreNote: '', NumberHolder: 1, isFetching: false, isLoading: true,
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
          }}
        />
        {/* ========DETAIL DATA RECEIVER=========*/}
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          windowBackgroundColor="rgba(0, 0, 0, 0.7)"
          overlayBackgroundColor="white"
          width="82%"
          height="60%"
          overlayStyle={{ padding: 0, borderRadius: 10 }}
        >
          <View style={{ backgroundColor: '#CCDDDD', width: '100%', height: 50, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>{this.state.title}</Text>
          </View>

          <Image
            style={{ width: '80%', height: '54%', alignSelf: 'center', flex: 0, paddingLeft: '50%', paddingTop: '10%' }}
            source={{ uri: this.state.photo }}
          />
          <View style={styles.container}>
            <Text style={{ alignSelf: 'center', fontSize: 14 }}>{this.state.moreNote}</Text>
          </View>
        </Overlay>
        <ScrollView>
          <View style={styles.wrapper}>
            {this.loadingIndicator()}
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
          </View>
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
  showDetailData = (notes, phototo, name) => {
    this.setState({ isVisible: true, moreNote: notes, photo: phototo, title: name })
  }

  //------------------------------DATA RELOADER-----------------------------
  runTheFlatlist = () => {
    firebase.database().ref('users/c188211/home').on('value', (snapshot) => {
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
    padding: 20,
    borderRadius: 10
  },
  list: {
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    height: 190,
    width: 410,
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