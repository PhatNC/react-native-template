import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SCREENS} from '../constants/screens';
import HomeScreen from '../screens/HomeScreen';
import Authentication from '../screens/authentication/Authentication';
import RegisterScreen from '../screens/authentication/RegisterScreen';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const Auth = (props: any) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={SCREENS.AUTH.LOGIN}>
        {props => <Authentication {...props} />}
      </AuthStack.Screen>
      <AuthStack.Screen name={SCREENS.AUTH.REGISTER}>
        {props => <RegisterScreen {...props} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

const Main = (props: any) => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name={SCREENS.MAIN.HOME} component={HomeScreen} />
    </MainTab.Navigator>
  );
};

const RootNavigator = () => {
  const navigation = useNavigation();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('TOKEN');
    console.log('userToken :>> ', userToken);
    if (!!userToken) {
      navigation.navigate('Main');
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={'Auth'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth">{props => <Auth {...props} />}</Stack.Screen>
      <Stack.Screen name="Main">{props => <Main {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
