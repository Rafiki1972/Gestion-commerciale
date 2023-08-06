// Dashboard.js

import '../app/globals.css'
import React, { useState } from 'react';
import { setCookie, getCookie, removeCookie } from '../components/cookie';
import DashboardComponnent from '../components/DashboardComponnent';
import FollowCursor from '../components/FollowCursor';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBar';

function Dashboard() {
    return (
        <>
            <FollowCursor />
                <NavBar />
                <DashboardComponnent />
                <Footer />
        </>
    );
}

export default Dashboard;
