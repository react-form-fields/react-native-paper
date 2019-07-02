import FieldValidationConfigContextCore from '@react-form-fields/core/ConfigProvider';
import { HelperTextProps, TextInputProps } from 'react-native-paper';

export { IConfig } from '@react-form-fields/core/ConfigProvider';

declare module '@react-form-fields/core/ConfigProvider/context' {
  interface IConfig {
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
    textInputProps?: TextInputProps;
    helperTextProps?: HelperTextProps;
    selectLabels?: {
      done: string;
      cancel: string;
      notFound: string
    },
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
