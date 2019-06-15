import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView,StyleSheet,Text,View,TextInput,TouchableOpacity} from 'react-native';
import { Ionicons,SimpleLineIcons,Entypo,MaterialCommunityIcons,AntDesign,Feather} from '@expo/vector-icons';
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
      isVisible2:false,
      
    }
  }

  render () {
    return (
      <View style={{backgroundColor:'#2e2e38'}}>
        <Overlay
          isVisible={this.state.isVisible2}
          onBackdropPress={() => this.setState({ isVisible2: false })}
          windowBackgroundColor="rgba(0, 0, 0, 0.5)"
          overlayBackgroundColor="transparent"
          width="82%"
          height="30%"
        >
          <View style={styles.container1}>
          <View style={{height:45,width:'100%',backgroundColor:'#841584',borderTopLeftRadius:13,borderTopRightRadius:13}}>
              <Text style={{fontSize:20,color:'white',paddingLeft:10,paddingTop:9}}>Join class</Text>
          </View>
          <View style={styles.container2}>
            <Text style={{paddingBottom:14}}>Ask your teacher if you do not have a codes or QR code to scan.</Text>
            <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth:1,width:280,color:'black',paddingLeft:13, borderRadius:13,}}
            onChangeText={(text1) => this.setState({text1})}
            value={this.state.text1}
            placeholderTextColor='black'
            placeholder='Group code...'
            />
            <View style={{paddingTop:13}}/>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.buttonForOverlay} onPress={this.submitCode}>
                <Ionicons name="md-send" size={30} color="white" />
                <Text style={{color:'black',alignSelf:'center',padding:10}}>Submit code</Text>
              </TouchableOpacity>
              <View style={{padding:10}}></View>
              <TouchableOpacity
                style={styles.buttonForOverlay}
                onPress={this.onPress}
              >
              <AntDesign name="qrcode" size={30} color="white" />
              <Text style={{color:'black',alignSelf:'center',padding:10}}>QR scan</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Overlay>


        <ScrollView>
          <View style={{marginTop:100,backgroundColor:'#2e2e38'}}>
            <View style={{flexDirection:'row'}}>
              <Ionicons name="ios-bookmarks" size={32} color="white" />
              <Text style={{color:'white',fontSize:25}}>   Student</Text>
            </View>
            
            <Text></Text>
            <Text style={{color:'transparent',marginTop:10,color:'white',fontSize:15,marginLeft:5}}>
              College section
            </Text>
            <View style={{width:'97%',backgroundColor:this.state.color,padding:17,fontSize:10,borderBottomRightRadius: 75,borderTopRightRadius: 75,flexDirection:'row'}}>
              <Entypo name="home" size={25} color="white" />
              <Text style={{color:'white',fontSize:17,paddingLeft:6}} onPress={()=>{this.TestingFunction('color')}}>
              Home
              </Text>
            </View>
          </View>
          <View style={{backgroundColor:'#2e2e38'}}>
            <Text style={{color:'transparent',marginTop:14,color:'white',fontSize:15,marginLeft:5}}>
              Class Section
            </Text>
            <View style={{width:'97%',backgroundColor:this.state.color1,padding:17,fontSize:10,borderBottomRightRadius: 75,borderTopRightRadius: 75,flexDirection:'row'}}>
              <Entypo name="book" size={25} color="white" />
              <Text style={{color:'white',fontSize:17,paddingLeft:6}} onPress={()=>{this.TestingFunction('color1')}}>
                Subject Enrolment
              </Text>
            </View>

            <View style={{width:'97%',backgroundColor:this.state.color2,padding:17,fontSize:10,borderBottomRightRadius: 75,borderTopRightRadius: 75,flexDirection:'row'}}>
              <MaterialCommunityIcons name="google-controller" size={25} color="white" />
              <Text style={{color:'white',fontSize:17,paddingLeft:6}} onPress={()=>{this.TestingFunction('color2')}}>
                Event / Activity
              </Text>
            </View>

            <View style={{width:'97%',backgroundColor:this.state.color3,padding:17,fontSize:10,borderBottomRightRadius: 75,borderTopRightRadius: 75,flexDirection:'row'}}>
              <Entypo name="open-book" size={25} color="white" />
              <Text style={{color:'white',fontSize:17,paddingLeft:6}} onPress={()=>{this.TestingFunction('color3')}}>
              Book Searcher
              </Text>
            </View>

            {/* Editing this one */}
            <View style={{backgroundColor:this.state.color3,padding:17,fontSize:10,borderBottomRightRadius: 75,
       borderTopRightRadius: 75,flexDirection:'row'}}>
              <MaterialCommunityIcons name="account-group" size={25} color="white" />
              <Text style={{color:'white',fontSize:17,paddingLeft:6}} 
              // onPress={()=>{this.TestingFunction('color3')}}
              >
                Group/Class
              </Text>
            </View>

            <View style={{backgroundColor:this.state.color3,padding:17,fontSize:10,borderBottomRightRadius: 75,
       borderTopRightRadius: 75,flexDirection:'row'}}>
              <MaterialCommunityIcons name="account-group" size={25} color="white" />
              <Text style={{color:'white',fontSize:17,paddingLeft:6}} 
              onPress={()=>{this.setState({isVisible2:true})}}
              >
                Poping out
              </Text>
            </View>

            <View style={{marginTop:186,backgroundColor:'#2e2e38',flexDirection:'row'}}>
              <SimpleLineIcons name="logout" size={25} color="white" />
              <Text style={{color:'white',fontSize:17}} 
              onPress={()=>{this.TestingFunction('color1')}}
              >   Logout</Text>
            </View>

          </View>
        </ScrollView>
        <View style={{marginTop:800}}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }

  onPress=()=>{
    this.props.navigation.navigate('QRcodeScanner');
  }
  submitCode=()=>{
    if(this.state.text1 === '57212331'){
      alert('Successfully get in..');
      this.props.navigation.navigate('insideGroupOrClass', {data: this.state.text1})

    }
    else{
      alert('Log in failure');
    }
  }

  TestingFunction=(colouring)=>{
    if(colouring==='color'){
      this.setState({color:'black',color1:'transparent',color2:'transparent',color3:'transparent'},()=>{});
      this.props.navigation.navigate('home')

    }
    if(colouring==='color1'){
      this.setState({color:'transparent',color1:'black',color2:'transparent',color3:'transparent'},()=>{});
      this.props.navigation.navigate('enrollSub')
    }
    if(colouring==='color2'){
      this.setState({color:'transparent',color1:'transparent',color2:'black',color3:'transparent'},()=>{});
      this.props.navigation.navigate('inputScreen')
    }
    if(colouring==='color3'){
      this.setState({color:'transparent',color1:'transparent',color2:'transparent',color3:'black'},()=>{
        alert("Going to somewhere else");
      });
    }
    
    
  }
}
const styles = StyleSheet.create({
  containerForSide:{
    backgroundColor:'transparent',
    padding:17,
    fontSize:10,
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
    backgroundColor:'white',
    paddingTop:15,
    paddingLeft:45,
    paddingRight:45,
    paddingBottom:45,
    width:'100%',
    borderBottomLeftRadius:13,
    borderBottomRightRadius:13,
  },
  buttonForOverlay:{
    backgroundColor:'#841584',
    borderColor:'red',
    paddingTop:3,
    width:'32%',
    height:38,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius:13,
  },
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;