import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Header from '../containers/Header';
import Loading from '../containers/Loading';
import Text from '../components/Text';
import Icon from '../components/Icon';
import ItemNotification from './notification/ItemNotification';
import LoadingItemNotification from './notification/LoadingItemNotification';
import ModalFilterNotification from './notification/ModalFilterNotification';
import FilterIcon from './delivery/FilterIcon';
import { AuthContext } from '../utils/auth-context';
import {
  getNotifications,
  readNotification,
  deleteNotification,
} from '../services/notification-service';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationItems from './delivery/NotificationItems';
import {
  getFormationsByIdEtudiant
} from '../services/etudiantService';
class NotificationScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      page: 1,
      loading: true,
      loadingMore: false,
      refreshing: false,
      filter: {
        isRead: false,
        status: '',
      },
      visitModal: false,
    };
  }

  componentDidMount() {
    console.log("test");
    this.fetchNotifications();
    this.props.navigation.addListener('focus', () => {
      this.fetchNotifications();
    });



  }

  fetchNotifications = async () => {
    try {

      //const userToken = this?.context?.userToken ?? '';
      const data = await getFormationsByIdEtudiant(this.context.user.id);
      if (data.data.length <= 10 && data.data.length > 0) {
        this.setState({
          notifications: data.data,
          loading: false,
          loadingMore: data.data.length === 10,
          refreshing: false,
        });
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        loadingMore: false,
      });
    }
    console.log(this.state.notifications);
  };
  renderFooter = () => {
    if (!this.state.loadingMore) {
      return <View style={styles.footerEmpty} />;
    }

    return (
      <View style={styles.footerLoading}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };



  render() {
    const { theme, t } = this.props;
    const { notifications, refreshing, loading, filter, visitModal } = this.state;
    const { status, isRead } = filter;
    const types = [
      {
        name: t('common:text_all'),
        status: '',
      },
      {
        name: t('notification:text_delivery_assign'),
        status: 'delivery_boy_assign',
      },
      {
        name: t('notification:text_delivery_complete'),
        status: 'delivery_boy_complete',
      },
    ];
    const statusSelect = types.find(value => value.status === status);
    const rightOpenValue = filter.isRead ? -60 : -100;
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Text h2 medium>
              {t('common:text_notification')}
            </Text>
          }

          centerContainerStyle={styles.header}
        />
        {loading ? (
          <Loading
            ItemComponent={LoadingItemNotification}
            containerStyle={styles.loading}
          />
        ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {
                notifications && notifications.map(data => (
                  <NotificationItems style={styles.item} data={data} onClick={() => this.props.navigation.navigate("DetailFormationEtudiant", { data: data })} />
                ))
              }




            </ScrollView>
          )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  loading: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
  },
  itemNotification: {
    paddingHorizontal: 20,
  },
  itemNotificationEnd: {
    marginBottom: 20,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: '100%',
  },
  iconCheck: {
    marginRight: 4,
  },
  icon: {
    marginHorizontal: 10,
  },
  serepator: {
    height: 12,
  },
  footerEmpty: {
    height: 20,
  },
  footerLoading: {
    marginVertical: 20,
  },
  item: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
});

export default function NotificationScreenComponent(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  return <NotificationScreen {...props} theme={theme} t={t} />;
}
