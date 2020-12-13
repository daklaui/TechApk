import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from '../../components/Text';
import Card from '../../components/Card';
import {white} from '../../configs/colors';
import {getTimeDate} from '../../utils/time';
import {shadowDefault} from '../../utils/shadow';


function ItemNotification(props) {
  const {colors} = useTheme();
  const {item, style, isRead} = props;
  if (!item) {
    return null;
  }
  const status = {
    delivery_boy_assign: {
      icon: 'account-arrow-right-outline',
      bgColor: colors.error,
    },
    delivery_complete: {
      icon: 'truck-fast',
      bgColor: colors.success,
    },
  };

  const {message, message_type} = item;
  const splitMessage = message.split(' item ');
  const name = splitMessage[1];
  const splitOrderId = splitMessage[0].split('#');
  const typeStatus = status?.[message_type] ?? status.delivery_boy_assign;

  return (
    <Card style={StyleSheet.flatten([styles.container, style])}>
      <Avatar
        size={40}
        rounded
        icon={{
          name: typeStatus.icon,
          type: 'material-community',
          color: white,
          size: 22,
        }}
        overlayContainerStyle={{backgroundColor: typeStatus.bgColor}}
      />
      <View style={styles.right}>
        <Text third style={styles.textOrder}>
          {splitOrderId[0]}
          <Text style={{color: colors.secondary}}>#{splitOrderId[1]}</Text>
        </Text>
        <Text h4 medium h4Style={styles.textName}>
          {name}
        </Text>
        <View style={styles.viewDate}>
          <Text h6 third>
            {getTimeDate(item.created)}
          </Text>
          {!isRead ? <View style={[styles.dot, {backgroundColor: colors.success}]} /> : null}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 21,
    borderRadius: 8,
    flexDirection: 'row',
    ...shadowDefault,
  },
  right: {
    flex: 1,
    marginLeft: 15,
  },
  textOrder: {
    marginBottom: 3,
  },
  textName: {
    marginBottom: 10,
  },
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
});

ItemNotification.typeProps = {
  item: PropTypes.object.isRequired,
  isRead: PropTypes.bool,
  style: ViewPropTypes.style,
};

ItemNotification.defaultProps = {
  isRead: false,
  style: {},
};
export default ItemNotification;
