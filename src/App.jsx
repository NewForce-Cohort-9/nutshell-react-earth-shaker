import './App.css'
import { AllNews } from './components/AllNews'


export const App=()=> {

  return (
    <>
        <div className="Dashboard">
      <header className="App-header">
        <h1>Welcome to Nutshell</h1>
      </header>
      <AllNews />
    </div>
    </>
  )
}


