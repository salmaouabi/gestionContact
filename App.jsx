import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contacts from "./Contacts";
import './App.css';
import ContactDetails from "./ContactDetails";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <div style={{ width: "300px", borderRight: "1px solid #ccc", padding: "10px" }}>
          <h2>Contacts</h2>
          <Contacts />
        </div>

        {/* Details Section */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/contacts/:id" element={<ContactDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;