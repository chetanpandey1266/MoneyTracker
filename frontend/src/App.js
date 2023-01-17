import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';

function App() {  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}/>
        <Route path="/user" element={<Dashboard/>} />
        <Route path="/signin" element={
          <>
              <Navbar />
              <Signin />
          </>
        } />
        <Route path="/signup" element={
          <>
              <Navbar />
              <Signup />
          </>
        } />
        <Route path="*" element={<div></div>}/>
      </Routes>
    </div>
  );
}

export default App;
