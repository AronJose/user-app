import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddUser.css';

const AddUser = () => {
    const initialValues = {
        first_name: '',
        last_name: '',
        email: ''
    };

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        last_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        email: Yup.string().email('Email is Invalid').required('Required')
    });

    const submissionHandle = (values) => {
        console.log(values);
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submissionHandle}>

            {(formik) => (
                <Form >
                    <div className="create-user m-5">
                        <div className="card">
                            <h2 className="signup">ADD USER</h2>

                            <div className="inputBox">
                                <span >Email  </span>
                                <Field type="text" name="email"
                                    className={formik.errors.email && formik.touched.email && formik.isValid.email ? 'input-error' : null} />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>

                            <div className="inputBox">
                                <span>First Name  </span>
                                <Field type="text" name="first_name" 
                                    className={formik.errors.first_name && formik.touched.first_name ? 'input-error' : null} />
                                <ErrorMessage name="first_name" component="div" className="error" />
                            </div>

                            <div className="inputBox">
                                <span>Last Name  </span>
                                <Field type="text" name="last_name" 
                                    className={formik.errors.last_name && formik.touched.last_name ? 'input-error' : null} />
                                <ErrorMessage name="last_name" component="div" className="error" />
                            </div>
                            <button type="submit" className="enter"> Enter </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
};

export default AddUser;
