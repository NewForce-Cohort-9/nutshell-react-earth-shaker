import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ApplicationViews } from './views/ApplicationViews.jsx';
import { Login } from './components/auth/Login.jsx';
import { Register } from './components/auth/Register.jsx';
import { Authorized } from './views/Authorized.jsx';

function App() {
<<<<<<< HEAD
  const [count, setCount] = useState(0);
=======
>>>>>>> main
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="*" element={  <Authorized> <ApplicationViews /> </Authorized>} />
      </Routes>
    </Router>
  );
}
export default App;
