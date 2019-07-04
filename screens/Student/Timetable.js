import React, { Component } from 'react';
import {
    ActivityIndicator,
    Clipboard,
    Image,
    Share,
    StyleSheet,
    Text,
    BackHandler,
    View,
} from 'react-native';
import {ImagePicker, Permissions } from 'expo';
import {AntDesign } from '@expo/vector-icons';
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

//This one will be on admin side
export default class App extends Component {
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
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

    constructor(props) {
        super(props);
        this.outputDataFunction();
    }
    render() {
        return (
            <Image source={{ uri: this.state.urlFirebase }} style={styles.backgroundImage} />
        );
    }
    outputDataFunction = () => {
        firebase.database().ref('users/timeTable').on('value', (snapshot) => {

            snapshot.forEach((child) => {
                var newWord = `'${child.val()}'`
                this.setState({ urlFirebase: child.val() })

            });
            console.log(this.state.urlFirebase)
        });
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
                    <Text>{"\n\n\n\n"}</Text>
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
                <Text>{"\n\n\n"}</Text>
                <AntDesign name="check" size={94} color="green" />
                <Text
                    style={styles.exampleText}>
                    All trips successfully uploaded
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
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    container: {
        alignItems: 'center',
        // flex: 0,
        justifyContent: 'center',
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
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
    }
});