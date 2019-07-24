import React from 'react';
import { Alert, TouchableOpacity, View, Text, StyleSheet, Animated, AsyncStorage } from 'react-native'

///////////////////// Fade in animation /////////////////////
class Animations extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 500,
            }
        ).start();
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

// Default export function
export default class Main extends React.Component {
    static navigationOptions = {
        // lock the drawer 
        drawerLockMode: "locked-closed"
    };

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
        }

        AsyncStorage.getItem('userName').then((value) => this.setState({ 'userName': value }))
    }
    
    render() {
        return (
            // <View style={styles.mainScreenContainer}>
                <Animations style={styles.mainScreenContainer}>
                    <TouchableOpacity style={styles.circleOnly}
                        onPress={() => {
                            Alert.alert('Press "Log In" to continue')
                        }}>
                    </TouchableOpacity>

                    <Text style={styles.firstTitle}>Start{'\n'}your{'\n'}day !</Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.userName === 'Logged Out') {
                                this.props.navigation.navigate('Login');
                            } else if (this.state.userName === 'Admin'){
                                this.props.navigation.navigate('Admin');
                            } else {
                                this.props.navigation.navigate('Home');
                            }
                        }}
                        style={styles.TouchableOpacityStyle}>
                        <View style={styles.center}>
                            <Text style={styles.text}>
                                Log In
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Animations>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    mainScreenContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    circleOnly: {
        width: 47,
        height: 47,
        backgroundColor: '#ffffff',
        borderColor: '#4c4c4c',
        borderWidth: 7,
        borderRadius: 47 / 2,
        marginTop: '20%',
        marginBottom: '20%',
        marginLeft: '15%',
    },

    firstTitle: {
        marginLeft: '15%',
        color: '#4c4c4c',
        fontWeight: '800',
        fontSize: 50,
    },

    TouchableOpacityStyle: {
        width: '100%',
        position: 'absolute',
        bottom: 30,
    },

    text: {
        width: '70%',
        borderWidth: 1,
        borderRadius: 60 / 2,
        padding: 15,
        borderColor: '#ffa654',
        backgroundColor: '#ffa654',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        overflow: 'hidden',
    },

    center: {
        alignItems: 'center',
    },
});