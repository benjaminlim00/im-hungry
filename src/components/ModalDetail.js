import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { material } from 'react-native-typography';
import { Appbar } from 'react-native-paper';

export default class ModalDetail extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    let item = this.props.item;
    let { Energy, Fat, Protein, Carbs, Fiber } = item.nutritionData;
    let subtitle = `Calories: ${Energy}`;

    return (
      <>
        <ListItem
          title={item.name}
          subtitle={subtitle}
          key={item}
          leftAvatar={{ source: { uri: item.image } }}
          bottomDivider
          topDivider
          chevron
          onPress={this.toggleModal}
        />
        <Modal
          animationType='slide'
          onRequestClose={() => {}}
          visible={this.state.isModalVisible}
        >
          <View style={styles.modalContainer}>
            <Appbar.Header>
              <Appbar.Content title={item.name} />
            </Appbar.Header>
            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <View
              style={{
                marginTop: -2,
                margin: 30,
                marginBottom: 8,
                alignSelf: 'center',
              }}
            >
              <Text style={material.body2}>Details of food</Text>
            </View>
            <View
              style={{
                marginTop: 0,
                margin: 30,
                alignSelf: 'center',
                marginBottom: 15,
              }}
            >
              <Text style={material.body1}>Energy: {Energy}</Text>
              <Text style={material.body1}>Fat: {Fat}</Text>
              <Text style={material.body1}>Protein: {Protein}</Text>
              <Text style={material.body1}>Carbs: {Carbs}</Text>
              <Text style={material.body1}>Fiber: {Fiber}</Text>
            </View>

            <TouchableOpacity onPress={this.toggleModal} style={styles.button}>
              <Text style={styles.buttonText}>back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
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
    letterSpacing: 1.5,
  },
  card: {
    height: '57%',
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#eceff1',
    justifyContent: 'center',
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
