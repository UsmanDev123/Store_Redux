import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import RiggerTicketReducer from "./RiggerTicketReducer";
import TransportationReducer from "./TransportationReducer";
import CalenderReducer from "./CalenderReducers";

export default combineReducers({
    auth: AuthReducer,
    riggerTickets : RiggerTicketReducer,
    transportationTickets: TransportationReducer,
    calender:CalenderReducer,
})