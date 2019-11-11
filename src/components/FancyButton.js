import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const FancyButton = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <Text styles={styles.text}>Fancy</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default FancyButton;
