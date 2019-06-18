import React, { Component } from 'react';
import { Alert, Dimensions, LayoutAnimation, Text, View, StyleSheet, AsyncStorage } from 'react-native';
// import { BarCodeScanner, Permissions } from 'expo';
import { ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

export default class App extends Component {
    state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedUrl) {
            LayoutAnimation.spring();
            this.setState({ lastScannedUrl: result.data });
            console.log(result.data);
        }
    };

    render() {
        return (
            <View style={styles.container}>

                {this.state.hasCameraPermission === null
                    ? <Text>Requesting for camera permission</Text>
                    : this.state.hasCameraPermission === false
                        ? <Text style={{ color: '#fff' }}>
                            Camera permission is not granted
                </Text>
                        : <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{
                                height: Dimensions.get('window').height,
                                width: Dimensions.get('window').width,
                            }}
                        />}
                {this._maybeRenderUrl()}
            </View>
        );
    }

    _handlePressUrl = () => {
        Alert.alert(
            'Open this URL?',
            this.state.lastScannedUrl,
            [
                {
                    text: 'Yes',
                    //this stage maybe u can put some action into it
                    onPress: () =>
                        // Linking.openURL(this.state.lastScannedUrl),
                        this.checkingStateQr()
                },
                { text: 'No', onPress: () => { } },
            ],
            { cancellable: false }
        );
    };

    //This one to same with the type one REMEMBER!!
    checkingStateQr = async () => {
        if (this.state.lastScannedUrl === '57212331') {
            try {
                await AsyncStorage.setItem('@GroupCode:key', this.state.lastScannedUrl);
                console.log('saved to localStorage');
            } catch (error) {
                console.log('error saving data to localStorage');
            }
            ToastAndroid.showWithGravityAndOffset(
                'Registered!!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            this.props.navigation.navigate('insideGroupOrClass', { data: this.state.lastScannedUrl })
        }
        else {
        }
    }

    _maybeRenderUrl = () => {
        this.checkingStateQr();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        flexDirection: 'row',
    },
    url: {
        flex: 1,
    },
    urlText: {
        color: '#fff',
        fontSize: 20,
    },
    cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
    },
});