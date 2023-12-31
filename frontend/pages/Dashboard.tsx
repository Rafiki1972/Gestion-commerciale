// Dashboard.js

import '../app/globals.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DashboardComponnent from '../components/DashboardComponnent';
import Article from '../components/Article';
import FollowCursor from '../components/FollowCursor';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBar';
import Client from '../components/Client';
import Supplier from '../components/Supplier';
import Worker from '../components/Worker';
import Vente from '../components/Vente';
import { getCookie } from '../components/cookie';
import Achat from '../components/Achat';
import Stock from '../components/Stock';
import Transaction from '../components/TransactionCompte';
import Production from '../components/Production';
import TimeSheet from '../components/TimeSheet';
import ConnectionLost from '../components/ConnectionLost';
import Profile from '../components/Profile';
import Facture from '../components/Facture';
import { AnimatePresence } from 'framer-motion';
interface User {
    EmployeeID: 9,
    Prenom: string,
    NomDeFamille: string,
    NumeroDeContact: string,
    Email: string,
    Password: string,
    Poste: string,
    Salaire: number,
    GestionDesEmployes: number,
    GestionDesArticles: number,
    GestionDesClient: number,
    GestionDesFournisseur: number,
    GestionDeStock: number,
    GestionDesAchats: number,
    GestionDesVentes: number,
    GestionDesFactures: number,
    GestionDesResourcesHumaine: number,
}
// for navbar
/* These import statements are importing specific icons from different icon libraries
(`react-icons/vsc`, `react-icons/io5`, `react-icons/md`). */
function Dashboard() {
    const [selectedItem, setselectedItem] = useState('dashboard'); // Default selected item
    const [DarkMode, setDarkMode] = useState(false); // Default selected item
    // Storing the last selected Item in local starage

    const [worker, setWorker] = useState<User[]>([]);

    /* The `useEffect` hook is used in React to perform side effects in functional components. In this code
    snippet, there are two `useEffect` hooks. */
    /* This `useEffect` hook is used to retrieve the value of the `selectedItem` from the local storage and
    set it as the initial value of the `selectedItem` state variable. */
    useEffect(() => {
        const data = window.localStorage.getItem('selectedItem');
        if (data !== null) setselectedItem(data);
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
        setselectedItem(item);
    };
    useEffect(() => {
        const userId = getCookie('userId'); // Retrieve the user ID from the cookie
        console.log(userId);
        // Make an API request to fetch all worker data
        axios.get('http://localhost:3001/api/Worker')
            .then(response => {
                // Assuming response.data is an array of Worker objects
                setWorker(response.data);
            })
            .catch(error => {
                console.error('Error fetching worker data:', error);
            });
    }, []); // Empty dependency array, so this effect runs once on component mount

    useEffect(() => {
        const userId = getCookie('userId'); // Retrieve the user ID from the cookie

        // Find the worker with the matching user ID
        const selectedWorker = worker && worker.length > 0 ? (
            worker.find(w => w.EmployeeID === Number(userId))
        ) : []

        if (selectedWorker) {
            // Now you have the selected worker's data in the selectedWorker variable
            console.log('Worker found');
        } else {
            console.log('Worker not found');
        }
    }, [worker]); // This effect depends on the worker state


    return (
        <div className={`transition bg-black/50 ${DarkMode ? 'bg-gradient-to-r from-slate-900 to-slate-700' : 'bg-gradient-to-r from-purple-500 to-purple-900'}`}>
            {/* <FollowCursor /> */}
            {/* <ConnectionLost /> */}
            <NavBar worker={worker} handleItemClick={handleItemClick} handleDarkMode={handleDarkMode} DarkMode={DarkMode} selectedItem={selectedItem} />
            <AnimatePresence mode='wait'>
                {selectedItem === 'article' ? (
                    <Article DarkMode={DarkMode} />
                ) : selectedItem === 'client' ? (
                    <Client DarkMode={DarkMode} />
                ) : selectedItem === 'supplier' ? (
                    <Supplier DarkMode={DarkMode} />
                ) : selectedItem === 'worker' ? (
                    <Worker DarkMode={DarkMode} />
                ) : selectedItem === 'vente' ? (
                    <Vente DarkMode={DarkMode} />
                ) : selectedItem === 'achat' ? (
                    <Achat DarkMode={DarkMode} />
                ) : selectedItem === 'stock' ? (
                    <Stock DarkMode={DarkMode} />
                ) : selectedItem === 'transaction' ? (
                    <Transaction DarkMode={DarkMode} />
                ) : selectedItem === 'production' ? (
                    <Production DarkMode={DarkMode} />
                ) : selectedItem === 'timesheet' ? (
                    <TimeSheet DarkMode={DarkMode} />
                ) : selectedItem === 'profile' ? (
                    <Profile DarkMode={DarkMode} />
                ) : selectedItem === 'facture' ? (
                    <Facture DarkMode={DarkMode} />
                ) : (
                    <DashboardComponnent DarkMode={DarkMode} />
                )}
            </AnimatePresence>
            <Footer DarkMode={DarkMode} />
        </div>
    );
}

export default Dashboard;
