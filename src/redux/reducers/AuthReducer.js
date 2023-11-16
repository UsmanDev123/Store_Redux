export const AUTH_LOADING = 'AUTH_LOADING';
export const LOGIN_USER_DETAILS = 'LOGIN_USER_DETAILS';
export const REGISTER_USER_DETAILS = 'REGISTER_USER_DETAILS';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const VERIFY_OTP = 'VERIFY_OTP';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOCAL_DATA = 'LOCAL_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';

const initial_state = {
  authLoadingState: false,
  userDetails: [],
  registerUser: [],
  forgotPassword: [],
  verifyOtp: [],
  resetPassword: [],
  localStorageUser: [],
  logOutUser: [],
};

const AuthReducer = (state = initial_state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        authLoadingState: action.payload,
      };
    case LOGIN_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case REGISTER_USER_DETAILS:
      return {
        ...state,
        registerUser: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
      };
    case VERIFY_OTP:
      return {
        ...state,
        verifyOtp: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    case LOCAL_DATA:
      return {
        ...state,
        localStorageUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        logOutUser: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
