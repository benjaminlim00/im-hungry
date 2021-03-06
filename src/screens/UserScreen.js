import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class UserScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.info}>Korea, Seoul</Text>
            <Text style={styles.description}>
              Hungry boy, trying to lose weight, please show me some support
            </Text>

            {/* <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 2</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#9ccc64',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: '#696969',
  },
  info: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 8,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: '#696969',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#008b50',
  },
});
