import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppBar from '../components/ToolBar';
import ImageSelect from '../components/ImageSelect';

const UploadImageScreen = () => {
  const [photo, setPhoto] = useState(null);

  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <ImageSelect onPress={setPhoto} getPhoto={photo} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default UploadImageScreen;
