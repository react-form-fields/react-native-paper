import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

import FieldValidationConfigContext from '../config/context';
import { dateFormat } from '../helpers/dateFormat';
import FieldText, { IFieldTextProps } from './Text';

export interface IFieldDatepickerProps extends
  PropsResolver<IFieldTextProps, 'mode' | 'theme'>,
  PropsResolver<DateTimePickerProps, 'onConfirm' | 'onCancel' | 'isVisible' | 'date'> {
  value: Date;
  onChange: (value: Date) => void;
}

const nullCallback = () => { };

const FieldDatepicker = React.memo((props: IFieldDatepickerProps) => {
  const { value, onChange, mode, ...otherProps } = props;

  const [showPicker, setShowPicker] = React.useState(false);
  const { setDirty, showError, errorMessage } = useValidation(props);
  const config = React.useContext(FieldValidationConfigContext);

  const onTouchEndHandler = React.useCallback(() => setShowPicker(true), [setShowPicker]);

  const onConfirmHandler = React.useCallback((value: Date) => {
    setDirty(true);
    onChange(value);
    setShowPicker(false);
  }, []);

  const onCancelHandler = React.useCallback(() => setShowPicker(false), [setShowPicker]);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={onTouchEndHandler}>
        <View pointerEvents='none'>
          <FieldText
            {...otherProps}
            value={dateFormat(value, mode || 'date', config)}
            validation={null}
            errorMessage={showError ? errorMessage : null}
            onChange={nullCallback}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <DateTimePicker
        titleIOS={props.label}
        confirmTextIOS={config.date.labels.ok}
        cancelTextIOS={config.date.labels.cancel}
        locale={config.date.pickerLocale}
        {...otherProps}
        mode={mode}
        date={value || new Date()}
        isVisible={showPicker}
        onConfirm={onConfirmHandler}
        onCancel={onCancelHandler}
      />
    </React.Fragment>
  );
});

export default FieldDatepicker;