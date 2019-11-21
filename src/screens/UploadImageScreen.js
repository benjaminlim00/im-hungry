import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { material } from 'react-native-typography';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import UUIDGenerator from 'react-native-uuid-generator';
import { Snackbar } from 'react-native-paper';

import AppBar from '../components/ToolBar';
import { db } from '../config';
const itemsRef = db.ref('/foodRecords');
import {
  _asyncRetrieveNutrition,
  _retrievePrediction,
  _uploadImageAsync,
} from '../api';

const UploadImageScreen = ({ navigation }) => {
  const [snackbar, setSnackbar] = useState(false);

  const _handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, async response => {
      const photo = response.uri;
      if (photo) {
        try {
          //set snackbar in advance of async calls
          setSnackbar(true);
          const result = await _retrievePrediction(photo);
          const nutritionData = await _asyncRetrieveNutrition(result);

          UUIDGenerator.getRandomUUID(uuid => {
            const url = _uploadImageAsync(photo);
            itemsRef.push({
              id: uuid,
              name: result,
              image: url,
              nutritionData,
            });

            navigation.navigate('Diary', {
              previous_screen: 'upload screen',
            });
          });
        } catch (err) {
          console.log('error in uploadImageScreen');
          //handle error for invalid food item here, pop modal
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
        />
      </View>
      <Snackbar
        duration={2000}
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
