import { ToastContainer } from 'react-toastify';
import './App.css';

import Navbar from './components/Navbar';

import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import AddContact from './components/AddContact';

const App = () => {
  return (
    <div className="App">
       { /* /add /edit/:id /delete */}
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        {/* <Route path="/edit/:id" element={<Users />} /> */}
      </Routes>      
    </div>
  );
}

export default App;
