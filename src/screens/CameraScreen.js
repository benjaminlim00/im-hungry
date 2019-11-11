import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CameraScreen = () => {
  const _takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.warn('photo taken: ' + data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.cameraView}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <TouchableOpacity style={styles.captureButton} onPress={_takePicture}>
        <Icon name='camera' size={30} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f9f9f9',
    // borderColor: '#2bbd7e',
    // borderWidth: 1,
  },

  cameraView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  // imagePickerView: {
  //   padding: 13,
  //   flexDirection: 'column',
  //   backgroundColor: '#f9f9f9',
  // },
  captureButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default CameraScreen;
