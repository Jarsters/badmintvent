import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKGROUNG_COLOR, BOX_COLOR, TEXT1, TEXT2 } from '../../helpers/colors';
import { ADD_ROUTE } from '../../helpers/routesNames';


const AuthScreen = ({ navigation }) => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    GoogleSignin.configure({
        webClientId: 'firebase-adminsdk-1gwc0@badmintvent.iam.gserviceaccount.com'
    });

    useEffect(() => {
        getData();
    }, [userInfo]);

    const signIn = async () => {
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken, accessToken } = await GoogleSignin.getTokens();
            setuserInfo(userInfo);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            await auth().signInWithCredential(credential);
            setloggedIn(true);
            const jsonValue = JSON.stringify(userInfo);
            await AsyncStorage.setItem('userInfo', jsonValue)
            setIsLoading(false);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
                alert('Something else went wrong... ', error.toString())
            }
        }
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userInfo')
            // console.log(value)
            if (value) {
                setuserInfo(JSON.parse(value))
                return JSON.parse(value)
            }
            return null
        }
        catch (error) {
            console.log('error')
        }
    }

    const signOut = async () => {
        setIsLoading(true);
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => alert('Your are signed out!'));
            setloggedIn(false);
            await AsyncStorage.removeItem('userInfo');
            setuserInfo(null);
            setIsLoading(false);
            // await AsyncStorage.removeItem('userInfo');
        } catch (error) {
            console.error(error);
        }
    };

    const getTokensDevice = async () => {
        const value = await AsyncStorage.getItem('token')
        if (value) { console.log(value) }
        return null;
    }

    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        // console.log(currentUser);
    };

    if (isLoading) {
        return (
            <View style={[styles.preloader, { backgroundColor: BACKGROUNG_COLOR }]}>
                <ActivityIndicator size="large" color={BOX_COLOR} />
            </View>
        )
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.body}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{
                        width: 150,
                        height: 150
                    }}
                />
                <View style={styles.sectionContainer}>
                    {!userInfo && <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signIn}
                    />}
                </View>
                <View style={styles.buttonContainer}>
                    {
                        userInfo ? (
                            <View>
                                <Button
                                    onPress={signOut}
                                    title="KELUAR"
                                    color={TEXT2}
                                >
                                </Button>

                                <TouchableOpacity
                                    style={{
                                        margin: 15,
                                        width: 150,
                                        height: 60,
                                        backgroundColor: BOX_COLOR,
                                        justifyContent: 'center',
                                        borderRadius: 50
                                    }}
                                    onPress={() => {
                                        navigation.navigate(ADD_ROUTE, {
                                            userInfo: userInfo
                                        })
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>Buat Event</Text>
                                </TouchableOpacity>

                            </View>
                        ) : (
                            <Text>You are currently logged out</Text>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    body: {
        backgroundColor: BACKGROUNG_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AuthScreen
