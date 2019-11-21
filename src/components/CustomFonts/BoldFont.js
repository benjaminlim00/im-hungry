import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BoldFont = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};
const styles = StyleSheet.create({
  text: { fontFamily: 'Montserrat-Bold' },
});

export default BoldFont;
