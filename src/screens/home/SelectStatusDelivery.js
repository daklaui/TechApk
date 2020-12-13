import React from 'react';
import PropTypes from 'prop-types';

import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes, TouchableOpacity} from 'react-native';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Opacity from '../../components/Opacity';
import Card from '../../components/Card';

import {white, red} from '../../configs/colors';
import {shadowDefault} from '../../utils/shadow';

function SelectStatusDelivery(props) {
  const {style, selectStatus, list} = props;

  return (
    <View style={[styles.list, style]}>
      {list.map(item => (
        <Item
          key={item.type}
          item={item}
          style={styles.item}
          clickItem={() => selectStatus(item.type)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    height: '100%',
  },
});

function Item(props) {
  const {colors} = useTheme();
  const {item, style, clickItem} = props;
  if (!item) {
    return null;
  }
  const typeColor = {
    delivered: {
      count: colors.success,
      icon: white,
      viewIcon: colors.secondary,
      opacity: colors.secondary,
    },
    pending: {
      count: colors.error,
      icon: red,
      viewIcon: colors.warning,
      opacity: colors.error,
    },
  };
  const color = typeColor?.[item.type] ?? typeColor.delivered;
  return (
    <Card
      secondary={false}
      Component={TouchableOpacity}
      style={StyleSheet.flatten([itemStyles.container, style])}
      onPress={clickItem}>
      <View style={itemStyles.content}>
        <View style={itemStyles.iconHeader}>
          <Opacity
            bgColor={color.opacity}
            opacity={0.05}
            style={itemStyles.viewOpacity}>
            <View
              style={StyleSheet.flatten([
                itemStyles.viewIcon,
                {backgroundColor: color.viewIcon},
              ])}>
              <Icon name="truck-check" style={24} color={color.icon}/>
            </View>
          </Opacity>
        </View>
        <Text
          medium
          h5={false}
          style={StyleSheet.flatten([itemStyles.count, {color: color.count}])}>
          {item.count}
        </Text>
        <View style={itemStyles.viewName}>
          <Text medium style={itemStyles.name}>
            {item.name}
          </Text>
          <Icon
            name="chevron-right"
            color={colors.secondaryIcon}
            size={20}
            isRotateRTL
          />
        </View>
      </View>
    </Card>
  );
}

const itemStyles = StyleSheet.create({
  container: {
    borderRadius: 8,
    ...shadowDefault,
  },
  content: {
    overflow: 'hidden',
    borderRadius: 8,
    padding: 18,
    paddingTop: 78,
  },
  iconHeader: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  viewOpacity: {
    width: 124,
    height: 124,
    borderRadius: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    width: 50,
    height: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 36,
    lineHeight: 44,
  },
  viewName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
});

Item.propTypes = {
  item: PropTypes.object.isRequired,
  clickItem: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

Item.defaultProps = {
  style: {},
};

SelectStatusDelivery.propTypes = {
  style: ViewPropTypes.style,
  selectStatus: PropTypes.func.isRequired,
  list: PropTypes.array,
};

SelectStatusDelivery.defaultProps = {
  style: {},
  list: [],
};

export default SelectStatusDelivery;
