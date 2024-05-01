import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import SingleUser from './Components/SingleUser';
import './UsersStyle.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function UserDetails() {
    const path = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [singleUser, setSingleUser] = useState({})
    const [alertModal, setAlertModal] = useState(false);
    const [userIdDelete, setUserIdDelete] = useState();

    const fetchUserDetails = async () => {
        let D_User = await dispatch.user.getUserDetails(path.id)
        setSingleUser(D_User);
    }
    useEffect(() => {
        fetchUserDetails()
    }, [path.id]);

    // -------------------------------  Delete User --------------------------------------------
    const deleteUser = async (id) => {
        setAlertModal(false)
        const deletedUser = await dispatch.user.deleteUser(id);
        if (deletedUser.success) {
            toast.success("Deleted Successfully!!!")
            navigate('/user');

        }
    };
    const removeUser = () => {
        setAlertModal(true)
    };

    // -------------------------------- ----------------------------------------------------------

    return (
        <div className='view-cad bg-white '
            onClick={() => setUserIdDelete(path.id)}>
            <SingleUser className="card" alertModal={alertModal} userIdDelete={userIdDelete} setAlertModal={setAlertModal} deleteUser={deleteUser} removeUser={removeUser} user={singleUser} updateOptions={true} />
        </div>
    )
}
export default UserDetails
