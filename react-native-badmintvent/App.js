/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';


import BoxDetail from './src/components/BoxDetail';
import BoxFilter from './src/components/BoxFilter';
import BoxTurnamen from './src/components/BoxTurnamen';
import HomeNavigator from './src/navigations/HomeNavigators';
import OptionsNavigators from './src/navigations/OptionsNavigators';
import TabsNavigator from './src/navigations/TabsNavigators';
import AddTurnamen from './src/screen/AddTurnamen/index';
import AuthScreen from './src/screen/AuthScreen';
import DetailTurnamen from './src/screen/DetailTurnamen';
import ListTurnamen from './src/screen/ListTurnamen';

import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "react-native-splash-screen";




const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};




// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: async function (token) {
    // console.log("TOKEN:", token);
    await AsyncStorage.setItem('token', JSON.stringify(token));
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },


  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.subscribeToTopic('badminton');


const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  // <ScrollView
  //   contentInsetAdjustmentBehavior="automatic"
  //   style={backgroundStyle}>
  //   <Header />

  //   {/* Container Background Putih */}
  //   <View
  //     style={{
  //       backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //     }}>
  //   {/* <BoxFilter
  //     nama_filter = "Location"
  //   /> */}
  //   <BoxTurnamen 
  //     nama_turnamen={"dekan cup fmipa unj".toUpperCase()}
  //     penyelenggara={"fmipa".toUpperCase()}
  //     status={"TUTUP".toUpperCase()}
  //     nama_gor={'gor spirit'.toUpperCase()}
  //     kota={'jakarta timur'.toUpperCase()}
  //   />
  //   </View>
  // </ScrollView>
  // <SafeAreaView style={[backgroundStyle]}>
  //   {/* <View>
  //     <Text>Nanti ini judul</Text>
  //   </View> */}
  //   {/* <ListTurnamen /> */}
  //   {/* <BoxDetail /> */}
  //   {/* <DetailTurnamen /> */}
  //   {/* <AddTurnamen /> */}
  // </SafeAreaView>
  return (
    // <AddTurnamen />
    // <HomeNavigator />
    <TabsNavigator />
    // <OptionsNavigators />
    // <AuthScreen />
  );
};

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
});

export default App;
