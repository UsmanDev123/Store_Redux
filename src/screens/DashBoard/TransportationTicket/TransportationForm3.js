import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import Input from '../../../components/InputFields/Input';
import Button from '../../../components/Buttons/Button';
import {colors, sizes} from '../../../config/Extras';
import {windowHeight, windowWidth} from '../../../config/Dimensions';
import CalendarHeader from '../../../components/Headers/CalendarHeader';
import SelectImageModal from '../../../components/Modal/SelectImageModal';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '../../../components/Container/DateTimePicker';
import PopUpModal from '../../../components/Modal/PopUpModal';
import moment from 'moment';
import {formatSelectedDate, openCamera, openGallery} from '../../../config/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {useRef} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {handleTransportationData} from '../../../redux/actions/TransportationAction';
import CustomLoading from '../../../components/Container/CustomLoading';
import SignatureCapture from 'react-native-signature-capture';
import {handleSendPdfEmail} from '../../../redux/actions/RiggerTicketAction';
import {IS_MODAL} from '../../../redux/reducers/TransportationReducer';
import { accessCamera, accessGallery } from '../../../config/ImagePicker';

const TransportationForm3 = ({route}) => {
  const dispatch = useDispatch();
  const transUserData = useSelector(state => state?.transportationTickets);
  const userData = useSelector(state => state?.auth?.localStorageUser);
  const pdfLink = useSelector(state => transUserData?.generate_pdf?.pdfLink);

  const transportationData2 = route?.params?.transportationData2;

  const [data, setData] = useState({
    transportationData1: transportationData2?.transportationData1,
    transportationData2: transportationData2,
    shipperName: '',
    dateForShipper: '',
    timeInForShipper: '',
    timeOutForShipper: '',
    pickUpDriverName: '',
    dateForDriver: '',
    timeInForDriver: '',
    timeOutForDriver: '',
    customerName: '',
    customerEmail: '',
    dateForCustomer: '',
    timeInForCustomer: '',
    timeOutForCustomer: '',
  });

  console.log('allData---', data);

  const [selectImage, setSelectImage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isGallery, setIsGallery] = useState([]);


  const [isTimePickerTimeIn1, setTimePickerTimeIn1] = useState(false);
  const [TimeIn1SelectedTime, setTimeIn1SelectedTime] = useState();
  const [isTimePickerTimeOut1, setTimePickerTimeOut1] = useState(false);
  const [TimeOut1SelectedTime, setTimeOut1SelectedTime] = useState();
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState();

  const [isTimePickerTimeIn2, setTimePickerTimeIn2] = useState(false);
  const [TimeIn2SelectedTime, setTimeIn2SelectedTime] = useState();
  const [isTimePickerTimeOut2, setTimePickerTimeOut2] = useState(false);
  const [TimeOut2SelectedTime, setTimeOut2SelectedTime] = useState();
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState();

  const [isTimePickerTimeIn3, setTimePickerTimeIn3] = useState(false);
  const [TimeIn3SelectedTime, setTimeIn3SelectedTime] = useState();
  const [isTimePickerTimeOut3, setTimePickerTimeOut3] = useState(false);
  const [TimeOut3SelectedTime, setTimeOut3SelectedTime] = useState();
  const [isDatePickerVisible3, setDatePickerVisibility3] = useState(false);
  const [selectedDate3, setSelectedDate3] = useState();

  const [shipperSignature, setShipperSignature] = useState(null);
  const [driverSignature, setDriverSignature] = useState(null);
  const [customerSignature, setCustomerSignature] = useState(null);
  const signatureRef = useRef(null);
  const signatureRef1 = useRef(null);
  const signatureRef2 = useRef(null);

  const saveShipperSignature = result => {
    setShipperSignature(result?.pathName);
  };

  const saveDriverSignature = result1 => {
    setDriverSignature(result1?.pathName);
  };

  const saveCustomerSignature = result2 => {
    setCustomerSignature(result2?.pathName);
  };

  const resetShipperSign = () => {
    signatureRef.current.resetImage();
    setShipperSignature(null);
  };

  const resetDriverSign = () => {
    signatureRef1.current.resetImage();
    setDriverSignature(null);
  };

  const resetCustomerSign = () => {
    signatureRef2.current.resetImage();
    setCustomerSignature(null);
  };

  const openCamera = async () => {
    accessCamera().then(response => {
      if (isGallery.length + response?.assets.length <= 4) {
        setIsGallery([...isGallery, ...response?.assets]);
        setSelectImage(!selectImage);
      } else {
        Alert.alert(
          'Only select 4 images',
          'You have reached the maximum limit of 4 images.',
          [{text: 'OK', onPress: () => setSelectImage(!selectImage)}],
        );
      }
    });
  };
  
  const openGallery = async () => {
    try {
      const response = await accessGallery();
      if (isGallery.length + response?.assets.length <= 4) {
        setIsGallery([...isGallery, ...response?.assets]);
        setSelectImage(!selectImage);
      } else {
        Alert.alert(
          'Only select 4 images',
          'You have reached the maximum limit of 4 images.',
          [{text: 'OK', onPress: () => setSelectImage(!selectImage)}],
        );
      }
    } catch (error) {
      console.error('Error accessing gallery:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader IsImageShow={true} isShow={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <PopUpModal
          onPress={() => {
            const pdfData = {
              email: userData?.email,
              userId: userData?.userId,
              givenEmail: data?.customerEmail,
              filename: pdfLink.replace('/files/', ''),
            };
            dispatch(handleSendPdfEmail(pdfData, data?.customerEmail));
          }}
          modalVisible={transUserData?.checkIsModal}
          closeModal={() => {
            dispatch({type: IS_MODAL, payload: false});
          }}
          onButtonLabel={
            transUserData?.sendPdfLoader ? (
              <View>
                <CustomLoading size={27} />
              </View>
            ) : (
              'SEND TO EMAIL'
            )
          }
        />
        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Shipper Name</Text>
            <Input
              placeholderText={'Enter Shipper Name Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'shipperName'}
              value={data?.shipperName}
              onChangeText={text => {
                setData({...data, shipperName: text});
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Signature</Text>
            <SignatureCapture
              ref={signatureRef}
              style={[
                {
                  height: windowHeight * 0.23,
                  marginHorizontal: scale(12),
                },
              ]}
              onSaveEvent={saveShipperSignature}
              saveImageFileInExtStorage={true}
              showNativeButtons={false}
              showTitleLabel={true}
              viewMode={'portrait'}
              backgroundColor={colors.primary}
              minStrokeWidth={3}
              maxStrokeWidth={3}
              onDragEvent={res => {
                // console.log('resShipper===>', res);
                signatureRef.current.saveImage();
              }}
            />

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.buttonStyle1}
              onPress={() => {
                resetShipperSign();
              }}>
              <MaterialIcons
                name="delete"
                size={32}
                color={colors.white}
                resizeMode="contain"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.inputText}>Date</Text>
            <TouchableOpacity
              style={styles.pickerStyle}
              activeOpacity={0.5}
              onPress={() => {
                setDatePickerVisibility1(!isDatePickerVisible1);
              }}>
              <DateTimePicker
                isTrue={isDatePickerVisible1}
                selectMode="date"
                handleTimeConfirm={date => {
                  setSelectedDate1(date?.toString());
                  setData({...data, dateForShipper: date?.toString()});
                }}
                id={'dateForShipper'}
              />
              <Text style={styles.textBox}>
                {selectedDate1
                  ? formatSelectedDate(selectedDate1)
                  : 'Select Date Here'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginBottom: scale(20)}}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Time In</Text>
              <TouchableOpacity
                style={[styles.pickerStyle, {width: windowWidth * 0.4}]}
                activeOpacity={0.5}
                onPress={() => {
                  setTimePickerTimeIn1(!isTimePickerTimeIn1);
                }}>
                <DateTimePicker
                  isTrue={isTimePickerTimeIn1}
                  selectMode="time"
                  handleTimeConfirm={date => {
                    const formattedTime = moment(date).format('hh:mm A');
                    setTimeIn1SelectedTime(formattedTime);
                    setData({...data, timeInForShipper: formattedTime});
                  }}
                  id={'timeInForShipper'}
                />
                <Text style={styles.textBox}>
                  {!TimeIn1SelectedTime
                    ? 'Select Time In'
                    : TimeIn1SelectedTime}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Time Out</Text>
              <TouchableOpacity
                style={[
                  styles.pickerStyle,
                  {marginHorizontal: scale(3), width: windowWidth * 0.4},
                ]}
                activeOpacity={0.5}
                onPress={() => {
                  setTimePickerTimeOut1(!isTimePickerTimeOut1);
                }}>
                <DateTimePicker
                  isTrue={isTimePickerTimeOut1}
                  selectMode="time"
                  handleTimeConfirm={date => {
                    const formattedTime = moment(date).format('hh:mm A');
                    setTimeOut1SelectedTime(formattedTime);
                    setData({...data, timeOutForShipper: formattedTime});
                  }}
                  id={'timeOutForShipper'}
                />
                <Text style={styles.textBox}>
                  {!TimeOut1SelectedTime
                    ? 'Select Time Out'
                    : TimeOut1SelectedTime}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Pickup Driver Name *</Text>
            <Input
              placeholderText={'Enter Pickup Driver Name Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'driverName'}
              value={data?.pickUpDriverName}
              onChangeText={text => {
                setData({...data, pickUpDriverName: text});
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Signature</Text>
            <SignatureCapture
              ref={signatureRef1}
              style={[
                {
                  height: windowHeight * 0.23,
                  marginHorizontal: scale(12),
                },
              ]}
              onSaveEvent={saveDriverSignature}
              saveImageFileInExtStorage={true}
              showNativeButtons={false}
              showTitleLabel={true}
              viewMode={'portrait'}
              backgroundColor={colors.primary}
              minStrokeWidth={3}
              maxStrokeWidth={3}
              onDragEvent={res => {
                // console.log('RES===>', res);
                signatureRef1.current.saveImage();
              }}
            />

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.buttonStyle1}
              onPress={() => {
                resetDriverSign();
              }}>
              <MaterialIcons
                name="delete"
                size={32}
                color={colors.white}
                resizeMode="contain"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.inputText}>Date *</Text>
            <TouchableOpacity
              style={styles.pickerStyle}
              activeOpacity={0.5}
              onPress={() => {
                setDatePickerVisibility2(!isDatePickerVisible2);
              }}>
              <DateTimePicker
                isTrue={isDatePickerVisible2}
                selectMode="date"
                handleTimeConfirm={date => {
                  setSelectedDate2(date?.toString());
                  setData({...data, dateForDriver: date?.toString()});
                }}
                id={'dateForDriver'}
              />
              <Text style={styles.textBox}>
                {selectedDate2
                  ? formatSelectedDate(selectedDate2)
                  : 'Select Date Here'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginBottom: scale(20)}}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Time In *</Text>
              <TouchableOpacity
                style={[styles.pickerStyle, {width: windowWidth * 0.4}]}
                activeOpacity={0.5}
                onPress={() => {
                  setTimePickerTimeIn2(!isTimePickerTimeIn2);
                }}>
                <DateTimePicker
                  isTrue={isTimePickerTimeIn2}
                  selectMode="time"
                  handleTimeConfirm={date => {
                    const formattedTime = moment(date).format('hh:mm A');
                    setTimeIn2SelectedTime(formattedTime);
                    setData({...data, timeInForDriver: formattedTime});
                  }}
                  id={'timeInForDriver'}
                />
                <Text style={styles.textBox}>
                  {!TimeIn2SelectedTime
                    ? 'Select Time In'
                    : TimeIn2SelectedTime}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Time Out *</Text>
              <TouchableOpacity
                style={[
                  styles.pickerStyle,
                  {marginHorizontal: scale(3), width: windowWidth * 0.4},
                ]}
                activeOpacity={0.5}
                onPress={() => {
                  setTimePickerTimeOut2(!isTimePickerTimeOut2);
                }}>
                <DateTimePicker
                  isTrue={isTimePickerTimeOut2}
                  selectMode="time"
                  handleTimeConfirm={date => {
                    const formattedTime = moment(date).format('hh:mm A');
                    setTimeOut2SelectedTime(formattedTime);
                    setData({...data, timeOutForDriver: formattedTime});
                  }}
                  id={'timeOutForDriver'}
                />
                <Text style={styles.textBox}>
                  {!TimeOut2SelectedTime
                    ? 'Select Time Out'
                    : TimeOut2SelectedTime}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Customer Name *</Text>
            <Input
              placeholderText={'Enter Customer Name Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'customerName'}
              value={data?.customerName}
              onChangeText={text => {
                setData({...data, customerName: text});
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Customer Email *</Text>
            <Input
              placeholderText={'Enter Customer Email Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              keyboardType="email-address"
              id={'customerEmail'}
              value={data?.customerEmail}
              onChangeText={text => {
                setData({...data, customerEmail: text});
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Signature</Text>
            <SignatureCapture
              ref={signatureRef2}
              style={[
                {
                  height: windowHeight * 0.23,
                  marginHorizontal: scale(12),
                },
              ]}
              onSaveEvent={saveCustomerSignature}
              saveImageFileInExtStorage={true}
              showNativeButtons={false}
              showTitleLabel={true}
              viewMode={'portrait'}
              backgroundColor={colors.primary}
              minStrokeWidth={3}
              maxStrokeWidth={3}
              onDragEvent={res => {
                // console.log('RES===>', res);
                signatureRef2.current.saveImage();
              }}
            />

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.buttonStyle1}
              onPress={() => {
                resetCustomerSign();
              }}>
              <MaterialIcons
                name="delete"
                size={32}
                color={colors.white}
                resizeMode="contain"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.inputText}>Date *</Text>
            <TouchableOpacity
              style={styles.pickerStyle}
              activeOpacity={0.5}
              onPress={() => {
                setDatePickerVisibility3(!isDatePickerVisible3);
              }}>
              <DateTimePicker
                isTrue={isDatePickerVisible3}
                selectMode="date"
                handleTimeConfirm={date => {
                  setSelectedDate3(date?.toString());
                  setData({...data, dateForCustomer: date?.toString()});
                }}
                id={'dateForCustomer'}
              />
              <Text style={styles.textBox}>
                {selectedDate3
                  ? formatSelectedDate(selectedDate3)
                  : 'Select Date Here'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginBottom: scale(20)}}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Time In *</Text>
              <TouchableOpacity
                style={[styles.pickerStyle, {width: windowWidth * 0.4}]}
                activeOpacity={0.5}
                onPress={() => {
                  setTimePickerTimeIn3(!isTimePickerTimeIn3);
                }}>
                <DateTimePicker
                  isTrue={isTimePickerTimeIn3}
                  selectMode="time"
                  handleTimeConfirm={date => {
                    const formattedTime = moment(date).format('hh:mm A');
                    setTimeIn3SelectedTime(formattedTime);
                    setData({...data, timeInForCustomer: formattedTime});
                  }}
                  id={'timeInForCustomer'}
                />
                <Text style={styles.textBox}>
                  {!TimeIn3SelectedTime
                    ? 'Select Time In'
                    : TimeIn3SelectedTime}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Time Out *</Text>
              <TouchableOpacity
                style={[
                  styles.pickerStyle,
                  {marginHorizontal: scale(3), width: windowWidth * 0.4},
                ]}
                activeOpacity={0.5}
                onPress={() => {
                  setTimePickerTimeOut3(!isTimePickerTimeOut3);
                }}>
                <DateTimePicker
                  isTrue={isTimePickerTimeOut3}
                  selectMode="time"
                  handleTimeConfirm={date => {
                    const formattedTime = moment(date).format('hh:mm A');
                    setTimeOut3SelectedTime(formattedTime);
                    setData({...data, timeOutForCustomer: formattedTime});
                  }}
                  id={'timeOutForCustomer'}
                />
                <Text style={styles.textBox}>
                  {!TimeOut3SelectedTime
                    ? 'Select Time Out'
                    : TimeOut3SelectedTime}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.imageStyle}>
            <SelectImageModal
              modalVisible={selectImage}
              closeModal={() => {
                setSelectImage(!selectImage);
              }}
              onOpenCamera={openCamera}
              onOpenGallery={openGallery}
            />
            <TouchableOpacity
              style={styles.headerContainer}
              activeOpacity={0.4}
              onPress={() => {
                setSelectImage(!selectImage);
              }}>
              <Entypo
                name="attachment"
                size={24}
                color={colors.white}
                resizeMode="contain"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.iconText}>Upload Image</Text>
            </View>

            <View style={styles.logoContainer}>
              <View style={styles.imageContainer}>
                {isGallery.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      source={{uri: item?.uri}}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                  );
                })}
              </View>
            </View>
          </View>

        <View style={styles.stepperContainer}>
          <View style={styles.stepperStyle}></View>
          <View style={styles.stepperStyle}></View>
          <View style={styles.stepperStyle}></View>
        </View>

        <View style={styles.buttonStyle}>
          <Button
            textColor="white"
            btnLabel={
              transUserData?.transportationLoadingState ? (
                <View>
                  <CustomLoading size={27} />
                </View>
              ) : (
                'SAVE AS DRAFT'
              )
            }
            myStyle={{
              width: '55%',
              backgroundColor: colors.primary,
            }}
            txtStyle={{color: colors.primary1}}
            Press={() => {
              dispatch(
                handleTransportationData(
                  data,
                  shipperSignature,
                  driverSignature,
                  customerSignature,
                  true,
                  isGallery
                ),
              );
            }}
          />

          <Button
            textColor="white"
            btnLabel={
              transUserData?.transportationLoadingState ? (
                <View>
                  <CustomLoading size={27} />
                </View>
              ) : (
                'DONE'
              )
            }
            myStyle={{
              marginHorizontal: '2%',
            }}
            Press={() => {
              dispatch(
                handleTransportationData(
                  data,
                  shipperSignature,
                  driverSignature,
                  customerSignature,
                  false,
                  isGallery
                ),
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  inputText: {
    color: colors.black,
    fontSize: sizes.m15,
    marginHorizontal: scale(20),
    marginBottom: scale(8),
    fontFamily: 'JosefinSans-Regular',
  },

  cardContainer: {
    marginVertical: '5%',
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: sizes.m20,
    width: windowWidth * 0.92,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },

  inputContainer: {
    marginTop: '3%',
  },

  inputStyle: {
    marginHorizontal: scale(12),
    backgroundColor: colors.primary,
  },

  notesInput: {
    marginHorizontal: scale(12),
    paddingBottom: '20%',
    backgroundColor: colors.white,
    marginBottom: scale(20),
  },

  buttonStyle: {
    marginBottom: scale(20),
    flexDirection: 'row',
    alignSelf: 'center',
  },

  stepperStyle: {
    backgroundColor: colors.primary1,
    width: windowWidth * 0.25,
    padding: scale(4),
    borderRadius: sizes.m20,
    marginHorizontal: scale(5),
  },

  stepperContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: '12%',
  },

  imageStyle: {
    marginTop: '4%',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: sizes.m14,
    width: windowWidth * 0.92,
    marginBottom: scale(15),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(28),
  },

  headerContainer: {
    backgroundColor: colors.primary1,
    borderRadius: 45,
    width: scale(45),
    height: scale(45),
    justifyContent: 'center',
    alignSelf: 'center',
  },

  iconText: {
    color: colors.black,
    fontSize: sizes.m16,
    fontFamily: 'JosefinSans-Regular',
  },

  pickerStyle: {
    backgroundColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 14,
    borderColor: colors.primary1,
    paddingHorizontal: sizes.m10,
    marginHorizontal: scale(13),
    paddingVertical: scale(15),
  },

  textBox: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: sizes.m16,
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },

  buttonStyle1: {
    backgroundColor: colors.primary1,
    borderRadius: sizes.m14,
    alignSelf: 'flex-end',
    padding: sizes.m5,
    marginHorizontal: sizes.m15,
    marginTop: sizes.m14,
    borderWidth: 1,
    borderColor: colors.primary1,
  },

  logoContainer: {
    paddingTop: '4%',
  },

  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(8),
    justifyContent: 'center',
  },

  logo: {
    height: scale(55),
    width: scale(100),
    marginHorizontal: scale(5),
    marginBottom: scale(5),
  },
});

export default TransportationForm3;
