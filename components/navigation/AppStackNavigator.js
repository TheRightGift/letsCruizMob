import * as React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import WebPage from '../screens/Gist/WebPage';
import VideoPlayer from '../screens/LiveTV/VideoPlayer';
// import LinkBank from '../screens/Profile/LinkBank';
// import Pin from '../screens/Profile/Pin';
// import SendAssetHome from '../screens/Wallet/SendAsset/SendAssetHome';
// import SendAsset from '../screens/Wallet/SendAsset/SendAsset';
// import SendAssetSummary from '../screens/Wallet/SendAsset/SendAssetSummary';
// import ScanAddress from '../screens/Wallet/SendAsset/ScanAddress';
// import ReqAsset from '../screens/Wallet/RequestAsset/ReqAsset';
// import ReqAssetSuccess from '../screens/Wallet/RequestAsset/ReqAssetSuccess';
// // ReqAssetSuccess
// import AddFunds from '../screens/Wallet/AddFunds';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
    return (
            <Stack.Navigator initialRouteName="BottomTabNavigator" screenOptions={{headerShown: false}}>
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ title: 'BottomTabNavigator' }}/>
                <Stack.Screen name="WebPage" component={WebPage} options={{ title: 'WebPage' }}/>
                <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ title: 'VideoPlayer' }}/>
            </Stack.Navigator>
    );
};

export default AppStackNavigator ;