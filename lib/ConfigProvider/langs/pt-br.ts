import coreLangPTBR from '@react-form-fields/core/ConfigProvider/langs/pt-br';
import * as locale from 'date-fns/locale/pt-BR';

import { IConfig } from '../context';

const langPTBR: IConfig = {
  ...coreLangPTBR,
  date: {
    dataFnsLocale: locale,
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