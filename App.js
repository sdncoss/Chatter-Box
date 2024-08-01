//import screens
import Start from "./components/Start";
import Chat from './components/Chat';
//importing react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//initializing Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
//on/offline detector
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

//create navigator
const Stack = createNativeStackNavigator();


const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCOIyGhPuUsPgk2yYlJB-O05eeMrFn-Vio",
    authDomain: "chatterbox-6f992.firebaseapp.com",
    projectId: "chatterbox-6f992",
    storageBucket: "chatterbox-6f992.appspot.com",
    messagingSenderId: "109879955332",
    appId: "1:109879955332:web:4a460c67718b7c63cd17d1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  //on/off-line detector and alert
  const connectionStatus = useNetInfo();
  
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost! New messages will load when data or wifi is reconnected");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;