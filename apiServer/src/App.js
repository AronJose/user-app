
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import UserDetails from './Pages/User/UserDetails';
import UserList from './Pages/User/UserList';
import AddUser from './Pages/User/AddUser';



function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<UserList/>} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/adduser" element={<AddUser />} />
      </Routes>
        
    </div>
  );
}

export default App;
