import React from 'react';
import { StyleSheet, Text } from 'react-native';

const LightFont = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};
const styles = StyleSheet.create({
  text: { fontFamily: 'Montserrat-Light' },
});

export default LightFont;
