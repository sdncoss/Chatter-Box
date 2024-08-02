import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
//localStorage from React and Expo
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from 'react-native-maps';



const Chat = ({ route, navigation, db, isConnected, storage }) => {
  //imports name and selected user color from start
  const { name, background, userID } = route.params;
  //initiate message
  const [messages, setMessages] = useState([]);

  // setting new message for input
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  };

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
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };
  //calls the custom actions page for adding photos and locations
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  //renders the MapView
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )
    }
    return null;
  }

  //mounting the data from the database and checking user id
  let unsubMessages;

  useEffect(() => {
    //add name from start screen to page
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      //querying the database collecting the messages to deplay messages
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      //function when change to collection 
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        //loops through doc in snapshot
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    //clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  //when isConnected is false loads messages saved on device
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };


  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID
        }}
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;