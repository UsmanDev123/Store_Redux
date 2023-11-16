import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

//imports
import {scale, verticalScale} from 'react-native-size-matters';
import Button from '../../components/Buttons/Button';
import {colors, images, sizes} from '../../config/Extras';
import InputPassword from '../../components/InputFields/InputPassword';
import {windowHeight, windowWidth} from '../../config/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {handleResetPassword} from '../../redux/actions/AuthAction';
import CustomLoading from '../../components/Container/CustomLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ResetPassword = ({route, navigation}) => {
  const [data, setData] = useState({
    email: route?.params?.email,
    password: '',
    confirmPass: '',
  });

  console.log('data++>', data);

  const dispatch = useDispatch();
  const userData = useSelector(state => state?.auth);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: verticalScale(25)}}>
            <View style={styles.logoContainer}>
              <Image source={images.ResetPass} style={styles.logo} />
            </View>

            <View style={{marginTop: verticalScale(35)}}>
              <View style={{marginHorizontal: verticalScale(25)}}>
                <Text style={styles.headerText}>
                  This Password Should Be Different From The Previous Password
                </Text>
              </View>

              <View>
                <Text style={styles.inputText}>New Password</Text>
                <InputPassword
                  placeholderText="Enter New Password"
                  secureTextEntry={true}
                  name={'lock'}
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

              <View style={{marginTop: scale(20)}}>
                <Text style={styles.inputText}>Confirm Password</Text>

                <InputPassword
                  placeholderText="Enter Confirm Password"
                  secureTextEntry={true}
                  name={'lock'}
                  size={19}
                  sizeEndIcon={20}
                  isShow={true}
                  onChangeText={text => {
                    setData({...data, confirmPass: text});
                  }}
                  id={'confirmPass'}
                  value={data?.confirmPass}
                />
              </View>

              <View style={{marginTop: scale(30), marginBottom: scale(10)}}>
                <Button
                  style={styles.button}
                  textColor="white"
                  btnLabel={
                    userData?.authLoadingState ? (
                      <View>
                        <CustomLoading size={27} />
                      </View>
                    ) : (
                      'DONE'
                    )
                  }
                  Press={() => {
                    dispatch(handleResetPassword(data, navigation));
                  }}
                />
              </View>
            </View>
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

  logoContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },

  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.18,
  },

  headerText: {
    fontFamily: 'JosefinSans-Regular',
    color: colors.black,
    fontSize: sizes.m16,
    fontWeight: '600',
    marginBottom: verticalScale(30),
    textAlign: 'center',
    lineHeight: scale(20),
  },

  inputText: {
    color: colors.black,
    fontSize: sizes.m15,
    marginHorizontal: scale(20),
    marginBottom: scale(7),
    fontFamily: 'JosefinSans-Regular',
  },
});

export default ResetPassword;
