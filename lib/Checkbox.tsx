import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Checkbox, CheckboxProps, HelperText, Paragraph } from 'react-native-paper';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import TouchableEffect from './shared/TouchableEffect';

export interface IFieldCheckboxProps extends PropsResolver<CheckboxProps, 'status' | 'mask'>, IFlowIndexProp {
  label?: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
  styleError?: TextStyle & ViewStyle;
  marginBottom?: boolean;
  helperText?: string;
}

const FieldCheckbox = React.memo((props: IFieldCheckboxProps) => {
  const { onChange, label, styleError, helperText, value, marginBottom } = props;

  const config = useConfigContext();
  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'label', 'styleError', 'marginBottom');
  useFieldFlow(props, React.useCallback(() => { }, []));

  const onChangeHandler = React.useCallback(() => {
    config.validationOn === 'onChange' && setDirty(true);
    onChange(!value);
  }, [value, onChange, setDirty, config.validationOn]);

  return (
    <View style={marginBottom ? styles.margin : null}>
      <TouchableEffect onPress={onChangeHandler}>
        <View>
          <View style={styles.row}>
            <Checkbox.Android
              {...otherProps}
              status={value ? 'checked' : 'unchecked'}
            />
            <View style={styles.textContainer}>
              {typeof label === 'string' ? <Paragraph style={styles.text}>{label}</Paragraph> : label}
            </View>
          </View>
          <HelperText
            {...(config.helperTextProps || {})}
            type={showError ? 'error' : 'info'}
            visible={showError || !!helperText}
            style={styleError}
          >
            {showError ? errorMessage : helperText}
          </HelperText>
        </View>
      </TouchableEffect>
    </View>
  );
});

const styles = StyleSheet.create({
  margin: {
    marginBottom: 10
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

FieldCheckbox.displayName = 'FieldCheckbox';
export default FieldCheckbox;