import CoreConfigBuilder from '@react-form-fields/core/config/builder';

import { IConfig } from './context';

export default class ConfigBuilder extends CoreConfigBuilder {
  public setDateConfig(locale: any, pickerLocale: string, formats: IConfig['date']['formats'], labels: IConfig['date']['labels']) {
    this.config = {
      ...this.config,
      date: {
        locale,
        pickerLocale,
        formats,
        labels
      }
    };

    return this;
  }

  public setValidationOn(event: IConfig['validationOn']) {
    this.config = {
      ...this.config,
      validationOn: event
    };
    return this;
  }

  public setTextMode(textMode: IConfig['textMode']) {
    this.config = {
      ...this.config,
      textMode
    };
    return this;
  }

  public clean() {
    this.config = {
      ...super.clean(),
      validationOn: 'onSubmit',
      textMode: null,
      date: {
        locale: null,
        pickerLocale: 'en-US',
        formats: {
          date: 'yyyy-MM-dd',
          time: 'HH:ss',
          datetime: 'yyyy-MM-dd HH:ss',
        },
        labels: {
          ok: 'Ok',
          cancel: 'Cancel',
        }
      }
    };

    return this;
  }
}