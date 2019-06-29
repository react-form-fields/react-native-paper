import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Paragraph, RadioButton, RadioButtonProps, Text, Theme, withTheme } from 'react-native-paper';

import TouchableEffect from './shared/TouchableEffect';

export interface IFieldSwitchProps extends PropsResolver<RadioButtonProps, 'status' | 'mask'> {
  label?: React.ReactNode;
  value: string;
  radioValue: string;
  onChange: (radioValue: any) => void;
  theme: Theme;
  styleError?: TextStyle;
  marginBottom?: boolean;
}

const FieldSwitch = React.memo((props: IFieldSwitchProps) => {
  const { onChange, theme, label, styleError: styleErrorProp, value, marginBottom, radioValue } = props;

  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'label', 'styleError', 'marginBottom', 'radioValue');

  const onChangeHandler = React.useCallback(() => {
    setDirty(true);
    onChange(radioValue);
  }, [value, onChange, setDirty]);

  const styleError = React.useMemo<TextStyle>(() => ({
    color: theme.colors.error,
    paddingLeft: 45,
    marginTop: -10,
    marginBottom: 5,
    ...(styleErrorProp || {})
  }), [theme.colors.error, styleErrorProp]);

  return (
    <View style={marginBottom ? styles.margin : null}>
      <TouchableEffect onPress={onChangeHandler}>
        <View>
          <View style={styles.row}>
            <RadioButton.Android
              {...otherProps}
              value={radioValue}
              status={value === radioValue ? 'checked' : 'unchecked'}
              onPress={onChangeHandler}
            />
            <View style={styles.textContainer}>
              {typeof label === 'string' ? <Paragraph style={styles.text}>{label}</Paragraph> : label}
            </View>
          </View>
          {showError && !!errorMessage && <Text style={styleError}>{errorMessage}</Text>}
        </View>
      </TouchableEffect>
    </View>
  );
});

const styles = StyleSheet.create({
  margin: {
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  textContainer: {
    flexGrow: 1,
    paddingLeft: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default withTheme(FieldSwitch);