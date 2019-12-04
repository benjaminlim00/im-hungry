import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import AppBar from '../components/ToolBar';
import { Spinner } from '../components/Spinner';
import ModalDetail from '../components/ModalDetail';

import { db } from '../config';
const itemsRef = db.ref('/foodRecords');

const DiaryScreen = ({ navigation }) => {
  // const [prediction, setPrediction] = useState(null);
  // const [image, setImage] = useState(null);
  const [foodRecords, setFoodRecords] = useState(null);
  const [loading, setLoading] = useState(true);

  _renderItem = item => {
    return <ModalDetail item={item} />;
  };

  retrieveRecords = async () => {
    setFoodRecords(null);
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
    this.focusListener = navigation.addListener('didFocus', () => {
      retrieveRecords();
    });
    // if (
    //   navigation.state.params &&
    //   navigation.state.params.previous_screen == 'camera'
    // ) {
    //   // setPrediction(navigation.state.params.prediction);
    //   // setImage(navigation.state.params.image);
    //   console.warn('came from camera');
    // } else {
    //   // console.warn('not directed from camera');
    // }
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
    <View style={styles.container}>
      <AppBar />
      <View style={{ flex: 1 }}>
        <FlatList
          data={foodRecords}
          renderItem={({ item }) => _renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default withNavigationFocus(DiaryScreen);
