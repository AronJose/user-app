import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../User/AddUser.css"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../../Components/SocialLogin/Social_login';


function SingUp() {
    const navigate = useNavigate()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const dispatch = useDispatch()
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    };
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        last_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        email: Yup.string().email('Email is Invalid').required('Required'),
        phone_number: Yup.string()
            .required("Required")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "too short")
            .max(10, "too long"),
        password: Yup.string()
            .required('Required'),
        confirm_password: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const signUpUser = async (values) => {
        if (values) {
            await dispatch.Auth.addUser(values)
        }
        navigate('/')
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={signUpUser} >
                {(formik) => (
                    <Form >
                        <div className=" space-y-2 h-screen bg-white flex flex-col items-center justify-center">
                            <div className=" space-y-[40px] w-[40%] h-[95%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center ">
                                <div className="space-y-4 flex items-center flex-col">
                                    <div className="space-y-2 flex items-center flex-col">
                                        <h2 className="text-3xl pt-4 font-mono font-black">Create an Account</h2>
                                        <p className="text-gray-500 tracking-normal text-sm	">
                                            sign up with your social media account or email  address</p></div>
                                    <div className="flex flex-row space-x-2">
                                        <div>
                                            <SocialLogin />
                                        </div>
                                    </div>
                                </div>
                                <div><p className="text-gray-400">----------------------------------(or)---------------------------------</p></div>
                                <div className="space-y-4">
                                    <div>
                                        <Field
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            className={`${formik.errors.first_name ? 'input-error' : ''} border rounded-full p-2 border-gray-300 w-[350px] h-[40px]`} />
                                        <ErrorMessage name="first_name" component="span" className="text-red-600" />
                                    </div>

                                    <div>
                                        <Field
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            className={`${formik.errors.last_name && formik.touched.last_name ? 'input-error' : ''} border rounded-full p-2 border-gray-300 w-[350px] h-[40px]`} />
                                        <ErrorMessage name="last_name" component="span" className="text-red-600" />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="email"
                                            placeholder="Email Address"
                                            className={`${formik.errors.email ? 'input-error' : ''} border rounded-full p-2 border-gray-300 w-[350px] h-[40px]`} />
                                        <ErrorMessage name="email" component="span" className="text-red-600" />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            className={`${formik.errors.phone_number && formik.touched.phone_number ? 'input-error' : ''}  border rounded-full p-2 border-gray-300 w-[350px] h-[40px]`} />
                                        <ErrorMessage name="phone_number" component="span" className="text-red-600" />
                                    </div>
                                    <div>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className={`${formik.errors.password && formik.touched.password ? 'input-error' : ''} border rounded-full p-2 border-gray-300 w-[350px] h-[40px]`} />
                                        <ErrorMessage name="password" component="span" className="text-red-600" />
                                    </div>
                                    <div>
                                        <Field
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Confirm Password"
                                            className={`${formik.errors.confirm_password && formik.touched.confirm_password ? 'input-error' : ''}  border rounded-full p-2 border-gray-300 w-[350px] h-[40px]`} />
                                        <ErrorMessage name="confirm_password" component="span" className="text-red-600" />
                                    </div>
                                    <div>
                                        <button class="bg-green-700 hover:bg-green-900 text-white font-bold rounded-full w-[350px] h-[40px]">
                                            Sign Up
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <p>Already have an account? <a href="/" id="login-link" className="text-blue-700">Login</a></p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default SingUp;
