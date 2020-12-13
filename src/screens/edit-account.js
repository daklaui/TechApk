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
import {updateCustomer} from '../services/auth-service';

const initNotification = {
  message: null,
  type: 'error',
};

function EditAccountScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation} = props;
  const {user, userToken, updateUser} = React.useContext(AuthContext);
  const [first_name, setFirstName] = React.useState(user?.first_name ?? '');
  const [last_name, setLastName] = React.useState(user?.last_name ?? '');
  const [email, setEmail] = React.useState(user?.user_email ?? '');
  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState(initNotification);

  const saveCustomer = async () => {
    try {
      const dataUpdate = {
        first_name,
        last_name,
        email,
      };

      await updateCustomer(user?.ID, dataUpdate, userToken);
      setLoading(false);
      const dataNotification = {
        message: 'Update customer success',
        type: 'success',
      };
      setNotification(dataNotification);
      updateUser({
        first_name,
        last_name,
        user_email: email,
      });
    } catch (e) {
      setLoading(false);
      const dataNotification = {
        message: e.message,
        type: 'error',
      };
      setNotification(dataNotification);
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
              value={first_name}
              onChangeText={setFirstName}
              secondary
            />
            <Input
              label={t('inputs:text_last_name')}
              value={last_name}
              onChangeText={setLastName}
              secondary
            />
            <Input
              label={t('inputs:text_email_require')}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
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
