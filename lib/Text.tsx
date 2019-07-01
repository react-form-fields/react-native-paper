import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMask from '@react-form-fields/core/hooks/useMask';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Text, TextInput, TextInputProps, Theme, withTheme } from 'react-native-paper';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';

export interface IFieldTextRef {
  isFocused: () => boolean;
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

export interface IFieldTextProps extends PropsResolver<TextInputProps>, IFlowIndexProp {
  value: string | number;
  onChange: (value: any) => void;
  theme: Theme;
  styleError?: TextStyle;
  marginBottom?: boolean;
}

const FieldText = withTheme(React.memo(React.forwardRef<IFieldTextRef, IFieldTextProps>((props, ref) => {
  const { onChange, theme, styleError: styleErrorProp, marginBottom } = props;

  const config = useConfigContext();
  const { setDirty, showError, isValid, errorMessage } = useValidation(props);
  const { maskedValue, maskClean } = useMask(props);

  const textInputRef = React.useRef<TextInput>();
  const onFocusFlow = React.useCallback(() => textInputRef.current.focus(), [textInputRef]);
  const [goNext, hasValidIndex, flowIndex] = useFieldFlow(props, onFocusFlow);

  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'theme', 'styleError', 'marginBottom');

  const onChangeHandler = React.useCallback((text: string) => {
    setDirty(true);
    onChange(maskClean(text));
  }, [onChange, setDirty, maskClean]);

  const onSubmitHandler = React.useCallback(() => {
    goNext(flowIndex);
  }, [goNext, flowIndex]);

  React.useImperativeHandle(ref, () => ({
    isFocused: () => textInputRef.current.isFocused(),
    clear: () => textInputRef.current.clear(),
    focus: () => textInputRef.current.focus(),
    blur: () => textInputRef.current.blur(),
  }), [textInputRef]);

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
        mode={config.textMode}
        {...otherProps}
        ref={textInputRef}
        value={maskedValue}
        onChangeText={onChangeHandler}
        returnKeyType={hasValidIndex ? 'next' : 'default'}
        onSubmitEditing={onSubmitHandler}
        error={showError && !isValid}
      />
      {showError && !!errorMessage && <Text style={styleError}>{errorMessage}</Text>}
    </View>
  );
})));

FieldText.displayName = 'FieldText';

const styles = StyleSheet.create({
  margin: {
    marginBottom: 20
  }
});

export default FieldText;