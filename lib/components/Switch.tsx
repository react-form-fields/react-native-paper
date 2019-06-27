import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import React, { Fragment, memo, ReactNode, useCallback, useMemo } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Paragraph, Switch, SwitchProps, Text, Theme, withTheme } from 'react-native-paper';

interface IProps extends PropsResolver<SwitchProps> {
  label?: ReactNode;
  value: never;
  checked: boolean;
  onChange: (checked: boolean) => void;
  theme: Theme;
  styleError?: TextStyle;
}

const FieldSwitch = memo((props: IProps) => {
  const { onChange, theme, checked, label, styleError: styleErrorProp } = props;

  const { setDirty, showError, errorMessage } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'checked', 'onChange', 'label', 'styleError');

  const onChangeHandler = useCallback((value: boolean) => {
    setDirty(true);
    onChange(value);
  }, [onChange, setDirty]);

  const styleError = useMemo<TextStyle>(() => ({
    color: theme.colors.error,
    ...(styleErrorProp || {})
  }), [theme.colors.error, styleErrorProp]);

  return (
    <Fragment>
      <View style={styles.row}>
        <View>
          {typeof label === 'string' ? <Paragraph>{label}</Paragraph> : label}
          {showError && <Text style={styleError}>{errorMessage}</Text>}
        </View>
        <Switch
          color={theme.colors.accent}
          {...otherProps}
          value={checked}
          onValueChange={onChangeHandler}
        />
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