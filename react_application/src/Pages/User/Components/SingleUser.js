import React, { useState } from 'react'
import '../UsersStyle.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import AddUser from '../AddUser';
import 'react-toastify/dist/ReactToastify.css';
import { CCloseButton } from '@coreui/react'


const SingleUser = ({ user, userIdDelete,setUserList, currentPage, updateOptions, deleteUser, alertModal, setAlertModal, removeUser, setDetails}) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [edited, setEdited] = useState(false)
    const openModal = () => {
        setIsModalOpen(true);
        setEdited(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal
                className='modal_alert'
                isOpen={alertModal}
                contentLabel="Delete Modal">
                <div className='card alert_card'>
                    <span className="">Are you sure you want to delete this user?</span>
                    <div className='d-flex justify-content-between align-items-center gap-5'>
                        <button onClick={() => setAlertModal(false)} className="btn btn-primary">Close</button>
                        <button onClick={() => { deleteUser(userIdDelete)}} className="btn btn-danger">Okay</button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Modal">
                <AddUser user={user} edited={edited} currentPage={currentPage}  setUserList={setUserList} setIsModalOpen={setIsModalOpen}/>
                <button className="close_button" onClick={closeModal}><CCloseButton /></button>
            </Modal>
            <div className="card shadow list-card m-3" >
                <div className="d-flex flex-column align-items-center" onClick={() => navigate(`/user/${user.id}`)}>
                    <img className="imgUpload rounded-circle m-3 shadow" src={`http://localhost:8080/${user.image_url}`} alt="image" />
                    <h5>{user.first_name} {user.last_name}</h5>
                    {
                        updateOptions &&
                        <div>
                            <p>{user.email}</p>
                            <p>{user.phone_number}</p>
                        </div>
                    }

                </div>
                <div className="d-flex edit_delet align-items-center my-2">
                    <button type="button" className="btn btn-primary bg-blue-500 " onClick={openModal}><FaEdit /></button>
                    <button type="button" className="btn btn-danger ms-2 bg-red-500" onClick={(e) => {
                        removeUser(user.id)
                    }}><FaTrashAlt /></button>
                    
                </div>
            </div>
        </div>
    )
}

export default SingleUser
