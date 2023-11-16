import axios from 'axios';
import {BaseUrl, EndPoints} from '../../Utils/Api';
import {myToast} from '../../components/Container/Toast';
import {
  GENERATING_PDF,
  GET_JOBS,
  IS_MODAL,
  PAY_DUTY,
  PAY_DUTY_DATA,
  PDF_LOADER,
  SEND_PDF_TO_MAIL,
  TICKETS,
  TICKET_LOADING,
} from '../reducers/RiggerTicketReducer';

//Rigger Ticket Form Action
export const handleRiggerTicket = (
  data,
  payDutyVal,
  images,
  signature,
  payDutyData,
) => {
  const sign = {
    uri: 'file://' + signature,
    type: 'image/png',
    name: 'signature.png',
  };
  console.log('images', images)

  return async dispatch => {
    const formData = new FormData();
    formData.append('userId', data?.userId);
    formData.append('jobId', data?.selectedJobId);
    formData.append('specificationsAndRemarks', data?.specificationsAndRemarks);
    formData.append('customer', data?.customerName);
    formData.append('location', data?.location);
    formData.append('poNumber', data?.poNumber);
    formData.append('date', data?.date);
    formData.append('startJob', data?.startJob);
    formData.append('arrivalYard', data?.arrivalYard);
    formData.append('travelTime', data?.travelTime);
    formData.append('totalHours', data?.totalHours);
    formData.append('rating', data?.rating);
    formData.append('operation', data?.operation);
    formData.append('notesOthers', data?.otherNotes);
    formData.append('leaveYard', data?.leaveYard);
    formData.append('emailAddress', data?.emailAddress);
    formData.append('finishJob', data?.finishJob);
    formData.append('lunch', data?.lunch);
    formData.append('craneTime', data?.craneTime);
    formData.append('craneNumber', data?.craneNumber);
    formData.append('boomLength', data?.boomLength);
    formData.append('otherEquipment', data?.otherEquipment);
    formData.append('isPayDuty', payDutyVal);
    formData.append('signature', sign);
    images?.map(item => {
      console.log('item', item)
      return formData.append('imageFiles', item?.uri, item?.fileName);
    });
    try {
      dispatch({type: TICKET_LOADING, payload: true});
      const riggerTicketResponse = await fetch(
        `${BaseUrl}${EndPoints.riggerTicket}`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const ticketPostResponse = await riggerTicketResponse.json();
      console.log('ticketPostResponse===>', ticketPostResponse);
      console.log('riggerTicketResponse===>', riggerTicketResponse);

      if (riggerTicketResponse.status == 201) {
        if (payDutyVal) {
          dispatch(handlePayDuty(payDutyData, ticketPostResponse));
        } else {
          myToast('Added Successfully! Generating Pdf', 'success', 'green');
          dispatch({type: TICKETS, payload: ticketPostResponse});
          const genereData = {
            'Specifications And Remarks':
              ticketPostResponse?.specificationsAndRemarks,
            Customer: ticketPostResponse?.customer,
            Location: ticketPostResponse?.location,
            'PO. Number': ticketPostResponse?.poNumber,
            Date: ticketPostResponse?.date,
            'Start Job': ticketPostResponse?.startJob,
            'Arrival Yard': ticketPostResponse?.arrivalYard,
            'Travel Time': ticketPostResponse?.travelTime,
            'Total Hours': ticketPostResponse?.totalHours,
            Rating: ticketPostResponse?.rating,
            Operator: ticketPostResponse?.operation,
            'Other Notes': ticketPostResponse?.notesOthers,
            'Leave Yard': ticketPostResponse?.leaveYard,
            Email: ticketPostResponse?.emailAddress,
            'Finish Job': ticketPostResponse?.finishJob,
            Lunch: ticketPostResponse?.lunch,
            'Crane Time': ticketPostResponse?.craneTime,
            'Crane Number': ticketPostResponse?.craneNumber,
            'Boom Length': ticketPostResponse?.boomLength,
            'Other Equipment': ticketPostResponse?.otherEquipment,
            imagePaths: [
              ticketPostResponse?.signature
                ? ticketPostResponse?.signature
                : 'sign.jpg',
            ],
            imageNames: ['Customer Signature'],
            // 'Pay Duty': ticketPostResponse?.isPayDuty ? 'YES' : 'No',
            formtype: 'Rigger',
            jobId: ticketPostResponse?.jobId,
            userId: ticketPostResponse?.userId,
          };

          dispatch(handleGeneratingPDF(genereData));
        }
      } else {
        dispatch({type: TICKET_LOADING, payload: false});
        myToast(ticketPostResponse?.error, 'danger', 'red');
      }
    } catch (error) {
      console.log('err', error)
      dispatch({type: TICKET_LOADING, payload: false});
      myToast('Something Went Wrong', 'danger', 'red');
    }
  };
};

//GENERATING PDF
export const handleGeneratingPDF = data => {
  console.log('3-------->', data);
  return async dispatch => {
    try {
      const pdfResponse = await fetch(`${BaseUrl}${EndPoints.generatePDF}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const pdfLink = await pdfResponse.json();
      console.log('4', pdfLink);
      if (pdfResponse?.status == 200) {
        setTimeout(() => {
          dispatch({type: IS_MODAL, payload: true});
        }, 1510);
        dispatch({type: TICKET_LOADING, payload: false});
        dispatch({type: GENERATING_PDF, payload: pdfLink});
      } else {
        dispatch({type: TICKET_LOADING, payload: false});
      }
    } catch (error) {
      dispatch({type: TICKET_LOADING, payload: false});
      myToast('Something Went Wrong', 'danger', 'red');
    }
  };
};

//SEND PDF TO EMAIL

export const handleSendPdfEmail = data => {
  console.log('sendToEmail===>', data);
  return async dispatch => {
    dispatch({type: PDF_LOADER, payload: true});
    try {
      const sendToEmailResponse = await fetch(
        `${BaseUrl}${EndPoints.sendPdfToMail}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
          },

          body: JSON.stringify(data),
        },
      );
      const responseEmail = await sendToEmailResponse.json();
      console.log('pdfResponse', responseEmail);
      if (sendToEmailResponse?.status == 200) {
        dispatch({type: TICKET_LOADING, payload: false});
        dispatch({type: PDF_LOADER, payload: false});
        dispatch({type: SEND_PDF_TO_MAIL, payload: responseEmail});
        dispatch({type: IS_MODAL, payload: false});
        setTimeout(() => {
          myToast(responseEmail?.message, 'success', 'green');
        }, 40);
      } else {
        dispatch({type: TICKET_LOADING, payload: false});
        dispatch({type: PDF_LOADER, payload: false});
        myToast(responseEmail?.error, 'danger', 'red');
      }
    } catch (error) {
      dispatch({type: TICKET_LOADING, payload: false});
      dispatch({type: PDF_LOADER, payload: false});
      myToast('Something Went Wrong!', 'danger', 'red');
    }
  };
};

//Get Jobs Action

export const handleGetJobs = () => {
  return dispatch => {
    try {
      dispatch({type: TICKET_LOADING, payload: true});
      axios
        .get(`${BaseUrl}${EndPoints.getAllJobs}`)
        .then(response => {
          dispatch({type: TICKET_LOADING, payload: false});
          dispatch({type: GET_JOBS, payload: response?.data});
        })
        .catch(err => {
          console.log('error', err);
          dispatch({type: TICKET_LOADING, payload: false});
        });
    } catch (error) {
      dispatch({type: TICKET_LOADING, payload: false});
    }
  };
};

//Pay Duty Form Action

export const handlePayDuty = (data, ticketPostResponse) => {
  const sign = {
    uri: 'file://' + data?.OfficerSignature,
    type: 'image/png',
    name: 'signature.png',
  };
  return async dispatch => {
    const formData = new FormData();
    formData.append('userId', data?.userId);
    formData.append('riggerId', ticketPostResponse?._id);
    formData.append('date', data?.date);
    formData.append('location', data?.location);
    formData.append('startTime', data?.startTime);
    formData.append('finishTime', data?.finishTime);
    formData.append('totalHours', data?.totalHours);
    formData.append('officer', data?.officer);
    formData.append('officerName', data?.officerName);
    formData.append('division', data?.division);
    formData.append('emailAddress', data?.emailAddress);
    formData.append('signature', sign);
    try {
      dispatch({type: TICKET_LOADING, payload: true});
      const payDutyResponse = await fetch(`${BaseUrl}${EndPoints.payDuty}`, {
        method: 'POST',
        body: formData,
      });
      const responseDuty = await payDutyResponse.json();
      console.log('1-------->', responseDuty);
      if (payDutyResponse.status == 201) {
        myToast('Added Successfully! Generating Pdf', 'success', 'green');
        dispatch({type: PAY_DUTY, payload: responseDuty});
        const generateBothData = {
          formtype: 'Rigger',
          'Specifications And Remarks':
            ticketPostResponse?.specificationsAndRemarks,
          Customer: ticketPostResponse?.customer,
          Location: ticketPostResponse?.location,
          'PO. Number': ticketPostResponse?.poNumber,
          Date: ticketPostResponse?.date,
          'Start Job': ticketPostResponse?.startJob,
          'Arrival Yard': ticketPostResponse?.arrivalYard,
          'Travel Time': ticketPostResponse?.travelTime,
          'Total Hours': ticketPostResponse?.totalHours,
          Rating: ticketPostResponse?.rating,
          Operator: ticketPostResponse?.operation,
          'Other Notes': ticketPostResponse?.notesOthers,
          'Leave Yard': ticketPostResponse?.leaveYard,
          Email: ticketPostResponse?.emailAddress,
          'Finish Job': ticketPostResponse?.finishJob,
          Lunch: ticketPostResponse?.lunch,
          'Crane Time': ticketPostResponse?.craneTime,
          'Crane Number': ticketPostResponse?.craneNumber,
          'Boom Length': ticketPostResponse?.boomLength,
          'Other Equipment': ticketPostResponse?.otherEquipment,
          jobId: ticketPostResponse?.jobId,
          userId: ticketPostResponse?.userId,

          formtype1: 'Pay Duty',
          'Date For Pay Duty': responseDuty?.date,
          Division: responseDuty?.division,
          'Email For Pay Duty': responseDuty?.emailAddress,
          'Finish Time For Pay Duty': responseDuty?.finishTime,
          'Location For PayDuty': responseDuty?.location,
          Officer: responseDuty?.officer,
          'Officer Name': responseDuty?.officerName,
          'Start Time For PayDuty': responseDuty?.startTime,
          'Total Hours For PayDuty': responseDuty?.totalHours,
          imageNames: ['Customer Signature'],
          imageNames: ['Officer Signature'],
          imagePaths: [
            ticketPostResponse?.signature
              ? ticketPostResponse?.signature
              : 'sign.jpg',
          ],
          imagePaths: [
            responseDuty?.signature ? responseDuty?.signature : 'sign.jpg',
          ],
        };
        dispatch(handleGeneratingPDF(generateBothData));
      } else {
        dispatch({type: TICKET_LOADING, payload: false});
        myToast(responseDuty?.message, 'danger', 'red');
      }
    } catch (error) {
      dispatch({type: TICKET_LOADING, payload: false});
      myToast('Something Went Wrong!', 'danger', 'red');
    }
  };
};

//Pay Duty Data

export const handlePayDutyData = data => {
  return dispatch => {
    dispatch({type: PAY_DUTY_DATA, payload: data});
  };
};
