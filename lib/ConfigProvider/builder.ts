import CoreConfigBuilder from '@react-form-fields/core/ConfigProvider/builder';

import { IConfig } from './context';

export default class ConfigBuilder extends CoreConfigBuilder {
  public setDateConfig(locale: any, pickerLocale: string, formats: IConfig['date']['formats'], labels: IConfig['date']['labels']) {
    this.config = {
      ...this.config,
      date: {
        dataFnsLocale: locale,
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

  public setTextInputProps(textInputProps: IConfig['textInputProps']) {
    this.config = {
      ...this.config,
      textInputProps
    };
    return this;
  }

  public setHelperTextProps(helperTextProps: IConfig['helperTextProps']) {
    this.config = {
      ...this.config,
      helperTextProps
    };
    return this;
  }

  public clean() {
    this.config = {
      ...super.clean(),
      validationOn: 'onSubmit',
      textMode: null,
      date: {
        dataFnsLocale: null,
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