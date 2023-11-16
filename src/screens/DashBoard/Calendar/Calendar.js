import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CalendarHeader from '../../../components/Headers/CalendarHeader';
import {colors, sizes} from '../../../config/Extras';
import {scale, verticalScale} from 'react-native-size-matters';
import CalendarCard from '../../../components/Container/CalendarCard';
import {getMonthlyDate} from '../../../config/Utils';
import JobsCard from '../../../components/Container/JobsCard';
import MenuModal from '../../../components/Modal/MenuModal';
import SelectCalendar from '../../../components/Container/SelectCalendar';
import {useDispatch, useSelector} from 'react-redux';
import {handleCalenderData} from '../../../redux/actions/CalenderActions';

const Calendar = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    date.toISOString().substring(0, 10),
  );
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();
  const calenderData = useSelector(state => state?.calender);
  let getDates = getMonthlyDate(2023, 9);

  useEffect(() => {
    dispatch(handleCalenderData());
  }, []);

  const onDatePress = date => {
    setSelectedDate(date);
    setCurrentDate(date);
    dispatch(handleCalenderData(date));
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader isShow={false} IsImageShow={false} />
      <MenuModal
        isModalClose={isVisible}
        onCrossPress={() => {
          setIsVisible1(!isVisible1);
          setSelectedJob(null);
        }}
        modalVisible={isVisible1}
        item={selectedJob}
      />
      <SelectCalendar />
      <View style={styles.containerStyle}>
        <Text style={[styles.textStyle, {marginBottom: scale(7)}]}>
          Day and Date
        </Text>
        <FlatList
          data={getDates}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            paddingHorizontal: scale(4),
            paddingVertical: scale(4),
          }}
          keyExtractor={item => item}
          renderItem={item => {
            const itemDate = item.item?.toISOString()?.substring(0, 10);
            const isCurrentDate = itemDate === currentDate;
            const isDateSelected = itemDate === selectedDate;

            return (
              <CalendarCard
                color={
                  isCurrentDate
                    ? colors.primary1
                    : isDateSelected
                    ? colors.primary1
                    : '#eee'
                }
                date={item.item?.toString()?.substring(0, 3)}
                textClr1={
                  isCurrentDate || isDateSelected ? '#fff' : colors.black
                }
                textClr={
                  isCurrentDate || isDateSelected ? '#fff' : colors.black
                }
                day={item.item?.toString()?.substring(8, 10)}
                press={() => {
                  onDatePress(itemDate);
                }}
                isSelected={isDateSelected}
              />
            );
          }}
        />

        <View style={styles.styleContainer}>
          <View>
            <Text style={styles.textStyle}>Jobs</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(handleCalenderData());
            }}
            style={{marginTop: '0.5%'}}>
            <Text style={styles.textStyle}>Refresh All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {calenderData?.isLoadingState ? (
        <ActivityIndicator color={colors.primary1} size={'large'} />
      ) : (
        <>
          {calenderData?.calendersData?.length == 0 ? (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle}>No Data Found !</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={calenderData?.calendersData}
                showsVerticalScrollIndicator={false}
                renderItem={(item, index) => {
                  return (
                    <>
                      <JobsCard
                        key={index}
                        dotPress={() => {
                          setIsVisible1(!isVisible1);
                          setSelectedJob(item?.item);
                        }}
                        jobText={`${item?.item?.clientName} - ${
                          item?.item?.address
                        } - ${'Riggers' + item?.item?.riggerAssigned}`}
                        jobColor={
                          item?.isSCCI
                            ? '#cbcdd4'
                            : item?.item?.statusCode == 'goodTogo'
                            ? colors.green
                            : item?.item?.statusCode == 'onHold'
                            ? colors.yellow
                            : item?.item?.statusCode == 'inProblem'
                            ? colors.pink
                            : colors.primary
                        }
                        jobTime={item?.item?.jobTime}
                        onCardPress={() => {
                          navigation.navigate('ViewCalendar', {
                            data: item.item,
                          });
                        }}
                      />
                    </>
                  );
                }}
              />
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  textStyle: {
    color: colors.black,
    fontFamily: 'JosefinSans-Regular',
    fontSize: sizes.m15,
    fontWeight: '600',
  },

  containerStyle: {
    margin: verticalScale(10),
    marginHorizontal: scale(20),
  },

  styleContainer: {
    marginTop: '8%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4%',
  },
});

export default Calendar;
