import * as React from 'react';
import Gist from '../screens/Gist/Gist';
import Chat from '../screens/Chat/Chat';
import LiveTV from '../screens/LiveTV/LiveTV';
import { Icon } from 'react-native-elements'
import { COLORS, SIZES } from '../../constants';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    
    return (
        <Tab.Navigator initialRouteName="Gist"
            activeColor={COLORS.primary}
            barStyle={{ backgroundColor: '#fff' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Gist" component={Gist} options={
                {
                    tabBarIcon: ({ focused, color, size }) => {
                        if(focused){
                            color = COLORS.primary;
                            size = 25;
                        } else {
                            color = '#000'
                            size = 20;
                        }
                        return (
                            <Icon type='material-community' size={size} name='newspaper-variant' color={color} />
                        );
                    }, 
                    tabBarLabel: 'Gist'
                }
            }/>
            <Tab.Screen name="LiveTV" component={LiveTV} options={
                {
                    tabBarIcon: ({ focused, color, size }) => {
                        if(focused){
                            color = COLORS.secondary;
                            size = 25;
                        } else {
                            color = '#000'
                            size = 20;
                        }
                        return (
                            <Icon type='material-community' size={size} name='television' color={color} />
                        );
                    }, 
                    tabBarLabel: 'LiveTV'
                }
            }/>
            {/* <Tab.Screen name="Blog" component={Blog} options={
                {
                    tabBarIcon: ({ focused, color, size }) => {
                        if(focused){
                            color = COLORS.secondary;
                            size = 25;
                        } else {
                            color = '#000'
                            size = 20;
                        }
                        return (
                            <Icon type='material-community' size={size} name='newspaper' color={color} />
                        );
                    }, 
                    tabBarLabel: 'Blog'
                }
            }/> */}
            <Tab.Screen name="Chat" component={Chat} options={
                {
                    tabBarIcon: ({ focused, color, size }) => {
                        if(focused){
                            color = COLORS.secondary;
                            size = 25;
                        } else {
                            color = '#000'
                            size = 20;
                        }
                        return (
                            <Icon type='material-community' size={size} name='message-outline' color={color} />
                        );
                    }, 
                    tabBarLabel: 'Chat'
                }
            }/>
            
        </Tab.Navigator>
    );
};

export default BottomTabNavigator ;