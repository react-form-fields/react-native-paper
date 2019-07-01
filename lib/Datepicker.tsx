import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

import { dateFormat } from './helpers/dateFormat';
import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import FieldText, { IFieldTextProps } from './Text';

export interface IFieldDatepickerProps extends
  PropsResolver<IFieldTextProps, 'mode' | 'theme'>,
  PropsResolver<DateTimePickerProps, 'onConfirm' | 'onCancel' | 'isVisible' | 'date'>,
  IFlowIndexProp {
  value: Date;
  onChange: (value: Date) => void;
}

const nullCallback = () => { };

const FieldDatepicker = React.memo((props: IFieldDatepickerProps) => {
  const { value, onChange, mode, ...otherProps } = props;

  const [showPicker, setShowPicker] = React.useState(false);
  const [fromFieldFlow, setFromFieldFlow] = React.useState(false);

  const config = useConfigContext();
  const { setDirty, showError, errorMessage } = useValidation(props);

  const onFocusFlow = React.useCallback(() => { setFromFieldFlow(true); setShowPicker(true); }, [setShowPicker, setFromFieldFlow]);
  const [goNext, , currentIndex] = useFieldFlow(props, onFocusFlow);

  const onTouchEndHandler = React.useCallback(() => { setFromFieldFlow(false); setShowPicker(true); }, [setShowPicker, setFromFieldFlow]);
  const datePickerProps = useMemoOtherProps(props, 'value', 'onChange');

  const onConfirmHandler = React.useCallback((value: Date) => {
    setDirty(true);
    onChange(value);
    setShowPicker(false);

    if (!fromFieldFlow) return;
    goNext(currentIndex);
  }, [goNext, currentIndex, fromFieldFlow]);

  const onCancelHandler = React.useCallback(() => setShowPicker(false), [setShowPicker]);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={onTouchEndHandler}>
        <View pointerEvents='none'>
          <FieldText
            {...otherProps}
            ref={null}
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
        {...datePickerProps}
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