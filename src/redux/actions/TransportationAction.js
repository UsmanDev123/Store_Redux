import {BaseUrl, EndPoints} from '../../Utils/Api';
import {myToast} from '../../components/Container/Toast';
import {
  TRANSPORTATION_LOADING,
  TRANSPORTATION_TICKET,
} from '../reducers/TransportationReducer';
import {handleGeneratingPDF} from './RiggerTicketAction';

//Transportation Ticket Form
export const handleTransportationData = (
  data,
  shipperSignature,
  customerSignature,
  driverSignature,
  isDraft,
  images
) => {
  const shipperSign = {
    uri: 'file://' + shipperSignature,
    type: 'image/png',
    name: 'signature.png',
  };
  const customerSign = {
    uri: 'file://' + customerSignature,
    type: 'image/png',
    name: 'signature.png',
  };
  const driverSign = {
    uri: 'file://' + driverSignature,
    type: 'image/png',
    name: 'signature.png',
  };
  console.log('images', images)
  console.log('sign1', shipperSign)

  return async dispatch => {
    // const isDraft =
    //   shipperSignature || customerSignature || driverSignature ? true : false;
    //   console.log('isdRFAT', isDraft)
    const formData = new FormData();
    formData.append('userId', data?.transportationData1?.userId);
    formData.append('jobId', data?.transportationData2?.selectedJobId);
    formData.append('jobNumber', data?.transportationData2?.jobNumber);
    formData.append('pickupAddress', data?.transportationData1?.pickupAddress);
    formData.append(
      'billingAddress',
      data?.transportationData1?.billingAddress,
    );
    formData.append(
      'timeInfortrans',
      data?.transportationData1?.timeInForTrans,
    );
    formData.append(
      'timeOutfortrans',
      data?.transportationData1?.timeOutForTrans,
    );
    formData.append('notes', data?.transportationData1?.notes);
    formData.append(
      'specialInstructionsforjob',
      data?.transportationData2?.specialInstructionsForJob,
    );
    formData.append('poNumber', data?.transportationData2?.poNumber);
    formData.append(
      'specialInstructionsforpo',
      data?.transportationData2?.specialInstructionsForPO,
    );
    formData.append(
      'siteContactName',
      data?.transportationData2?.siteContactName,
    );
    formData.append(
      'specialInstructionsforconName',
      data?.transportationData2?.specialInstructionsForConName,
    );
    formData.append(
      'siteContactNumber',
      data?.transportationData2?.siteContactNumber,
    );
    formData.append(
      'specialInstructionsforconNo',
      data?.transportationData2?.specialInstructionsForConNo,
    );
    formData.append('shipperName', data?.shipperName);
    formData.append('signatureforshipper', shipperSign);
    formData.append('dateforshipper', data?.dateForShipper);
    formData.append('timeInforshipper', data?.timeInForShipper);
    formData.append('timeOutforshipper', data?.timeOutForShipper);
    formData.append('pickUpDriverName', data?.pickUpDriverName);
    formData.append('signaturefordriver', driverSign);
    formData.append('datefordriver', data?.dateForDriver);
    formData.append('timeInfordriver', data?.timeInForDriver);
    formData.append('timeOutfordriver', data?.timeOutForDriver);
    formData.append('customerName', data?.customerName);
    formData.append('customerEmail', data?.customerEmail);
    formData.append('signatureforcustomer', customerSign);
    formData.append('dateforcustomer', data?.dateForCustomer);
    formData.append('timeInforcustomer', data?.timeInForCustomer);
    formData.append('timeOutforcustomer', data?.timeOutForCustomer);
    formData.append('isDraft', isDraft);
    images?.map(item => {
      console.log('itemImages',item)
      return formData.append('imageFiles', item?.uri, item?.fileName);
    });
    try {
      dispatch({type: TRANSPORTATION_LOADING, payload: true});
      const transportationTicketResponse = await fetch(
        `${BaseUrl}${EndPoints.transportationTicket}`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const responseTrans = await transportationTicketResponse.json();
      console.log('responseTrans1', responseTrans);
      console.log('responseTrans2', transportationTicketResponse);
      if (transportationTicketResponse?.status == 201) {
        if (isDraft == false) {
          myToast('Added Successfully! Generating Pdf', 'success', 'green');
          dispatch({type: TRANSPORTATION_LOADING, payload: false});
          dispatch({type: TRANSPORTATION_TICKET, payload: responseTrans});
          const dataForPdf = {
            formtype: 'Transportation',
            userId: responseTrans?.userId,
            jobId: responseTrans?.jobId,
            PickupAddress: responseTrans?.pickupAddress,
            BillingAddress: responseTrans?.billingAddress,
            TimeInForTransportation: responseTrans?.timeInfortrans,
            TimeOutForTransportation: responseTrans?.timeOutfortrans,
            Notes: responseTrans?.notes,
            SpecialInstructionsForJob: responseTrans?.specialInstructionsforjob,
            PoNumber: responseTrans?.poNumber,
            SpecialInstructionsForPO: responseTrans?.specialInstructionsforpo,
            SiteContactName: responseTrans?.siteContactName,
            SpecialInstructionsForContactName:
              responseTrans?.specialInstructionsforconName,
            SiteContactNumber: responseTrans?.siteContactNumber,
            SpecialInstructionsForConNo:
              responseTrans?.specialInstructionsforconNo,
            ShipperName: responseTrans?.shipperName,
            DateForShipper: responseTrans?.dateforshipper,
            TimeInForShipper: responseTrans?.timeInforshipper,
            TimeOutForShipper: responseTrans?.timeOutforshipper,
            PickUpDriverName: responseTrans?.pickUpDriverName,
            DateForDriver: responseTrans?.datefordriver,
            TimeInForDriver: responseTrans?.timeInfordriver,
            TimeOutForDriver: responseTrans?.timeOutfordriver,
            CustomerName: responseTrans?.customerName,
            CustomerEmail: responseTrans?.customerEmail,
            DateForCustomer: responseTrans?.dateforcustomer,
            TimeInForCustomer: responseTrans?.timeInforcustomer,
            TimeOutForCustomer: responseTrans?.timeOutforcustomer,
            imagePaths: [
              responseTrans?.signatureforshipper
                ? responseTrans?.signatureforshipper
                : 'sign.jpg',
            ],
            imageNames: ['Shipper Signature'],
          };
          dispatch(handleGeneratingPDF(dataForPdf));
        } else {
          myToast('Successfully Saved As Draft !', 'success', 'green');
          dispatch({type: TRANSPORTATION_LOADING, payload: false});
        }
      } else {
        dispatch({type: TRANSPORTATION_LOADING, payload: false});
        myToast(responseTrans?.error, 'danger', 'red');
      }
    } catch (error) {
      console.log('err', error);
      dispatch({type: TRANSPORTATION_LOADING, payload: false});
      myToast('Something Went Wrong', 'danger', 'red');
    }
  };
};
