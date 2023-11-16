export const TICKET_LOADING = 'TICKET_LOADING';
export const TICKETS = 'TICKETS';
export const GET_JOBS = 'GET_JOBS';
export const PAY_DUTY = 'PAY_DUTY';
export const IS_MODAL = 'IS_MODAL';
export const GENERATING_PDF = 'GENERATING_PDF';
export const SEND_PDF_TO_MAIL = 'SEND_PDF_TO_MAIL';
export const PDF_LOADER = 'PDF_LOADER';
export const PAY_DUTY_DATA = 'PAY_DUTY_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

const initial_state = {
  riggerTicket: [],
  ticketLoadingState: false,
  getJobs: [],
  payDutyOfficer: [],
  isModalCheck: false,
  generate_pdf: [],
  sendToMail: [],
  sendPdfLoader: false,
  payDutyData: [],
  clearData: [],
};

const RiggerTicketReducer = (state = initial_state, action) => {
  switch (action.type) {
    case TICKET_LOADING:
      return {
        ...state,
        ticketLoadingState: action.payload,
      };

    case TICKETS:
      return {
        ...state,
        riggerTicket: action.payload,
      };

    case GET_JOBS:
      return {
        ...state,
        getJobs: action.payload,
      };

    case PAY_DUTY:
      return {
        ...state,
        payDutyOfficer: action.payload,
      };

    case IS_MODAL:
      return {
        ...state,
        isModalCheck: action.payload,
      };
    case GENERATING_PDF:
      return {
        ...state,
        generate_pdf: action.payload,
      };
    case SEND_PDF_TO_MAIL:
      return {
        ...state,
        sendToMail: action.payload,
      };
    case PDF_LOADER:
      return {
        ...state,
        sendPdfLoader: action.payload,
      };
    case PAY_DUTY_DATA:
      return {
        ...state,
        payDutyData: action.payload,
      };
    case CLEAR_DATA:
      return {
        ...state,
        clearData: action.payload,
      };
    default:
      return state;
  }
};

export default RiggerTicketReducer;
