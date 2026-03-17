import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const isAuthenticatedFlag = localStorage.getItem('isAuthenticated');

      console.log('ProtectedRoute check:', { 
        accessToken: !!accessToken, 
        refreshToken: !!refreshToken, 
        isAuthenticatedFlag,
        path: location.pathname 
      });

      // Simple check - if we have tokens and auth flag, assume authenticated
      if (accessToken && refreshToken && isAuthenticatedFlag === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [location]); // Re-check when location changes

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;