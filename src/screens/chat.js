import React from 'react'
import { View,StyleSheet,ScrollView } from 'react-native'
import ChatItem from '../screens/delivery/chatItem';
import {
    getSessionByIdFormateur
} from '../services/formateurServices';
import Header from '../containers/Header';
import Text from '../components/Text';
import { AuthContext } from '../utils/auth-context';
import {
    getFormationsByIdEtudiant
  } from '../services/etudiantService';
function chat(props) {
  const  [sessions, setSessions] = React.useState([])
  const { user, userToken, updateUser } = React.useContext(AuthContext);

  React.useEffect(() => {

    getSessionByIdUserFn()
  }, [])


const getSessionByIdUserFn=async()=>{
    if(user.type=="etudiant")
    {
        const s=await getFormationsByIdEtudiant(user.id);
        console.log(s.data);
        setSessions(s.data)
    }
    else{
        const s=await getSessionByIdFormateur(user.id);
        console.log(s.data);
        setSessions(s.data)
    }

}

    return (
        <View>
            <Header
                leftComponent={
                    <Text h2 medium>
                        {'Chat'}
                    </Text>
                }

                centerContainerStyle={styles.header}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
            {
                sessions&&sessions.map((data)=>(
                  
                <ChatItem style={styles.item} data={data.nom_du_session} onClick={()=>props.navigation.navigate("WriteMessage",{data:data.id})}/>
                ))
            }
        
        


        </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 0,
    },
    item: {
        marginBottom: 30,
        marginHorizontal: 20,
      },
  });
  

  
export default chat
