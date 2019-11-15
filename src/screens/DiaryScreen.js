import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import * as firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import AppBar from '../components/ToolBar';

//firebase setup

const firebaseConfig = {
  apiKey: 'AIzaSyBuH3sSCWYUXfVtM8t4qHYXr8-nI-uVPC4',
  authDomain: 'react-native-tutorial-7798d.firebaseapp.com',
  databaseURL: 'https://react-native-tutorial-7798d.firebaseio.com',
  projectId: 'react-native-tutorial-7798d',
  storageBucket: '',
  messagingSenderId: '595404914402',
  appId: '1:595404914402:web:0820028e19884b27',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DiaryScreen = ({ navigation }) => {
  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);
  const [record, setRecord] = useState(null);
  const [foodRecords, setFoodRecords] = useState(null);

  retrieveRecords = () => {
    firebase
      .database()
      .ref()
      .child('foodRecords')
      .once('value', snapshot => {
        const data = snapshot.val();
        if (snapshot.val()) {
          const initRecords = [];
          Object.keys(data).forEach(record => initRecords.push(data[record]));
          setFoodRecords(initRecords);
        }
      });
  };

  useEffect(() => {
    retrieveRecords();
    if (
      navigation.state.params &&
      navigation.state.params.previous_screen == 'camera'
    ) {
      setPrediction(navigation.state.params.prediction);
      setImage(navigation.state.params.image);
      console.warn(navigation.state);
    } else {
      // console.warn('not directed from camera');
    }
  }, []);

  return (
    <View styles={styles.container}>
      <AppBar />
      <FlatList
        data={foodRecords}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={item.name}
            key={item}
            leftAvatar={{ source: { uri: 'https://picsum.photos/200' } }}
            bottomDivider
            topDivider
            chevron
            onPress={() => console.warn(item.name)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default DiaryScreen;
