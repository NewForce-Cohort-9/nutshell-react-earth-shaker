import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { NavBar } from './components/nav/NavBar.jsx';
import { ApplicationViews } from './views/ApplicationViews.jsx';
import { Login } from './components/auth/Login.jsx';
import { Register } from './components/auth/Register.jsx';
import { Authorized } from './views/Authorized.jsx';

function App() {
  const [count, setCount] = useState(0);
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="*" element={  <Authorized> <ApplicationViews /> </Authorized>} />
      </Routes>
      <div className="Dashboard">
        <header className="App-header">
          <h1>Welcome to Nutshell</h1>
        </header>
      </div>
    </Router>
  );
}
export default App;
