import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import GreetingPage from "./Pages/GreetingPage";
import PerformancePage from "./Pages/PerformancePage"; // Import the new page

function App() {
  const [showApp, setShowApp] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: !showApp ? (
        <GreetingPage onComplete={() => setShowApp(true)} />
      ) : (
        <LandingPage />
      ),
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/performance", element: <PerformancePage /> }, // Performance route added
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;