import React from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';

//imports
import {scale, verticalScale} from 'react-native-size-matters';
import {colors, images, sizes} from '../../config/Extras';
import HomeHeader from '../../components/Headers/HomeHeader';
import HomeCard from '../../components/Container/HomeCard';
import {windowWidth} from '../../config/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {handleGetJobs} from '../../redux/actions/RiggerTicketAction';
import {handleLogOut} from '../../redux/actions/AuthAction';
import {useNavigation} from '@react-navigation/native';

const userRoleCardData = [
  {
    title: 'Calendar',
    imagePrimary: images.calendar,
    imageSecondary: images.calendar1,
    pageName: 'Calendar',
  },
];

const ManagerRoleCardData = [
  {
    title: 'Calendar',
    imagePrimary: images.calendar,
    imageSecondary: images.calendar1,
    pageName: 'Calendar',
  },
  {
    title: 'Rigger Ticket',
    imagePrimary: images.riggerTicket,
    imageSecondary: images.riggerTicket1,
    pageName: 'RiggerTicket',
  },
  {
    title: 'Transportation Ticket',
    imagePrimary: images.transTicket,
    imageSecondary: images.transTicket1,
    pageName: 'TransportationTicket',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state?.auth?.localStorageUser?.role);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetJobs());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        Press={() => {
          navigation.navigate('SaveDraft');
        }}
      />

      <View
        style={[
          styles.logoContainer,
          {marginTop: userData == 'User' ? '20%' : '5%'},
        ]}>
        <Image source={images.logo} style={styles.logo} resizeMode="cover" />
      </View>

      <View style={{marginTop: userData == 'User' ? '8%' : null}}>
        {userData == 'User'
          ? userRoleCardData.map((item, index) => (
              <HomeCard
                key={index}
                titleName={item.title}
                imagePrimary={item.imagePrimary}
                imageSecondary={item.imageSecondary}
                onCardPress={() => {
                  navigation.navigate(item.pageName);
                }}
              />
            ))
          : ManagerRoleCardData.map((item, index) => (
              <HomeCard
                key={index}
                titleName={item.title}
                imagePrimary={item.imagePrimary}
                imageSecondary={item.imageSecondary}
                onCardPress={() => {
                  navigation.navigate(item?.pageName);
                }}
              />
            ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  logo: {
    // height: 100,
    // width: '85%',

    height: 95,
    width: windowWidth * 0.83,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(13),
  },

  headerText: {
    fontFamily: 'JosefinSans-Regular',
    color: colors.black,
    fontSize: sizes.m25,
    marginBottom: verticalScale(30),
  },

  footerContainer: {
    marginTop: verticalScale(70),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  footerText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: sizes.m16,
    fontWeight: '600',
    color: colors.black,
  },

  footerText1: {
    fontFamily: 'JosefinSans-Regular',
    fontWeight: '600',
    fontSize: sizes.m16,
    color: colors.primary1,
  },

  inputText: {
    color: colors.black,
    fontSize: sizes.m15,
    marginHorizontal: scale(15),
    marginBottom: scale(5),
    fontFamily: 'JosefinSans-Regular',
  },

  passContainer: {
    alignSelf: 'flex-end',
    marginRight: scale(12),
    marginTop: scale(5),
  },

  passText: {
    color: colors.primary1,
    fontWeight: '600',
    fontSize: sizes.m15,
    fontFamily: 'JosefinSans-Regular',
  },
});

export default Home;

{
  /* console.log('item', item); */
}

{
  /* {item?.isModal ? (
                <HomeCard
                  titleName={item.title}
                  imagePrimary={item.imagePrimary}
                  imageSecondary={item.imageSecondary}
                  onCardPress={() => {
                    console.log('item 1',item)
                    setIsVisible(!isVisible)
                  }}
                />
              ) : ( */
}
