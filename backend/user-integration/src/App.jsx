import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './views/dashboard/Dashboard';
import Register from './views/register/Register';
import Users from './views/users/Users';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    filters: ''
  });

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setFilters(prevForm => ({
        ...prevForm,
        [name]: value
    }));
    console.log(filters.filters)
  }

  return (
    <>
      <div className='navBar'>
        <div className='n' onClick={() => navigate('/')}>
          Dashboard
        </div>
        <div className='n' onClick={() => navigate('/register')}>
          Register
        </div>
        <div className='n'>
          <input className='inputApp'
            name='filters'
            value={filters.filters}
            onChange={handleSearch}
          ></input>
          <button className='searchButton'
            onClick={() => navigate('/')}
          >Search</button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard fil={filters.filters}/>} />
        <Route path="/register" element={<Register />} />
        <Route path='/users/:id' element={<Users />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
