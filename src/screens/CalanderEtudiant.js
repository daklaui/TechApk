import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-inline-calendar'
import Text from '../components/Text';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Input from '../components/Input';
import ThemeView from '../components/ThemeView';
import Header from '../containers/Header';
import { getSessionsByDateAndIdEtudiant } from '../services/etudiantService';
import { format, formatDistance, formatRelative, addDays } from 'date-fns'
import { AuthContext } from '../utils/auth-context';
const dateItems={};

function CalanderEtudiant(props) {
  const [items, setItems] = React.useState([]);
  console.log(format(addDays(new Date(), 1), 'yyyy-MM-dd'))
  const { user } = React.useContext(AuthContext);

React.useEffect(() => {
  
   getSession(format(new Date(), 'yyyy-MM-dd'));
  
}, [])





  const getSession = async (date) => {
    let data = await getSessionsByDateAndIdEtudiant(user.id, date);
    let it = [];
    console.log(data.data);
    data.data.map((item) => {
      let ob = {
        title: item.titre,
        timeStart: { hour: Number(item.heureDebut.split(':')[0]), minute: Number(item.heureDebut.split(':')[1]) },
        timeEnd: { hour: Number(item.heureFin.split(':')[0]), minute: Number(item.heureFin.split(':')[1]) },
      }
      it.push(ob);
    })


    dateItems[date] = {
      style: {},
      items: it
    };
   console.log()
   setItems(dateItems);
  }


  return (

    <ThemeView style={styles.container} secondary>
      <Header
        leftComponent={
          <Icon
            name="chevron-left"
            size={30}
            onPress={() => props.navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h3 medium>
            {"Calander"}
          </Text>
        }
      />

      <Calendar
        items={items}
        weekStartsOn={1}
        maxMonthsToScroll={3}
        weekMode
        initialDate={new Date()}
        minDate={new Date()}
        scrollable
        onDateSelect={(date)=>getSession(format(new Date(date), 'yyyy-MM-dd')) }
      />


    </ThemeView>
  )



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  textNotification: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 30,
  },
});

export default CalanderEtudiant;