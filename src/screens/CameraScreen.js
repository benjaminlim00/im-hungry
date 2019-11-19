import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UUIDGenerator from 'react-native-uuid-generator';
import ErrorBoundary from '../components/ErrorBoundary';

import { db } from '../config';
const itemsRef = db.ref('/foodRecords');
import {
  _retrieveNutrition,
  _retrievePrediction,
  _uploadImageAsync,
} from '../api';

const CameraScreen = ({ isFocused, navigation }) => {
  const _takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true };
      try {
        const pictureRaw = await this.camera.takePictureAsync(options);
        const photo = pictureRaw.uri;
        const result = await _retrievePrediction(photo);
        navigation.navigate('Diary', {
          previous_screen: 'camera',
          // prediction: result,
          // image: picture.uri,
        });
        const nutritionData = await _retrieveNutrition(result);
        UUIDGenerator.getRandomUUID(uuid => {
          const url = _uploadImageAsync(photo);
          //send image to firebase
          itemsRef.push({
            id: uuid,
            name: result,
            image: url,
            nutritionData: nutritionData,
          });
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
