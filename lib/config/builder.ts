import CoreConfigBuilder from '@react-form-fields/core/config/builder';

import { IConfig } from './context';

export default class ConfigBuilder extends CoreConfigBuilder<IConfig> {
  public setDateConfig(locale: any, formats: IConfig['date']['formats'], labels: IConfig['date']['labels']) {
    this.config = {
      ...this.config,
      date: {
        locale,
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

  public clean() {
    return {
      ...super.clean(),
      validationOn: 'onSubmit',
      date: {
        formats: {
          date: 'yyyy-MM-dd',
          time: 'HH:ss',
          dateTime: 'yyyy-MM-dd HH:ss',
        },
        labels: {
          ok: 'Ok',
          cancel: 'Cancel',
        }
      }
    };
  }
}