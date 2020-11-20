import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';

import Colors from '../constants/Colors';

export default function Notification({visible, color, message, onPress}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => console.log('Modal has been closed.')}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text
            style={{
              ...modalStyles.modalText,
              color: color,
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </Text>
          <TouchableHighlight
            style={modalStyles.openButton}
            onPress={onPress}>
            <Text style={modalStyles.textStyle}>Ok</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: Colors.success,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.default
  },
})