import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [userColor, setUserColor] = useState('');

  {/* Function to handle color selection*/} 
  const handleColorSelection = (color) => {
    setUserColor(color);
  };


  return (
      <ImageBackground source={require('../images/backgroundImage.png')} style={styles.image}>
        <Text style={styles.appTitle}>Chatter Box!</Text>
        <View style={styles.container}>
        {/* user inputs name for chat */}
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Please Enter Your Name'
        />
        {/*/ user chooses background color for chat */}
        <Text>Choose Background Color:</Text>
        <View style={styles.colorButtonContainer}>
        <TouchableOpacity 
        style={[styles.colorButton, {backgroundColor: '#93C3CD'}, 
          userColor === '#93C3CD' && styles.selectedColor]} 
        onPress={() => handleColorSelection('#93C3CD')} >
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.colorButton, {backgroundColor: '#E7EFCD'}, 
          userColor === '#E7EFCD' && styles.selectedColor]} 
        onPress={() => handleColorSelection('#E7EFCD')} >
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.colorButton, {backgroundColor: '#FDC2B1'}, 
          userColor === '#FDC2B1' && styles.selectedColor]} 
        onPress={() => handleColorSelection('#FDC2B1')} >
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.colorButton, {backgroundColor: '#E8DDCF'}, 
          userColor === '#E8DDCF' && styles.selectedColor]} 
        onPress={() => handleColorSelection('#E8DDCF')} >
        </TouchableOpacity>
        </View>
        {/* button for user to start chat */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', { name: name })}>
          <Text>Start Chatting</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '20%'
  },
  container: {
    width: '80%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFDF4'
  },
  appTitle: {
    marginBottom: 100,
    fontSize: '45',
    fontWeight: '600',
    justifyContent: 'center'
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTip: 15,
    marginBottom: 15,
    opacit: '50%',
    backgroundColor: '#FCFDF4',
    borderRadius: 5
  },
  colorButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },
  colorButton: {
    marginRight: 20,
    marginLeft: 20,
    width: 40, 
    height: 40,
    borderRadius: 20,
    border: 3,
    borderColor: 'grey'
  },
  selectedColor: {
    borderColor: '#c0c0c0',
    borderWidth: 2
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    radius: '5px',
    backgroundColor: '#FDC2B1',
    borderRadius: 50
  }
});

export default Start;