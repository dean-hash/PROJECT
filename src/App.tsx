import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import AffiliateProfileForm from './components/AffiliateProfileForm';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <AffiliateProfileForm onSubmit={() => {}} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;