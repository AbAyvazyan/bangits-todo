import { ReactNode } from 'react';

interface routeType {
  path: string,
  element: ReactNode,
}

interface FormInputs {
  title: string;
  description?: string;
  date: Date;
}


export type { routeType, FormInputs };