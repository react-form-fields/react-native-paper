import { IConfig } from '@react-form-fields/core/config/context';
import coreLangENUS from '@react-form-fields/core/lang/en-us';
import * as locale from 'date-fns/locale/en-US';

const langENUS: IConfig = {
  ...coreLangENUS,
  date: {
    locale,
    pickerLocale: 'en-US',
    formats: {
      date: 'MM/dd/yyyy',
      time: 'hh:mm a',
      datetime: 'MM/dd/yyyy hh:mm a'
    },
    labels: {
      ok: 'Ok',
      cancel: 'Cancel',
    }
  }
};

export default langENUS;