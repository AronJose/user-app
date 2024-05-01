import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import Layout from "./Layout";
function PrivateRoute({ component: Component, header }) {
    const [cookies] = useCookies("authToken");

    return (<Layout header={header}>
        {
            cookies.authToken ?
                <Component /> :
                <Navigate to={{ pathname: '/' }} />
        }
    </Layout>

    )

}
export default PrivateRoute;