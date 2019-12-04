import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { material } from 'react-native-typography';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import UUIDGenerator from 'react-native-uuid-generator';
import { Snackbar } from 'react-native-paper';

import ErrorModal from './ErrorModal';
import AppBar from '../components/ToolBar';
import { db } from '../config';
const itemsRef = db.ref('/foodRecords');
import {
  _retrieveNutrition,
  _retrievePrediction,
  _uploadImageAsync,
} from '../api';

const UploadImageScreen = ({ navigation }) => {
  const [snackbar, setSnackbar] = useState(false);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const _handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, async response => {
      const photo = response.uri;
      if (photo) {
        try {
          setDisabled(true);
          //set snackbar in advance of async calls
          setSnackbar(true);

          _retrievePrediction(photo).then(result =>
            _retrieveNutrition(result).then(nutritionData => {
              console.log('nutrition data', nutritionData);
              UUIDGenerator.getRandomUUID(uuid => {
                const url = _uploadImageAsync(photo);
                //send image to firebase
                itemsRef.push({
                  id: uuid,
                  name: result,
                  image: url,
                  nutritionData,
                });
              });
              //remove disable button
              setDisabled(false);

              navigation.navigate('Diary', {
                previous_screen: 'upload screen',
                // prediction: result,
                // image: picture.uri,
              });
            }),
          );
        } catch (err) {
          console.log('error in uploadImageScreen');
          //handle error for invalid food item here, pop modal
          setModal(true);
        }
      }
    });
  };

  return (
    <View
      style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF' }}
    >
      <ErrorModal isModalVisible={modal} toggleModal={toggleModal} />
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
          marginTop: -14,
        }}
      >
        {/* <Text style={material.headline}>Forgot to record a meal?</Text> */}
        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 21 }}>
          Forgot to record a meal?
        </Text>
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
        <Button
          buttonStyle={styles.button}
          title='Upload'
          onPress={_handleChoosePhoto}
          type='outline'
          disabled={disabled}
        />
      </View>
      <Snackbar
        duration={6000}
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
      >
        Analyzing image...
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    margin: 40,
  },
});

export default UploadImageScreen;
