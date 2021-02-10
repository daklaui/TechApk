import * as React from 'react';
import truncate from 'lodash/truncate';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  I18nManager,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from '../components/Text';
import Card from '../components/Card';
import Icon from '../components/Icon';
import Header from '../containers/Header';
import ModalLanguage from './account/ModalLanguage';
import RNRestart from 'react-native-restart';
import {AuthContext} from '../utils/auth-context';
import {gray2} from '../configs/colors';
import {shadowDefault, shadowBottom} from '../utils/shadow';

const languages = {
  "en": {
    "code": "en",
    "id": "1",
    "native_name": "English",
    "major": "1",
    "active": "1",
    "default_locale": "en_US",
    "encode_url": "0",
    "tag": "en",
    "translated_name": "English",
    "url": "https://wc.rnlab.io",
    "country_flag_url": "https://wc.rnlab.io/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png",
    "language_code": "en"
  },
  "ar": {
    "code": "ar",
    "id": "5",
    "native_name": "العربية",
    "major": "0",
    "active": 0,
    "default_locale": "ar",
    "encode_url": "0",
    "tag": "ar",
    "translated_name": "Arabic",
    "url": "https://wc.rnlab.io/?lang=ar",
    "country_flag_url": "https://wc.rnlab.io/wp-content/plugins/sitepress-multilingual-cms/res/flags/ar.png",
    "language_code": "ar"
  }
};

function AccountScreen(props) {
  const {colors} = useTheme();
  const {t, i18n} = useTranslation();
  const {navigation} = props;
  const {
    signOut,
    changeTheme,
    changeLanguage,
    theme,
    language,
    user,
  } = React.useContext(AuthContext);
  const [isTheme, setIsTheme] = React.useState(theme === 'dark');
  const [visitModal, setVisitModal] = React.useState(false);
  const currentLanguage = languages[language] || language.en;

  const clickLogout = () => {
    Alert.alert(
      t('account:text_title_logout'),
      t('account:text_description_logout'),
      [
        {
          text: t('common:text_cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('common:text_ok'),
          onPress: () => signOut(),
        },
      ],
      {cancelable: false},
    );
  };

  const clickChangeTheme = () => {
    const valueTheme = isTheme ? 'light' : 'dark';
    setIsTheme(!isTheme);
    changeTheme(valueTheme);
  };
  const reloadApp = selectLanguage => {
    const isRTL = i18n.dir(selectLanguage) === 'rtl';
    I18nManager.forceRTL(isRTL);
    // Reload
    if (isRTL !== I18nManager.isRTL) {
      RNRestart.Restart();
      // Updates.reloadFromCache(); // For expo
    }
  };

  const handleSelectLanguage = selectLanguage => {
    changeLanguage(selectLanguage);
    setTimeout(() => reloadApp(selectLanguage), 2000);
  };
  const nameUser = truncate(user?.nom ?? '',{
    length: 12,
    separator: '...',
  });
  const propAvatar = user?.avatar
    ? {
        source: {uri: user.avatar}
      }
    : {};
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Text h2 medium>
            {t('common:text_account')}
          </Text>
        }
        centerContainerStyle={styles.header}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card
            Component={TouchableOpacity}
            style={[styles.box, styles.row, styles.userInfo]}
            onPress={() => navigation.navigate('InformationAccountScreen')}>
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
              {...propAvatar}
            />
            <View style={styles.viewName}>
              <Text h4 medium h4Style={styles.textNameUser}>
                {t('account:text_user', {name: nameUser})}
              </Text>
              <Text h6 fifth>
                {user?.email}
              </Text>
            </View>
            <Icon
              name="logout"
              size={20}
              color={colors.forthText}
              iconStyle={styles.iconLogout}
              onPress={clickLogout}
              isRotateRTL
            />
          </Card>
          <Text h4 fifth medium style={styles.textHeading}>
            {t('account:text_information')}
          </Text>
          <Card
            Component={TouchableOpacity}
            onPress={() => navigation.navigate('EditAccountScreen')}
            style={[styles.box, styles.row, styles.itemBox]}>
            <Icon
              name="account-edit"
              size={20}
              color={colors.thirdText}
              containerStyle={styles.iconBox}
            />
            <Text medium style={styles.titleItemBox}>
              {t('account:text_edit_account')}
            </Text>
            <Icon
              name="chevron-right"
              size={20}
              color={colors.secondaryText}
              isRotateRTL
            />
          </Card>

          <Text h4 fifth medium style={styles.textHeading}>
            {t('account:text_setting')}
          </Text>
          <Card style={styles.box}>
            <TouchableOpacity
              style={[styles.row, styles.itemBox]}
              onPress={clickChangeTheme}>
              <Icon
                name="theme-light-dark"
                size={20}
                color={colors.thirdText}
                containerStyle={styles.iconBox}
              />
              <View style={[styles.row, styles.rightBox, shadowBottom]}>
                <Text medium style={styles.titleItemBox}>
                  {t('account:text_dark')}
                </Text>
                <Switch value={isTheme} onValueChange={clickChangeTheme} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.itemBox]} onPress={() => setVisitModal(true)}>
              <Icon
                name="translate"
                size={20}
                color={colors.thirdText}
                containerStyle={styles.iconBox}
              />
              <View style={[styles.row, styles.rightBox]}>
                <Text medium style={styles.titleItemBox}>
                  {t('account:text_language')}
                </Text>
                <View style={styles.row}>
                  <Text h6Style={styles.nameLanguage} h6 third>
                    {currentLanguage.translated_name || currentLanguage.native_name}
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={20}
                    color={colors.secondaryText}
                    isRotateRTL
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Card>
          <Text h6 third h6Style={styles.nameFooter}>
            2020 Rnlab.io
          </Text>
        </View>
        <ModalLanguage
          visitModal={visitModal}
          setModalVisible={value => setVisitModal(value)}
          clickShow={handleSelectLanguage}
          valueSelect={language}
          languages={languages}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0,
  },
  content: {
    paddingHorizontal: 20,
  },
  box: {
    borderRadius: 8,
    ...shadowDefault,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    padding: 20,
    paddingRight: 5,
    marginTop: 10,
  },
  iconLogout: {
    padding: 5,
  },
  avatar: {
    backgroundColor: gray2,
  },
  viewName: {
    flex: 1,
    marginHorizontal: 15,
  },
  textNameUser: {
    marginBottom: 2,
  },
  textHeading: {
    marginTop: 30,
    marginBottom: 10,
  },
  itemBox: {
    minHeight: 50,
    paddingLeft: 20,
    paddingRight: 10,
  },
  iconBox: {
    marginRight: 13,
  },
  rightBox: {
    flex: 1,
    minHeight: 50,
  },
  titleItemBox: {
    flex: 1,
  },
  nameLanguage: {
    marginRight: 6,
  },
  nameFooter: {
    marginVertical: 23,
  },
});
export default AccountScreen;
