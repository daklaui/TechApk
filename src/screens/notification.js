import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ActivityIndicator, Alert} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Header from '../containers/Header';
import Loading from '../containers/Loading';
import Text from '../components/Text';
import Icon from '../components/Icon';
import ItemNotification from './notification/ItemNotification';
import LoadingItemNotification from './notification/LoadingItemNotification';
import ModalFilterNotification from './notification/ModalFilterNotification';
import FilterIcon from './delivery/FilterIcon';
import {AuthContext} from '../utils/auth-context';
import {
  getNotifications,
  readNotification,
  deleteNotification,
} from '../services/notification-service';

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
    this.fetchNotifications();
  }

  fetchNotifications = async () => {
    try {
      const {page, filter} = this.state;
      const query = {
        page: page,
        per_page: 10,
        notification_status: filter.isRead ? 'read' : 'unread',
        notification_type: filter.status,
      };
      const userToken = this?.context?.userToken ?? '';
      const data = await getNotifications(query, userToken);
      if (data.length <= 10 && data.length > 0) {
        this.setState(prevState => ({
          notifications:
            page === 1
              ? Array.from(data)
              : [...prevState.notifications, ...data],
          loading: false,
          loadingMore: data.length === 10,
          refreshing: false,
        }));
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

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchNotifications();
      },
    );
  };

  handleLoadMore = () => {
    const {loadingMore} = this.state;

    if (loadingMore) {
      this.setState(
        prevState => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        this.fetchNotifications,
      );
    }
  };

  getData = filter => {
    this.setState(
      {
        visitModal: false,
        filter,
        notifications: [],
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
      },
      this.fetchNotifications,
    );
  };
  clickUpdateRead = async id => {
    try {
      const userToken = this?.context?.userToken ?? '';
      await readNotification({message_id: id}, userToken);
      this.getData(this.state.filter);
    } catch (e) {
      console.log('error clickUpdateRead', e);
    }
  };
  clickDelete = id => {
    Alert.alert(
      'Delete notification',
      'Do you want delete it?',
      [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const userToken = this?.context?.userToken ?? '';
            await deleteNotification({message_id: id}, userToken);
            this.getData(this.state.filter);
          } catch (e) {
            console.log('error clickDelete', e);
          }
        },
      },
    ]);
  };

  render() {
    const {theme, t} = this.props;
    const {notifications, refreshing, loading, filter, visitModal} = this.state;
    const {status, isRead} = filter;
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
          rightComponent={
            <FilterIcon
              title={`${statusSelect?.name}${
                isRead ? `, ${t('notification:text_read')}` : ''
              }`}
              onPress={() => this.setState({visitModal: true})}
            />
          }
          centerContainerStyle={styles.header}
        />
        {loading ? (
          <Loading
            ItemComponent={LoadingItemNotification}
            containerStyle={styles.loading}
          />
        ) : (
          <SwipeListView
            useFlatList
            data={notifications}
            keyExtractor={item => item.ID}
            renderItem={({item}) => (
              <View style={styles.itemNotification}>
                <ItemNotification item={item} isRead={filter.isRead} />
              </View>
            )}
            renderHiddenItem={({item}) => (
              <View style={styles.viewButton}>
                {!filter.isRead ? (
                  <Icon
                    name="check"
                    size={20}
                    color={theme.colors.primary}
                    iconStyle={styles.icon}
                    containerStyle={styles.iconCheck}
                    onPress={() => this.clickUpdateRead(item.ID)}
                  />
                ) : null}
                <Icon
                  name="delete-outline"
                  size={20}
                  color={theme.colors.error}
                  iconStyle={styles.icon}
                  onPress={() => this.clickDelete(item.ID)}
                />
              </View>
            )}
            ListHeaderComponent={() => <View style={styles.serepator} />}
            ItemSeparatorComponent={() => <View style={styles.serepator} />}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            leftOpenValue={0}
            rightOpenValue={rightOpenValue}
            showsVerticalScrollIndicator={false}
          />
        )}
        <ModalFilterNotification
          visitModal={visitModal}
          setModalVisible={value => this.setState({visitModal: value})}
          filter={filter}
          types={types}
          clickShow={this.getData}
          titleRead={t('notification:text_read')}
        />
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
});

export default function NotificationScreenComponent(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  return <NotificationScreen {...props} theme={theme} t={t} />;
}
