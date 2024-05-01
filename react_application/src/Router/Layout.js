import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function Layout({ children,header }) {
    return (
        <>
            {header ? <div>
           
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
                :

                <div>
                    {children}
                </div>}

            </>
    );
}

export default Layout;