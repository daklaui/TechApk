import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '../components/Text';
import CardEtudiant from '../components/CardEtudiant';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Input from '../components/Input';
import ThemeView from '../components/ThemeView';
import Header from '../containers/Header';
import { getListEtudiantBySession,getListPlaningBySession } from '../services/formateurServices';
import { DefaultTabBar } from 'react-native-scrollable-tab-view';
import BouncyCheckbox from "react-native-bouncy-checkbox";
function DetailSessionFormateur(props) {
  var ScrollableTabView = require('react-native-scrollable-tab-view');
  console.log(props.route?.params?.data);
  const [etudiants, setEtudinats] = React.useState([]);
  const [planings, setPlanings] = React.useState([]);
  const getEtudiants = () => {
    getListEtudiantBySession(props.route?.params?.data).then((data)=>{
      setEtudinats(data.data);
    })
  }
 
  const getPlanings = () => {
    getListPlaningBySession(props.route?.params?.data).then((data)=>{
      setPlanings(data.data);
    })
  }
  React.useEffect(() => {
    getEtudiants();
    getPlanings();
  }, [])




  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="chevron-left"
            type="material-community"
            size={30}
            onPress={() => props.navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h3 medium>
            {'Details Session'}
          </Text>
        }
      />

      <ScrollableTabView
        style={{}}
        renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
      >
        <ScrollView tabLabel='List etudiants'>
          {
          etudiants&&etudiants!=null&&etudiants.map(data=>(
                <CardEtudiant 
                 item={data} />
          ))}
        </ScrollView>

        <ScrollView tabLabel='planning' >
        {
          planings&&planings!=null&&planings.map(data=>(
            <BouncyCheckbox
            isChecked={data.finish}
            textColor="#000"
            fillColor="red"
            text={data.titre}
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
  }
});
export default DetailSessionFormateur;