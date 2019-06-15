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
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { Header, Overlay } from 'react-native-elements';
import { Feather, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';


export default class App extends Component {
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
                <View style={{ backgroundColor: '#2e2e38', height: '36%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 100, width: '32%', height: '57%', justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="cloud" size={74} color="#2e2e38" />
                    </View>

                    {/* this one have to change if it is the real one */}
                    <Text style={{ color: 'white' }}>{'\n'}Cloud photo storage{'\n'}ninjayek@gmail.com</Text>
                </View>

                <View style={styles.container}>
                    <StatusBar barStyle="default" />
                    <Text>{"\n\n\n"}</Text>
                    <AntDesign name="check" size={94} color="green" />
                    <Text
                        style={styles.exampleText}>
                        All trips successfully uploaded
            {'\n\n\n'}
                    </Text>

                    <TouchableOpacity
                        onPress={this._pickImage}
                        style={{ backgroundColor: 'green', width: 250, height: 43, borderRadius: 30 }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', margin: 8, fontSize: 20 }}>
                            Upload Photo
            </Text>
                    </TouchableOpacity>


                    {/* <Button onPress={this._takePhoto} title="Take a photo" /> */}

                    {this._maybeRenderImage()}
                    {this._maybeRenderUploadingOverlay()}
                </View>
            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
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
            return;
        }

        // return (
        //   <View
        //     style={styles.maybeRenderContainer}>
        //     <View
        //       style={styles.maybeRenderImageContainer}>
        //       <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        //     </View>

        //     <Text
        //       onPress={this._copyToClipboard}
        //       onLongPress={this._share}
        //       style={styles.maybeRenderImageText}>
        //       {image}
        //     </Text>
        //   </View>
        // );
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
                aspect: [4, 3],
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