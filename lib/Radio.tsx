import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, RadioButton, RadioButtonProps } from 'react-native-paper';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import ErrorHelperText from './shared/ErrorHelperText';
import TouchableEffect from './shared/TouchableEffect';

export interface IFieldRadioProps extends PropsResolver<RadioButtonProps, 'status' | 'mask'>, IFlowIndexProp {
  label?: React.ReactNode;
  value: string | number;
  radioValue: string | number;
  onChange: (radioValue: any) => void;
  helperText?: string;
  marginBottom?: boolean;
}

const FieldRadio = React.memo((props: IFieldRadioProps) => {
  const { onChange, label, helperText, value, marginBottom, radioValue } = props;

  const config = useConfigContext();
  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'label', 'styleError', 'marginBottom', 'radioValue');
  useFieldFlow(props, React.useCallback(() => { }, []));

  const onChangeHandler = React.useCallback(() => {
    config.validationOn === 'onChange' && setDirty(true);
    onChange(radioValue);
  }, [onChange, setDirty, radioValue, config.validationOn]);

  return (
    <View style={marginBottom ? styles.margin : null}>
      <TouchableEffect onPress={onChangeHandler}>
        <View>
          <View style={styles.row}>
            <RadioButton.Android
              {...otherProps}
              value={radioValue.toString()}
              status={value === radioValue ? 'checked' : 'unchecked'}
              onPress={onChangeHandler}
            />
            <View style={styles.textContainer}>
              {typeof label === 'string' ? <Paragraph style={styles.text}>{label}</Paragraph> : label}
            </View>
          </View>
          <ErrorHelperText
            helperText={helperText}
            showError={showError}
            errorMessage={errorMessage}
          />
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

FieldRadio.displayName = 'FieldRadio';
export default FieldRadio;