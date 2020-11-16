import * as React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const RoundButton = ({ style, image, imageStyle, textStyle, onPress, text }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
    >
      {image && <Image source={image} style={imageStyle} />}
      {text && <Text style={textStyle}>{text}</Text>}
    </TouchableOpacity>
  )
}

export default RoundButton;