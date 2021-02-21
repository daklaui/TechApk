import React from 'react'
import { View, StyleSheet, Image, Dimensions,TouchableOpacity} from 'react-native'
import {useTheme} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';

import Text from './Text';
import Card from './Card';
//import Icon from './Icon';
import {gray2} from '../configs/colors';
import {shadowDefault} from '../utils/shadow';



const CardEtudiant = ({ item }) => {
    const {colors} = useTheme();
    console.log(item);
    const propAvatar = item?.avatar
    ? {
        source: {uri: item.avatar}
      }
    : {};
    return (
        <View style={styles.cardView}>
           <Card
           // Component={TouchableOpacity}
            style={[styles.box, styles.row, styles.userInfo]}
            >
            <Avatar
              size={60}
              rounded
              icon={{
                name: 'file-download',
                size: 30,
                type: 'material-community',
                color: colors.secondaryText,
              }}
              
              overlayContainerStyle={styles.avatar}
              {...propAvatar}
            />
            <View style={styles.viewName}>
              <Text h4 medium h4Style={styles.textNameUser}>
                {item?.titre}
              </Text>
             
            </View>
           
          </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        borderRadius: 8,
        ...shadowDefault,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      userInfo: {
        padding: 20,
        paddingRight: 5,
        marginTop: 10,
      },
      avatar: {
        backgroundColor: gray2,
      },
      viewName: {
        flex: 1,
        marginHorizontal: 15,
      },
      textNameUser: {
        marginBottom: 2,
      },
})

export default CardEtudiant