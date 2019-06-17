import React from 'react';
import { Alert, TouchableOpacity, View, Text, StyleSheet, ImageBackground, FlatList, Dimensions } from 'react-native'
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import images from '../../images/index';

const gridTitle = [
    { title: 'Student' },
    { title: 'Department' },
    { title: 'Announcement' },
    { title: 'Event / Activity' },
    { title: 'Programme' },
    { title: 'Timetable' }
]

const numColumns = 2;

export default class Admin extends React.Component {
    renderItem = ({ item }) => {
        if (item.title === 'Student') {
            return (
                <TouchableOpacity style={styles.gridItem}
                    onPress={() => {
                        this.props.navigation.navigate('AdminStudent');
                    }}
                >
                    <ImageBackground
                        source={images.Student}
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 3 }}
                    >
                        <View style={styles.blurredBg}>
                            <Icon name="user" size={45} color="#fff" />
                            <Text style={styles.gridItemText}>{'\n'}{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            );
        } else if (item.title === 'Department') {
            return (
                <TouchableOpacity style={styles.gridItem}
                    onPress={() => {
                        this.props.navigation.navigate('AdminDepartment');
                    }}
                >
                    <ImageBackground
                        source={images.Department}
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 3 }}
                    >
                        <View style={styles.blurredBg}>
                            <Icon name="building" size={45} color="#fff" />
                            <Text style={styles.gridItemText}>{'\n'}{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            );
        } else if (item.title === 'Event / Activity') {
            return (
                <TouchableOpacity style={styles.gridItem}
                    onPress={() => {
                        this.props.navigation.navigate('AdminEvent');
                    }}
                >
                    <ImageBackground
                        source={images.Events}
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 3 }}
                    >
                        <View style={styles.blurredBg}>
                            <Icon name="calendar" size={45} color="#fff" />
                            <Text style={styles.gridItemText}>{'\n'}{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            );
        } else if (item.title === 'Announcement') {
            return (
                <TouchableOpacity style={styles.gridItem}
                    onPress={() => {
                        this.props.navigation.navigate('AdminAnnouncement');
                    }}
                >
                    <ImageBackground
                        source={images.Announcement}
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 3 }}
                    >
                        <View style={styles.blurredBg}>
                            <Icon name="bullhorn" size={45} color="#fff" />
                            <Text style={styles.gridItemText}>{'\n'}{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            );
        } else if (item.title === 'Programme') {
            return (
                <TouchableOpacity style={styles.gridItem}
                    onPress={() => {
                        this.props.navigation.navigate('AdminProgramme');
                    }}
                >
                    <ImageBackground
                        source={images.Library}
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 3 }}
                    >
                        <View style={styles.blurredBg}>
                            <Icon name="info" size={45} color="#fff" />
                            <Text style={styles.gridItemText}>{'\n'}{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            );
        } else if (item.title === 'Timetable') {
            return (
                <TouchableOpacity style={styles.gridItem}
                    onPress={() => {
                        this.props.navigation.navigate('AdminTimetable');
                    }}
                >
                    <ImageBackground
                        source={images.Timetable}
                        style={styles.backgroundImage}
                        imageStyle={{ borderRadius: 3 }}
                    >
                        <View style={styles.blurredBg}>
                            <Feather name="clock" size={45} color="#fff" />
                            <Text style={styles.gridItemText}>{'\n'}{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }
    };

    render() {
        return (
            <View style={styles.adminScreenContainer}>
                <ImageBackground
                    style={styles.overallBackgroundImage}
                    source={require('../../images/background/bg3.jpg')}
                    blurRadius={50}
                >
                    <ScrollView>
                        <Header
                            statusBarProps={{ barStyle: 'light-content' }}
                            placement="left"
                            leftComponent={{ icon: 'menu', color: 'transparent' }}
                            centerComponent={<View style={styles.headerTitle}><Text style={styles.headerTitleText}>ADMIN</Text></View>}
                            rightComponent={
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('Login');
                                    }}
                                >
                                    <Icon name="sign-out" size={25} style={styles.logOutBtn} />
                                </TouchableOpacity>}
                            containerStyle={{
                                backgroundColor: 'transparent',
                                justifyContent: 'space-around',
                                // height: 100,
                                borderBottomColor: "transparent",
                            }}
                        />
                    
                        <View style={styles.flatListContainer}>
                            <FlatList
                                data={gridTitle}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => 'key' + index}
                                numColumns={numColumns}
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    adminScreenContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#32323d',
    },

    overallBackgroundImage: {
        width: '100%',
        height: '100%',
    },

    headerTitle: {
        color: '#fff',
        textAlign: 'center',
        width: '100%'
    },

    headerTitleText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },

    logOutBtn: {
        marginRight: '2%',
        color: '#fff'
    },

    flatListContainer: {
        marginTop: 5,
        marginBottom: 5
    },

    backgroundImage: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: "100%",
        height: "100%",
        borderRadius: 3
    },

    blurredBg: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: "100%",
        height: "100%",
        borderRadius: 3
    },

    gridItem: {
        backgroundColor: '#2e2e38',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        height: Dimensions.get('window').width / numColumns,
        borderRadius: 3
    },

    gridItemText: {
        color: 'white',
        fontSize: 17.5
    }
});