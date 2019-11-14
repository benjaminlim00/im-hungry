import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import AppBar from '../components/ToolBar';
import ImageSelect from '../components/ImageSelect';
import { material } from 'react-native-typography';

const UploadImageScreen = () => {
  const [photo, setPhoto] = useState(null);

  return (
    <View
      style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' }}
    >
      <AppBar />
      <Image
        style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 70 }}
        source={require('../assets/upload_background.png')}
      />

      <View
        style={{
          // borderColor: 'red',
          // borderWidth: 1,
          alignSelf: 'center',
          marginTop: -17,
        }}
      >
        <Text style={material.headline}>Forgot to record a meal?</Text>
      </View>

      <View
        style={{
          // borderColor: 'red',
          // borderWidth: 1,
          marginTop: 20,
          alignSelf: 'center',
        }}
      >
        <Text style={material.caption}>
          Don't worry, simply upload past photos to add new records
        </Text>
      </View>

      <View style={styles.container}>
        <ImageSelect onPress={setPhoto} getPhoto={photo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default UploadImageScreen;
