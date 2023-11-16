import {BaseUrl, EndPoints} from '../../Utils/Api';
import AuthReducer, {
  AUTH_LOADING,
  FORGOT_PASSWORD,
  LOCAL_DATA,
  LOGIN_USER_DETAILS,
  LOGOUT_USER,
  REGISTER_USER_DETAILS,
  RESET_PASSWORD,
  VERIFY_OTP,
} from '../reducers/AuthReducer';
import {myToast} from '../../components/Container/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//For User LogIn
export const handleLogin = data => {
  return async dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    try {
      const loginResponse = await fetch(`${BaseUrl}${EndPoints.loginUser}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data?.email,
          password: data?.password,
        }),
      });
      const responseRes = await loginResponse.json();
      if (loginResponse?.status == 200) {
        myToast('LogIn Successfully', 'success', 'green');
        await AsyncStorage.setItem('user', JSON.stringify(responseRes));
        dispatch({type: LOCAL_DATA, payload: responseRes});
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({type: LOGIN_USER_DETAILS, payload: responseRes});
      } else {
        dispatch({type: AUTH_LOADING, payload: false});
        myToast(responseRes?.error, 'danger', 'red');
      }
    } catch (error) {
      dispatch({type: AUTH_LOADING, payload: false});
      myToast('Something Wrong!', 'danger', 'red');
    }
  };
};

//For Register User
export const handleRegister = (data, navigation) => {
  console.log('data', data);
  return async dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    try {
      const registerResponse = await fetch(
        `${BaseUrl}${EndPoints.signupUser}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data?.name,
            email: data?.email,
            password: data?.password,
            passwordConf: data?.passwordConf,
          }),
        },
      );
      const responseReg = await registerResponse.json();
      console.log('ResRegister', responseReg);
      if (registerResponse?.status == 200) {
        myToast(responseReg?.message, 'success', 'green');
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({type: REGISTER_USER_DETAILS, payload: responseReg});
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1610);
      } else {
        dispatch({type: AUTH_LOADING, payload: false});
        myToast(responseReg?.error, 'danger', 'red');
      }
    } catch (error) {
      dispatch({type: AUTH_LOADING, payload: false});
      myToast('Something Went Wrong!', 'danger', 'red');
    }
  };
};

//For ForgotPassword
export const handleForgotPassword = (data, navigation) => {
  console.log('DATA', data);
  return async dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    try {
      const forgotPassResponse = await fetch(
        `${BaseUrl}${EndPoints.forgotPassword}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data?.email,
          }),
        },
      );
      const responseForgotPass = await forgotPassResponse.json();
      console.log('responseForgotPass', responseForgotPass);
      if (forgotPassResponse?.status == 200) {
        myToast(responseForgotPass?.message, 'success', 'green');
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({type: FORGOT_PASSWORD, payload: responseForgotPass});
        setTimeout(() => {
          navigation.navigate('Otp', {email: data?.email});
        }, 1610);
      } else {
        dispatch({type: AUTH_LOADING, payload: false});
        myToast(responseForgotPass?.error, 'danger', 'red');
      }
    } catch (error) {
      dispatch({type: AUTH_LOADING, payload: false});
      myToast(
        'Something Went Wrong, Please Check it Again!!!',
        'danger',
        'red',
      );
    }
  };
};

//For Verify otp number
export const handleVerifyOtp = (data, navigation) => {
  const otpWithoutSpaces =
    (data?.email,
    data?.textInput1 + data?.textInput2 + data?.textInput3 + data?.textInput4);
  return async dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    try {
      const verifyResponse = await fetch(`${BaseUrl}${EndPoints.verifyOtp}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data?.email,
          otp: otpWithoutSpaces,
        }),
      });

      const responseVerifyOtp = await verifyResponse.json();
      console.log('response1', responseVerifyOtp);
      if (verifyResponse?.status == 200) {
        myToast(responseVerifyOtp?.message, 'success', 'green');
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({type: VERIFY_OTP, payload: responseVerifyOtp});
        setTimeout(() => {
          navigation.navigate('ResetPassword', {email: data?.email});
        }, 1610);
      } else {
        dispatch({type: AUTH_LOADING, payload: false});
        myToast(responseVerifyOtp?.message, 'danger', 'red');
      }
    } catch (error) {
      dispatch({type: AUTH_LOADING, payload: false});
      myToast('Something Went Wrong', 'danger', 'red');
    }
  };
};

//For Reset Password
export const handleResetPassword = (data, navigation) => {
  console.log('dataReset', data);
  return async dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    try {
      const resetPassResponse = await fetch(
        `${BaseUrl}${EndPoints.resetPassword}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data?.email,
            password: data?.password,
            passwordConf: data?.confirmPass,
          }),
        },
      );
      const responseResetPassword = await resetPassResponse.json();
      console.log('123', resetPassResponse);
      if (resetPassResponse?.status == 200) {
        myToast(responseResetPassword?.message, 'success', 'green');
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({type: RESET_PASSWORD, payload: responseResetPassword});
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1610);
      } else {
        dispatch({type: AUTH_LOADING, payload: false});
        myToast(responseResetPassword?.error, 'danger', 'red');
      }
    } catch (error) {
      dispatch({type: AUTH_LOADING, payload: false});
      myToast('Something Went Wrong', 'danger', 'red');
    }
  };
};

//For LogOut User from App
// export const handleLogOut = (navigation) => {
//   return async dispatch => {
//     try {
//       dispatch({ type: AUTH_LOADING, payload: true });
//       axios
//       .get(`${BaseUrl}${EndPoints.logOutUser}`)
//         .then(response => {
//           if (response?.status == 200) {
//           dispatch({type: LOGIN_USER_DETAILS, payload: []});
//           navigation.navigate('Login');
//                   await AsyncStorage.clear('user');
//                   dispatch({ type: AUTH_LOADING, payload: false });

//       })
//         .catch(err => {
//           console.log('error', err);
//           dispatch({type: AUTH_LOADING, payload: false});
//         });
//     } catch (error) {
//       dispatch({type: AUTH_LOADING, payload: false});
//     }
//   };
// };

export const handleLogOut = navigation => {
  console.log('navigation', navigation);
  return async dispatch => {
    try {
      dispatch({type: AUTH_LOADING, payload: true});
      axios
        .get(`${BaseUrl}${EndPoints.logOutUser}`)
        .then(response => {
          console.log('Response Status:', response);
          if (response?.status == 200) {
            myToast(response?.data?.message, 'success', 'green');
            dispatch({type: LOGOUT_USER, payload: []});
            // setTimeout(() => {
            //   navigation.navigate('Login');
            // }, 1610);
            AsyncStorage.clear();
            dispatch({type: AUTH_LOADING, payload: false});
          }
        })
        .catch(err => {
          console.log('err', err);
          dispatch({type: AUTH_LOADING, payload: false});
          myToast('Something Went Wrong !', 'danger', 'red');
        });
    } catch (error) {
      dispatch({type: AUTH_LOADING, payload: false});
      myToast('Something Went Wrong !', 'danger', 'red');
    }
  };
};
