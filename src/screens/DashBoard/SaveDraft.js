import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import CalendarHeader from '../../components/Headers/CalendarHeader';
import {colors} from '../../config/Extras';
import DraftScreen from '../../components/Container/DraftScreen';

const SaveDraft = ({navigation}) => {
  const data = [
    {
      name: 'Transportation Ticket 1',
    },

    {
      name: 'Transportation Ticket 2',
    },

    {
      name: 'Transportation Ticket 3',
    },

    {
      name: 'Transportation Ticket 4',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader IsImageShow={false} isShow={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        {data.map(item => {
          return (
            <>
              <DraftScreen
                ticketName={item?.name}
                onButtonPress={() => {
                  navigation.navigate('CheckDraft');
                }}
              />
            </>
          );
        })}
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

export default SaveDraft;
