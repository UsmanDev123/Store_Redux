import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../../../config/Extras';
import PayDutyForm from '../../../components/Forms/PayDutyForm';

const PayDuty = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <PayDutyForm
          input1={'Date *'}
          placeHolder1={'Select Date Here'}
          input2={'Location *'}
          placeHolder2={'Enter Location Here'}
          input3={'Start Time'}
          placeHolder3={'Select Start Time'}
          input4={'Finish Time'}
          placeHolder4={'Select Finish Time'}
          input5={'Total Hours'}
          placeHolder5={'Enter Total Hours Here'}
          input6={'Officer'}
          placeHolder6={'Enter Officer Here'}
          input7={'Officer Name *'}
          placeHolder7={'Enter Officer Name Here'}
          input8={'Division'}
          placeHolder8={'Enter Division Here'}
          input9={'Email Address *'}
          placeHolder9={'Enter Email Address Here'}
          input10={'Signature *'}
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

export default PayDuty;
