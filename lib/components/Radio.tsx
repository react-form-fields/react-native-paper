import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import React, { Fragment, memo, ReactNode, useCallback, useMemo } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Paragraph, RadioButton, RadioButtonProps, Text, Theme, withTheme } from 'react-native-paper';

export interface IFieldSwitchProps extends PropsResolver<RadioButtonProps> {
  label?: ReactNode;
  value: string;
  radioValue: string;
  onChange: (value: string) => void;
  theme: Theme;
  styleError?: TextStyle;
}

const FieldSwitch = memo((props: IFieldSwitchProps) => {
  const { onChange, theme, value, radioValue, label, styleError: styleErrorProp } = props;

  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'label', 'value', 'radioValue', 'onChange', 'styleError');

  const onChangeHandler = useCallback(() => {
    setDirty(true);
    onChange(radioValue);
  }, [onChange, setDirty]);

  const styleError = useMemo<TextStyle>(() => ({
    color: theme.colors.error,
    ...(styleErrorProp || {})
  }), [theme.colors.error, styleErrorProp]);

  return (
    <Fragment>
      <View style={styles.row}>
        <RadioButton.Android
          color={theme.colors.accent}
          {...otherProps}
          status={value === radioValue ? 'checked' : 'unchecked'}
          value={radioValue}
          onPress={onChangeHandler}
        />
        <View>
          {typeof label === 'string' ? <Paragraph>{label}</Paragraph> : label}
          {showError && <Text style={styleError}>{errorMessage}</Text>}
        </View>
      </View>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default withTheme(FieldSwitch);