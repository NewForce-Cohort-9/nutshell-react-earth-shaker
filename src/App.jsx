import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ApplicationViews } from './views/ApplicationViews.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ApplicationViews />} />
      </Routes>
    </Router>
  );
}

export default App;
