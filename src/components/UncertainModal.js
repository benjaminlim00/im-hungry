// // This component is work in progress

// import React, { Component } from 'react';
// import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
// import LightFont from './CustomFonts/LightFont';
// import RegularFont from './CustomFonts/RegularFont';

// export default class ModalDetail extends Component {
//   state = {
//     isModalVisible: false,
//   };

//   exitModal = () => {
//     this.setState({ isModalVisible: !this.state.isModalVisible });
//   };

//   render() {
//     return (
//       <>
//         <Modal
//           animationType='slide'
//           onRequestClose={() => {}}
//           visible={this.state.isModalVisible}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.card}></View>

//             <TouchableOpacity onPress={this.exitModal} style={styles.button}>
//               <Text style={styles.buttonText}>back</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   button: {
//     alignSelf: 'center',
//     width: '70%',
//     height: 40,
//     backgroundColor: '#000',
//     borderRadius: 10,
//     justifyContent: 'center',
//     elevation: 2,
//   },
//   buttonText: {
//     alignSelf: 'center',
//     fontSize: 16,
//     textTransform: 'uppercase',
//     color: '#fff',
//     letterSpacing: 1.3,
//     paddingHorizontal: 12,
//     paddingVertical: 3,
//   },
//   card: {
//     height: '57%',
//     margin: 20,
//     borderRadius: 10,
//     backgroundColor: '#eceff1',
//     justifyContent: 'center',
//   },
//   modalContainer: {
//     height: '100%',
//     width: '100%',
//     borderRadius: 10,
//     backgroundColor: '#fafafa',
//   },
//   image: {
//     alignSelf: 'center',
//     width: 250,
//     height: 250,
//   },
// });
