import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, ToastAndroid, ImageBackground, Image } from 'react-native';
import { Ionicons, SimpleLineIcons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
let interval;

import * as LocalAuthentication from 'expo-local-authentication'

class SideMenu extends Component {
  
  componentDidMount() {
    interval = setInterval(() => {

      AsyncStorage.getItem('userName').then((value) => this.setState({ 'userName': value }))

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      index: 0,
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props) {
    super(props)
    this.state = {
      color: 'rgba(255,255,255,0.2)',
      color1: 'transparent',
      color2: 'transparent',
      color3: 'transparent',
      colorEvent: 'transparent',
      isVisible2: false,

      userName: '',
    }

    AsyncStorage.getItem('userName').then((value) => this.setState({ 'userName': value }))
  }

  render() {
    return (
      <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', height: '100%' }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../images/background/bg3.jpg')}
          blurRadius={50}
        >
          <Overlay
            isVisible={this.state.isVisible2}
            onBackdropPress={() => this.setState({ isVisible2: false })}
            windowBackgroundColor="rgba(0, 0, 0, 0.5)"
            overlayBackgroundColor="transparent"
            width="82%"
            height="34%"
          >
            <View style={styles.container1}>
              <View style={{ height: 45, width: '100%', backgroundColor: '#2e2e38', borderTopLeftRadius: 13, borderTopRightRadius: 13 }}>
                <Text style={{ fontSize: 20, color: 'white', paddingLeft: 10, paddingTop: 9, textAlign: 'center' }}>Join Group / Class</Text>
              </View>
              <View style={styles.container2}>
                <Text style={{ paddingBottom: 14 }}>Please ask for code if you don't have one.</Text>
                <TextInput
                  style={{ height: 40, borderColor: '#2e2e38', borderWidth: 1, width: '100%', color: 'black', paddingLeft: 13, borderRadius: 13, }}
                  onChangeText={(text1) => this.setState({ text1 })}
                  value={this.state.text1}
                  placeholderTextColor='black'
                  placeholder='Code...'
                />
                <View style={{ paddingTop: 13 }} />
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.buttonForOverlay} onPress={this.submitCode}>
                    <Ionicons name="md-send" size={30} color="white" />
                    <Text style={{ color: 'black', textAlign: 'center', padding: 10 }}>Submit Code</Text>
                  </TouchableOpacity>
                  <View style={{ padding: 10 }}></View>
                  <TouchableOpacity
                    style={styles.buttonForOverlay}
                    onPress={this.QrScanner}
                  >
                    <AntDesign name="qrcode" size={30} color="white" />
                    <Text style={{ color: 'black', textAlign: 'center', padding: 10 }}>QR Scanner</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Overlay>
          <ScrollView>
            <View style={{ marginTop: 40, backgroundColor: 'transparent' }}>
              <View style={styles.appsSection}>
                <Image source={require('../../images/octo2.jpg')} style={{ height: 70, width: 70, borderRadius: 35, }} />
                <Text style={styles.theIconTitles}>Turritopsis{'\n'}{this.state.userName}</Text>
              </View>

              {/* <View style={styles.userSection}>
                <View style={styles.userIdIcon} >
                  <Icon name="user-circle" size={80} color='white' />
                </View>
                <Text style={styles.theTitles}>{this.state.userName}</Text>
              </View> */}

              <Text style={{ color: 'transparent', marginTop: 30, marginBottom: 8, color: 'white', fontSize: 20, marginLeft: 5 }}>
                Main Section
              </Text>
              <TouchableOpacity style={{ width: '97%', backgroundColor: this.state.color, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }} onPress={() => { this.colourChangingFunction('color') }}>
                <Entypo name="home" size={25} color="white" />
                <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: this.state.colourGroup, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }} onPress={() => { this.popOutOrNot() }}>
                <MaterialCommunityIcons name="account-group" size={25} color="white" />
                <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }} >
                  Group / Class
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={{ color: 'transparent', marginTop: 20, marginBottom: 8, color: 'white', fontSize: 20, marginLeft: 5 }}>
                Sub- Functions
              </Text>
              <TouchableOpacity style={{ width: '97%', backgroundColor: this.state.color1, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }} onPress={() => { this.colourChangingFunction('color1') }}>
                <Entypo name="book" size={25} color="white" />
                <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }}>
                  Subjects Enrollment
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: '97%', backgroundColor: 'transparent', padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }} onPress={() => { this.props.navigation.navigate('Timetable') }}>
                <AntDesign name="calendar" size={25} color="white" />
                <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }}>
                  Timetable Screen
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: '97%', backgroundColor: this.state.colorEvent, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }} onPress={() => {
                this.colourChangingFunction('eventScreen')
                
              }}>
                <MaterialCommunityIcons name="eventbrite" size={25} color="white" />
                <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }}>
                  Events & Activities
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={{ width: '97%', backgroundColor: this.state.color2, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }} onPress={() => { this.colourChangingFunction('color2') }}>
                <MaterialCommunityIcons name="google-controller" size={25} color="white" />
                <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }}>
                  Testing Screen
                </Text>
              </TouchableOpacity> */}

              <TouchableOpacity style={{ marginTop: 73, marginBottom: 10, marginLeft: 20, backgroundColor: 'transparent', flexDirection: 'row' }} onPress={() => {
                async () => {
                  try {
                    await AsyncStorage.removeItem('userName');
                    console.log('userName deleted');
                  } catch (error) {
                    console.log(error);
                  }

                  try {
                    await AsyncStorage.removeItem('@SubEnroll:Sub');
                    console.log('SubEnroll deleted');
                  } catch (error) {
                    console.log(error);
                  }

                  try {
                    await AsyncStorage.removeItem('@GroupCode:key');
                    console.log('GroupCode deleted');
                  } catch (error) {
                    console.log(error);
                  }
                }

                this.colourChangingFunction('color')
                this.props.navigation.navigate('Login');
              }}>
                <SimpleLineIcons name="logout" size={25} color="white" />
                <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>
                   Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

  popOutOrNot = async () => {
    this.colourChangingFunction('colorGroup');
    try {
      const value = await AsyncStorage.getItem('@GroupCode:key');
      if (value !== null) {
        this.props.navigation.navigate('InsideGroupOrClass', { data: value })
      }
      else {
        this.setState({ isVisible2: true })
      }
    } catch (error) {
    }
  }

  QrScanner = () => {
    this.setState({ isVisible2: false }, function () {
      this.props.navigation.navigate('QRScanner');
    });
  }
  
  //Submit and save the data to localStorage
  submitCode = async () => {
    if (this.state.text1 === '57212331') {
      try {
        await AsyncStorage.setItem('@GroupCode:key', this.state.text1);
        console.log('saved to localStorage');
      } catch (error) {
        // Error saving data
        console.log('error saving data to localStorage');
      }
      alert('Joined Successfully...');
      this.props.navigation.navigate('InsideGroupOrClass', { data: this.state.text1 })

    }
    else {
      alert('Failed to join...');
    }
  }

  EnrollSubOrNot=async()=>{
    const value = await AsyncStorage.getItem('@SubEnroll:Sub');
    try {
      if (value === null) {
        this.props.navigation.navigate('SubEnrollment');
      }
      else {
        // Adding for ios soon
        // if (Platform.OS === 'ios') {
        //   alert(value);
        // }
        // else{
          ToastAndroid.showWithGravityAndOffset(
            value,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50,
          );
        // }
        
      }
    } catch (error) {
    }
  }

  colourChangingFunction = (colouring) => {
    if (colouring === 'color') {
      this.setState({ color: 'rgba(255,255,255,0.2)', color1: 'transparent', color2: 'transparent', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'transparent' }, () => { });
      this.props.navigation.navigate('Home')
    }
    if (colouring === 'color1') {
      this.setState({ color: 'transparent', color1: 'rgba(255,255,255,0.2)', color2: 'transparent', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'transparent' }, () => { });
        this.EnrollSubOrNot()
    }
    if (colouring === 'color2') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'rgba(255,255,255,0.2)', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'transparent' }, () => { });
      this.props.navigation.navigate('InputScreen')
    }
    if (colouring === 'color3') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'transparent', color3: 'rgba(255,255,255,0.2)', colourGroup: 'transparent', colorEvent: 'transparent' }, () => {
        alert("Going to somewhere else");
      });
    }
    if (colouring === 'colorGroup') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'transparent', color3: 'transparent', colourGroup: 'rgba(255,255,255,0.2)', colorEvent: 'transparent' }, () => {
      });
    }
    if (colouring === 'eventScreen') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'transparent', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'rgba(255,255,255,0.2)' }, () => {
        this.props.navigation.navigate('EventScreen');
      });
    }


  }
}
const styles = StyleSheet.create({
  containerForSide: {
    backgroundColor: 'transparent',
    padding: 17,
    fontSize: 10,
    borderBottomRightRadius: 75,
    borderTopRightRadius: 75,
  },
  container1: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    width: '100%',
    height: '110%',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  buttonForOverlay: {
    backgroundColor: '#2e2e38',
    paddingTop: 3,
    width: '35%',
    height: 38,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
  },

  userSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  appsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 20,
  },

  theIconTitles: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'auto',
    padding: 15,
  },

  theTitles: {
    color: 'white',
    fontSize: 25,
    flex: 1,
    textAlign: 'auto',
    padding: 20,
  },

  userIdIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 100 / 2,
    borderColor: 'white',
  },

  appsIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 100 / 2,
    borderColor: 'white',
  },
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;