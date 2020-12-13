import * as React from 'react';
import PropTypes from 'prop-types';
import split from 'lodash/split';
import join from 'lodash/join';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  View,
  ViewPropTypes,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from '../../components/Text';
import Card from '../../components/Card';
import {shadowDefault} from '../../utils/shadow';

function ItemInfo(props) {
  const {item, dataMap, urlMap} = props;
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <Card style={styles.item}>
      <View style={styles.itemRow(colors.border)}>
        <View style={styles.itemLeft}>
          <Text fifth style={styles.nameItem}>
            {item.titleName}
          </Text>
          <Text h4 medium>
            {item.name}
          </Text>
        </View>
        <Avatar
          size={40}
          rounded
          icon={{
            name: item.iconName,
            type: 'material-community',
            size: 24,
          }}
          overlayContainerStyle={{backgroundColor: colors.thirdText}}
        />
      </View>
      <TouchableOpacity
        style={styles.itemRow(colors.border)}
        onPress={() => Linking.openURL(`tel:${item.phone}`)}>
        <View style={styles.itemLeft}>
          <Text fifth style={styles.nameItem}>
            {item.titlePhone}
          </Text>
          <Text h4 medium>
            {item.phone}
          </Text>
        </View>
        <Avatar
          size={40}
          rounded
          icon={{
            name: 'phone',
            type: 'material-community',
            size: 24,
          }}
          overlayContainerStyle={{backgroundColor: colors.primary}}
        />
      </TouchableOpacity>
      <View style={styles.itemRow('transparent')}>
        <View style={styles.itemLeft}>
          <Text fifth style={styles.nameItem}>
            {item.titleAddress}
          </Text>
          <Text h4 medium>
            {item.address}
          </Text>
        </View>
        <View>
          <Avatar
            size={40}
            rounded
            icon={{
              name: 'directions',
              type: 'material-community',
              size: 24,
            }}
            overlayContainerStyle={{backgroundColor: colors.primary}}
            containerStyle={{marginBottom: 15}}
            onPress={() =>
              navigation.navigate('DeliveryAddressScreen', {data: dataMap})
            }
          />
          <Avatar
            size={40}
            rounded
            icon={{
              name: 'google-maps',
              type: 'material-community',
              size: 24,
            }}
            overlayContainerStyle={{backgroundColor: colors.secondary}}
            onPress={() => Linking.openURL(urlMap)}
          />
        </View>
      </View>
    </Card>
  );
};

function InfoUser(props) {
  const {colors} = useTheme();
  const [visitCurrent, setVisitCurrent] = React.useState('customer');
  const {customer, shipping, store, style, t} = props;
  if (!customer || !shipping || !store) {
    return null;
  }
  const {name, phone} = customer;
  const data = [
    {
      id: 'customer',
      name: name,
      phone: phone,
      address: shipping.address_1,
      titleName: t('delivery_detail:text_customer_name'),
      titlePhone: t('delivery_detail:text_customer_phone'),
      titleAddress: t('delivery_detail:text_customer_address'),
      iconName: 'account-circle-outline',
    },
    {
      id: 'store',
      name: store.name,
      phone: '+943368982914',
      address: store?.address?.street_1,
      titleName: t('delivery_detail:text_store_name'),
      titlePhone: t('delivery_detail:text_store_phone'),
      titleAddress: t('delivery_detail:text_store_address'),
      iconName: 'store',
    },
  ];

  const dataMap = {
    from: {
      address: store?.address?.street_1,
      coordinate: {
        lat: store?.address_coordinate?.store_lat,
        lng: store?.address_coordinate?.store_lng,
      },
    },
    to: {
      address: shipping.address_1,
      coordinate: {},
    },
  };
  const linkGoogleMap = `https://www.google.com/maps/dir/${join(split(data[1].address, ' '), '+')}/${ join(split(data[0].address, ' '), '+')}?hl=en`;
  const selectVisit = data.find(value => value.id === visitCurrent) || data[0];
  return (
    <View style={style}>
      <View style={styles.header}>
        <Text
          medium
          h4
          h4Style={[
            styles.touchHeader(colors.textButtonGroup),
            visitCurrent === 'customer' && styles.selectHeader(colors.secondary),
          ]}
          onPress={() => setVisitCurrent('customer')}>
          {t('delivery_detail:text_customer')}
        </Text>
        <Text
          medium
          h4
          h4Style={[
            styles.touchHeader(colors.textButtonGroup),
            visitCurrent === 'store' && styles.selectHeader(colors.secondary),
          ]}
          onPress={() => setVisitCurrent('store')}>
          {t('delivery_detail:text_store')}
        </Text>
      </View>
      <ItemInfo item={selectVisit} dataMap={dataMap} urlMap={linkGoogleMap} />
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  touchHeader: color => ({
    marginHorizontal: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'transparent',
    color,
  }),
  selectHeader: color => ({
    color: color,
    borderColor: color,
  }),
  item: {
    borderRadius: 8,
    paddingHorizontal: 18,
    ...shadowDefault,
  },
  itemRow: color => ({
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color,
  }),
  itemLeft: {
    flex: 1,
    marginRight: 16,
  },
  nameItem: {
    marginBottom: 5,
  },
};

InfoUser.propTypes = {
  customer: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  shipping: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
  t: PropTypes.func,
};

InfoUser.defaultProps = {
  style: {},
};
export default InfoUser;
