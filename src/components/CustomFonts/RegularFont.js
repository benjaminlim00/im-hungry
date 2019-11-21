import React from 'react';
import { StyleSheet, Text } from 'react-native';

const RegularFont = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};
const styles = StyleSheet.create({
  text: { fontFamily: 'Montserrat-Regular', fontSize: 21 },
});

export default RegularFont;
