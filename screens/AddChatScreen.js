import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Input, Button } from "@rneui/base";
import { Icon } from "@rneui/base";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    console.log("The input is: ", input);
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: input
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={() => createChat()}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        } // Add a chat icon
      />
      <Button disabled={!input} onPress={createChat} title="Create new Chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "white",
    height: "100%",
  },
});
