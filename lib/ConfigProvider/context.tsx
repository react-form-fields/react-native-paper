import FieldValidationConfigContextCore from '@react-form-fields/core/ConfigProvider';
import { TextInputProps } from 'react-native-paper';

export { IConfig } from '@react-form-fields/core/ConfigProvider';

declare module '@react-form-fields/core/ConfigProvider' {
  interface IConfig {
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
    textMode?: TextInputProps['mode'];
    date?: {
      dataFnsLocale: any;
      pickerLocale: string;
      formats: {
        date: string;
        time: string;
        datetime: string;
      },
      labels: {
        ok: string;
        cancel: string;
      }
    };
  }
}

const FieldValidationConfigContext = FieldValidationConfigContextCore;
export default FieldValidationConfigContext;
