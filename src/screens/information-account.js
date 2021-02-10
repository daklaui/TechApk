import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../containers/Header';

import { shadowDefault } from '../utils/shadow';
import { AuthContext } from '../utils/auth-context';
import { DownloadImages } from '../services/etudiantService';
import { gray2 } from '../configs/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TextLine(props) {
  const { title, subTitle, style } = props;
  return (
    <View style={style}>
      <Text h6 third h6Style={{ marginBottom: 5 }}>
        {subTitle}
      </Text>
      <Text h4 medium>
        {title}
      </Text>
    </View>
  );
}

function InformationAccountScreen(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const { user } = React.useContext(AuthContext);
  const [photo,setPhoto]=React.useState("");
    
  React.useEffect(() => {
    getImage(user.photo);
    console.log(user.photo);
  },[]);




  const getImage =(photoname)=>
  {
     setPhoto("");
     DownloadImages(photoname).then((data)=>{
      setPhoto("data:image/png;base64,"+data.data)
     })
  } 
  const propsAvatar = 
  {
      source: {uri:photo}
  };

   
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="chevron-left"
            size={30}
            onPress={() => navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h3 medium>
            {t('common:text_account_detail')}
          </Text>
        }
      />
      <Card style={styles.viewInfo}>
       <TouchableOpacity onPress={()=>{user.type=="etudiant"?props.navigation.navigate("ProfileScreen",{id:user.id,updateImage:getImage}):null}}>
        <Avatar
          size={60}
          rounded
          icon={{
            name: 'account-circle',
            size: 30,
            type: 'material-community',
            color: colors.secondaryText,
          }}
          overlayContainerStyle={styles.avatar}
          {...propsAvatar}
        />
        </TouchableOpacity>
        <View style={styles.infoRight}>
          <TextLine
            title={user?.nom}
            subTitle={t('account_detail:text_first_name')}
            style={styles.viewTextInfo}
          />

          <TextLine
            title={user?.email}
            subTitle={t('account_detail:text_email')}
            style={styles.viewTextInfo}
          />

          <TextLine
            title={user?.date_de_naissance}
            subTitle={t('account_detail:text_date_naissence')}
            style={styles.viewTextInfo}
          />
          <TextLine
            title={user?.adresse}
            subTitle={t('account_detail:text_address')}
            style={styles.viewTextInfo}
          />

          <TextLine
            title={user?.num_tel}
            subTitle={t('account_detail:text_phone')}
          />
          
        </View>
      </Card>
      <Button
        title={t('common:text_edit_account_password')}
        containerStyle={styles.containerButton}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('EditPasswordScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInfo: {
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    flexDirection: 'row',
    ...shadowDefault
  },
  infoRight: {
    flex: 1,
    marginLeft: 15,
  },
  viewTextInfo: {
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 40,
  },
  containerButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    backgroundColor: gray2,
  },
});

export default InformationAccountScreen;
