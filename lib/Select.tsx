import { withTheme } from '@callstack/react-theme-provider';
import FieldValidationConfigContext from '@react-form-fields/core/ConfigProvider/context';
import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { IPropsFieldBase } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { Dimensions, FlatList, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Paragraph, Portal, Searchbar, Theme } from 'react-native-paper';

import { IFlowIndexProp } from './hooks/useFieldFlow';
import Radio from './Radio';
import FieldText from './Text';

export interface IFieldSelectProps extends IPropsFieldBase, IFlowIndexProp {
  label?: string;
  value: number | string;
  onChange: (value: any) => void;
  options: IFieldSelectOption[];
  theme: Theme;
  marginBottom?: boolean;
}

export interface IFieldSelectOption {
  value: string | number;
  label: string;
}

const nullCallback = () => { };

const FieldSelect = withTheme(React.memo((props: IFieldSelectProps) => {
  const { label, options, value, onChange, ...otherProps } = props;

  const config = useConfigContext();
  const { setDirty, showError, errorMessage } = useValidation(props);

  const [visible, setVisibility] = React.useState(false);
  const [query, setQuery] = React.useState('teste');
  const [internalValue, setInternalValue] = React.useState();
  const displayValue = React.useMemo(() => (options.find(o => o.value === value) || { label: '' }).label, [value, options]);

  const filteredOptions = React.useMemo(() => {
    if (!query) return options;
    return options.filter(o => o.label.includes(query));
  }, [options, query]);

  const handleDone = React.useCallback(() => {
    onChange(internalValue);
    setVisibility(false);
    setQuery('');
  }, [internalValue, onChange, setVisibility]);

  const onTouchEndHandler = React.useCallback(() => {
    setInternalValue(value);
    setDirty(true);
    setVisibility(true);
  }, [setInternalValue, setDirty, setVisibility]);

  const handleDismiss = React.useCallback(() => {
    setVisibility(false);
    setQuery('');
  }, [setVisibility, setQuery]);

  const renderItem = React.useCallback(({ item }: ListRenderItemInfo<IFieldSelectOption>) => {
    return (
      <Radio
        label={item.label}
        radioValue={item.value}
        value={internalValue}
        onChange={setInternalValue}
      />
    );
  }, [internalValue, setInternalValue]);

  const keyExtractor = React.useCallback((item: IFieldSelectOption) => `${item.label}-${item.value}`, []);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={onTouchEndHandler}>
        <View pointerEvents='none'>
          <FieldText
            {...otherProps}
            label={label}
            ref={null}
            value={displayValue}
            validation={null}
            errorMessage={showError ? errorMessage : null}
            onChange={nullCallback}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <Portal>
        <FieldValidationConfigContext.Provider value={config}>
          <Dialog visible={visible} onDismiss={handleDismiss}>
            <View style={styles.header}>
              <Searchbar
                placeholder={label}
                value={query}
                onChangeText={setQuery}
                style={styles.searchbar}
              />
            </View>
            <Dialog.ScrollArea style={styles.scrollArea}>
              <ScrollView>
                <View style={styles.scrollView}>
                  <FlatList
                    extraData={internalValue + query}
                    data={filteredOptions}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                  />
                  {!filteredOptions.length &&
                    <Paragraph style={styles.notFound}>Not found</Paragraph>
                  }
                </View>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={handleDone}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </FieldValidationConfigContext.Provider>
      </Portal>
    </React.Fragment>

  );
}));

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  searchbar: {
    elevation: 0
  },
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.8
  },
  scrollArea: {
    maxHeight: Dimensions.get('screen').height - 200,
    paddingHorizontal: 0
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

export default FieldSelect;