import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes,TouchableOpacity} from 'react-native';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Badge from '../../components/Badge';
import Card from '../../components/Card';
import currencyFormatter from '../../utils/currency-formatter';
import {gray5} from '../../configs/colors';
import {sizes, lineHeights} from '../../configs/fonts';
import {shadowDefault} from '../../utils/shadow';

function NotificationItemsFormayeur(props) {
  const {colors} = useTheme();
  const {style,data} = props;
  return (

    <View style={style} >
     <TouchableOpacity onPress={()=>props.onClick()}> 
      <Card style={styles.container}>
        <Icon name="receipt" color={colors.secondary} size={20} />
        <View style={styles.right}>
          <View style={styles.headerOrder}>
            <Text
              h3
              medium
              h3Style={[styles.textOrderId, {color: colors.secondary}]}>
           {data.nom_du_session}
            </Text>
            <Badge
              value={data.niveau}
              badgeStyle={styles.badge}
              textStyle={styles.textBadge}
             // status="success"
             status={data.niveau=="debutant"?'success':data.niveau=="intermédiaire"?'warning':'error'}
            />
          </View>
          <Text third style={styles.time}>
        {data.date_de_début} -  {data.date_de_fin}
     
          </Text>
         
          
        </View>
      </Card>
      </TouchableOpacity>
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

NotificationItemsFormayeur.propTypes = {
  delivery: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
  t: PropTypes.func,
};

NotificationItemsFormayeur.defaultProps = {
  style: {},
};

export default NotificationItemsFormayeur;
