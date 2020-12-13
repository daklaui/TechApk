import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../containers/Header';

import {shadowDefault} from '../utils/shadow';
import {AuthContext} from '../utils/auth-context';
import {gray2} from '../configs/colors';

function TextLine(props) {
  const {title, subTitle, style} = props;
  return (
    <View style={style}>
      <Text h6 third h6Style={{marginBottom: 5}}>
        {subTitle}
      </Text>
      <Text h4 medium>
        {title}
      </Text>
    </View>
  );
}

function InformationAccountScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation} = props;
  const {user} = React.useContext(AuthContext);
  const propsAvatar = user?.avatar
    ? {
        source: {uri: user.avatar}
      }
    : {};
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
        <View style={styles.infoRight}>
          <TextLine
            title={user?.first_name}
            subTitle={t('account_detail:text_first_name')}
            style={styles.viewTextInfo}
          />
          <TextLine
            title={user?.last_name}
            subTitle={t('account_detail:text_last_name')}
            style={styles.viewTextInfo}
          />
          <TextLine
            title={user?.user_email}
            subTitle={t('account_detail:text_email')}
            style={styles.viewTextInfo}
          />
          <TextLine
            title={"+84 900163398"}
            subTitle={t('account_detail:text_phone')}
          />
        </View>
      </Card>
      <Button
        title={t('account_detail:text_button_edit')}
        containerStyle={styles.containerButton}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('EditAccountScreen')}
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
