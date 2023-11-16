import React, {useEffect, useState} from 'react';
import StackNavigation from './src/components/Navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {LOCAL_DATA} from './src/redux/reducers/AuthReducer';
import {colors} from './src/config/Extras';
import {StatusBar} from 'react-native';
import SplashScreenPage from './src/screens/SplashScreenPage';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getLocalData();
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  }, []);

  const getLocalData = async () => {
    setIsVisible(true);
    const savedUser = await AsyncStorage.getItem('user');
    const currentUser = JSON.parse(savedUser);
    dispatch({type: LOCAL_DATA, payload: currentUser});
  };

  return (
    <ToastProvider>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {isVisible ? (
        <SplashScreenPage />
      ) : (
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      )}
    </ToastProvider>
  );
};

export default App;
