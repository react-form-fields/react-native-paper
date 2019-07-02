import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import * as React from 'react';
import { HelperText } from 'react-native-paper';

export interface IErrorHelperTextProps {
  showError: boolean;
  errorMessage: string;
  helperText: string;
}

const ErrorHelperText = React.memo((props: IErrorHelperTextProps) => {
  const config = useConfigContext();

  if (!props.showError || !props.helperText) return null;

  return null;

  return (
    <HelperText
      {...(config.helperTextProps || {})}
      type={props.showError ? 'error' : 'info'}
      visible={true}
    >
      {props.showError ? props.errorMessage : props.helperText}
    </HelperText>
  );
});

ErrorHelperText.displayName = 'ErrorHelperText';
export default ErrorHelperText;