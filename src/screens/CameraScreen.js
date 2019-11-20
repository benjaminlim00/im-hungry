import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UUIDGenerator from 'react-native-uuid-generator';
import { Snackbar } from 'react-native-paper';
import ErrorBoundary from '../components/ErrorBoundary';

import { db } from '../config';
const itemsRef = db.ref('/foodRecords');
import {
  _asyncRetrieveNutrition,
  _retrievePrediction,
  _uploadImageAsync,
} from '../api';

const CameraScreen = ({ isFocused, navigation }) => {
  const [snackbar, setSnackbar] = useState(false);

  const _takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true };
      try {
        //set snackbar in advance of async calls
        setSnackbar(true);
        const pictureRaw = await this.camera.takePictureAsync(options);
        const photo = pictureRaw.uri;
        const result = await _retrievePrediction(photo);
        const nutritionData = await _asyncRetrieveNutrition(result);
        UUIDGenerator.getRandomUUID(uuid => {
          const url = _uploadImageAsync(photo);
          // console.log('HERE ', nutritionData);
          //send image to firebase
          itemsRef.push({
            id: uuid,
            name: result,
            image: url,
            nutritionData,
          });
        });
        navigation.navigate('Diary', {
          previous_screen: 'camera',
          // prediction: result,
          // image: picture.uri,
        });
      } catch (err) {
        console.log('error', err);
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
        <Snackbar
          duration={2000}
          visible={snackbar}
          onDismiss={() => setSnackbar(false)}
        >
          Analyzing image...
        </Snackbar>
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
    marginBottom: 15,
    alignSelf: 'center',
  },
});

export default withNavigationFocus(CameraScreen);
