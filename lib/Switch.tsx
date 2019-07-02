import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Switch, SwitchProps, Theme } from 'react-native-paper';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import ErrorHelperText from './shared/ErrorHelperText';

export interface IFieldSwitchProps extends PropsResolver<SwitchProps, 'mask'>, IFlowIndexProp {
  label?: React.ReactNode;
  value?: boolean;
  onChange: (checked: boolean) => void;
  theme: Theme;
  helperText?: string;
  marginBottom?: boolean;
}

const FieldSwitch = React.memo((props: IFieldSwitchProps) => {
  const { onChange, helperText, label, marginBottom, value } = props;

  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'checked', 'onChange', 'label', 'styleError', 'marginBottom');
  useFieldFlow(props, React.useCallback(() => { }, []));

  const onChangeHandler = React.useCallback((value: boolean) => {
    setDirty(true);
    onChange(value);
  }, [onChange, setDirty]);

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
      <ErrorHelperText
        helperText={helperText}
        showError={showError}
        errorMessage={errorMessage}
      />
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