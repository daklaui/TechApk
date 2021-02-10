import * as React from 'react';
import { withTranslation } from 'react-i18next';
import {
  StyleSheet, View, FlatList, ActivityIndicator, Keyboard,
  TouchableOpacity,
  Animated,
  Dimensions, TextInput
} from 'react-native';
import ItemDelivery from '../containers/ItemDelivery';
import Header from '../containers/Header';
import Loading from '../containers/Loading';
import LoadingItemDelivery from '../containers/LoadingItemDelivery';
import Text from '../components/Text';
import FilterIcon from './delivery/FilterIcon';
import ModalFilterDelivery from './delivery/ModalFilterDelivery';
import { AuthContext } from '../utils/auth-context';
import { getAllFormations, searchFormation } from '../services/formationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from '../components/Item';
const listItems2 = [
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "Office Productivity", Description: "Office Productivity" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "Photography", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "Marketing", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "Design", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "Personal Development", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "Development", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "Health & Fitness", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "LifeStyle", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "LifeStyle", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "LifeStyle", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "LifeStyle", Description: "LifeStyle" },
  { image: "https://sokeo.fr/wp-content/uploads/2020/01/chris-ried-ieic5Tq8YMk-unsplash1-768x513.jpg", Titre: "LifeStyle", Description: "LifeStyle" }
]
const { width, heigth } = Dimensions.get('window');
class Formations extends React.Component {
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
  fetchDeliveriesByTitre = async (titre) => {
    try {
      this.setState({
        loading: true,
      });
      const data = await searchFormation(titre);
      this.setState({ deliveries: data.data, loading: false, refreshing: false });
    }
    catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        loadingMore: false,
      });
    }
  }

  fetchDeliveries = async () => {
    try {
      const data = await getAllFormations();
      //console.table(data.data);
      if (data.data.length > 0) {
        /*this.setState(prevState => ({
          deliveries:
            page === 1 ? Array.from(data) : [...prevState.deliveries, ...data.data],
          loading: false,
          loadingMore: data.length === 10,
          refreshing: false,
        }));*/
        this.setState({ deliveries: data.data, loading: false, refreshing: false });
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
    const { loadingMore } = this.state;

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
  searchFormationByTitre = (text) =>{
     console.log(text);
    if (text.length>0) {
      this.fetchDeliveriesByTitre(text);
    }
    else {
      this.setState({
        loading: true,
      
      });
      this.fetchDeliveries();
    }
  }
  render() {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const { t } = this.props;
    const { deliveries, refreshing, loading, visitModal, status } = this.state;
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
         
          centerContainerStyle={styles.header}
        />
        <View style={{
          backgroundColor: "#FFF",
          paddingVertical: 4,
          left: -20,
          width: "90%",
          paddingHorizontal: 20,
          marginHorizontal: 40,
          borderRadius: 15,
          top: 0,
          flexDirection: "row",
          alignItems: "center"
        }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="black"
            style={{
              fontWeight: "bold",
              fontSize: 18,
              height: 40,
              width: 300
            }}
           
          onChangeText={(value) => this.searchFormationByTitre(value)}
          />
          <TouchableOpacity >
            <Icon
              name="search"
              size={20}
              color='black'
              onPress={() => console.log("ss")}
            />
          </TouchableOpacity>

        </View>
        {loading ? (
          <Loading
            ItemComponent={LoadingItemDelivery}
            containerStyle={styles.loading}
          />
        ) : (
            <FlatList
              data={deliveries}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({ item }) => {
                return <TouchableOpacity onPress={() => this.props.navigation.navigate("DeliveryDetailScreen", { data: item.id })}><Item item={item} /></TouchableOpacity>
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }]
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
          setModalVisible={value => this.setState({ visitModal: value })}
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

export default withTranslation()(Formations);
