import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { material } from 'react-native-typography';

import AppBar from '../components/ToolBar';

const DeletedScreen = ({ navigation }) => {
  const onPress = () => {
    // console.log('exiting...');
    navigation.navigate('Diary');
  };

  return (
    <View
      style={{ flex: 1, flexDirection: 'column', backgroundColor: '#74BFC2' }}
    >
      <AppBar />
      <Image
        style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 70 }}
        source={require('../assets/delete_background.png')}
      />

      <View
        style={{
          // borderColor: 'red',
          // borderWidth: 1,
          alignSelf: 'center',
          marginTop: 25,
        }}
      >
        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 21 }}>
          Record has been deleted
        </Text>
      </View>

      <View
        style={{
          // borderColor: 'red',
          // borderWidth: 1,
          marginTop: 20,
          alignSelf: 'center',
          flex: 1,
        }}
      >
        <Text style={material.caption}>Pssssh, we will forget about that</Text>
      </View>

      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    width: '70%',
    height: 40,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 2,
    marginBottom: 30,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
    letterSpacing: 1.3,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
});

export default DeletedScreen;
