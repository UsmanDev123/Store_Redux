import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

//imports
import {scale, verticalScale} from 'react-native-size-matters';
import Button from '../../components/Buttons/Button';
import {colors, sizes} from '../../config/Extras';
import OtpInput from '../../components/InputFields/OtpInput';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoading from '../../components/Container/CustomLoading';
import {
  handleForgotPassword,
  handleVerifyOtp,
} from '../../redux/actions/AuthAction';

const Otp = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.auth);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const [state, setState] = useState({
    textInput1: '',
    textInput2: '',
    textInput3: '',
    textInput4: '',
    email: route?.params?.email,
  });

  const [data, setData] = useState({
    email: route?.params?.email,
  });

  console.log('data----<<', data);

  const num1 = useRef(null);
  const num2 = useRef(null);
  const num3 = useRef(null);
  const num4 = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Text style={[styles.headerText, {marginBottom: verticalScale(30)}]}>
            Code Is Sent To youremailaddress@gmail.com
          </Text>
        </View>

        <OtpInput
          //for input 1
          num1={num1}
          focusedInput="textInput1"
          focus1={() => setFocusedInput('textInput1')}
          blur1={() => setFocusedInput(null)}
          textInput1={'textInput1'}
          changeText1={number => {
            setState({...state, textInput1: number});
            if (number !== '') {
              num2.current.focus();
            }
          }}
          //for input 2
          num2={num2}
          focusedInput2="textInput2"
          focus2={() => setFocusedInput('textInput2')}
          blur2={() => setFocusedInput(null)}
          textInput2={'textInput2'}
          changeText2={number => {
            setState({...state, textInput2: number});
            if (number !== '') {
              num3.current.focus();
            }
          }}
          keyPress2={e => {
            if (e.nativeEvent.key == 'Backspace') {
              num1.current.focus();
            }
          }}
          //for input 3
          num3={num3}
          focusedInput3={'textInput3'}
          focus3={() => setFocusedInput('textInput3')}
          blur3={() => setFocusedInput(null)}
          textInput3={'textInput3'}
          changeText3={number => {
            setState({...state, textInput3: number});
            if (number !== '') {
              num4.current.focus();
            }
          }}
          keyPress3={e => {
            if (e.nativeEvent.key == 'Backspace') {
              num3.current.focus();
            }
          }}
          //for input 4
          num4={num4}
          focusedInput4={'textInput4'}
          focus4={() => setFocusedInput('textInput4')}
          blur4={() => setFocusedInput(null)}
          textInput4={'textInput4'}
          changeText4={number => {
            setState({...state, textInput4: number});
          }}
          keyPress4={e => {
            if (e.nativeEvent.key == 'Backspace') {
              num4.current.focus();
            }
          }}
        />

        <View style={styles.topContainer}>
          <Text style={styles.headerText}>Didn't Received Code?</Text>
        </View>

        <View style={{marginTop: verticalScale(20)}}>
          <Button
            style={styles.button}
            myStyle={{
              backgroundColor: colors.primary,
              width: '32%',
              padding: scale(5),
            }}
            txtStyle={{color: colors.primary1}}
            btnLabel={
              userData?.authLoadingState ? (
                <View>
                  <CustomLoading size={27} />
                </View>
              ) : (
                'RESEND'
              )
            }
            Press={() => {
              if (!loadingResend) {
                setLoadingResend(true);-
                dispatch(handleForgotPassword(data, navigation)).then(() => {
                  setLoadingResend(false);
                });
              }
            }}
          />
        </View>

        <View style={{marginTop: verticalScale(40), marginBottom: scale(10)}}>
          <Button
            style={styles.button}
            textColor="white"
            btnLabel={
              userData?.authLoadingState ? (
                <View>
                  <CustomLoading size={27} />
                </View>
              ) : (
                'VERIFY'
              )
            }
            Press={() => {
              if (!loadingVerify) {
                setLoadingVerify(true);
                dispatch(handleVerifyOtp(state, navigation)).then(() => {
                  setLoadingVerify(false);
                });
              }
            }}
          />
        </View>
      </ScrollView>
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
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: '35%',
  },

  headerText: {
    fontFamily: 'JosefinSans-Regular',
    color: colors.black,
    fontSize: sizes.m16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: scale(20),
  },

  footerContainer: {
    marginTop: verticalScale(70),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  footerText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: sizes.m16,
    fontWeight: '600',
    color: colors.black,
  },

  footerText1: {
    fontFamily: 'JosefinSans-Regular',
    fontWeight: '600',
    fontSize: sizes.m16,
    color: colors.primary1,
  },

  inputText: {
    color: colors.black,
    fontSize: sizes.m15,
    marginHorizontal: scale(15),
    marginBottom: scale(5),
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

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  topContainer: {
    marginHorizontal: verticalScale(40),
    marginTop: verticalScale(25),
  },
});

export default Otp;
