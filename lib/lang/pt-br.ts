import { IConfig } from '@react-form-fields/core/config/context';
import coreLangPTBR from '@react-form-fields/core/lang/pt-br';
import * as locale from 'date-fns/locale/pt-BR';

const langPTBR: IConfig = {
  ...coreLangPTBR,
  date: {
    locale,
    pickerLocale: 'pt-BR',
    formats: {
      date: 'dd/MM/yyyy',
      time: 'HH:mm',
      datetime: 'dd/MM/yyyy HH:mm'
    },
    labels: {
      ok: 'Ok',
      cancel: 'Cancelar',
    }
  }
};

export default langPTBR;