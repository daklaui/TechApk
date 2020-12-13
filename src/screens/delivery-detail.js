import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ScrollView} from 'react-native';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Opacity from '../components/Opacity';
import Card from '../components/Card';
import Header from '../containers/Header';
import OrderItem from './delivery/OrderItem';
import InfoUser from './delivery/InfoUser';
import Total from './delivery/Total';

import {markDelivery} from '../services/delivery-service';
import {AuthContext} from '../utils/auth-context';

function DeliveryDetailScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {userToken} = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const {navigation, route} = props;
  const data = route?.params?.data ?? null;
  const header = (
    <Header
      leftComponent={
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
          isRotateRTL
        />
      }
      centerComponent={
        <Text h3 medium>
          {t('common:text_delivery_detail')}
        </Text>
      }
    />
  );

  if (!data || !data?.delivery_id) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.empty}>
          <Text>Empty</Text>
        </View>
      </View>
    );
  }
  const footer =
    data?.delivery_status === 'pending' ? (
      <Card style={styles.footer}>
        <Button
          title={t('delivery_detail:text_button_delivered')}
          onPress={() => setVisible(true)}
        />
      </Card>
    ) : null;
  const clickConfirm = async () => {
    try {
      setVisible(false);
      const result = await markDelivery(
        {
          delivery_id: data?.delivery_id,
        },
        userToken,
      );
      if(result?.status === true && route?.params?.onGoBack) {
        route.params.onGoBack();
      }
      navigation.goBack();
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      {header}
      <ScrollView showsVerticalScrollIndicator={false}>
        <OrderItem delivery={data} style={styles.item} t={t}/>
        <InfoUser
          customer={data.customer}
          store={data.store}
          shipping={data.shipping_address}
          style={styles.item}
          t={t}
        />
        <Total delivery={data} style={styles.item} t={t}/>
      </ScrollView>
      {footer}
      <Modal
        visible={visible}
        setModalVisible={value => setVisible(value)}
        type="notification">
        <View style={styles.viewModal}>
          <Opacity
            bgColor={colors.primary}
            opacity={0.1}
            style={styles.iconModal}>
            <Icon name="check-decagram" size={30} color={colors.primary} />
          </Opacity>
          <Text h4 medium h4Style={styles.textModal}>
            {t('delivery_detail:text_text_delivered')}
          </Text>
          <View style={styles.viewButtonModal}>
            <Button
              title={t('common:text_confirm')}
              small
              buttonStyle={styles.button}
              containerStyle={styles.containerButton}
              onPress={clickConfirm}
            />
            <Button
              title={t('common:text_cancel')}
              small
              secondary
              buttonStyle={styles.button}
              containerStyle={styles.containerButton}
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  content: {
    marginHorizontal: 20,
  },
  item: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  viewModal: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  iconModal: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  textModal: {
    textAlign: 'center',
    marginBottom: 40,
  },
  viewButtonModal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
  },
  containerButton: {
    marginHorizontal: 5,
  },
});

export default DeliveryDetailScreen;
