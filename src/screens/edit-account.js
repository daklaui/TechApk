import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Input from '../components/Input';
import ThemeView from '../components/ThemeView';
import Header from '../containers/Header';

import {AuthContext} from '../utils/auth-context';
import {updateEtudiant} from '../services/etudiantService';
import {updateFormateur} from '../services/formateurServices';
const initNotification = {
  message: null,
  type: 'error',
};

function EditAccountScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation} = props;
  const {user, userToken, updateUser} = React.useContext(AuthContext);
  const [fullName, setFullName] = React.useState(user?.nom ?? '');
  const [email, setEmail] = React.useState(user?.email ?? '');
  const [cin, setCin] = React.useState(user?.cin ?? '');
  const [dateDeNaissence, setDateDeNaissence] = React.useState(user?.date_de_naissance ?? '');
  const [adresse, setAdresse] = React.useState(user?.adresse ?? '');
  const [phone, setPhone] = React.useState(user?.num_tel ?? '');

  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState(initNotification);

  const saveCustomer = async () => {
    if(user.type=="etudiant")
    {
      try {
        const etudiantUpdate = {
          "nom": fullName,
          "email": email,
          "num_tel": phone,
          "date_de_naissance": dateDeNaissence,
          "adresse": adresse,
          "cin": cin,
        };
  
     let etudiantData=   await updateEtudiant(etudiantUpdate,user.id);
        setLoading(false);
        const dataNotification = {
          message: 'Update etudiant success',
          type: 'success',
        };
        setNotification(dataNotification);
        console.log(etudiantData.data)
       updateUser(etudiantData.data);
      } catch (e) {
        setLoading(false);
        const dataNotification = {
          message: e.message,
          type: 'error',
        };
        setNotification(dataNotification);
      }
    }
    else
    {
      try {
        const formateurUpdate = {
          "nom": fullName,
          "email": email,
          "num_tel": phone,
          "date_de_naissance": dateDeNaissence,
          "adresse": adresse,
          "cin": cin,
        };
  
     let formateurData=   await updateFormateur(formateurUpdate,user.id);
        setLoading(false);
        const dataNotification = {
          message: 'Update  success',
          type: 'success',
        };
        setNotification(dataNotification);
        console.log(formateurData.data)
       updateUser(formateurData.data);
      } catch (e) {
        setLoading(false);
        const dataNotification = {
          message: e.message,
          type: 'error',
        };
        setNotification(dataNotification);
      }
    }
   
  };
  const clickSave = () => {
    setLoading(true);
    setNotification(initNotification);
    saveCustomer();
  };

  return (
    <ThemeView style={styles.container} secondary>
      <Header
        leftComponent={
          <Icon
            name="chevron-left"
            type="material-community"
            size={30}
            onPress={() => navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h3 medium>
            {t('common:text_edit_account')}
          </Text>
        }
      />
      <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
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
            <Input
              label={t('inputs:text_first_name')}
              value={fullName}
              onChangeText={setFullName}
              secondary
            />
            <Input
              label={t('inputs:text_cin')}
              value={cin}
              onChangeText={setCin}
              secondary
            />
            <Input
              label={t('inputs:text_email')}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              secondary
            />
              <Input
              label={t('inputs:text_datenais')}
             
              value={dateDeNaissence}
              onChangeText={setDateDeNaissence}
              secondary
            />
              <Input
              label={t('inputs:text_phone')}
              value={phone}
              onChangeText={setPhone}
              secondary
            />
             <Input
              label={t('inputs:text_adresse')}
              value={adresse}
              onChangeText={setAdresse}
              secondary
            />
            <Button
              title={t('common:text_save')}
              containerStyle={styles.button}
              onPress={clickSave}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  textNotification: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 30,
  },
});

export default EditAccountScreen;
