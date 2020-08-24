import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import TopNavbar from "./components/TopNavbar";
import Content from "./components/Content";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <TopNavbar />
        <Content />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
