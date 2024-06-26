import { Provider } from 'react-redux';
import store from '@app/store.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import { router } from '@utils/routerProvider.tsx';
import { routeType } from '@utils/types.ts';

import './index.scss';


const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainLayout>
          <Routes>
            {router.map((route: routeType, index: number) => {
              return <Route key={index} path={route.path} element={route.element} />;
            })}
          </Routes>
        </MainLayout>
      </Provider>
    </BrowserRouter>

  );
};

export default App;