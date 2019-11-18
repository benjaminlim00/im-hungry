import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { material } from 'react-native-typography';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import UUIDGenerator from 'react-native-uuid-generator';

import AppBar from '../components/ToolBar';
import { db } from '../config';
const itemsRef = db.ref('/foodRecords');
import {
  _retrieveNutrition,
  _retrievePrediction,
  _uploadImageAsync,
} from '../api';

const UploadImageScreen = ({ navigation }) => {
  const _handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, async response => {
      const photo = response.uri;
      if (photo) {
        try {
          const result = await _retrievePrediction(photo);
          const nutritionData = await _retrieveNutrition(result);

          UUIDGenerator.getRandomUUID(uuid => {
            const url = _uploadImageAsync(photo);
            itemsRef.push({
              id: uuid,
              name: result,
              image: url,
              nutritionData: nutritionData,
            });

            navigation.navigate('Diary', {
              previous_screen: 'upload screen',
            });
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

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
        <Button
          buttonStyle={styles.button}
          title='Upload'
          onPress={_handleChoosePhoto}
          type='outline'
        />
      </View>
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
