import * as React from 'react';

export interface IFlowIndexProp {
  flowIndex?: number;
  tabIndex?: number;
}

export interface IFieldFlowContext {
  registerPosition(position: number, onFocusHandler: Function): void;
  unregisterPosition(position: number): void;
  goNext(currenPosition: number): boolean;
}

const goNextEmpty = [() => false, false, null] as [IFieldFlowContext['goNext'], boolean, number];

export const FieldFlowContext = React.createContext<IFieldFlowContext>(null);

const useFieldFlow = ({ flowIndex, tabIndex }: IFlowIndexProp, onFocusHandler: Function) => {
  const index = React.useMemo(() => flowIndex === undefined ? tabIndex : flowIndex, [flowIndex, tabIndex]);
  const previousIndex = React.useMemo(() => ({ current: index }), []);
  const context = React.useContext(FieldFlowContext);

  React.useEffect(() => {
    context.unregisterPosition(previousIndex.current);
    previousIndex.current = index;
  }, [index]);

  React.useEffect(() => {
    if (index === undefined || index === null) {
      return () => { };
    }

    context.registerPosition(index, onFocusHandler);
    return () => context.unregisterPosition(index);
  }, [index, onFocusHandler]);

  return React.useMemo(() => {
    if (index === undefined || index === null) return goNextEmpty;

    if (!context) {
      console.warn('@react-form-fields/react-native-paper: you need to use a ValidationContext to use flowIndex/tabIndex');
      return goNextEmpty;
    }

    return [context.goNext, true, index] as [IFieldFlowContext['goNext'], boolean, number];
  }, [index, context]);
};

export default useFieldFlow;