import FieldValidationConfigContext from '@react-form-fields/core/ConfigProvider/context';
import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { Dimensions, FlatList, ListRenderItemInfo, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, IconButton, Paragraph, Portal, Searchbar } from 'react-native-paper';

import Checkbox from './Checkbox';
import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import Radio from './Radio';
import FieldText, { IFieldTextProps } from './Text';

export interface IFieldSelectProps extends PropsResolver<IFieldTextProps>, IFlowIndexProp {
  label?: string;
  value: number | string | number[] | string[];
  onChange: (value: any) => void;
  options: IFieldSelectOption[];
  formatValueDisplay?: (selectedOptions: IFieldSelectOption[]) => string;
  marginBottom?: boolean;
  multiple?: boolean;
  searchable?: boolean;
}

export interface IFieldSelectOption {
  value: string | number;
  label: string;
}

const nullCallback = () => { };

const FieldSelect = React.memo((props: IFieldSelectProps) => {
  const { label, options, value, onChange, multiple, searchable, formatValueDisplay, ...otherProps } = props;

  const [visible, setVisibility] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [internalValue, setInternalValue] = React.useState<Set<string | number>>(new Set);

  const config = useConfigContext();
  const { setDirty, showError, errorMessage } = useValidation(props);
  useFieldFlow(props, React.useCallback(() => { }, []));

  const firstValue = React.useMemo(() => internalValue.values().next().value, [internalValue]);
  const displayValue = React.useMemo(() => {
    const arrayValue = Array.isArray(value) ? value : [value];
    const selectedValues = options.filter(o => arrayValue.includes(o.value));
    if (formatValueDisplay) return formatValueDisplay(selectedValues);
    return selectedValues.length > 3 ? `${selectedValues.length} items` : selectedValues.map(o => o.label).join(', ');
  }, [value, options, formatValueDisplay]);

  const filteredOptions = React.useMemo(() => {
    return !query ? options || [] : (options || []).filter(o => o.label.includes(query));
  }, [options, query]);

  const handleOpen = React.useCallback(() => {
    if (multiple && !Array.isArray(value || [])) {
      throw new Error('@react-form-fields/react-native-paper: value of a multiple select must be an array');
    }

    if (!multiple && Array.isArray(value)) {
      throw new Error('@react-form-fields/react-native-paper: value of a non multiple select must be not an array');
    }

    setInternalValue(new Set(multiple ? (value as any) || [] : [value]));
    setDirty(true);
    setVisibility(true);
  }, [setInternalValue, setDirty, setVisibility, value, multiple]);

  const handleDone = React.useCallback(() => {
    onChange(multiple ? Array.from(internalValue) : firstValue);
    setVisibility(false);
    setQuery('');
  }, [internalValue, onChange, setVisibility, firstValue, multiple]);

  const handleDismiss = React.useCallback(() => {
    setVisibility(false);
    setQuery('');
  }, [setVisibility, setQuery]);

  const renderItem = React.useCallback(({ item }: ListRenderItemInfo<IFieldSelectOption>) => {
    if (multiple) {
      return (
        <Checkbox
          label={item.label}
          value={internalValue.has(item.value)}
          onChange={checked => {
            checked ? internalValue.add(item.value) : internalValue.delete(item.value);
            setInternalValue(new Set(internalValue));
          }}
        />
      );
    }

    return (
      <Radio
        label={item.label}
        radioValue={item.value}
        value={firstValue}
        onChange={value => setInternalValue(new Set([value]))}
      />
    );
  }, [internalValue, setInternalValue, multiple, firstValue]);

  const keyExtractor = React.useCallback((item: IFieldSelectOption) => `${item.label}-${item.value}`, []);

  const iconStyle = React.useMemo(() => {
    if (props.mode !== 'outlined') return styles.icon;
    return { ...styles.icon, ...styles.iconOutlined };
  }, [props.mode]);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={handleOpen}>
        <View pointerEvents='none'>
          <FieldText
            {...otherProps}
            label={label}
            ref={null}
            value={displayValue}
            validation={null}
            errorMessage={showError ? errorMessage : null}
            onChange={nullCallback}
            flowIndex={null}
            tabIndex={null}
            editable={false}
          />
          <IconButton icon='keyboard-arrow-down' style={iconStyle} />
        </View>
      </TouchableOpacity>

      <Portal>
        <FieldValidationConfigContext.Provider value={config}>
          <Dialog visible={visible} onDismiss={handleDismiss}>
            {searchable ?
              <View style={styles.header}>
                <Searchbar
                  placeholder={label}
                  value={query}
                  onChangeText={setQuery}
                  style={styles.searchbar}
                />
              </View> :
              <Dialog.Title>{label}</Dialog.Title>
            }
            <Dialog.ScrollArea style={styles.scrollArea}>
              <ScrollView>
                <View style={styles.scrollView}>
                  <FlatList
                    extraData={internalValue}
                    data={filteredOptions}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                  />
                  {!filteredOptions.length &&
                    <Paragraph style={styles.notFound}>{(config.selectLabels || { notFound: 'Not found' }).notFound}</Paragraph>
                  }
                </View>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={handleDismiss}>{(config.selectLabels || { cancel: 'Cancel' }).cancel}</Button>
              <Button onPress={handleDone}>{(config.selectLabels || { done: 'Done' }).done}</Button>
            </Dialog.Actions>
          </Dialog>
        </FieldValidationConfigContext.Provider>
      </Portal>
    </React.Fragment>

  );
});

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
  icon: {
    position: 'absolute',
    top: 8,
    right: 0,
    opacity: 0.6
  },
  iconOutlined: {
    top: 12
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