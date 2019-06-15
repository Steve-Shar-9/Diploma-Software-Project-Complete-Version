import React from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text1: '',
        }
    }
    static navigationOptions = {
        title: 'Home Screen',
        header: null,
        // This one can lock the drawer
        drawerLockMode: "locked-closed"
    };

    render() {
        return (

            <View style={styles.container1}>
                <View style={{ height: 45, width: '100%', backgroundColor: '#841584', borderTopLeftRadius: 13, borderTopRightRadius: 13 }}>
                    <Text style={{ fontSize: 20, color: 'white', paddingLeft: 10, paddingTop: 9 }}>Join class</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={{ paddingBottom: 14 }}>Ask your teacher if you do not have a codes or QR code to scan.</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 340, color: 'black', paddingLeft: 13, borderRadius: 13, }}
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
                            onPress={this.onPress}
                        >
                            <AntDesign name="qrcode" size={30} color="white" />
                            <Text style={{ color: 'black', alignSelf: 'center', padding: 10 }}>QR scan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    onPress = () => {
        this.props.navigation.navigate('QRcodeScanner');
    }
    submitCode = () => {
        if (this.state.text1 === '57212331') {
            alert('Successfully get in..');
            this.props.navigation.navigate('insideGroupOrClass', { data: this.state.text1 })

        }
        else {
            alert('Log in failure');
        }
    }
}
const styles = StyleSheet.create({
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
        paddingTop: 15,
        paddingLeft: 45,
        paddingRight: 45,
        paddingBottom: 45,
        width: '100%',
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