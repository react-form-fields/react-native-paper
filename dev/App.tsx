import { IValidationContextRef } from '@react-form-fields/core/ValidationContext';
import FieldCheckbox from '@react-form-fields/react-native-paper/Checkbox';
import ConfigProvider, { ConfigBuilder } from '@react-form-fields/react-native-paper/ConfigProvider';
import langConfig from '@react-form-fields/react-native-paper/ConfigProvider/langs/en-us';
import FieldDatepicker from '@react-form-fields/react-native-paper/Datepicker';
import FieldRadio from '@react-form-fields/react-native-paper/Radio';
import FieldSelect from '@react-form-fields/react-native-paper/Select';
import FieldSwitch from '@react-form-fields/react-native-paper/Switch';
import FieldText from '@react-form-fields/react-native-paper/Text';
import ValidationContext from '@react-form-fields/react-native-paper/ValidationContext';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import {
  Appbar,
  Button,
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
  Snackbar,
  ThemeShape,
} from 'react-native-paper';

const config = new ConfigBuilder().fromLang(langConfig).setTextMode('outlined').build();

const primary = '#011B39';
const accent = '#FFCC33';

const App = memo(() => {
  const [theme, setTheme] = useState<ThemeShape>({ ...DefaultTheme, colors: { ...DefaultTheme.colors, primary, accent } });
  const scroolViewStyle = useMemo(() => ({ ...styles.scroolView, backgroundColor: theme.colors.background }), [theme.colors.background])
  const validationRef = useRef<IValidationContextRef>();

  const [messageForm, setMessageForm] = useState('');
  const [value, setValue] = useState('');
  const [valueSelect, setValueSelect] = useState(0);
  const [valueDark, setValueDark] = useState(false);
  const [valueRadio, setValueRadio] = useState('');
  const [valueMoney, setValueMoney] = useState(0);
  const [valueDate, setValueDate] = useState(new Date);
  const selectOptions = useMemo(() => new Array(10).fill('a').map((v, i) => ({ value: i + 1, label: `Options ${(i + 1)}` })), []);

  const setValueDarkCallback = useCallback((value: boolean) => {
    setTheme({ ...(value ? DarkTheme : DefaultTheme), colors: { ...(value ? DarkTheme : DefaultTheme).colors, primary, accent } });
    setValueDark(value);
  }, [setValueDark]);

  const handleSave = useCallback(() => {
    const message = validationRef.current.isValid() ? 'Valid' : 'Invalid';
    setMessageForm(message);
  }, [validationRef, setMessageForm]);

  const handleDismissSnackbar = useCallback(() => setMessageForm(''), [setMessageForm]);


  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle='light-content' />

      <Appbar.Header>
        <Appbar.Content title='Form' />
      </Appbar.Header>

      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <ScrollView style={scroolViewStyle}>
          <View style={styles.content}>
            <ConfigProvider value={config}>
              <ValidationContext ref={validationRef}>
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
                  label='Radio button 1'
                  value={valueRadio}
                  radioValue='radio 1'
                  onChange={setValueRadio}
                  marginBottom
                />

                <FieldRadio
                  label='Radio button 2'
                  value={valueRadio}
                  radioValue='radio 2'
                  onChange={setValueRadio}
                  marginBottom
                />

                <FieldText
                  mode='flat'
                  label='Money'
                  mask='money'
                  keyboardType='number-pad'
                  flowIndex={3}
                  value={valueMoney}
                  validation='numeric|min:3|max:10'
                  onChange={setValueMoney}
                  marginBottom
                />

                <FieldText
                  label='Text'
                  value={value}
                  onChange={setValue}
                  flowIndex={4}
                  validation='required|string|min:3|max:10'
                  marginBottom
                />

                <FieldDatepicker
                  label='Date'
                  flowIndex={5}
                  value={valueDate}
                  onChange={setValueDate}
                  validation='required|date'
                  marginBottom
                />

                <FieldDatepicker
                  label='DateTime'
                  mode='datetime'
                  flowIndex={6}
                  value={valueDate}
                  onChange={setValueDate}
                  validation='required|date'
                  marginBottom
                />

                <FieldDatepicker
                  label='Time'
                  mode='time'
                  flowIndex={7}
                  value={valueDate}
                  onChange={setValueDate}
                  validation='required|date'
                  marginBottom
                />

                <FieldSelect
                  label='Select'
                  flowIndex={8}
                  value={valueSelect}
                  options={selectOptions}
                  onChange={setValueSelect}
                  validation='required|date'
                  marginBottom
                />

                <Button mode='contained' onPress={handleSave}>Save</Button>
              </ValidationContext>
            </ConfigProvider>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar visible={!!messageForm} onDismiss={handleDismissSnackbar}>{messageForm}</Snackbar>
    </PaperProvider>
  );
});

export default App;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  scroolView: {
    flex: 1
  },
  content: {
    padding: 20,
    flex: 1
  }
});
