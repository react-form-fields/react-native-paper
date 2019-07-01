import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Paragraph, Switch, SwitchProps, Text, Theme, withTheme } from 'react-native-paper';

export interface IFieldSwitchProps extends PropsResolver<SwitchProps, 'mask'> {
  label?: React.ReactNode;
  value?: boolean;
  onChange: (checked: boolean) => void;
  theme: Theme;
  styleError?: TextStyle;
  marginBottom?: boolean;
}

const FieldSwitch = React.memo((props: IFieldSwitchProps) => {
  const { onChange, theme, label, styleError: styleErrorProp, marginBottom, value } = props;

  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'checked', 'onChange', 'label', 'styleError', 'marginBottom');

  const onChangeHandler = React.useCallback((value: boolean) => {
    setDirty(true);
    onChange(value);
  }, [onChange, setDirty]);

  const styleError = React.useMemo<TextStyle>(() => ({
    color: theme.colors.error,
    ...(styleErrorProp || {})
  }), [theme.colors.error, styleErrorProp]);

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
      {showError && !!errorMessage && <Text style={styleError}>{errorMessage}</Text>}
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

export default withTheme(FieldSwitch);