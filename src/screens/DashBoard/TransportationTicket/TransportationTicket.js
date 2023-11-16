import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import CalendarHeader from '../../../components/Headers/CalendarHeader';
import {colors} from '../../../config/Extras';
import TransportationForm1 from './TransportationForm1';

const TransportationTicket = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader IsImageShow={true} isShow={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <TransportationForm1 />
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

export default TransportationTicket;
