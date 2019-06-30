import ValidationContext, { IProps, IValidationContextRef } from '@react-form-fields/core/components/ValidationContext';
import * as React from 'react';

import { FieldFlowContext, IFieldFlowContext } from '../hooks/useFieldFlow';

export interface IValidationContextProps extends IProps {

}

const WrapperValidationContext = React.memo(React.forwardRef<IValidationContextRef>(({ children, ...props }: IValidationContextProps, ref) => {
  const [fields, setFields] = React.useState<{ position: number, onFocusHandler: Function }[]>([]);
  const fieldFlow = React.useMemo<IFieldFlowContext>(() => {
    return {
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

        console.log('fields: ' + fields.map(f => f.position).join());
        console.log('currenPosition: ' + currenPosition);
        console.log('nextField: ' + nextField);

        if (!nextField) return false;

        nextField.onFocusHandler();
        return true;
      },
    };
  }, [fields, setFields]);

  console.log(fields.length);

  return (
    <FieldFlowContext.Provider value={fieldFlow}>
      <ValidationContext {...props} ref={ref}>
        {children}
      </ValidationContext>
    </FieldFlowContext.Provider>
  );
}));

export default WrapperValidationContext;