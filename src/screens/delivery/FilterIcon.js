import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from '../../components/Text';
import {shadowDefault} from '../../utils/shadow';

function FilterIcon({title, onPress}) {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text h6 third h6Style={styles.text}>
        {title}
      </Text>
      <Avatar
        size={40}
        icon={{
          name: 'filter-variant',
          type: 'material-community',
          size: 20,
          color: colors.text,
        }}
        overlayContainerStyle={[
          styles.icon,
          {backgroundColor: colors.secondaryCard},
        ]}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 10,
    textAlign: 'right',
  },
  icon: {
    borderRadius: 4,
    ...shadowDefault,
  },
});

FilterIcon.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};
export default FilterIcon;
