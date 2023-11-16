import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

//imports
import {scale, verticalScale} from 'react-native-size-matters';
import Input from '../../components/InputFields/Input';
import Button from '../../components/Buttons/Button';
import {colors} from '../../config/Extras';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoading from '../../components/Container/CustomLoading';
import {handleForgotPassword} from '../../redux/actions/AuthAction';
import {Toast, myToast} from '../../components/Container/Toast';

const ForgotPassword = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
  });
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.auth);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: verticalScale(25)}}>
        <View style={{marginHorizontal: verticalScale(27)}}>
          <Text style={styles.headerText}>
            Enter the Email Address with your Account and we'll send on Email
            with Confirmation to Reset your Password
          </Text>
        </View>

        <View>
          <Input
            placeholderText="youremailaddresshere@gmail.com"
            onChangeText={text => {
              setData({...data, email: text});
            }}
            id={'email'}
            value={data?.email}
            txtStyle={{width: '100%'}}
          />
        </View>

        <View style={{marginTop: '8%'}}>
          <Button
            style={styles.button}
            textColor="white"
            myStyle={{width: '42%', padding: scale(12)}}
            btnLabel={
              userData?.authLoadingState ? (
                <View>
                  <CustomLoading size={27} />
                </View>
              ) : (
                'CONTINUE'
              )
            }
            Press={() => {

              dispatch(handleForgotPassword(data,navigation));
              // navigation.navigate('Otp');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  headerText: {
    fontFamily: 'JosefinSans-Regular',
    color: colors.black,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: verticalScale(30),
    textAlign: 'center',
    padding: scale(6),
    lineHeight: scale(19),
  },
});

export default ForgotPassword;
