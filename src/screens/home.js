import * as React from 'react';

import OneSignal from 'react-native-onesignal';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View, FlatList, ScrollView, Image} from 'react-native';
import Text from '../components/Text';
import Card from '../components/Card';
import ItemDelivery from '../containers/ItemDelivery';
import Loading from '../containers/Loading';
import LoadingItemDelivery from '../containers/LoadingItemDelivery';
import InfoUser from './home/InfoUser';
import SelectStatusDelivery from './home/SelectStatusDelivery';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {AuthContext} from '../utils/auth-context';
import {getDeliveries, getDeliveryStat} from '../services/delivery-service';
import {shadowDefault} from '../utils/shadow';
import { ONE_SIGNAL_APP_ID } from '../configs/constant';
import NotificationPush from './delivery/NotificationPush';
class HomeScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);  
    OneSignal.init(ONE_SIGNAL_APP_ID);
    OneSignal.inFocusDisplaying(2);
   
    this.state = {
      notifications: [],
      loading: true,
    };
  }
  componentDidMount() {
  
    OneSignal.addEventListener('received', (notification) => {
      console.log('Notification received: ', notification);
     this.setState({notifications:[...this.state.notifications,notification.payload.additionalData]});
      // const notificationToSave = {
      //   ...notification.payload.additionalData,
      //   body: notification.payload.body,
      //   title: notification.payload.title,
      // };
      //console.log(notificationToSave);
    });
  
this.setState({loading:false});
  }
  

 

  render() {
    const {t} = this.props;
    const {notifications,loading} = this.state;
    const user = this?.context?.user;
   
    const headerComponent = (
      <View style={styles.header}>
        <InfoUser style={styles.user} user={user} />
     
        {loading && (
          <Loading
            ItemComponent={LoadingItemDelivery}
            containerStyle={styles.loading}
          />
        )}
      </View>
    );
    if (!loading && notifications.length < 1) {
      return (
        <View style={styles.viewEmpty}>
          {headerComponent}
          <Card style={styles.cardEmpty}>
            <Image source={require('../assets/images/empty.png')} />
            <Text third medium h3 h3Style={styles.textEmpty}>
              {t('home:text_empty')}
            </Text>
          </Card>
        </View>
      );
    }
    return (
      <View style={styles.viewEmpty}>
      {headerComponent}
  
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        notifications&&notifications.map(data=>(
          
          <NotificationPush style={styles.item} data={data} onClick={()=>{}}/>
          
        ))
      }

  </ScrollView>
    
    </View>
     
  
  


    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 20,
  },
  loading: {
    marginTop: 12,
    marginBottom: 20,
  },
  user: {
    marginTop: 20,
    marginBottom: 30,
  },
  shipping: {
    marginBottom: 30,
  },
  itemDelivery: {
    marginTop: 12,
    marginHorizontal: 20,
  },
  itemDeliveryEnd: {
    marginBottom: 20,
  },
  testStatus: {
    marginBottom: 8,
  },
  viewEmpty: {
    flex: 1,
  },
  item: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  cardEmpty: {
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingHorizontal: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowDefault,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 30,
  },
});

export default withTranslation()(HomeScreen);
