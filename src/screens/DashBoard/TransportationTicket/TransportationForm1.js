import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {colors, sizes} from '../../../config/Extras';
import {windowWidth} from '../../../config/Dimensions';
import Input from '../../../components/InputFields/Input';
import Button from '../../../components/Buttons/Button';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '../../../components/Container/DateTimePicker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

const TransportationForm1 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userIdForTrans = useSelector(state => state?.auth);

  const [data, setData] = useState({
    userId: userIdForTrans?.localStorageUser?.userId,
    pickupAddress: '',
    billingAddress: '',
    timeInForTrans: '',
    timeOutForTrans: '',
    notes: '',
  });

  const [isTimePickerTimeIn, setTimePickerTimeIn] = useState(false);
  const [TimeInSelectedTime, setTimeInSelectedTime] = useState();
  const [isTimePickerTimeOut, setTimePickerTimeOut] = useState(false);
  const [TimeOutSelectedTime, setTimeOutSelectedTime] = useState();
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Pickup Address *</Text>
          <Input
            placeholderText={'Enter Pickup Address Here'}
            myStyle={styles.inputStyle}
            isIconShow={false}
            txtStyle={{width: '100%'}}
            style={{color: colors.black}}
            id={'pickUpAddress'}
            value={data?.pickupAddress}
            onChangeText={text => {
              setData({...data, pickupAddress: text});
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Delivery Address *</Text>
          <Input
            placeholderText={'Enter Delivery Address Here'}
            myStyle={styles.inputStyle}
            isIconShow={false}
            txtStyle={{width: '100%', color: colors.black}}
            id={'billingAddress'}
            value={data?.billingAddress}
            onChangeText={text => {
              setData({...data, billingAddress: text});
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Time In</Text>
            <TouchableOpacity
              style={styles.pickerStyle}
              activeOpacity={0.5}
              onPress={() => {
                setTimePickerTimeIn(!isTimePickerTimeIn);
              }}>
              <DateTimePicker
                isTrue={isTimePickerTimeIn}
                selectMode="time"
                handleTimeConfirm={date => {
                  const formattedTime = moment(date).format('hh:mm A');
                  setTimeInSelectedTime(formattedTime);
                  setData({...data, timeInForTrans: formattedTime});
                }}
                id={'timeIn'}
              />
              <Text style={styles.textBox}>
                {!TimeInSelectedTime ? 'Select Time In' : TimeInSelectedTime}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Time Out</Text>
            <TouchableOpacity
              style={[styles.pickerStyle, {marginHorizontal: scale(3)}]}
              activeOpacity={0.5}
              onPress={() => {
                setTimePickerTimeOut(!isTimePickerTimeOut);
              }}>
              <DateTimePicker
                isTrue={isTimePickerTimeOut}
                selectMode="time"
                handleTimeConfirm={date => {
                  const formattedTime = moment(date).format('hh:mm A');
                  setTimeOutSelectedTime(formattedTime);
                  setData({...data, timeOutForTrans: formattedTime});
                }}
                id={'timeOut'}
              />
              <Text style={styles.textBox}>
                {!TimeOutSelectedTime ? 'Select Time Out' : TimeOutSelectedTime}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Notes</Text>
          <Input
            placeholderText={'Type a notes..........'}
            myStyle={styles.notesInput}
            isIconShow={false}
            txtStyle={{width: '100%'}}
            isMultiLineTrue={true}
            id={'notes'}
            value={data?.notes}
            onChangeText={text => {
              setData({...data, notes: text});
            }}
          />
        </View>
      </View>

      <View style={styles.stepperContainer}>
        <View style={styles.stepperStyle}></View>
        <View style={styles.stepperStyle1}></View>
        <View style={styles.stepperStyle1}></View>
      </View>

      <View style={{marginBottom: scale(20)}}>
        <Button
          style={styles.button}
          textColor="white"
          btnLabel="NEXT"
          Press={() => {
            if (data?.pickupAddress && data?.billingAddress) {
              navigation.navigate('TransportationForm2', {
                transportationData: data,
              });
            } else {
              Alert.alert('Pickup Address & Delivery Address are Required');
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputText: {
    color: colors.black,
    fontSize: sizes.m15,
    marginHorizontal: scale(20),
    marginBottom: scale(8),
    fontFamily: 'JosefinSans-Regular',
  },

  cardContainer: {
    marginTop: '4%',
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
    backgroundColor: colors.primary,
    marginBottom: scale(20),
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

  stepperStyle1: {
    backgroundColor: '#eee',
    width: windowWidth * 0.25,
    padding: scale(4),
    borderRadius: sizes.m20,
    marginHorizontal: scale(5),
  },

  pickerStyle: {
    backgroundColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 14,
    borderColor: colors.primary1,
    paddingHorizontal: sizes.m10,
    marginHorizontal: scale(13),
    paddingVertical: scale(15),
    width: windowWidth * 0.4,
  },

  textBox: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: sizes.m16,
    color: colors.black,
    fontWeight: '600',
    // width: '95%',
    textAlign: 'center',
  },
});

export default TransportationForm1;
