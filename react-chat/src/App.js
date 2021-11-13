import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import ChatBox from './components/ChatBox';
import ChatLogin from './components/ChatLogin'
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBox />} strict />
        <Route path="/login" element={<ChatLogin />} strict />
      </Routes>
    </Router>
  )
}

export default App;
