import React from 'react';

import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import defaultAvatar from '../assets/images/user.png';
import Header from '../containers/Header';
import {useTheme} from '@react-navigation/native';
import Icon from '../components/Icon';
import Text from '../components/Text';
import Card from '../components/Card';
import { shadowDefault } from '../utils/shadow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadImages} from '../services/etudiantService';

import {AuthContext} from '../utils/auth-context';

import { DownloadImages } from '../services/etudiantService';
const initNotification = {
  message: null,
  type: 'error',
};

function ProfileScreen(props) {
  const id = props.route?.params?.id ?? null;
  const {colors} = useTheme();
const [avatar, setAvatar] = React.useState("");
const [ancien, setAncien] = React.useState();
const [loading, setLoading] = React.useState(false);
const [notification, setNotification] = React.useState(initNotification);
const {user, userToken, updateUser} = React.useContext(AuthContext);
const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};


React.useEffect(() => {
  console.log(user)
  getImage(user.photo);
  console.log(user.photo);
},[]);




const getImage =async (photoname)=>
{
 setAncien("");
 let data=  await DownloadImages(photoname);
 setAncien("data:image/png;base64,"+data.data)
} 

const uploadImage = () => {
  // console.log('edit');
  launchImageLibrary({}, (response) => {
    console.log('Response = ', id);
     
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setAvatar({uri: response.uri});
      setAncien("");
      // here we can call a API to upload image on server
      let formData = new FormData();
      formData.append("file", {uri: response.uri, name:response.fileName , type: response.type});
      uploadImages(formData,id).then((response)=>{
       if(response.status==200)
       {
         //console.log(response.data);
         setLoading(false);
         const dataNotification = {
          message: 'Update Photo etudiant success',
          type: 'success',
        };
        setNotification(dataNotification);
       // user.photo=response.data;
        updateUser(response.data);
  
       }
      
      })
    }
  });
 
};


const goBackFn=()=>{
  console.log(user.photo)
  props.route.params.updateImage(user.photo);
  props.navigation.goBack();
  
}

  return (

    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="chevron-left"
            size={30}
            onPress={goBackFn}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h3 medium>
            {'Photo profile'}
          </Text>
        }
      />

      <View style={styles.viewEmpty}>
      {notification?.message ? (
              <Text
                style={[
                  styles.textNotification,
                  notification?.type === 'success'
                    ? {color: colors.success}
                    : {color: colors.error},
                ]}>
                {notification.message}
              </Text>
            ) : null}
        <TouchableOpacity onPress={uploadImage}>
          <View >
            <Card style={styles.cardEmpty}>
           {avatar!=""&&<Image style={styles.stretch} source={avatar} />}
            {ancien!=""&&<Image style={styles.stretch} source={{uri:ancien}} />}
            </Card>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );


}
const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
  viewEmpty: {
    flex: 1,
  },
  cardEmpty: {
    padding: 30,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowDefault,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 30,
  },
  textNotification: {
    marginBottom: 10,
  },
});
export default ProfileScreen;