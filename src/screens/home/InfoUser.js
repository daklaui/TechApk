import * as React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from '../../components/Text';
import {getDate} from '../../utils/time';

function InfoUser(props) {
  const {t} = useTranslation();
  const {user, style} = props;
  return (
    <View style={style && style}>
      <Text h2 medium h2Style={styles.name}>{t('home:text_user', {name: user?.display_name})}</Text>
      <Text secondary>{getDate()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    marginBottom: 5,
  },
});

InfoUser.propTypes = {
  user: PropTypes.object,
  style: ViewPropTypes.style,
};

InfoUser.defaultProps = {
  user: {},
  style: {},
};

export default InfoUser;
