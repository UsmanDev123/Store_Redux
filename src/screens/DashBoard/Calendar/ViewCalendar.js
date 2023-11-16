import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React from 'react';
import CalendarHeader from '../../../components/Headers/CalendarHeader';
import {colors} from '../../../config/Extras';
import ViewScreenCard from '../../../components/Container/ViewScreenCard';
import IconButton from '../../../components/Buttons/IconButton';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

const ViewCalendar = ({route}) => {
  // const userData = useSelector(state => state?.calender);
  // for (let index = 0; index < userData?.calendersData?.length; index++) {
  //   var isLink = userData?.calendersData[index]['pdfRigger'];
  //   console.log('a', isLink);
  // }

  // const isLink = 'https://files/65031f8d3d3be35541fe9470_Rigger_653178fed5c5bddea94dcce3.pdf'
  const fileUrl =
    'https://test.scserver.org/files/65031f8d3d3be35541fe9470_Rigger_6532b86a89e866093800f217.pdf';

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = () => {
    let date = new Date();
    let FILE_URL = fileUrl;
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          '.pdf',
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        Alert.alert('File Downloaded Successfully!!');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarHeader isShow={true} IsImageShow={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <ViewScreenCard
          item={route?.params?.data}
          ClientName={route?.params?.data?.clientName}
          JobTime={route?.params?.data?.jobTime}
          Address={route?.params?.data?.address}
          EquipmentToBeUsed={route?.params?.data?.equipmentToBeUsed}
          RiggerAssigned={route?.params?.data?.riggerAssigned}
          SupplierName={route?.params?.data?.supplierName}
          Notes={route?.params?.data?.notes}
          DocumentFile={route?.params?.data?.imageFiles}
          EnterBy={route?.params?.data?.enterBy}
        />
        {fileUrl ==
        'https://test.scserver.org/files/65031f8d3d3be35541fe9470_Rigger_6532b86a89e866093800f217.pdf' ? (
          <IconButton
            textColor="white"
            btnLabel="TAP TO OPEN"
            Press={checkPermission}
          />
        ) : null}
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

export default ViewCalendar;
