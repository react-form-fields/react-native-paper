import FieldValidationConfigContextCore from '@react-form-fields/core/config/context';

import ConfigBuilderClass from './builder';

export { IConfig } from '@react-form-fields/core/config/context';

declare module '@react-form-fields/core/config/context' {
  interface IConfig {
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
    date?: {
      locale?: any;
      formats?: {
        date?: string;
        time?: string;
        dateTime?: string;
      },
      labels?: {
        ok: string;
        cancel: string;
      }
    };
  }
}

export const ConfigBuilder = ConfigBuilderClass;

const FieldValidationConfigContext = FieldValidationConfigContextCore;
export default FieldValidationConfigContext;
