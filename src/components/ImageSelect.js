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
        titleStyle={{ color: '#2bbd7e' }}
        buttonStyle={styles.button}
        title='Upload an image'
        onPress={_handleChoosePhoto}
        type='clear'
      />
      {getPhoto ? console.warn('photo uploaded') : null}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#2bbd7e',
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
    margin: 20,
  },
});

export default ImageSelect;
