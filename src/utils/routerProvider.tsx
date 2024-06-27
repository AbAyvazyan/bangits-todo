import Home from '@pages/Home';
import Trash from '@pages/Trash';
import { routeType } from '@utils/types.ts';

const router: routeType[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'trash',
    element: <Trash />,
  },
];
export { router };
