import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Badge from '../../components/Badge';
import Card from '../../components/Card';
import currencyFormatter from '../../utils/currency-formatter';
import {gray5} from '../../configs/colors';
import {sizes, lineHeights} from '../../configs/fonts';
import {shadowDefault} from '../../utils/shadow';

function OrderItem(props) {
  const {colors} = useTheme();
  const {delivery, style, t} = props;
  if (!delivery) {
    return null;
  }
  const {
    order_id,
    delivery_status,
    items,
    payment_method,
    payment_remaining,
    currency,
  } = delivery;
  const nameStatus =
    delivery_status !== 'delivered' ? delivery_status : 'successful';
  const item = items[0];
  return (
    <View style={style}>
      {delivery_status === 'pending' ? (
        <View style={styles.viewAssign}>
          <Text h3 medium h3Style={{color: colors.primary}}>
            {t('common:text_assign')}
          </Text>
          <Text secondary>June 9, 2020 9:30 am</Text>
        </View>
      ) : null}
      <Card style={styles.container}>
        <Icon name="receipt" color={colors.secondary} size={20} />
        <View style={styles.right}>
          <View style={styles.headerOrder}>
            <Text
              h3
              medium
              h3Style={[styles.textOrderId, {color: colors.secondary}]}>
              {t('delivery_detail:text_order', {id: order_id})}
            </Text>
            <Badge
              value={nameStatus}
              badgeStyle={styles.badge}
              textStyle={styles.textBadge}
              status={delivery_status === 'delivered' ? 'success' : 'error'}
            />
          </View>
          <Text third style={styles.time}>
            June 9, 2020 9:30 am
          </Text>
          <View style={styles.item}>
            <Text secondary medium h4 h4Style={styles.nameItem}>
              {item.quantity}x <Text>{item.name}</Text>
            </Text>
            <Text h4 medium h4Style={{color: colors.primary}}>
              {currencyFormatter(payment_remaining, currency)}
            </Text>
          </View>
          <Text h6 h6Style={styles.payment}>
            {payment_method}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  viewAssign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  container: {
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 21,
    flexDirection: 'row',
    ...shadowDefault,
  },
  right: {
    flex: 1,
    marginLeft: 5,
  },
  headerOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  textOrderId: {
    flex: 1,
  },
  badge: {
    height: 21,
    borderRadius: 4,
  },
  textBadge: {
    fontSize: sizes.h6,
    paddingHorizontal: 7,
    lineHeight: lineHeights.h6,
  },
  time: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  nameItem: {
    flex: 1,
    marginRight: 10,
  },
  payment: {
    color: gray5,
  },
});

OrderItem.propTypes = {
  delivery: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
  t: PropTypes.func,
};

OrderItem.defaultProps = {
  style: {},
};

export default OrderItem;
