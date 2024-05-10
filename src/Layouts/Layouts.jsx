import React from 'react';
import Header from '../Pages/Home/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Home/Footer';

const Layouts = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layouts;