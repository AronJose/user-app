import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import UserDetails from '../Pages/User/UserDetails';
import UserList from '../Pages/User/UserList';
import AddUser from '../Pages/User/AddUser';
import Cookies from 'js-cookie'
import SingUp from '../Pages/Auth/SingUp';
import Login from '../Pages/Auth/Login';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRote';
import Profile from '../Pages/User/Profile';


function Router() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("location", location.pathname)
        const authToken = Cookies.get('authToken');
        if (location.pathname === '/signup') {
            return navigate("/signup")
        }
        if (authToken !== undefined) {
            console.log("user loggedin")
            navigate("/home")
        } else {
            navigate("/");
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<PublicRoute  component={Login} />} />
            <Route path="/signup" element={<PublicRoute component={SingUp} />} />

            <Route path="/home" element={<PrivateRoute header={true} component={Home} />} />
            <Route path="/user" element={<PrivateRoute header={true} component={UserList} />}/>
            <Route path="/user/:id" element={<PrivateRoute header={true} component={UserDetails} />}/>
            <Route path="/adduser" element={<PrivateRoute header={true} component={AddUser} />}/>
            <Route path="/home" element={<PrivateRoute header={true} component={Home} />}/>
            <Route path="/profile" element={<PrivateRoute header={true} component={Profile} />}/>
        </Routes>
    )
}

export default Router
