import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { HelperText, Paragraph, Switch, SwitchProps } from 'react-native-paper';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';

export interface IFieldSwitchProps extends PropsResolver<SwitchProps, 'mask'>, IFlowIndexProp {
  label?: React.ReactNode;
  value?: boolean;
  styleError?: TextStyle & ViewStyle;
  onChange: (checked: boolean) => void;
  helperText?: string;
  marginBottom?: boolean;
}

const FieldSwitch = React.memo((props: IFieldSwitchProps) => {
  const { onChange, helperText, styleError, label, marginBottom, value } = props;

  const config = useConfigContext();
  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'checked', 'onChange', 'label', 'styleError', 'marginBottom');
  useFieldFlow(props, React.useCallback(() => { }, []));

  const onChangeHandler = React.useCallback((value: boolean) => {
    config.validationOn === 'onChange' && setDirty(true);
    onChange(value);
  }, [onChange, setDirty, config.validationOn]);

  return (
    <View style={marginBottom ? styles.margin : null}>
      <View style={styles.row}>
        <View style={{ flexDirection: 'column' }}>
          {typeof label === 'string' ? <Paragraph style={styles.text}>{label}</Paragraph> : label}
        </View>
        <Switch
          {...otherProps}
          value={value}
          onValueChange={onChangeHandler}
        />
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
    paddingVertical: 8
  },
  text: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  }
});

FieldSwitch.displayName = 'FieldSwitch';
export default FieldSwitch;