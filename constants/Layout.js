import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let logoWidth = 250;
let logoShow = 'show';

if (height >= 700 && height < 736) {
  logoWidth = 240;
} else if (height >= 640 && height < 700) {
  logoWidth = 230;
  logoShow = 'none';
} else if (height >= 600 && height < 640) {
  logoWidth = 220;
  logoShow = 'none';
} else if (height < 600) {
  logoWidth = 210;
  logoShow = 'none';
}

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  logoWidth: logoWidth,
  logoShow: logoShow,
};
