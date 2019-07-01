import FieldCheckboxComponent from './Checkbox';
import ConfigProviderComponent from './ConfigProvider';
import ConfigBuilderCore from './ConfigProvider/builder';
import CustomMessageComponent from './CustomMessage';
import FieldDatepickerComponent from './Datepicker';
import FieldRadioComponent from './Radio';
import FieldSwitchComponent from './Switch';
import FieldTextComponent from './Text';
import ValidationContextComponent from './ValidationContext';

// import FieldPickerComponent from './Picker';
// export const FieldPicker = FieldPickerComponent;
export const FieldDatepicker = FieldDatepickerComponent;
export const FieldText = FieldTextComponent;
export const FieldRadio = FieldRadioComponent;
export const FieldCheckbox = FieldCheckboxComponent;
export const FieldSwitch = FieldSwitchComponent;

export const ConfigBuilder = ConfigBuilderCore;
export const ConfigProvider = ConfigProviderComponent;

export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;