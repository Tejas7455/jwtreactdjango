import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />  
        <Route path='login/' element={<Login/>} />
        <Route path='register/' element={< Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
