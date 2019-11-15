import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

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

class FirebaseComp extends Component {
  state = {
    record: null,
    foodRecords: [],
  };

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
          setFoodRecords(initRecords)
        }
      });

    firebase
      .database()
      .ref()
      .child('foodRecords')
      .on('child_added', snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            foodRecords: [data, ...prevState.foodRecords],
          }));

          setFoodRecords()
        }
      });
  };

  componentDidMount() {
    // to add a new record for testing
    // const newRecord = firebase
    //   .database()
    //   .ref()
    //   .child('foodRecords')
    //   .push();
    // newRecord.set({ name: 'bibimbap', image: null });
    this.retrieveRecords();
  }

  // addItem = () => {
  //   if (!this.state.record) return;
  //   const newRecord = firebase
  //     .database()
  //     .ref()
  //     .child('foodRecords')
  //     .push();

  //   newRecord.set(this.state.record, () => this.setState({ record: null }));
  // };

  renderItem = item => {
    const listItems = item.map(item => {
      return (
        <View style={this.styles.listItemContainer}>
          <Text style={this.styles.listItem}>{item.name}</Text>
        </View>
      );
    });

    return listItems;
  };

  render() {
    return (
      // <View style={this.styles.container}>
      //   {/* <FlatList
      //     data={this.state.foodRecords}
      //     renderItem={this.renderItem}
      //     keyExtractor={item => item}
      //   /> */}
      //   <FlatList
      //     data={this.state.foodRecords}
      //     renderItem={({ item }) => (
      //       <ListItem title={item.name} subtitle={item.name} />
      //     )}
      //   />
      // </View>
      {this.props.handleFoodRecords(this.state.foodRecords)}
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
      borderColor: '#2bbd7e',
      borderWidth: 1,
    },
    listItemContainer: {
      backgroundColor: '#fff',
      margin: 5,
      borderRadius: 6,
      flex: 1,
    },
    listItem: {
      width: 100,
      height: 100,
      fontSize: 20,
      padding: 20,
    },
  });
}

export default FirebaseComp;
