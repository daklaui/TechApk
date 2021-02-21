import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Dimensions, Text as ReactText } from 'react-native';
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
import {getListPlaningBySession,getFormationById} from '../services/formationService';

import { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Icon as IconReact } from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap } from 'react-native-tab-view';
import { markDelivery } from '../services/delivery-service';
import { AuthContext } from '../utils/auth-context';
import { Image } from 'react-native';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { DownloadImages } from '../services/etudiantService';
const { width, height } = Dimensions.get('window');
function formationParEtudiant(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { userToken } = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [planing,setPlaning]=React.useState([]);
  const { navigation, route } = props;
  const[photo,setPhoto]=React.useState();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const data = route?.params?.data ?? null;
console.log(data)

  React.useEffect(() => {
    getPlaning();
    getFormationById(data.idFormation).then((d)=>{
      getImage(d.data.image);
    })
  
    console.log(index);
  }, []);

  const getImage =(photoname)=>
    {
       setPhoto("");
       DownloadImages(photoname).then((data)=>{
        setPhoto("data:image/png;base64,"+data.data)
       })
    } 
  const getPlaning = async () => {
    const response=await getListPlaningBySession(data.id);
    let i=0;

    response.data.map((data)=>{data.isFinish?i++:0});
    const x=response.data.length;
    if(x>0)
    {
      setIndex((2/6)*100);
    }
    setIndex((3/6)*100);
    setPlaning(["Introduction","Objectifs de la POO","Encapsulation, héritage et  polymorphisme","Classe et objet","Méthodes et attributs","Hiérarchie de classe"]);
    console.log(response.data);
   
  }



  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );

  var ScrollableTabView = require('react-native-scrollable-tab-view');
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


  
  return (
    <View style={styles.container}>

      {header}

      <Image source=
        {{ uri: photo}}
        style={{
          width: width - 30,
          height: height / 4,
          borderRadius: 10, alignSelf: 'center',
        }} />
      <OrderItem style={{
        marginLeft: 15, marginRight: 15, marginTop: 10
      }} data={data}/>
      <InfoUser
        customer={""}
        store={""}
        shipping={""}
        style={""}
        t={t}
      />
     
      <Card style={styles.footer}>
        <ScrollView>

          <ProgressBarClassic progress={index} />
        </ScrollView>
      </Card>

      <ScrollableTabView
       
        renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}


      >
        <ScrollView tabLabel='planning' style={{ height: 500 }} >
          {planing&&planing.map((item,index)=>(
          <BouncyCheckbox
            isChecked={index<3}
            textColor="#000"
            fillColor="red"
            text={item}
            onPress={(checked) => console.log("Checked: ", checked)}
          />
          ))}

        </ScrollView>
        <ScrollView tabLabel='documents'>

        </ScrollView>
      </ScrollableTabView>
     
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10
    , borderRadius: 20
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
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: 20,
  },
  containerButton: {
    marginHorizontal: 5,
  },
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingLeft: 65,
    paddingRight: 65,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: 'red',
    borderRadius: 3,
    width: 15,
  },
});

export default formationParEtudiant;
