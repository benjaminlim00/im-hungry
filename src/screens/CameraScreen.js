import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ImageSelect from '../components/ImageSelect';
import {Button} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';

const CameraScreen = () => {
  const [photo, setPhoto] = useState(null);

  const _takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
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
      <View style={styles.view}>
        <Button
          titleStyle={{color: '#2bbd7e'}}
          buttonStyle={styles.button}
          title="Capture"
          onPress={_takePicture}
          type="clear"
        />

        <ImageSelect onPress={setPhoto} getPhoto={photo} />
      </View>
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
    // borderColor: '#2bbd7e',
    // borderWidth: 1,
  },

  button: {
    borderColor: '#2bbd7e',
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  view: {
    padding: 20,
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    backgroundColor: '#f9f9f9',
  },
});

export default CameraScreen;
