import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage,ToastAndroid } from 'react-native';
import { Ionicons, SimpleLineIcons, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }


  constructor(props) {
    super(props)
    this.state = {
      color: 'black',
      color1: 'transparent',
      color2: 'transparent',
      color3: 'transparent',
      colorEvent: 'transparent',
      isVisible2: false,
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#2e2e38', height: '100%' }}>
        <Overlay
          isVisible={this.state.isVisible2}
          onBackdropPress={() => this.setState({ isVisible2: false })}
          windowBackgroundColor="rgba(0, 0, 0, 0.5)"
          overlayBackgroundColor="transparent"
          width="82%"
          height="34%"
        >
          <View style={styles.container1}>
            <View style={{ height: 45, width: '100%', backgroundColor: '#841584', borderTopLeftRadius: 13, borderTopRightRadius: 13 }}>
              <Text style={{ fontSize: 20, color: 'white', paddingLeft: 10, paddingTop: 9 }}>Join class</Text>
            </View>
            <View style={styles.container2}>
              <Text style={{ paddingBottom: 14 }}>Ask your teacher if you do not have a codes or QR code to scan.</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 280, color: 'black', paddingLeft: 13, borderRadius: 13, }}
                onChangeText={(text1) => this.setState({ text1 })}
                value={this.state.text1}
                placeholderTextColor='black'
                placeholder='Group code...'
              />
              <View style={{ paddingTop: 13 }} />
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.buttonForOverlay} onPress={this.submitCode}>
                  <Ionicons name="md-send" size={30} color="white" />
                  <Text style={{ color: 'black', alignSelf: 'center', padding: 10 }}>Submit code</Text>
                </TouchableOpacity>
                <View style={{ padding: 10 }}></View>
                <TouchableOpacity
                  style={styles.buttonForOverlay}
                  onPress={this.QrScanner}
                >
                  <AntDesign name="qrcode" size={30} color="white" />
                  <Text style={{ color: 'black', alignSelf: 'center', padding: 10 }}>QR Scanner</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Overlay>
        <ScrollView>
          <View style={{ marginTop: 70, backgroundColor: '#2e2e38' }}>
            <View style={{ flexDirection: 'row', paddingLeft: 11 }}>
              <Icon name="university" size={32} color="white" />
              <Text style={{ color: 'white', fontSize: 25, marginLeft: 10 }}>Institution Name</Text>
            </View>

            <Text style={{ color: 'transparent', marginTop: 30, marginBottom: 8, color: 'white', fontSize: 20, marginLeft: 5 }}>
              Post section
            </Text>
            <View style={{ width: '97%', backgroundColor: this.state.color, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }}>
              <Entypo name="home" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }} onPress={() => { this.colourChangingFunction('color') }}>
                Home
              </Text>
            </View>
            <View style={{ backgroundColor: this.state.colourGroup, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="account-group" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }}
                onPress={() => { this.popOutOrNot() }}
              >
                Group / Class
              </Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#2e2e38' }}>
            <Text style={{ color: 'transparent', marginTop: 20, marginBottom: 8, color: 'white', fontSize: 20, marginLeft: 5 }}>
              Special function
            </Text>
            <View style={{ width: '97%', backgroundColor: this.state.color1, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }}>
              <Entypo name="book" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }} onPress={() => { this.colourChangingFunction('color1') }}>
                Subjects Enrollment
              </Text>
            </View>

            <View style={{ width: '97%', backgroundColor: this.state.color2, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="google-controller" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }} onPress={() => { this.colourChangingFunction('color2') }}>
                Testing Screen
              </Text>
            </View>

            <View style={{ width: '97%', backgroundColor: 'transparent', padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }}>
              <AntDesign name="calendar" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }} onPress={() => { this.props.navigation.navigate('Timetable') }}>
                Timetable Screen
              </Text>
            </View>

            <View style={{ width: '97%', backgroundColor: this.state.colorEvent, padding: 17, fontSize: 10, borderBottomRightRadius: 75, borderTopRightRadius: 75, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="eventbrite" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 15, marginLeft: 15 }}
                onPress={() => {
                  this.colourChangingFunction('eventScreen')
                  this.props.navigation.navigate('EventScreen');
                }}>
                Events & Activities
              </Text>
            </View>


            <View style={{ marginTop: 73, marginLeft: 20, backgroundColor: '#2e2e38', flexDirection: 'row' }}>
              <SimpleLineIcons name="logout" size={25} color="white" />
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}
                onPress={() => { 
                  this.props.navigation.navigate('Login');
                }}
              >   Logout</Text>
            </View>
          </View>
        </ScrollView>
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
      alert('Successfully get in..');
      this.props.navigation.navigate('InsideGroupOrClass', { data: this.state.text1 })

    }
    else {
      alert('Log in failure');
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
      this.setState({ color: 'black', color1: 'transparent', color2: 'transparent', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'transparent' }, () => { });
      this.props.navigation.navigate('Home')
    }
    if (colouring === 'color1') {
      this.setState({ color: 'transparent', color1: 'black', color2: 'transparent', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'transparent' }, () => { });
        this.EnrollSubOrNot()
    }
    if (colouring === 'color2') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'black', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'transparent' }, () => { });
      this.props.navigation.navigate('InputScreen')
    }
    if (colouring === 'color3') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'transparent', color3: 'black', colourGroup: 'transparent', colorEvent: 'transparent' }, () => {
        alert("Going to somewhere else");
      });
    }
    if (colouring === 'colorGroup') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'transparent', color3: 'transparent', colourGroup: 'black', colorEvent: 'transparent' }, () => {
      });
    }
    if (colouring === 'eventScreen') {
      this.setState({ color: 'transparent', color1: 'transparent', color2: 'transparent', color3: 'transparent', colourGroup: 'transparent', colorEvent: 'black' }, () => {
        //Go to where u want it to be
        //this.props.navigation.navigate('Timetable') 
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
    paddingTop: 11,
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 45,
    width: '100%',
    height: 230,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  buttonForOverlay: {
    backgroundColor: '#841584',
    borderColor: 'red',
    paddingTop: 3,
    width: '32%',
    height: 38,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;