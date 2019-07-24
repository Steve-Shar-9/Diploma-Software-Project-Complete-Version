import React, { Component } from 'react';
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground, 
    BackHandler
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { Header, Overlay } from 'react-native-elements';
import { Feather, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
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

//This one will be on admin side
export default class App extends Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Admin');
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    
    state = {
        image: null,
        uploading: false,
    };

    render() {
        let {
            image
        } = this.state;

        return (
            <View>
                <NavigationEvents
                    onDidFocus={payload => {
                        // console.log('did focus', payload)
                        this.setState({isVisible:false});
                    }}
                />
                <ImageBackground
                    source={require('../../images/background/Timetable.jpg')}
                    style={styles.overallBackgroundImage}
                    blurRadius={50}
                >
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="dark-content"
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Admin');
                            }}
                        >
                            <View style={[{ flexDirection: 'row' }]}>
                                <Icon name="arrow-left" size={22} style={styles.backBtn} />
                            </View>
                        </TouchableOpacity>}
                    centerComponent={{ text: 'Home', style: { fontSize: 25, color: '#fff' } }}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: "transparent",
                    }}
                />
                    <View style={{ backgroundColor: 'transparent', height: '36%', marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 100, width: 190, height: 190, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="cloud" size={100} color="white" />
                    </View>

                    {/* this one have to change if it is the real one */}
                    {/* <Text style={{ color: 'white' }}>{'\n'}Cloud photo storage{'\n'}ninjayek@gmail.com</Text> */}
                </View>

                <View style={styles.container}>

                    {this._maybeRenderImage()}
                    {this._maybeRenderUploadingOverlay()}

                    <TouchableOpacity
                        onPress={this._pickImage}
                        style={styles.button}>
                        <View style={styles.center}>
                            <Text style={styles.buttonText}>
                                Upload Photo
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        );
    }
    //----------------------------------SAVE--------------------------------
    firebaseDataSaving = () => {
        //----------------------------Random number generator----------------
        var RandomNumber = 'timeTable';
        var timetableUrl = this.state.image;

        db = firebase.database().ref('users/')
        db.child(RandomNumber).set({
            timetableUrl: this.state.image
        }).then((data) => { alert('saved'); }).catch((error) => { alert('failed'); })
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View>
                    <ActivityIndicator color="green" size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let {
            image
        } = this.state;

        if (!image) {

            return (
                <View>
                    <Text>{"\n\n"}</Text>
                    <Text
                        style={styles.exampleText}>
                        All trips successfully uploaded
            {'\n\n\n\n'}
                    </Text>
                </View>
            );
        }

        //based on what i knew here this.state.image is the place where we stored the url of the image
        return (
            <View style={styles.container}>
                {/* <View
         style={styles.maybeRenderImageContainer}>
       <Image source={{ uri: image }} style={styles.maybeRenderImage} />
       </View> */}

                {/* <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text> */}

                <Text>{"\n\n\n"}</Text>
                <AntDesign name="check" size={94} color="green" />
                <Text
                    style={styles.exampleText}>
                    Timetable photo upload
            {'\n\n\n'}
                </Text>
            </View>
        );
    };

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 6],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri);
                uploadResult = await uploadResponse.json();

                this.setState({
                    image: uploadResult.location
                });

                this.firebaseDataSaving();
            }
        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };
}

async function uploadImageAsync(uri) {
    let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // flex: 0,
        justifyContent: 'center',
    },
    overallBackgroundImage: {
        width: '100%',
        height: '100%',
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
        color: 'white'
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: 250,
    },
    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 250,
        width: 250,
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    backBtn: {
        paddingLeft: 20,
        width: 40,
        color: '#fff'
    },
    button: {
        width: '100%',
        position: 'absolute',
        bottom: -25,
    },
    buttonText: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 60 / 2,
        padding: 15,
        borderColor: 'white',
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        // fontWeight: '800',
        overflow: 'hidden',
    },
    center: {
        alignItems: 'center',
    },
});