export const GET_CALENDER_DATA = 'GET_JOBS_DATA';
export const IS_CALENDER_DATA_LOADING = 'IS_CALENDER_DATA_LOADING';
export const UPDATE_STATUS_CODE = 'UPDATE_STATUS_CODE';
export const IS_STATUS_CODE_UPDATING = 'IS_STATUS_CODE_UPDATING';
export const MONTH_NAME = 'MONTH_NAME';
export const CHECK_IS_MODAL = 'CHECK_IS_MODAL';

const initial_state = {
  calendersData: [],
  isLoadingState: false,
  updateStatusCode: [],
  isStatusCodeUpdate: false,
  monthName: undefined,
  isModal: false,
};

const CalenderReducer = (state = initial_state, action) => {
  switch (action.type) {
    case IS_CALENDER_DATA_LOADING:
      return {
        ...state,
        isLoadingState: action.payload,
      };
    case GET_CALENDER_DATA:
      return {
        ...state,
        calendersData: action.payload,
      };
    case UPDATE_STATUS_CODE:
      return {
        ...state,
        updateStatusCode: action.payload,
      };
    case IS_STATUS_CODE_UPDATING:
      return {
        ...state,
        isStatusCodeUpdate: action.payload,
      };
    case MONTH_NAME:
      return {
        ...state,
        monthName: action.payload,
      };
    case CHECK_IS_MODAL:
      return {
        ...state,
        isModal: action.payload,
      };
    default:
      return state;
  }
};

export default CalenderReducer;
