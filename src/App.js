import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Homepage/HomePage";
import SignupPage from "./pages/Signup/Signup";
import LoginForm from "./pages/LoginForm/LoginForm";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  return (
    <div className="site">
      <Router>
        <Header />

        <div className="main-content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
