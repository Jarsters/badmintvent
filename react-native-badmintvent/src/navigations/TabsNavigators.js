import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from '../components/Icon';
import { HOME_TAB_ROUTE, OPTIONS_TAB_ROUTE } from '../helpers/routesNames';
import HomeNavigators from './HomeNavigators';
import { BACKGROUNG_COLOR } from '../helpers/colors';
import OptionsNavigators from './OptionsNavigators';

const TabsNavigator = () => {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={{ backgroundColor: BACKGROUNG_COLOR }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let type;
                        if (route.name === HOME_TAB_ROUTE) {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                            type = 'ionicon'
                        } else if (route.name === OPTIONS_TAB_ROUTE) {
                            iconName = focused
                                ? 'eye'
                                : 'eye-outline';
                            type = 'ionicon'
                        }
                        return <Icon type={type} name={iconName} size={21} color={color} />;
                    },
                })} tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name={HOME_TAB_ROUTE} component={HomeNavigators} />
                <Tab.Screen name={OPTIONS_TAB_ROUTE} component={OptionsNavigators} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
export default TabsNavigator
