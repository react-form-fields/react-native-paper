import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMask from '@react-form-fields/core/hooks/useMask';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';

export interface IFieldTextRef {
  isFocused: () => boolean;
  clear: () => void;
  focus: () => void;
  blur: () => void;
  setDirty: (dirty: boolean) => void;
}

export interface IFieldTextProps extends PropsResolver<TextInputProps>, IFlowIndexProp {
  value: string | number;
  onChange: (value: any) => void;
  styleError?: TextStyle & ViewStyle;
  helperText?: string;
  marginBottom?: boolean;
}

const FieldText = React.memo(React.forwardRef<IFieldTextRef, IFieldTextProps>((props, ref) => {

  const { onChange, styleError, marginBottom, helperText, onSubmitEditing, returnKeyType } = props;

  const config = useConfigContext();
  const { setDirty, showError, isValid, errorMessage } = useValidation(props);
  const { maskedValue, maskClean } = useMask(props);

  const textInputRef = React.useRef<TextInput>();
  const [goNext, hasValidIndex, flowIndex] = useFieldFlow(props, React.useCallback(() => textInputRef.current.focus(), [textInputRef]));

  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'styleError', 'marginBottom');

  const onChangeHandler = React.useCallback((text: string) => {
    config.validationOn === 'onChange' && setDirty(true);
    onChange(maskClean(text));
  }, [onChange, setDirty, maskClean, config.validationOn]);

  const onSubmitHandler = React.useCallback(() => {
    goNext(flowIndex);
  }, [goNext, flowIndex]);

  React.useImperativeHandle(ref, () => ({
    isFocused: () => textInputRef.current.isFocused(),
    clear: () => textInputRef.current.clear(),
    focus: () => textInputRef.current.focus(),
    blur: () => textInputRef.current.blur(),
    setDirty: (dirty: boolean) => setDirty(dirty)
  }), [textInputRef, setDirty]);

  return (
    <View style={marginBottom ? styles.margin : null}>
      <TextInput
        {...(config.textInputProps || {})}
        {...otherProps}
        ref={textInputRef}
        value={(maskedValue || '').toString() || null}
        onChangeText={onChangeHandler}
        returnKeyType={returnKeyType ? returnKeyType : onSubmitEditing ? 'send' : hasValidIndex ? 'next' : 'default'}
        onSubmitEditing={onSubmitEditing ? onSubmitEditing : onSubmitHandler}
        error={showError && !isValid}
      />
      <HelperText
        {...(config.helperTextProps || {})}
        type={showError ? 'error' : 'info'}
        visible={showError || !!helperText}
        style={styleError}
      >
        {showError ? errorMessage : helperText}
      </HelperText>
    </View>
  );
}));

FieldText.displayName = 'FieldText';

const styles = StyleSheet.create({
  margin: {
    marginBottom: 10
  }
});

export default FieldText;