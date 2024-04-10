import { StyleSheet, Text, View } from 'react-native'
import React , {useState} from 'react'
import { ListItem, Avatar } from '@rneui/base'
import { useEffect } from 'react';
import { db } from '../firebase';
import { onSnapshot, collection, orderBy } from 'firebase/firestore';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "desc"),
      (snapshot) =>
      setChatMessages(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        )
    );

    return unsubscribe;
  }, []);
 
  console.log("Chat messages are", chatMessages);

  return (
   <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
    <Avatar
      rounded
      source={{
        uri: chatMessages?.[0]?.data.photoURL ||
          "https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg",
      }}
    />
    <ListItem.Content>
      <ListItem.Title style={{ fontWeight: "800" }}>
       {chatName}
      </ListItem.Title>
      <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
       {chatMessages?.[0]?.data.displayName}: {chatMessages?.[0]?.data.message}
      </ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})