import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Homepage/HomePage";
import SignupPage from "./pages/Signup/Signup";
import LoginForm from "./pages/LoginForm/LoginForm";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="site">
      <Router>
        <Header setSearchTerm={setSearchTerm} />

        <div className="main-content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage searchTerm={searchTerm} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search/:searchTerm"
              element={<HomePage searchTerm={searchTerm} />}
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
