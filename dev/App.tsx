import FieldCheckbox from '@react-form-fields/react-native-paper/components/Checkbox';
import FieldDatepicker from '@react-form-fields/react-native-paper/components/Datepicker';
import FieldRadio from '@react-form-fields/react-native-paper/components/Radio';
import FieldSwitch from '@react-form-fields/react-native-paper/components/Switch';
import FieldText from '@react-form-fields/react-native-paper/components/Text';
import ValidationContext from '@react-form-fields/react-native-paper/components/ValidationContext';
import FieldValidationConfigContext, { ConfigBuilder } from '@react-form-fields/react-native-paper/config/context';
import langConfig from '@react-form-fields/react-native-paper/lang/pt-br';
import React, { memo, useCallback, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Appbar, DarkTheme, DefaultTheme, Provider as PaperProvider, ThemeShape } from 'react-native-paper';

const config = new ConfigBuilder().fromLang(langConfig).setTextMode('outlined').build()

const primary = '#011B39';
const accent = '#FFCC33';

const App = memo(() => {
  const [theme, setTheme] = useState<ThemeShape>({
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, primary, accent }
  });

  const [value, setValue] = useState('');
  const [valueDark, setValueDark] = useState(false);
  const [valueRadio, setValueRadio] = useState('');
  const [valueMoney, setValueMoney] = useState(0);
  const [valueDate, setValueDate] = useState(new Date);

  const setValueDarkCallback = useCallback((value: boolean) => {
    setTheme({
      ...(value ? DarkTheme : DefaultTheme),
      colors: { ...(value ? DarkTheme : DefaultTheme).colors, primary, accent }
    });
    setValueDark(value);
  }, [setValueDark]);

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle='light-content' />

      <Appbar.Header>
        <Appbar.Content title='Form' />
      </Appbar.Header>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={{ flex: 1, ...styles.content, backgroundColor: theme.colors.background }}>
          <FieldValidationConfigContext.Provider value={config}>
            <ValidationContext>
              <FieldSwitch
                label='Dark Mode'
                value={valueDark}
                onChange={setValueDarkCallback}
                marginBottom
              />

              <FieldCheckbox
                label='Dark Mode'
                value={valueDark}
                onChange={setValueDarkCallback}
                marginBottom
              />

              <FieldRadio
                label='Dark Mode'
                value={valueRadio}
                radioValue='radio'
                onChange={setValueRadio}
                marginBottom
              />

              <FieldText
                label='Text'
                value={value}
                onChange={setValue}
                validation='required|string|min:3|max:10'
                marginBottom
              />

              <FieldText
                mode='flat'
                label='Money'
                mask='money'
                keyboardType='number-pad'
                value={valueMoney}
                validation='numeric|min:3|max:10'
                onChange={setValueMoney}
                marginBottom
              />

              <FieldDatepicker
                label='Date'
                value={valueDate}
                onChange={setValueDate}
                validation='required|date'
                marginBottom
              />

              <FieldDatepicker
                label='DateTime'
                mode='datetime'
                value={valueDate}
                onChange={setValueDate}
                validation='required|date'
                marginBottom
              />

              <FieldDatepicker
                label='Time'
                mode='time'
                value={valueDate}
                onChange={setValueDate}
                validation='required|date'
                marginBottom
              />
            </ValidationContext>
          </FieldValidationConfigContext.Provider>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
});

export default App;

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1
  }
});
