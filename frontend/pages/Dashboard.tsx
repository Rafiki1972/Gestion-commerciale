// Dashboard.js

import '../app/globals.css'
import React, { useState, useEffect } from 'react';
import DashboardComponnent from '../components/DashboardComponnent';
import Article from '../components/Article';
import FollowCursor from '../components/FollowCursor';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBar';
import Client from '../components/Client';
import { motion, AnimatePresence } from 'framer-motion';
// for navbar
/* These import statements are importing specific icons from different icon libraries
(`react-icons/vsc`, `react-icons/io5`, `react-icons/md`). */
import { VscAccount } from "react-icons/vsc";
import { IoMoon, IoLogOut } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import LogoutButton from '../components/LogOut';
import CheckCookie from '../components/cookie';
function Dashboard() {
    const [selectedItem, setSelectedItem] = useState('dashboard'); // Default selected item
    const [DarkMode, setDarkMode] = useState(false); // Default selected item
    // Storing the last selected Item in local starage


    /* The `useEffect` hook is used in React to perform side effects in functional components. In this code
    snippet, there are two `useEffect` hooks. */
    /* This `useEffect` hook is used to retrieve the value of the `selectedItem` from the local storage and
    set it as the initial value of the `selectedItem` state variable. */
    useEffect(() => {
        const data = window.localStorage.getItem('selectedItem');
        if (data !== null) setSelectedItem(data);
    }, []);

    /* This is used to store the value of the `selectedItem` state variable in the browser's
    local storage whenever it changes. */
    useEffect(() => {
        window.localStorage.setItem('selectedItem', selectedItem);
    }, [selectedItem]);


    useEffect(() => {
        const data = window.localStorage.getItem('DarkMode');
        if (data !== null) setDarkMode(JSON.parse(data));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('DarkMode', JSON.stringify(DarkMode));
    }, [DarkMode]);

    const handleDarkMode = () => {
        setDarkMode(!DarkMode)

        if (DarkMode) {
            document.documentElement.style.setProperty('--wb-bg', 'white');
            document.documentElement.style.setProperty('--wt-bg', 'purple');
        } else {
            document.documentElement.style.setProperty('--wb-bg', 'black');
            document.documentElement.style.setProperty('--wt-bg', 'white');
        }
    }

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
    };
    console.log(selectedItem)
    return (
        <div className={`transition ${DarkMode ? 'bg-gray-400' : ''}`}>
            <FollowCursor />
            <NavBar handleItemClick={handleItemClick} handleDarkMode={handleDarkMode} DarkMode={DarkMode} selectedItem={selectedItem} />
            <AnimatePresence mode='wait'>
                {selectedItem === 'article' ? (
                    <Article DarkMode={DarkMode} />
                ) : selectedItem === 'client' ? (
                    <Client DarkMode={DarkMode} />
                ) : (
                    <DashboardComponnent DarkMode={DarkMode} />
                )}
            </AnimatePresence>
            <Footer DarkMode={DarkMode} />
        </div>
    );
}

export default Dashboard;
