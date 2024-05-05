import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import SocialLogin from '../../Components/SocialLogin/Social_login';

function Login() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        email: '',
        password: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Email is Invalid')
            .required('Required'),
        password: Yup.string()
            .required('Required')
    });
    const Login = async (values) => {
        const userInfo = await dispatch.Auth.loginUser(values);
        Cookies.set('authToken', userInfo.userdetails.token);
        if (userInfo.sucess) {
            navigate('/home');
        }
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={Login} >
                {(formik) => (
                    <Form >
                        <div className=" space-y-2 h-screen bg-white flex flex-col items-center justify-center">
                            <div className=" gap-y-8 w-[35%] p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-center">
                                <div>
                                    <SocialLogin />
                                </div>
                                <div>
                                    <p className="text-gray-400">----------------------- (or)---------------------</p>
                                </div>
                                <div className="space-y-8">
                                    <div>
                                        <Field
                                            type="text"
                                            name="email"
                                            placeholder="Username"
                                            className={`${formik.errors.email ? 'input-error' : ''} border rounded-full p-2 border-gray-300 w-[300px] h-[40px]`} />
                                        <ErrorMessage name="email" component="div" className="text-red-600" />
                                    </div>
                                    <div className="">
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className={`${formik.errors.password ? 'input-error' : ''} border rounded-full p-2 border-gray-300 w-[300px] h-[40px]`} />
                                        <ErrorMessage name="password" component="div" className="text-red-600" />
                                    </div>
                                    <div>
                                        <button class="bg-green-700 hover:bg-green-900 text-white font-bold rounded-full w-[300px] h-[40px]">
                                            Sign In
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <p>Create an account? <a href="/signup" id="login-link" className="text-blue-600">Sing Up</a></p>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default Login
