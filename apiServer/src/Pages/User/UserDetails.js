import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router';
import SingleUser from './SingleUser';
import './UsersStyle.css';

function UserDetails() {
    const path = useParams()
    const [singleUser, setSingleUser] = useState({})
    useEffect(() => {
        fetch(` https://reqres.in/api/users/${path.id}`)
            .then(response => response.json())
            .then(S_user => setSingleUser(S_user.data))
    }, [path.id])
    return (
        <div className='view-cad rounded-pill shadow'>
            <SingleUser className="card" user={singleUser} />
            </div>
    )      
}
export default UserDetails
