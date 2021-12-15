import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DETAIL_ROUTE, HOME_ROUTE } from '../helpers/routesNames';
import ListTurnamen from '../screen/ListTurnamen';
import DetailTurnamen from '../screen/DetailTurnamen';
import { BACKGROUNG_COLOR } from '../helpers/colors';

const HomeNavigators = () => {
    const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator initialRouteName={HOME_ROUTE}
            screenOptions={{
                headerStyle: {
                    backgroundColor: BACKGROUNG_COLOR
                },
            }}
        >
            <HomeStack.Screen name={HOME_ROUTE} component={ListTurnamen} />
            <HomeStack.Screen name={DETAIL_ROUTE} component={DetailTurnamen} />
        </HomeStack.Navigator>
    );
};
export default HomeNavigators;
