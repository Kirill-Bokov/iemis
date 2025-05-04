import React from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DisplayPanel from "./components/DisplayPanel/DisplayPanel";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <DisplayPanel />
      <Footer />
    </div>
  );
};

export default App;
