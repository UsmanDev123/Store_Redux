import {View, Text, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import Input from '../../../components/InputFields/Input';
import Button from '../../../components/Buttons/Button';
import {colors, sizes} from '../../../config/Extras';
import {windowWidth} from '../../../config/Dimensions';
import CalendarHeader from '../../../components/Headers/CalendarHeader';
import {useNavigation} from '@react-navigation/native';
import CustomDropDown from '../../../components/DropDown/CustomDropDown';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';

const TransportationForm2 = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const transportationData = route?.params?.transportationData
  const userJobNumber = useSelector(state => state?.riggerTickets);

  const [data, setData] = useState({
    transportationData1: transportationData, 
    selectedJobId: '',
    jobNumber: '',
    specialInstructionsForJob: '',
    poNumber: '',
    specialInstructionsForPO: '',
    siteContactName: '',
    specialInstructionsForConName: '',
    siteContactNumber: '',
    specialInstructionsForConNo: '',
  });


  const jobNumbers = userJobNumber?.getJobs?.map(item => ({
    label: item?.jobNumber?.toString(),
    value: item?.jobNumber?.toString(),
    jobID: item?.jobId?.toString(),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader IsImageShow={true} isShow={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Job Number *</Text>
            <CustomDropDown
              value={data?.jobNumber}
              onselect={e => {
                const selectedJobID = jobNumbers.find(
                  item => item.jobID === e.jobID,
                )?.jobID;
                setData({
                  ...data,
                  jobNumber: e.value,
                  selectedJobId: selectedJobID,
                });
              }}
              data={jobNumbers}
              placeholderName={
                data?.jobNumber ? data?.jobNumber : 'Select Job Number'
              }
              colorName={colors.primary}
            />
          </View>
          <View style={[styles.inputContainer, {marginBottom: scale(20)}]}>
            <Text style={styles.inputText}>Special Instructions</Text>
            <Input
              placeholderText={'Enter Special Instructions Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'specialInstructionsForJob'}
              value={data?.specialInstructionsForJob}
              onChangeText={text => {
                setData({...data, specialInstructionsForJob: text});
              }}
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>P.O. Number</Text>
            <Input
              placeholderText={'Enter P.O. Number Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              keyboardType="numeric"
              id={'poNumber'}
              value={data?.poNumber}
              onChangeText={text => {
                setData({...data, poNumber: text});
              }}
            />
          </View>
          <View style={[styles.inputContainer, {marginBottom: scale(20)}]}>
            <Text style={styles.inputText}>Special Instructions</Text>
            <Input
              placeholderText={'Enter Special Instructions Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'specialInstructionsForPO'}
              value={data?.specialInstructionsForPO}
              onChangeText={text => {
                setData({...data, specialInstructionsForPO: text});
              }}
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Site Contact Name</Text>
            <Input
              placeholderText={'Enter Site Contact Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'contactName'}
              value={data?.siteContactName}
              onChangeText={text => {
                setData({...data, siteContactName: text});
              }}
            />
          </View>
          <View style={[styles.inputContainer, {marginBottom: scale(20)}]}>
            <Text style={styles.inputText}>Special Instructions</Text>
            <Input
              placeholderText={'Enter Special Instructions Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'specialInstructionsForContactName'}
              value={data?.specialInstructionsForConName}
              onChangeText={text => {
                setData({...data, specialInstructionsForConName: text});
              }}
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Site Contact Number</Text>
            <Input
              placeholderText={'Enter Site Contact Number Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              keyboardType="phone-pad"
              id={'ContactNum'}
              value={data?.siteContactNumber}
              onChangeText={text => {
                setData({...data, siteContactNumber: text});
              }}
            />
          </View>
          <View style={[styles.inputContainer, {marginBottom: scale(20)}]}>
            <Text style={styles.inputText}>Special Instructions</Text>
            <Input
              placeholderText={'Enter Special Instructions Here'}
              myStyle={styles.inputStyle}
              isIconShow={false}
              txtStyle={{width: '100%'}}
              id={'specialInstructionsForConNumber'}
              value={data?.specialInstructionsForConNo}
              onChangeText={text => {
                setData({...data, specialInstructionsForConNo: text});
              }}
            />
          </View>
        </View>

        <View style={styles.stepperContainer}>
          <View style={styles.stepperStyle1}></View>
          <View style={styles.stepperStyle1}></View>
          <View style={styles.stepperStyle}></View>
        </View>

        <View style={{marginBottom: scale(20)}}>
          <Button
            style={styles.button}
            textColor="white"
            btnLabel="NEXT"
          
            Press={() => {
            if (data?.jobNumber) {
              navigation.navigate('TransportationForm3', {
                transportationData2: data,
              });
            } else {
              Alert.alert('Job Number is Required');
            }
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
    marginTop: '7%',
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

  stepperStyle: {
    backgroundColor: '#eee',
    width: windowWidth * 0.25,
    padding: scale(4),
    borderRadius: sizes.m20,
    marginHorizontal: scale(5),
  },

  stepperStyle1: {
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
});

export default TransportationForm2;
