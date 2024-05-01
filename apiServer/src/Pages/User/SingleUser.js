import React from 'react'
import './UsersStyle.css';

const SingleUser = ({ user }) => {
    return (
        <div>
            <div className="card shadow list-card ">
                <img className="img-size shadow rounded-pill mt-2" alt="" src={user.avatar} />
                <h5>{user.first_name} {user.last_name}</h5>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

export default SingleUser
