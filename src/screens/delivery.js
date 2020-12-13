import * as React from 'react';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import ItemDelivery from '../containers/ItemDelivery';
import Header from '../containers/Header';
import Loading from '../containers/Loading';
import LoadingItemDelivery from '../containers/LoadingItemDelivery';
import Text from '../components/Text';
import FilterIcon from './delivery/FilterIcon';
import ModalFilterDelivery from './delivery/ModalFilterDelivery';
import {AuthContext} from '../utils/auth-context';
import {getDeliveries} from '../services/delivery-service';

class DeliveryScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      deliveries: [],
      page: 1,
      loading: true,
      loadingMore: false,
      refreshing: false,
      status: '',
      visitModal: false,
    };
  }
  componentDidMount() {
    this.fetchDeliveries();
  }
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
  getData = status => {
    this.setState(
      {
        visitModal: false,
        status,
        deliveries: [],
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
      },
      this.fetchDeliveries,
    );
  };

  render() {
    const {t} = this.props;
    const {deliveries, refreshing, loading, visitModal, status} = this.state;
    const types = [
      {
        name: t('common:text_all'),
        status: '',
      },
      {
        name: t('common:text_delivered'),
        status: 'delivered',
      },
      {
        name: t('common:text_pending'),
        status: 'pending',
      },
    ];
    const statusSelect = types.find(value => value.status === status);
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Text h2 medium>
              {t('common:text_deliveries')}
            </Text>
          }
          rightComponent={
            <FilterIcon
              title={statusSelect?.name}
              onPress={() => this.setState({visitModal: true})}
            />
          }
          centerContainerStyle={styles.header}
        />
        {loading ? (
          <Loading
            ItemComponent={LoadingItemDelivery}
            containerStyle={styles.loading}
          />
        ) : (
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
                onGoBack={() => this.getData('delivered')}
              />
            )}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            showsVerticalScrollIndicator={false}
          />
        )}
        <ModalFilterDelivery
          visitModal={visitModal}
          setModalVisible={value => this.setState({visitModal: value})}
          valueSelect={status}
          types={types}
          clickShow={this.getData}
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
  loading: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
  },
  itemDelivery: {
    marginHorizontal: 20,
    marginTop: 12,
  },
  itemDeliveryEnd: {
    marginBottom: 20,
  },
});

export default withTranslation()(DeliveryScreen);
