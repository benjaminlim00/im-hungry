import React from 'react';
import { StyleSheet, Text } from 'react-native';

const FancyText = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};
const styles = StyleSheet.create({
  text: { fontFamily: 'Montserrat-Light' },
});

export default FancyText;
