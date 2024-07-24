import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  //imports name and selected user color from start
    const { name, userColor } = route.params;
//add name to top of page
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);
    
 return (
   <View style={[styles.container, { backgroundColor: userColor }]}>
     <Text>Future Chat Box</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;