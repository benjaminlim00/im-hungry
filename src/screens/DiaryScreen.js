import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import AppBar from '../components/ToolBar';
import { Spinner } from '../components/Spinner';

import { db } from '../config';
const itemsRef = db.ref('/foodRecords');

const DiaryScreen = ({ navigation }) => {
  // const [prediction, setPrediction] = useState(null);
  // const [image, setImage] = useState(null);
  const [foodRecords, setFoodRecords] = useState(null);
  const [loading, setLoading] = useState(true);

  retrieveRecords = async () => {
    await itemsRef.on('value', snapshot => {
      const data = snapshot.val();
      if (snapshot.val()) {
        const initRecords = [];
        Object.keys(data).forEach(record => initRecords.push(data[record]));
        setFoodRecords(initRecords);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    retrieveRecords();
    if (
      navigation.state.params &&
      navigation.state.params.previous_screen == 'camera'
    ) {
      // setPrediction(navigation.state.params.prediction);
      // setImage(navigation.state.params.image);
      console.warn('came from camera');
    } else {
      // console.warn('not directed from camera');
    }
  }, []);

  if (loading) {
    return (
      <View styles={styles.container}>
        <AppBar />
        <Spinner />
      </View>
    );
  }

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
            leftAvatar={{ source: { uri: item.image } }}
            bottomDivider
            topDivider
            chevron
            onPress={() => console.warn(item.name)}
          />
        )}
        keyExtractor={item => item.id}
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
