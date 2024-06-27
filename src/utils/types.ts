import { ReactNode } from 'react';

interface routeType {
  path: string;
  element: ReactNode;
}

interface FormInputsSubmit {
  title: string;
  description?: string;
  date: Date;
  todoState?: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
}

export type { routeType, FormInputsSubmit };
