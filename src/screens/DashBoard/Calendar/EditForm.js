import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../../../config/Extras';
import CalendarHeader from '../../../components/Headers/CalendarHeader';
import FormEdit from '../../../components/Forms/FormEdit';

const EditForm = ({route}) => {
  console.log('ooo>>', route?.params?.data);
  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader isShow={true} IsImageShow={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <FormEdit
        item={ route?.params?.data}
          input1={'Client Name'}
          placeHolder1={
            route?.params?.data?.clientName ?? 'Enter Client Name Here'
          }
          input2={'Job Time'}
          placeHolder2={route?.params?.data?.jobTime ?? 'Select Job Time Here'}
          input3={'Job Date'}
          placeHolder3={route?.params?.data?.jobDate ?? 'Select Job Date Here'}
          input4={'Address'}
          placeHolder4={route?.params?.data?.address ?? 'Enter Address Here'}
          input5={'Equipment To Be Used'}
          placeHolder5={
            route?.params?.data?.equipmentToBeUsed ??
            'Enter Equipment To Be Used Here'
          }
          input6={'Rigger Assigned'}
          placeHolder6={
            route?.params?.data?.riggerAssigned ?? 'Enter Rigger Assigned Here'
          }
          input7={'Supplier Name'}
          placeHolder7={
            route?.params?.data?.supplierName ?? 'Enter Supplier Name Here'
          }
          input8={'Notes'}
          placeHolder8={
            route?.params?.data?.notes ?? 'Type Notes Here..........'
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default EditForm;
