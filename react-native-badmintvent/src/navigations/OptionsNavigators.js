import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ADD_ROUTE, DETAIL_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../helpers/routesNames';
import ListTurnamen from '../screen/ListTurnamen';
import DetailTurnamen from '../screen/DetailTurnamen';
import AddTurnamen from '../screen/AddTurnamen';
import { BACKGROUNG_COLOR } from '../helpers/colors';
import Auth from '../screen/AuthScreen';



const OptionsNavigators = () => {
    const OptionsStack = createNativeStackNavigator();
    return (
        <OptionsStack.Navigator initialRouteName={HOME_ROUTE}
            screenOptions={{
                headerStyle: {
                    backgroundColor: BACKGROUNG_COLOR
                },
            }}
        >
            <OptionsStack.Screen name={LOGIN_ROUTE} component={Auth} options={{ headerShown: false }} />
            <OptionsStack.Screen name={ADD_ROUTE} component={AddTurnamen} />
        </OptionsStack.Navigator>
    );
};
export default OptionsNavigators;
