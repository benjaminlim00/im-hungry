import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

const ImageSelect = ({ onPress, getPhoto }) => {
  const _handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        onPress(response);
      }
    });
    type = 'clear';
  };

  return (
    <>
      <Button
        buttonStyle={styles.button}
        title='Upload'
        onPress={_handleChoosePhoto}
        type='outline'
      />
      {getPhoto ? console.warn('photo uploaded') : null}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 40,
  },
});

export default ImageSelect;
