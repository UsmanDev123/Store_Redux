import {BaseUrl, EndPoints} from '../../Utils/Api';
import {
  GET_CALENDER_DATA,
  IS_CALENDER_DATA_LOADING,
  IS_STATUS_CODE_UPDATING,
  MONTH_NAME,
} from '../reducers/CalenderReducers';
import axios from 'axios';
import {myToast} from '../../components/Container/Toast';

export const handleCalenderData = data => {
  return dispatch => {
    const newApi =
    data == undefined
        ? `${BaseUrl}${EndPoints.getAllJobs}`
        : `${BaseUrl}${EndPoints.getAllJobs}?jobDate=${data}`;
    try {
      dispatch({type: IS_CALENDER_DATA_LOADING, payload: true});
      axios
        .get(newApi)
        .then(response => {
          console.log('-->',response);
          dispatch({type: IS_CALENDER_DATA_LOADING, payload: false});
          dispatch({type: GET_CALENDER_DATA, payload: response?.data});
        })
        .catch(err => {
          console.log('error', err);
          dispatch({type: IS_CALENDER_DATA_LOADING, payload: false});
        });
    } catch (error) {
      dispatch({type: IS_CALENDER_DATA_LOADING, payload: false});
    }
  };
};

export const handleUpdateStatusCode = (jobId, newStatusCode, setState) => {
  console.log('setState', setState)
  return async dispatch => {
    dispatch({type: IS_STATUS_CODE_UPDATING, payload: true});
    try {
      const updateStatusCodeResponse = await fetch(
        `${BaseUrl}${EndPoints.jobUpdate}/${jobId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
          },
          body: JSON.stringify({
            statusCode: newStatusCode,
          }),
        },
      );
      const responseJson = await updateStatusCodeResponse.json();
      if (updateStatusCodeResponse.status == 200) {
        dispatch({type: IS_STATUS_CODE_UPDATING, payload: false});
        setState(false);
        setTimeout(() => {
          myToast(responseJson?.message, 'success', 'green');
        }, 2000);
        dispatch(handleCalenderData());
      } else {
        dispatch({type: IS_STATUS_CODE_UPDATING, payload: false});
        myToast('Something Went Wrong', 'danger', 'red');
      }
    } catch (error) {
      console.log('sss', error?.message);
      myToast('Something Went Wrong', 'danger', 'red');
      dispatch({type: IS_STATUS_CODE_UPDATING, payload: false});
    }
  };
};

export const hanldeMonthName = item => {
  return dispatch => {
    dispatch({type: MONTH_NAME, payload: item});
  };
};
