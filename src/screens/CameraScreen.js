import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorBoundary from '../components/ErrorBoundary';

const CameraScreen = ({ isFocused, navigation }) => {
  const _takePicture = async () => {
    const _retrievePrediction = picture => {
      //call keng api here
      return 'bibimbap';
    };

    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      try {
        const picture = await this.camera.takePictureAsync(options);
        // console.warn('photo taken: ' + picture.uri);
        const result = await _retrievePrediction(picture.uri);
        navigation.navigate('Diary', {
          prediction: result,
          previous_screen: 'camera',
          image: 'https://picsum.photos/200',
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        {isFocused && (
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
        )}
        <TouchableOpacity style={styles.captureButton} onPress={_takePicture}>
          <Icon name='camera' size={30} color='black' />
        </TouchableOpacity>
      </View>
    </ErrorBoundary>
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

export default withNavigationFocus(CameraScreen);
