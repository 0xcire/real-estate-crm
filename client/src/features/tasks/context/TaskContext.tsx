import { useState, createContext, useContext } from 'react';

import type { ReactNode, Dispatch, SetStateAction } from 'react';

// TODO: another place where ComponentWithChild could be used
type TaskProviderProps = {
  children: ReactNode;
};

type TaskState = {
  showCompleted: boolean;
  setShowCompleted: Dispatch<SetStateAction<boolean>>;
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
};

const taskContext = createContext<TaskState | undefined>(undefined);

export function TaskProvider({ children }: TaskProviderProps): JSX.Element {
  const [showCompleted, setShowCompleted] = useState(false);
  const [pageTitle, setPageTitle] = useState('Tasks');

  //TODO: address
  const value = {
    showCompleted,
    setShowCompleted,
    pageTitle,
    setPageTitle,
  };
  return <taskContext.Provider value={value}>{children}</taskContext.Provider>;
}

export function useTaskContext(): TaskState {
  const context = useContext(taskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
}
