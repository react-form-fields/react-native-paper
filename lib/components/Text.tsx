import FieldValidationConfigContext from '@react-form-fields/core/config/context';
import useMask from '@react-form-fields/core/hooks/useMask';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Text, TextInput, TextInputProps, Theme, withTheme } from 'react-native-paper';

export interface IFieldTextProps extends PropsResolver<TextInputProps> {
  value: string | number;
  onChange: (value: any) => void;
  theme: Theme;
  styleError?: TextStyle;
  marginBottom?: boolean;
}

const FieldText = withTheme(React.memo((props: IFieldTextProps) => {
  const { onChange, theme, styleError: styleErrorProp, marginBottom } = props;

  const { setDirty, showError, isValid, errorMessage } = useValidation(props);

  const context = React.useContext(FieldValidationConfigContext);
  const { maskedValue, maskClean } = useMask(props);
  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'theme', 'styleError', 'marginBottom');

  const onChangeHandler = React.useCallback((text: string) => {
    setDirty(true);
    onChange(maskClean(text));
  }, [onChange, setDirty, maskClean]);

  const styleError = React.useMemo<TextStyle>(() => ({
    color: theme.colors.error,
    textAlign: 'right',
    fontSize: 14,
    marginTop: 5,
    marginRight: 5,
    ...(styleErrorProp || {})
  }), [theme.colors.error, styleErrorProp]);

  return (
    <View style={marginBottom ? styles.margin : null}>
      <TextInput
        mode={context.textMode}
        {...otherProps}
        value={maskedValue}
        onChangeText={onChangeHandler}
        error={showError && !isValid}
      />
      {showError && !!errorMessage && <Text style={styleError}>{errorMessage}</Text>}
    </View>
  );
}));

FieldText.displayName = 'FieldText';

const styles = StyleSheet.create({
  margin: {
    marginBottom: 20
  }
});

export default FieldText;