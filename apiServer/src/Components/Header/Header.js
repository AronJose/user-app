import React from 'react';
import './Header.css'
import {Link} from "react-router-dom";

export default function Header() {
    return (

        <nav>
            <div>
                <h2>Company</h2>
            </div>
            <div className="text">
                <Link className='header-links' to="/"><span>Home</span></Link>
                <Link className='header-links' to="/user"><span>User</span></Link>
                <Link className='header-links' to="/adduser"><span>Add-User</span></Link>
                <span>About</span>
                <span>Contact us</span>
                <span>Sign in</span>
            </div>

       
        </nav>

    )
}
