import React, { useState, useEffect } from 'react';
import './UsersStyle.css';
import SingleUser from './SingleUser';
import PaginatedItems from '../../Components/pagination/Paging';
import '../../Components/pagination/paging.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const UserList = () => {
    //return the reference of a dispach function
    const dispatch = useDispatch()
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
   
    const fetchUsers = async () => {
        let res = await dispatch.user.getUsers(currentPage)
        setUserList(res)
    }
    useEffect(() => {
        fetchUsers()
    }, [currentPage]);
    return (
        <div>
            <h1 className="user-h1 mt-2 ">Users List</h1>
            <div className="cards card mt-5 shadow rounded-pill ">
                {userList.map((user) => (
                    <Link className='user-cards card' to={`/user/${user.id}`} key={user.id}>
                        <SingleUser user={user} /></Link>
                ))}
            </div>
            <div >
                <PaginatedItems setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
};

export default UserList;
