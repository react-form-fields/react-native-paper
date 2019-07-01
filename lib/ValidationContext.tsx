import ValidationContextCore, { IProps, IValidationContextRef } from '@react-form-fields/core/ValidationContext';
import * as React from 'react';
import { InteractionManager } from 'react-native';

import { FieldFlowContext, IFieldFlowContext } from './hooks/useFieldFlow';

export interface IValidationContextProps extends IProps {
}

const ValidationContext = React.memo(React.forwardRef<IValidationContextRef, IValidationContextProps>(
  ({ children, ...props }: IValidationContextProps, ref) => {
    const [fields, setFields] = React.useState<{ position: number, onFocusHandler: Function }[]>([]);
    const fieldFlow = React.useMemo<IFieldFlowContext>(() => {
      return {
        id: Date.now(),
        registerPosition(position: number, onFocusHandler: Function): void {
          setFields(fields => [...fields.filter(f => f.position !== position), { position, onFocusHandler }]);
        },
        unregisterPosition(position: number): void {
          setFields(fields => [...fields.filter(f => f.position !== position)]);
        },
        goNext(currenPosition: number): boolean {
          const nextField = fields
            .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1)
            .find(f => f.position > currenPosition);

          if (!nextField) return false;

          InteractionManager.runAfterInteractions().then(() => {
            nextField.onFocusHandler();
          });

          return true;
        },
      };
    }, [fields, setFields]);

    return (
      <FieldFlowContext.Provider value={fieldFlow}>
        <ValidationContextCore {...props} ref={ref}>
          {children}
        </ValidationContextCore>
      </FieldFlowContext.Provider>
    );
  })
);

export default ValidationContext;