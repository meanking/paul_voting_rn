import * as React from 'react';
import {
  Dimensions 
} from 'react-native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH  = Dimensions.get('window').width;

export default function LiveScreen() {
  return (
    <iframe src="https://player.vimeo.com/video/474213316" width={DEVICE_WIDTH} height={DEVICE_HEIGHT} frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
  );
}