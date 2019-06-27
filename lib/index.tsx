import FieldCheckboxComponent from './components/Checkbox';
import CustomMessageComponent from './components/CustomMessage';
import FieldRadioComponent from './components/Radio';
import FieldSwitchComponent from './components/Switch';
import FieldTextComponent from './components/Text';
import ValidationContextComponent from './components/ValidationContext';
import ConfigBuilderCore from './config/builder';
import FieldValidationConfigContextCore from './config/context';

// import FieldDatepickerComponent from './components/Datepicker';
// import FieldPickerComponent from './components/Picker';
// export const FieldPicker = FieldPickerComponent;
// export const FieldDatepicker = FieldDatepickerComponent;
export const FieldText = FieldTextComponent;
export const FieldRadio = FieldRadioComponent;
export const FieldCheckbox = FieldCheckboxComponent;
export const FieldSwitch = FieldSwitchComponent;

export const ConfigBuilder = ConfigBuilderCore;
export const FieldValidationConfigContext = FieldValidationConfigContextCore;

export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;