import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, docs, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  //imports name and selected user color from start
  const { name, background, userID } = route.params;
  //initiate message
  const [messages, setMessages] = useState([]);

  // setting new message for input
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }
  //chang to bubble colors
  const renderBubble = (props) => {
    return <Bubble {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#829D93"
      },
      left: {
        backgroundColor: "#FCFDF4"
      }
    }}
    />
  }

  useEffect(() => {
    //add name from start screen to page
    navigation.setOptions({ title: name });
    //querying the database collecting the messages to deplay messages
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({ 
                  id: doc.id, 
                  ...doc.data(), 
                  createdAt: new Date(doc.data().createdAt.toMillis())
                })
            });
            setMessages(newMessages);
        });
        //clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
  }, []);



  return (
    <View style={[styles.container, { backgroundColor: background }]}> 
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;