// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Snippets from "./components/Snippets";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import CreateSnippetForm from "./components/CreateSnippetForm";
import SnippetDetails from "./components/SnippetDetails";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/snippet/create"
            element={<PrivateRoute element={<CreateSnippetForm />} />}
          />
          <Route
            path="/snippet/:id"
            element={<PrivateRoute element={<SnippetDetails />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
