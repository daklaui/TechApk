
import * as React from 'react';

import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import LoginScreen from './src/screens/login';
import HomeScreen from './src/screens/home';
import Formations from './src/screens/Formations';
import NotificationScreen from './src/screens/notification';
import DeliveryDetailScreen from './src/screens/delivery-detail';
import formationParEtudiant from './src/screens/formationParEtudiant';
import AccountScreen from './src/screens/account';
import InformationAccountScreen from './src/screens/information-account';
import EditAccountScreen from './src/screens/edit-account';
import EditPasswordScreen from './src/screens/edit-password';
import DeliveryAddressScreen from './src/screens/delivery-address';
import ProfileScreen from './src/screens/profile'
import CalanderScreen from './src/screens/settings'
import CalanderEtudiant from './src/screens/CalanderEtudiant'
import FormationByFormateur from './src/screens/FormationByFormateur'
import ListSessionFormateur from './src/screens/ListSessionFormateur'
import DetailSessionFormateur from './src/screens/DetailSessionFormateur'

import signup from './src/screens/signup';
import { AuthContext } from './src/utils/auth-context';
import { login } from './src/services/loginService';

import TabBar from './src/containers/TabBar';

import { themeLight, themeDark } from './src/configs/themes';
import { ONE_SIGNAL_APP_ID } from './src/configs/constant';

import './src/config-i18n';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabFormateur() {
  
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="FormationByFormateur" component={FormationByFormateur} />
      <Tab.Screen name="CalanderScreen" component={CalanderScreen} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  )
}



function MainTabEtudiant() {
  
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CalanderEtudiant" component={CalanderEtudiant} />
      <Tab.Screen name="FormationsScreen" component={Formations} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  )
}

function App() {
  const { i18n } = useTranslation();
  OneSignal.init(ONE_SIGNAL_APP_ID);
  OneSignal.inFocusDisplaying(2);
 // const [deviceId, setDeviceId] = React.useState()
 const deviceId=React.useRef();
  console.log('ONE_SIGNAL_APP_ID', ONE_SIGNAL_APP_ID);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
            user: action.user,
          };
        case 'RESTORE_THEME':
        case 'UPDATE_THEME':
          return {
            ...prevState,
            theme: action.theme,
          };
        case 'RESTORE_LANGUAGE':
        case 'UPDATE_LANGUAGE':
          return {
            ...prevState,
            language: action.language,
          };
        case 'UPDATE_USER':
          return {
            ...prevState,
            user: action.user,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: true,
          };
        case 'SING_IN_SUCCESS':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
            user: action.user,
          }
        case 'SING_IN_ERROR':
          return {
            ...prevState,
            isLoading: false,
            error: action.error,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
            user: {},
            error: null,
          };
      }
    },
    {
      isLoading: false,
      isSignOut: false,
      userToken: null,
      user: {},
      error: null,
      theme: 'light',
      language: 'en',
    },
  );


  

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        console.log(userJson);
        const theme = await AsyncStorage.getItem('theme');
        const language = await AsyncStorage.getItem('language');
        if (userJson) {
          const { token, user } = JSON.parse(userJson);
          console.log(user);
          dispatch({ type: 'RESTORE_TOKEN', token, user });
          OneSignal.sendTag('user_id', user.ID);
        }
        if (theme) {
          dispatch({ type: 'RESTORE_THEME', theme });
        }
        if (language) {
          dispatch({ type: 'RESTORE_LANGUAGE', language });
        }
  
        SplashScreen.hide();
  
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }
    };
    console.log(state.user)
    bootstrapAsync();
    OneSignal.addEventListener('ids', onIds);
    
  
  }, []);
  const onIds=(device)=> {
    console.log('Device info: ', device);
    deviceId.current=device.userId;
  
}
  const authContext = React.useMemo(
    () => ({
      signIn: async ({ username, password }) => {
        dispatch({ type: 'SIGN_IN' });
        try {
          console.log(deviceId.current);
          const u = await login(username, password,deviceId.current)
          const user = u.data;
          const token = "";
          // const {token, user} = await loginWithEmail(JSON.stringify({username, password}));
          await AsyncStorage.setItem('user', JSON.stringify({ token, user }));
          dispatch({ type: 'SING_IN_SUCCESS', token, user });
        } catch (error) {
          dispatch({ type: 'SING_IN_ERROR', error });
        }

      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('user');
          dispatch({ type: 'SIGN_OUT' });
        } catch (e) {
          console.log(e);
        }
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_UP', token: 'dummy-auth-token' });
      },
      changeTheme: async data => {
        await AsyncStorage.setItem('theme', data);
        dispatch({ type: 'UPDATE_THEME', theme: data });
      },
      changeLanguage: async data => {
        await AsyncStorage.setItem('language', data);
        dispatch({ type: 'UPDATE_LANGUAGE', language: data });
      },
      updateUser: async data => {
        const userJson = await AsyncStorage.getItem('user');
        const { token } = JSON.parse(userJson);
        let user = data;
        await AsyncStorage.setItem('user', JSON.stringify({ token, user }));
        dispatch({ type: 'UPDATE_USER', user: data });
      },
    }),
    [],
  );
  // set language
  if (i18n.language !== state.language) {
    i18n.changeLanguage(state.language);
  }

  const barStyle = state.theme === 'light' ? 'dark-content' : 'light-content';
  const themeData = state.theme === 'dark' ? themeDark : themeLight;
  return (
    <NavigationContainer theme={themeData}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />
        <AuthContext.Provider value={{ ...authContext, ...state }}>
          <Stack.Navigator>
            {state.userToken == null ? (
            
              <>
              
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="SignIn"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="SignUp"
                  component={signup}
                />
              </>
            ) : (
              state.user.type=="etudiant"?(
                <>
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={MainTabEtudiant}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="DeliveryDetailScreen"
                    component={DeliveryDetailScreen}
                  />
                    <Stack.Screen
                    options={{ headerShown: false }}
                    name="ProfileScreen"
                    component={ProfileScreen}
                  />
                     <Stack.Screen
                options={{ headerShown: false }}
                name="CalanderEtudiant"
                component={CalanderEtudiant}
              />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="DetailFormationEtudiant"
                    component={formationParEtudiant}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="InformationAccountScreen"
                    component={InformationAccountScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="EditAccountScreen"
                    component={EditAccountScreen}
                  />
                    <Stack.Screen
                    options={{ headerShown: false }}
                    name="EditPasswordScreen"
                    component={EditPasswordScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="DeliveryAddressScreen"
                    component={DeliveryAddressScreen}
                  />
                  
                </>
              ):
            
              <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={MainTabFormateur}
              />
             
                <Stack.Screen
                options={{ headerShown: false }}
                name="ProfileScreen"
                component={ProfileScreen}
              />
              
             
              <Stack.Screen
                options={{ headerShown: false }}
                name="InformationAccountScreen"
                component={InformationAccountScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="EditAccountScreen"
                component={EditAccountScreen}
              />
                <Stack.Screen
                options={{ headerShown: false }}
                name="EditPasswordScreen"
                component={EditPasswordScreen}
              />
            
               <Stack.Screen
                options={{ headerShown: false }}
                name="CalanderScreen"
                component={CalanderScreen}
              />
               <Stack.Screen
                options={{ headerShown: false }}
                name="ListSessionFormateur"
                component={ListSessionFormateur}
              />
    <Stack.Screen
                options={{ headerShown: false }}
                name="DetailSessionFormateur"
                component={DetailSessionFormateur}
              />

            </>
            
              )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;



