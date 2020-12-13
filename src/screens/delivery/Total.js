import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from '../../components/Text';
import Card from '../../components/Card';
import currencyFormatter from '../../utils/currency-formatter';
import {shadowDefault} from '../../utils/shadow';

function Total(props) {
  const {colors} = useTheme();
  const {delivery, style, t} = props;
  if (!delivery) {
    return null;
  }
  const {payment_remaining, currency} = delivery;
  return (
    <Card style={StyleSheet.flatten([styles.container, style])}>
      <View style={styles.item}>
        <Text h4 medium>
          {t('delivery_detail:text_total')}
        </Text>
        <Text h3 medium h3Style={{color: colors.primary}}>
          {currencyFormatter(payment_remaining, currency)}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 21,
    ...shadowDefault,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

Total.propTypes = {
  delivery: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
  t: PropTypes.func,
};

Total.defaultProps = {
  style: {},
};

export default Total;
