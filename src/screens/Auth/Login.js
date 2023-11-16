import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

//imports
import {scale, verticalScale} from 'react-native-size-matters';
import Input from '../../components/InputFields/Input';
import Button from '../../components/Buttons/Button';
import {colors, images, sizes} from '../../config/Extras';
import InputPassword from '../../components/InputFields/InputPassword';
import {windowHeight, windowWidth} from '../../config/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {handleLogin} from '../../redux/actions/AuthAction';
import CustomLoading from '../../components/Container/CustomLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.auth);
  console.log('userLoader', userData?.authLoadingState);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        bounces={false}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        extraScrollHeight={15}
        scrollEnabled={true}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image source={images.newLogo} style={styles.logo} />
          </View>

          <View style={{marginTop: '12%'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.headerText}>LOG IN</Text>
            </View>
          </View>

          <View>
            <Text style={styles.inputText}>Username / Email</Text>
            <Input
              placeholderText="Enter Your Username / Email"
              name={'user-o'}
              size={18}
              isIconShow={true}
              onChangeText={text => {
                setData({...data, email: text});
              }}
              id={'email'}
              value={data?.email}
            />
          </View>

          <View style={{marginTop: scale(20)}}>
            <Text style={styles.inputText}>Password</Text>

            <InputPassword
              placeholderText="Enter Your Password"
              secureTextEntry={true}
              name={'unlock'}
              size={19}
              sizeEndIcon={20}
              isShow={true}
              onChangeText={text => {
                setData({...data, password: text});
              }}
              id={'password'}
              value={data?.password}
            />
          </View>

          <View style={styles.passContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}>
              <Text style={styles.passText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: scale(30)}}>
            <Button
              textColor="white"
              btnLabel={
                userData?.authLoadingState ? (
                  <View>
                    <CustomLoading size={27} />
                  </View>
                ) : (
                  'LOG IN'
                )
              }
              Press={() => {
                dispatch(handleLogin(data, navigation));
              }}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account ? </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={styles.footerText1}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  logo: {
    height: windowHeight * 0.17,
    width: windowWidth * 0.93,
    resizeMode:'contain'
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: '12%',
  },

  headerText: {
    fontFamily: 'JosefinSans-Regular',
    color: colors.black,
    fontSize: sizes.m25,
    marginBottom: verticalScale(30),
  },

  footerContainer: {
    marginTop: windowHeight * 0.02,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(25),
  },

  footerText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: sizes.m18,
    fontWeight: '600',
    color: colors.black,
  },

  footerText1: {
    fontFamily: 'JosefinSans-Regular',
    fontWeight: '600',
    fontSize: sizes.m18,
    color: colors.primary1,
  },

  inputText: {
    color: colors.black,
    fontSize: sizes.m15,
    marginHorizontal: scale(20),
    marginBottom: scale(7),
    fontFamily: 'JosefinSans-Regular',
  },

  passContainer: {
    alignSelf: 'flex-end',
    marginHorizontal: scale(20),
    marginTop: scale(7),
  },

  passText: {
    color: colors.primary1,
    fontWeight: '600',
    fontSize: sizes.m16,
    fontFamily: 'JosefinSans-Regular',
  },
});

export default Login;
