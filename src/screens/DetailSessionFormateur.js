import * as React from 'react';
import { View, StyleSheet, ScrollView,PermissionsAndroid ,Linking} from 'react-native';
import Text from '../components/Text';
import CardEtudiant from '../components/CardEtudiant';
import CardDocuments from '../components/CardDocuments';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Input from '../components/Input';
import ThemeView from '../components/ThemeView';
import Header from '../containers/Header';
//import RNFetchBlob from 'rn-fetch-blob';
import RNFetchBlob from 'react-native-fetch-blob'
import { getListEtudiantBySession, getListPlaningBySession, getListDocumentsBySession, getDownloadDocument } from '../services/formateurServices';
import { DefaultTabBar } from 'react-native-scrollable-tab-view';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
function DetailSessionFormateur(props) {
  var ScrollableTabView = require('react-native-scrollable-tab-view');
  console.log(props.route?.params?.data);
  const [etudiants, setEtudinats] = React.useState([]);
  const [planings, setPlanings] = React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const getEtudiants = () => {
    getListEtudiantBySession(props.route?.params?.data).then((data) => {
      setEtudinats(data.data);
    })
  }

  const getPlanings = () => {
    getListPlaningBySession(props.route?.params?.data).then((data) => {
      setPlanings(data.data);
      console.log(data.data)
    })
  }
  const getDocuments = () => {
    getListDocumentsBySession(props.route?.params?.data).then((data) => {
      setDocuments(data.data);
      console.log(data.data)
    })
  }



   const CheckFilePermissions = async (platform) => {
    if(platform === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (granted['android.permission.READ_EXTERNAL_STORAGE'] && granted['android.permission.WRITE_EXTERNAL_STORAGE']) {
          // user granted permissions
          return true;
        } else {
          // user didn't grant permission... handle with toastr, popup, something...
          return false;
        }
      } catch (err) {
        // unexpected error
        return false;
      }
    } else {
      // platform is iOS
      return true;
    }
  };

  const download = () => {
  console.log("click")
  if(CheckFilePermissions(Platform.OS))
  {
   
    let dirs = RNFetchBlob.fs.dirs// this is the pictures directory. You can check the available directories in the wiki.
    const date=new Date();
    let options = {
      fileCache: true,
      appendExt : 'png',
      path: dirs.DocumentDir + "/me_" + Math.floor(date.getTime() + date.getSeconds() / 2), 
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        title: "file01.png",
        mime : 'application/octet-stream',
        // this is the path where your downloaded file will live in
        description: 'Downloading image.'
      }
    }
    console.log(options);
   /* config(options).fetch('GET','http://192.168.43.123:6039/downloadDocument/file01.png').then((res) => {
       console.log(res)
    }).catch((re)=>{console.log(re)})*/
    // send http request in a new thread (using native code)
const res =RNFetchBlob.config(options).fetch('GET', 'http://192.168.43.123:6039/downloadDocument/file01.png');
 console.log(res);
  }
  
  }



  React.useEffect(() => {
    getEtudiants();
    getPlanings();
    getDocuments();
  }, [])




  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="chevron-left"
            type="material-community"
            size={30}
            onPress={() => props.navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h3 medium>
            {'Details Session'}
          </Text>
        }
      />

      <ScrollableTabView
        style={{}}
        renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
      >
        <ScrollView tabLabel='List etudiants'>
          {
            etudiants && etudiants != null && etudiants.map(data => (
              <CardEtudiant
                item={data} />
            ))}
        </ScrollView>

        <ScrollView tabLabel='planning' >
          {
            planings && planings != null && planings.map(data => (
              <BouncyCheckbox
                isChecked={data.finish}
                textColor="#000"
                fillColor="red"
                text={data.titre}
                onPress={(checked) => console.log("Checked: ", checked)}
              />
            ))}


        </ScrollView>

        <ScrollView tabLabel='documents'>
          {
            documents && documents != null && documents.map(data => (
              <TouchableOpacity onPress={()=>{Linking.openURL('http://192.168.43.123:6039/downloadDocument/'+data.titre)}}>
                <CardDocuments item={data}></CardDocuments>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </ScrollableTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default DetailSessionFormateur;