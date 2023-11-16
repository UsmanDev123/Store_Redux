import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

//imports
import {scale, verticalScale} from 'react-native-size-matters';
import Input from '../../components/InputFields/Input';
import Button from '../../components/Buttons/Button';
import {colors, images, sizes} from '../../config/Extras';
import InputPassword from '../../components/InputFields/InputPassword';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoading from '../../components/Container/CustomLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {handleRegister} from '../../redux/actions/AuthAction';
import { windowHeight } from '../../config/Dimensions';

const Signup = ({navigation}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const dispatch = useDispatch();
  const userData = useSelector(state => state?.auth);
  console.log('userData', userData?.authLoadingState);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        bounces={false}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        // scrollEnabled={true}
        extraScrollHeight={15}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}>
          <View style={styles.logoContainer}>
            <Image source={images.newLogo} style={styles.logo} />
          </View>

          <View style={{marginTop: verticalScale(25)}}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.headerText}>SIGN UP</Text>
            </View>
          </View>
          <View>
            <Text style={styles.inputText}>Name</Text>
            <Input
              placeholderText="Enter Your Username / Email"
              name={'user-o'}
              size={18}
              isIconShow={true}
              onChangeText={text => {
                setData({...data, name: text});
              }}
              id={'name'}
              value={data?.name}
            />

            <View style={{marginTop: verticalScale(15)}}>
              <Text style={styles.inputText}>Email</Text>
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

            <View style={{marginTop: verticalScale(15)}}>
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

            <View style={{marginTop: verticalScale(15)}}>
              <Text style={styles.inputText}>Confirm Password</Text>

              <InputPassword
                placeholderText="Enter Your Password"
                secureTextEntry={true}
                name={'unlock'}
                size={19}
                sizeEndIcon={20}
                isShow={true}
                onChangeText={text => {
                  setData({...data, passwordConf: text});
                }}
                id={'ConfirmPassword'}
                value={data?.passwordConf}
              />
            </View>
          </View>

          <View style={{marginTop: '7%'}}>
            <Button
              textColor="white"
              btnLabel={
                userData?.authLoadingState ? (
                  <View>
                    <CustomLoading size={27} />
                  </View>
                ) : (
                  'SIGN UP'
                )
              }
              Press={() => {
                dispatch(handleRegister(data, navigation));
              }}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an Account ? </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.footerText1}>Login</Text>
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
    height: 100,
    width: '80%',
    resizeMode:'contain'

  },

  logoContainer: {
    alignItems: 'center',
    marginTop: '15%',
  },

  headerText: {
    fontFamily: 'JosefinSans-Regular',
    color: colors.black,
    fontSize: sizes.m25,
    fontWeight: '600',
    marginBottom: verticalScale(20),
  },

  footerContainer: {
    marginTop: windowHeight * 0.02,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(28),
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
    marginRight: scale(12),
    marginTop: scale(5),
  },

  passText: {
    color: colors.primary1,
    fontWeight: '600',
    fontSize: sizes.m15,
    fontFamily: 'JosefinSans-Light',
  },
});

export default Signup;
