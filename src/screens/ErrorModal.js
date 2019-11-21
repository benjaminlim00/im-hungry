import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';

export default class ErrorModal extends Component {
  render() {
    let isModalVisible = this.props.isModalVisible;
    return (
      <Modal
        animationType='slide'
        onRequestClose={() => {}}
        visible={isModalVisible}
      >
        <View style={styles.modalContainer}>
          <Image
            style={styles.image}
            source={require('../assets/error_background2.jpg')}
          />
          <Text style={styles.regularText}>Unable to identify food</Text>
          <View style={{ marginTop: 10, marginBottom: 200 }}>
            <Text style={styles.lightText}>Please try again</Text>
          </View>
          <TouchableOpacity
            onPress={this.props.toggleModal}
            style={styles.button}
          >
            <Text style={styles.buttonText}>back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: '70%',
    height: 40,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
    letterSpacing: 1.3,
  },
  modalContainer: {
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  image: {
    marginTop: 40,
    width: 300,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
  },
  regularText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    alignSelf: 'center',
  },
  lightText: {
    fontFamily: 'Montserrat-Light',
    alignSelf: 'center',
    fontSize: 17,
  },
});
