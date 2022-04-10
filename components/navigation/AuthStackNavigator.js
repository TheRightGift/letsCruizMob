import * as React from 'react';

// import Login from '../screens/Auth/Login/Login';
// import SendOTP from '../screens/Auth/Login/sendOTP';
// import ActivateAccount from '../screens/Auth/Login/activateAccount';
import OnBoarding from '../screens/onBoarding/Onboarding';
// import Register from '../screens/Auth/Register/Register';
// import VerifyEmail from '../screens/Auth/Register/verifyEmail';
// import AddProfile from '../screens/Auth/Register/addProfile';
// import Welcome from '../screens/Auth/Register/welcome';
// import ForgotPassword from '../screens/Auth/PasswordMgt/forgotPassword';
// import ResetPassword from '../screens/Auth/PasswordMgt/resetPassword';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="OnBoarding" 
            screenOptions={{
                header: () => null
            }}
        >
            <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ title: 'OnBoarding' }}/>
            {/* <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }}/>
            <Stack.Screen name="SendOTP" component={SendOTP} options={{ title: 'SendOTP' }}/>
            <Stack.Screen name="ActivateAccount" component={ActivateAccount} options={{ title: 'ActivateAccount' }}/>
            <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }}/>
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{ title: 'VerifyEmail' }}/>
            <Stack.Screen name="AddProfile" component={AddProfile} options={{ title: 'AddProfile' }}/>
            <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'ForgotPassword' }}/>
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'ResetPassword' }}/> */}
        </Stack.Navigator>
    );
};

export default AuthStackNavigator ;