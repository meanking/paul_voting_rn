import * as React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const LineInput = ({ value, maxlen, onChangeText, placeholder, encrypt, onFocus, onBlur, keyboardType, style }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={`#FFFFFF`}
      style={[styles.input, style]}
      value={value}
      maxLength={maxlen}
      multiline={false}
      importantForAutofill="no"
      autoCompleteType="off"
      secureTextEntry={encrypt}
      keyboardType={keyboardType ? keyboardType : "default"}
      onChangeText={(text) => onChangeText(text)}
      onFocus={onFocus}
      onBlur={onBlur}

    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    fontFamily: 'clibri',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    textAlign: 'left',
    color: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1
  }
})
export default LineInput;