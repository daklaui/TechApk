import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text as ReactText } from 'react-native';
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

import { markDelivery } from '../services/delivery-service';
import { getFormationById ,inscription,getSessionByIdFormation} from '../services/formationService';
import { AuthContext } from '../utils/auth-context';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import { DownloadImages } from '../services/etudiantService';
import ItemDelivery from '../containers/ItemDelivery';
import { Alert } from 'react-native';
const { width, height } = Dimensions.get('window');
function DeliveryDetailScreen(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const {userToken,user} = React.useContext(AuthContext);
  const [item, setItem] = React.useState({});
  const [listSessions, setListSessions] = React.useState([]);
  const [photo, setPhoto] = React.useState("");
  const [idSession, setIdSession] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const { navigation, route } = props;
  const data = route?.params?.data ?? null;
  //const idFormation = route?.params?.idformation ?? null;
  console.log("id = " + user.id);
  const handelModel = (id) => {
  
    setIdSession(id);
    setVisible(true);
  };
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
          {item.titre}
        </Text>
      }
    />
  );

  React.useEffect(() => {
    getDetFormation();
  }, []);
  const getImage =(photoname)=>
  {
     setPhoto("");
     DownloadImages(photoname).then((data)=>{
      setPhoto("data:image/png;base64,"+data.data)
     })
  } 

  const getDetFormation = async () => {
    const response = await getFormationById(data);
    const responseSession=await getSessionByIdFormation(data);
    getImage(response.data.image);
    setItem(response.data);
    setListSessions(responseSession.data);
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
      const result = await inscription(idSession,user.id);
       alert(result.data);
    } catch (e) {
    
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      {header}


      <View style={{ flex: 1, flexDirection: "column" }}>
        <Image source=
          {{ uri: photo }}
          style={{
            width: width - 30,
            height: height / 4,
            borderRadius: 10, alignSelf: 'center',
          }} />

        <View
          style={{

            marginLeft: 20,
            marginRight: 20,
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ReactText style={{ fontSize: 20, fontWeight: 'bold' }}>{item.titre}</ReactText>

        </View>
        <ReactText numberOfLines={4} ellipsizeMode="tail"
          style={{
            color: 'grey',
            margin: 20,
            fontSize: 16,
            lineHeight: 22,

          }}>
            
          {item.description}
          
        </ReactText>
        <View
          style={{

            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ReactText style={{ fontSize: 20, fontWeight: 'bold' }}>{"Sessions"}</ReactText>
          <View style={styles.priceTag}>
            <ReactText
              style={{
                marginLeft: 15,
                color: "white",
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Total Sessions : {listSessions == null ? 0 : listSessions.length}
            </ReactText>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
      
          {listSessions && listSessions.map((it) => (
       
           <OrderItem style={styles.item} data={it} onClick={()=>handelModel(it.id)} />

          ))}
          {/* <OrderItem style={styles.item} onClick={handelModel} />
          <OrderItem style={styles.item} onClick={handelModel} />
          <OrderItem style={styles.item} onClick={handelModel} />
          <OrderItem style={styles.item} onClick={handelModel} />
          <OrderItem style={styles.item} onClick={handelModel} />
          <OrderItem style={styles.item} onClick={handelModel} />
          <OrderItem style={styles.item} onClick={handelModel} />
          <OrderItem style={styles.item} onClick={handelModel} />
        */}

        </ScrollView>

      </View>

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
            voulez vous  inscrire a cette formation ?
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
    flexDirection: "column"
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

  detailsContainer: {
    flex: 0.55,
    backgroundColor: "#ecf0f1",
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: "#ecf0f1",
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: 'bold', fontSize: 28 },
  buyBtn: {
    width: "100%",
    height: 50,
    top: 130,
    backgroundColor: "#253575",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,


  },
  priceTag: {
    backgroundColor: "#253575",
    width: 170,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default DeliveryDetailScreen;
