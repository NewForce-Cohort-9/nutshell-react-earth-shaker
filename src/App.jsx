// import './App.css'
// import { AllNews } from './components/AllNews'


// export const App=()=> {

//   return (
//     <>
//         <div className="Dashboard">
//       <header className="App-header">
//         <h1>Welcome to Nutshell</h1>
//       </header>
//       <AllNews />
//     </div>
//     </>
//   )
// }


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ApplicationViews } from './views/ApplicationViews.jsx';
import { Login } from './components/auth/Login.jsx';
import { Register } from './components/auth/Register.jsx';
import { Authorized } from './views/Authorized.jsx';


function App() {
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
