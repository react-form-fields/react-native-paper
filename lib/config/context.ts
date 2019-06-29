import FieldValidationConfigContextCore from '@react-form-fields/core/config/context';

import ConfigBuilderClass from './builder';

export { IConfig } from '@react-form-fields/core/config/context';

declare module '@react-form-fields/core/config/context' {
  interface IConfig {
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
    textMode?: 'flat' | 'outlined';
    date?: {
      locale: any;
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

export const ConfigBuilder = ConfigBuilderClass;

const FieldValidationConfigContext = FieldValidationConfigContextCore;
export default FieldValidationConfigContext;
