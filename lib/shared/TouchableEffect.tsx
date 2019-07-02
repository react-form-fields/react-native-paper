import * as React from 'react';
import { Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { TouchableRipple, TouchableRippleProps } from 'react-native-paper';

const TouchableEffect = React.memo((props: TouchableOpacityProps & TouchableRippleProps & { children?: any }) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity {...props}>
        {props.children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableRipple {...props}>
      {props.children}
    </TouchableRipple>
  );
});

TouchableEffect.displayName = 'TouchableEffect';
export default TouchableEffect;