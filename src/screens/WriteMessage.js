import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native'
import ChatItem from './delivery/chatItem';

import OneSignal from 'react-native-onesignal';
import {
    getListSession
} from '../services/formateurServices';
import Header from '../containers/Header';
import Text from '../components/Text';
import { AuthContext } from '../utils/auth-context';
import { getMessages, addMessage, getName } from '../services/chatService';
import { ONE_SIGNAL_APP_ID } from '../configs/constant';
function WriteMessage(props) {
    const { user, userToken, updateUser } = React.useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    OneSignal.init(ONE_SIGNAL_APP_ID);
    OneSignal.inFocusDisplaying(2);
    useEffect(() => {
        getListeMessages()
        OneSignal.addEventListener('received', (notification) => {
            console.log('Notification received: ', notification);
          if(notification.payload.additionalData.idUser!=user.id)
          {
            const nameP = getNameh(notification.payload.additionalData.idUser)
            const message = {
                _id:notification.payload.additionalData.id,
                text:notification.payload.additionalData.text,
                createdAt: new Date( notification.payload.additionalData.createdAt),
                user: {
                    _id:  notification.payload.additionalData.idUser,
                    name: nameP,
                    avatar: 'https://placeimg.com/140/140/any',
                }
            }
            messages.push(message)
            setMessages(messages.reverse());
        }
            // const notificationToSave = {
            //   ...notification.payload.additionalData,
            //   body: notification.payload.body,
            //   title: notification.payload.title,
            // };
            //console.log(notificationToSave);
          });
    }, [])

    const getNameh = async (id) => {
        return await getName(id).data;
    }
    const getListeMessages = async () => {
       
        const data = await getMessages(props.route?.params?.data);
        console.log(data.data);
        data.data.map((d) => {
            const nameP = getNameh(d.idUser)
            const message = {
                _id: d.id,
                text: d.text,
                createdAt: new Date(d.createdAt),
                user: {
                    _id: d.idUser,
                    name: nameP,
                    avatar: 'https://placeimg.com/140/140/any',
                }
            }
            messages.push(message)
            setMessages(messages.reverse());
           
        })
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log(props.route?.params?.data);
        const message = {
            //id:messages[0]._id,
            text: messages[0].text,
            createdAt: messages[0].createdAt,
            idUser: user.id,
            idSession: props.route?.params?.data

        }
        console.log(message)
        addMessage(message).then((data) => {
            console.log(data.data)
        }).catch(e => { console.log(e) })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user.id,
            }}
        />
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



export default WriteMessage
