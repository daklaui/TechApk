import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Input from '../components/Input';
import ThemeView from '../components/ThemeView';
import Header from '../containers/Header';

import { AuthContext } from '../utils/auth-context';
import { updatePasswordEtudiant } from '../services/etudiantService';
import { updatePasswordFormateur } from '../services/formateurServices';
const initNotification = {
  message: null,
  type: 'error',
};

function EditPasswordScreen(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const { user, userToken, updateUser } = React.useContext(AuthContext);
  const [old_password, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatNewPassword, setRepeatNewPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState(initNotification);

  const saveCustomer = async () => {
    if (newPassword != repeatNewPassword) {
      setLoading(false);
      const dataNotification = {
        message: "password not match",
        type: 'error',
      };
      setNotification(dataNotification);
    }
    else {
      try {
        if(user.type=="etudiant")
        {
          const etudiantPasswordUpdate = {
            "oldPassword": old_password,
            "newPassword": repeatNewPassword
          };
          console.log(user.id);
          const data = await updatePasswordEtudiant(etudiantPasswordUpdate, user.id);
          console.log(data.data);
          if (data.data == "L'étudiant a été modifié avec succée") {
            setLoading(false);
            const dataNotification = {
              message: 'Update password etudiant success',
              type: 'success',
            };
            setNotification(dataNotification);
          }
          else {
            setLoading(false);
            const dataNotification = {
              message: "Error ! password not match",
              type: 'error',
            };
            setNotification(dataNotification);
          }
        }
        else
        {
          const formateurPasswordUpdate = {
            "oldPassword": old_password,
            "newPassword": repeatNewPassword
          };
          console.log(user.id);
          const data = await updatePasswordFormateur(formateurPasswordUpdate, user.id);
          console.log(data.data);
          if (data.data == "Le formateur a été modifié avec succée") {
            setLoading(false);
            const dataNotification = {
              message: 'Update password  success',
              type: 'success',
            };
            setNotification(dataNotification);
          }
          else {
            setLoading(false);
            const dataNotification = {
              message: "Error ! password not match",
              type: 'error',
            };
            setNotification(dataNotification);
          }
        }
       


      } catch (e) {
        setLoading(false);
        console.log(e);
        const dataNotification = {
          message: e.message,
          type: 'error',
        };
        setNotification(dataNotification);
      }

    };
  }
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
            {t('common:text_edit_account_password')}
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
                    ? { color: colors.success }
                    : { color: colors.error },
                ]}>
                {notification.message}
              </Text>
            ) : null}
            <Input
              label={t('inputs:text_old_password')}
              value={old_password}
              secureTextEntry
              onChangeText={setOldPassword}
              secondary
            />
            <Input
              label={t('inputs:text_new_password')}
              value={newPassword}
              secureTextEntry
              onChangeText={setNewPassword}
              secondary
            />
            <Input
              label={t('inputs:text_confirm_password')}
              value={repeatNewPassword}
              secureTextEntry
              onChangeText={setRepeatNewPassword}
              secondary
            />

            <Button
              title={t('common:text_edit_account_password')}
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

export default EditPasswordScreen;
