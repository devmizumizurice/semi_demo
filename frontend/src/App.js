import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GuestRoute, PrivateRoute } from './AuthRouter';
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { TopPage } from './components/pages/TopPage';

import { refresh } from './api/auth';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      refresh();
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<GuestRoute children={<TopPage />}></GuestRoute>}
        />
        <Route
          path='/register'
          element={<GuestRoute children={<RegisterPage />}></GuestRoute>}
        />
        <Route
          path='/login'
          element={<GuestRoute children={<LoginPage />}></GuestRoute>}
        />
        <Route
          path='/home'
          element={<PrivateRoute children={<HomePage />}></PrivateRoute>}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
