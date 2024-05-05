import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddUser.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


const AddUser = ({ edited, user, setUserList, setIsModalOpen, currentPage}) => {
    let navigate = useNavigate()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const dispatch = useDispatch()
    const initialValues = {
        id: user && user.id ? user.id : '',
        first_name: user && user.first_name ? user.first_name : '',
        last_name: user && user.last_name ? user.last_name : '',
        email: user && user.email ? user.email : '',
        phone_number: user && user.phone_number ? user.phone_number : '',
        image_url: user && user.image_url ? user.image_url : "",
        password: '',
        confirm_password:''
    };

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        last_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Email is Invalid')
            .required('Required'),
        phone_number: Yup.string()
            .required("Required")
            .matches(phoneRegExp, 'Phone number is not valid'),
        image_url: Yup.string(),
        password: !edited ? Yup.string()
            .required('Required') : '',
        confirm_password:!edited ?  Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match') : ''
    });

    const fetchNewUser = async (values) => {
        if (!edited) {
            const result = await dispatch.user.postUser(values);
            if (result.status === 'active') {
                navigate('/user') 
            };
            
        } else {
            const res = await dispatch.user.putUser(values);
            console.log("res", res)
            setIsModalOpen(false)
            let userList = await dispatch.user.getUsers(currentPage)
            setUserList(userList.rows)
            
        }
    };

    const upload = async (selectedFile) => {
        const formData = new FormData();
        formData.append("file", selectedFile);
       return await dispatch.user.uploadFile({ file: formData });
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={fetchNewUser}>

            {(formik) => (
                <Form >
                    <div className="create-user py-4">
                        <div className="card ">
                            <h2 className="signup text-3xl font-semibold py-2">{!edited ? "ADD USER" : "EDIT USER"}</h2>
                            <div className="inputBox">
                                <span>First Name  </span>
                                <Field type="text" name="first_name"
                                    className={formik.errors.first_name && formik.touched.first_name ? 'input-error' : null} />
                                <ErrorMessage name="first_name" component="span" className="error" />
                            </div>
                            <div className="inputBox">
                                <span>Last Name  </span>
                                <Field type="text" name="last_name"
                                    className={formik.errors.last_name && formik.touched.last_name ? 'input-error' : null} />
                                <ErrorMessage name="last_name" component="span" className="error" />
                            </div>
                            <div className="inputBox">
                                <span >Email  </span>
                                <Field type="text" name="email"
                                    className={formik.errors.email && formik.touched.email && formik.isValid.email ? 'input-error' : null} />
                                <ErrorMessage name="email" component="span" className="error" />
                            </div>
                            <div className="inputBox">
                                <span >Phone Number  </span>
                                <Field type="text" name="phone_number"
                                    className={formik.errors.phone_number && formik.touched.phone_number && formik.isValid.phone_number ? 'input-error' : null} />
                                <ErrorMessage name="phone_number" component="span" className="error" />
                            </div>
                            <div className="inputBox">
                                <span >Image </span>
                                <input type="file" name="image_url" onChange={ async (e) => {
                                    const selectedFile = e.target.files[0];
                                    const result = await upload(selectedFile);
                                    formik.setFieldValue('image_url', result.filepath);
                                    }}/>
                            </div>
                            {!edited ?
                                <div className= "inputBox" >
                                    <div className="inputBox">
                                        <span>password </span>
                                        <Field type="password" name="password"
                                            className={formik.errors.password && formik.touched.password ? 'input-error' : null} /><br></br>
                                        <ErrorMessage name="password" component="span" className="error mt-4" />
                                    </div>
                                    <div className="inputBox">
                                        <span>Confirm Password </span>
                                        <Field type="password" name="confirm_password"
                                            className={formik.errors.confirm_password && formik.touched.confirm_password ? 'input-error' : null} />
                                        <ErrorMessage name="confirm_password" component="span" className="error mt-5" />
                                    </div>
                                </div> : null}
                            <button type="submit"  className="enter bg-success text-white my-4 rounded-full w-32">{!edited ? "Add User" : "Edit User"}</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
};

export default AddUser;
