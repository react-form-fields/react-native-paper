import useMask from '@react-form-fields/core/hooks/useMask';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import React, { Fragment, memo, useCallback, useMemo } from 'react';
import { TextStyle } from 'react-native';
import { Text, TextInput, TextInputProps, Theme, withTheme } from 'react-native-paper';

interface IProps extends PropsResolver<TextInputProps> {
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
  styleError?: TextStyle;

}

const FieldText = memo((props: IProps) => {
  const { onChange, theme, styleError: styleErrorProp } = props;

  const { setDirty, showError, isValid, errorMessage } = useValidation(props);
  const { maskedValue, maskClean } = useMask(props);
  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'theme', 'styleError');

  const onChangeHandler = useCallback((text: string) => {
    setDirty(true);
    onChange(maskClean(text) as string);
  }, [onChange, setDirty, maskClean]);

  const styleError = useMemo<TextStyle>(() => ({
    color: theme.colors.error,
    ...(styleErrorProp || {})
  }), [theme.colors.error, styleErrorProp]);

  return (
    <Fragment>
      <TextInput
        {...otherProps}
        value={maskedValue}
        onChangeText={onChangeHandler}
        error={showError && !isValid}
      />
      {showError && <Text style={styleError}>{errorMessage}</Text>}
    </Fragment>
  );
});

export default withTheme(FieldText);