import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import GreetingPage from "./Pages/GreetingPage";
import PerformancePage from "./Pages/PerformancePage";
import AuditLogs from "./Pages/AuditLogs";
import ExportCenter from "./Pages/ExportCenter"; // Added for PDF Report Generation

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  // Protected Route Logic: Ensures only logged-in users access internal pages
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: !hasStarted ? (
        <GreetingPage onComplete={() => setHasStarted(true)} />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    { 
      path: "/dashboard", 
      element: (
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>
      ) 
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { 
      path: "/performance", 
      element: (
        <ProtectedRoute>
          <PerformancePage />
        </ProtectedRoute>
      ) 
    },
    { 
      path: "/audit", 
      element: (
        <ProtectedRoute>
          <AuditLogs />
        </ProtectedRoute>
      ) 
    },
    { 
      path: "/export", // Registered path for Export Center
      element: (
        <ProtectedRoute>
          <ExportCenter />
        </ProtectedRoute>
      ) 
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;