//imports
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, StatusBar, Animated, View} from 'react-native';
import {colors, images} from '../config/Extras';

const SplashScreenPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Image source={images.splashLogo} style={styles.logo} />
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 180,
    resizeMode: 'contain',
  },
});

export default SplashScreenPage;
