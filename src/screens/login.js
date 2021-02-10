import * as React from 'react';

import { AuthContext } from '../utils/auth-context';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Text from '../components/Text';
import {isEmpty,isEmail,isValidationPassword} from '../configs/validator';
import Button from '../components/Button';
import Input from '../components/Input';
import ThemeView from '../components/ThemeView';

function LoginScreen(props) {
  const { t } = useTranslation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [usernameText, setUsernameText] = React.useState('');
  const [passwordText, setPasswordText] = React.useState('');


  React.useEffect(() => {
    if (username&&!isEmail(username)) {
      setDisabled(true);
      setUsernameText('Information invalide');
    } else {
      setDisabled(false);
      setUsernameText('');
    }
  }, [username]);

  



  const { signIn, isLoading, theme } = React.useContext(AuthContext);
  const urlImage =
    theme === 'dark'
      ? require('../assets/images/logo.png')
      : require('../assets/images/logo.png');
  return (
    <ThemeView
      Component={KeyboardAvoidingView}
      behavior="padding"
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar hidden />
        <Image source={urlImage} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <Text medium h1 style={styles.text}>
            {t('login:text_login')}
          </Text>
          <Input
            label={t('inputs:text_email')}
            value={username}
            onChangeText={setUsername}
            secondary
          />
         {/*usernameText.length>0&&<Text style={styles.textError}>{usernameText}</Text>*/} 
          <Input
            label={t('inputs:text_password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            secondary
          />
           {/*passwordText.length>0&& <Text style={styles.textError}>{passwordText}</Text>*/} 
          <Button
            loading={isLoading}
            disabled={disabled}
            title={t('login:text_button_login')}
            onPress={() => signIn({ username, password })}
            containerStyle={styles.button}
          />
          
          <View style={{
            flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={styles.textBody}>Don't Have an account ?</Text>
            <Text style={[styles.textBody, { color: 'blue' }]} onPress={() => props.navigation.navigate('SignUp')}> Sign Up</Text>
          </View>
        </View>
      </ScrollView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  image: {
    marginVertical: 30,
    marginHorizontal: 26,
  },
  text: {
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    marginVertical: 15,
  },
  textBody: {

    fontSize: 16
  },
  textError: {

    fontSize: 12,
    color:"red"
  }
});

export default LoginScreen;
