export const TRANSPORTATION_LOADING = 'TRANSPORTATION_LOADING';
export const TRANSPORTATION_TICKET = 'TRANSPORTATION_TICKET';
export const IS_DRAFT = 'IS_DRAFT';
export const IS_MODAL = 'IS_MODAL';
export const PDF_LOADER = 'PDF_LOADER';
export const GENERATING_PDF = 'GENERATING_PDF';

const initial_state = {
  transportationLoadingState: false,
  transportationTicket: [],
  checkIsDraft: false,
  checkIsModal: false,
  sendPdfLoader: false,
  generate_pdf: [],
};

const TransportationReducer = (state = initial_state, action) => {
  switch (action.type) {
    case TRANSPORTATION_LOADING:
      return {
        ...state,
        transportationLoadingState: action.payload,
      };
    case TRANSPORTATION_TICKET:
      return {
        ...state,
        transportationTicket: action.payload,
      };
    case IS_DRAFT:
      return {
        ...state,
        checkIsDraft: action.payload,
      };
    case IS_MODAL:
      return {
        ...state,
        checkIsModal: action.payload,
      };
    case PDF_LOADER:
      return {
        ...state,
        sendPdfLoader: action.payload,
      };
    case GENERATING_PDF:
      return {
        ...state,
        generate_pdf: action.payload,
      };
    default:
      return state;
  }
};

export default TransportationReducer;
