import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import CalendarHeader from '../../../components/Headers/CalendarHeader';
import {colors} from '../../../config/Extras';
import RiggerTicketForm from '../../../components/Forms/RiggerTicketForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RiggerTicket = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader IsImageShow={true} isShow={false} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        bounces={false}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        scrollEnabled={true}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}>
          <RiggerTicketForm
            input1={'Specifications and Remarks'}
            placeHolder1={'Enter Specifications and Remarks Here'}
            input2={'Customer *'}
            placeHolder2={'Enter Customer Name Here'}
            input3={'Location *'}
            placeHolder3={'Enter Location Here'}
            input4={'P.O. Number'}
            placeHolder4={'P.O. Number'}
            input5={'Date *'}
            placeHolder5={'Select Date Here'}
            input6={'Leave Yard'}
            placeHolder6={'Select Leave Yard'}
            input7={'Start Job'}
            placeHolder7={'Select Start Job'}
            input8={'Finish Job'}
            placeHolder8={'Select Finish Job'}
            input9={'Arrival Yard'}
            placeHolder9={'Select Arrival Yard'}
            input10={'Lunch'}
            placeHolder10={'Enter Lunch Here'}
            input11={'Travel Time'}
            placeHolder11={'Enter Travel Time'}
            input12={'Crane Time'}
            placeHolder12={'Enter Crane Time'}
            input13={'Total Hours'}
            placeHolder13={'Enter Total Hours'}
            input14={'Crane Number'}
            placeHolder14={'Enter Crane Number Here'}
            input15={'Rating'}
            placeHolder15={'Enter Rating Here'}
            input16={'Boom Length'}
            placeHolder16={'Enter Boom Length'}
            input17={'Operator'}
            placeHolder17={'Enter Operator Here'}
            input18={'Other Equipment'}
            placeHolder18={'Enter Other Equipment '}
            input19={'Email Address *'}
            placeHolder19={'Enter Email Address Here'}
            input20={'Notes / Others'}
            placeHolder20={'Type a notes / others..........'}
            input21={'Signature *'}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default RiggerTicket;
