import * as React from 'react';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View, FlatList, ActivityIndicator, Image} from 'react-native';
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

class HomeScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      deliveries: [],
      status: 'pending',
      page: 1,
      loading: true,
      loadingMore: false,
      refreshing: false,
      countStatus: {
        pending: 0,
        delivered: 0,
      },
    };
  }
  componentDidMount() {
    this.fetchStatus();
    this.fetchDeliveries();
  }
  fetchStatus = async () => {
    try {
      const user = this?.context?.user ?? {};
      const data = await getDeliveryStat(user.ID);
      this.setState({
        countStatus: data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  fetchDeliveries = async () => {
    try {
      const {page, status} = this.state;
      const query = {
        page: page,
        per_page: 10,
        orderby: 'delivery_id',
        order: 'desc',
        delivery_status: status,
      };
      const userToken = this?.context?.userToken ?? '';
      const data = await getDeliveries(query, userToken);
      if (data.length <= 10 && data.length > 0) {
        this.setState(prevState => ({
          deliveries:
            page === 1 ? Array.from(data) : [...prevState.deliveries, ...data],
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
      // setDeliveries(data);
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
      return null;
    }

    return <ActivityIndicator animating size="small" />;
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchDeliveries();
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
        this.fetchDeliveries,
      );
    }
  };

  updateStatus = value => {
    this.setState(
      {
        status: value,
        deliveries: [],
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
      },
      this.fetchDeliveries,
    );
  };

  onGoBack = () => {
    this.fetchStatus();
    this.updateStatus('delivered');
  };

  render() {
    const {t} = this.props;
    const {deliveries, status, countStatus, refreshing, loading} = this.state;
    const user = this?.context?.user;
    const listStatus = [
      {
        type: 'delivered',
        name: t('common:text_delivered'),
        count: countStatus?.delivered ?? 0,
      },
      {
        type: 'pending',
        name: t('common:text_pending'),
        count: countStatus?.pending ?? 0,
      },
    ];
    const selectStatus =
      listStatus.find(value => value.type === status) || listStatus[0];
    const headerComponent = (
      <View style={styles.header}>
        <InfoUser style={styles.user} user={user} />
        <SelectStatusDelivery
          style={styles.shipping}
          status={status}
          selectStatus={this.updateStatus}
          countStatus={countStatus}
          list={listStatus}
        />
        {(loading || (!loading && deliveries.length > 0)) &&
        selectStatus?.name ? (
          <Text h3 medium h3Style={styles.testStatus}>
            {selectStatus.name}
          </Text>
        ) : null}
        {loading && (
          <Loading
            ItemComponent={LoadingItemDelivery}
            containerStyle={styles.loading}
          />
        )}
      </View>
    );
    if (!loading && deliveries.length < 1) {
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
      <FlatList
        data={deliveries}
        keyExtractor={item => item.delivery_id}
        renderItem={({item, index}) => (
          <ItemDelivery
            item={item}
            style={[
              styles.itemDelivery,
              index === deliveries.length - 1 && styles.itemDeliveryEnd,
            ]}
            onGoBack={this.onGoBack}
          />
        )}
        ListHeaderComponent={headerComponent}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderFooter}
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
        showsVerticalScrollIndicator={false}
      />
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
