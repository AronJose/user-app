import React, { useState, useEffect } from 'react';
import './UsersStyle.css';
import SingleUser from './Components/SingleUser';
import PaginatedItems from '../../Components/pagination/Paging';
import '../../Components/pagination/paging.css'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const UserList = () => {
    const dispatch = useDispatch()
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState()
    const [alertModal, setAlertModal] = useState(false);
    const [userIdDelete, setUserIdDelete] = useState();

    const fetchUsers = async () => {
        let res = await dispatch.user.getUsers(currentPage)
        setUserList(res.rows);
        setTotalPage(res.count / 6);
    }
    useEffect(() => {
        fetchUsers()
    }, [currentPage]);
    // -------------------------------  Delete User --------------------------------------------
    const deleteUser = async (id) => {
        setAlertModal(false)
        const deletedUser = await dispatch.user.deleteUser(id);
        if (deletedUser.success) {
            toast.success("Deleted Successfully!!!")
            fetchUsers()
        }
    };
    const removeUser = () => {
        setAlertModal(true)
    };
    // -------------------------------- ----------------------------------------------------------
    return (
        <div>
            <h1 className="user-h1 mt-2 font-extrabold text-3xl pt-2 ">Users List</h1>
            <div className="cards mt-5 h-fit bg-white  py-4 space-y-4 ">
                {userList&&userList.map((user) => (
                    <div className='user-cards bg-white' key={user.id} onClick={() => setUserIdDelete(user.id)}>
                        <SingleUser alertModal={alertModal} setAlertModal={setAlertModal} userIdDelete={userIdDelete} removeUser={removeUser} deleteUser={deleteUser} user={user} setUserList={setUserList} currentPage={currentPage} updateOptions={false}  /> </div>
                ))}
            </div>
            <div className="my-2">
                <PaginatedItems setCurrentPage={setCurrentPage} currentPage={currentPage} setTotalPage={setTotalPage} totalPage={totalPage} />
            </div>
        </div>
    )

};

export default UserList;
