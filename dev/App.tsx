import FieldCheckbox from '@react-form-fields/react-native-paper/components/Checkbox';
import FieldDatepicker from '@react-form-fields/react-native-paper/components/Datepicker';
import FieldRadio from '@react-form-fields/react-native-paper/components/Radio';
import FieldSwitch from '@react-form-fields/react-native-paper/components/Switch';
import FieldText from '@react-form-fields/react-native-paper/components/Text';
import ValidationContext from '@react-form-fields/react-native-paper/components/ValidationContext';
import FieldValidationConfigContext, { ConfigBuilder } from '@react-form-fields/react-native-paper/config/context';
import langConfig from '@react-form-fields/react-native-paper/lang/en-us';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Button, DarkTheme, DefaultTheme, Provider as PaperProvider, ThemeShape } from 'react-native-paper';

const config = new ConfigBuilder().fromLang(langConfig).setTextMode('outlined').build()

const primary = '#011B39';
const accent = '#FFCC33';

const App = memo(() => {
  const [theme, setTheme] = useState<ThemeShape>({ ...DefaultTheme, colors: { ...DefaultTheme.colors, primary, accent } });
  const scroolViewStyle = useMemo(() => ({ ...styles.scroolView, backgroundColor: theme.colors.background }), [theme.colors.background])

  const [value, setValue] = useState('');
  const [valueDark, setValueDark] = useState(false);
  const [valueRadio, setValueRadio] = useState('');
  const [valueMoney, setValueMoney] = useState(0);
  const [valueDate, setValueDate] = useState(new Date);

  const setValueDarkCallback = useCallback((value: boolean) => {
    setTheme({ ...(value ? DarkTheme : DefaultTheme), colors: { ...(value ? DarkTheme : DefaultTheme).colors, primary, accent } });
    setValueDark(value);
  }, [setValueDark]);

  const handleSave = useCallback(() => {

  }, []);


  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle='light-content' />

      <Appbar.Header>
        <Appbar.Content title='Form' />
      </Appbar.Header>

      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <ScrollView style={scroolViewStyle}>
          <View style={styles.content}>
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

                <Button mode='contained' onPress={handleSave}>Save</Button>
              </ValidationContext>
            </FieldValidationConfigContext.Provider>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
