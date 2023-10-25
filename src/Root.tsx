import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/ReduxStore';

import { AuthProvider } from './store/AuthContext';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { RequireAuth } from './pages/AuthPage/components/RequireAuth';
import { AuthPage } from './pages/AuthPage';
import { TablePage } from './pages/TablePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <AuthProvider>
    <Provider store={store}>
      <Router>
        {/* ↑ <HashRouter> for GitHub page */}
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="auth" element={<AuthPage />} />

            <Route path="user" element={<RequireAuth />}>
              <Route path="table" element={<TablePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </AuthProvider>
);
