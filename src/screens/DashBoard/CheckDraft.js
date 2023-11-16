import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CalendarHeader from '../../components/Headers/CalendarHeader';
import {colors} from '../../config/Extras';
import CheckDraftScreen from '../../components/Container/CheckDraftScreen';

const CheckDraft = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader IsImageShow={false} isShow={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <CheckDraftScreen />
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

export default CheckDraft;
