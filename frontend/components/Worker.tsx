import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddWorkerForm from './AddWorkerForm';
import AccessLevles from './AccessLevles';
import Alert from './Alert'
import EditWorker from './EditWorker'
import { MdOutlineSecurity } from "react-icons/md";
import SearchBar from './SearchBar'

interface Worker {
    DarkMode: boolean;
    EmployeeID: number;
    Prenom: string;
    NomDeFamille: string;
    NumeroDeContact: string;
    Email: string;
    Poste: string;
    Salaire: number;
}

export default function Worker(props: Worker) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [Worker, setWorker] = useState<Worker[]>([]);
    const [AddWorker, setAddWorker] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [LevelsDropdown, setLevelsDropdown] = useState([]);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const handlLevelsDropdown = (user: any) => {
        const levels = [
            { name: 'GestionDesEmployes', value: user.GestionDesEmployes },
            { name: 'GestionDesArticles', value: user.GestionDesArticles },
            { name: 'GestionDesClient', value: user.GestionDesClient },
            { name: 'GestionDesFournisseur', value: user.GestionDesFournisseur },
            { name: 'GestionDeStock', value: user.GestionDeStock },
            { name: 'GestionDesAchats', value: user.GestionDesAchats },
            { name: 'GestionDesVentes', value: user.GestionDesVentes },
            { name: 'GestionDesFactures', value: user.GestionDesFactures },
            { name: 'GestionDesResourcesHumaine', value: user.GestionDesResourcesHumaine },
        ];

        setLevelsDropdown(levels);
    };

    const closeLevelsDropdown = () => {
        setLevelsDropdown([]);
    };



    function fetchWorker() {
        fetch('http://localhost:3001/api/Worker')
            .then((res) => res.json())
            .then((data) => setWorker(data));
    }
    fetchWorker();

    const openEditWorker = (Worker: any) => {
        setSelectedWorker(Worker);
    };

    const closeopenEditWorker = () => {
        setSelectedWorker(null);
    };


    const handleAddWorker = () => {
        setAddWorker(!AddWorker);
    };


    // alert 
    const openAlert = (text: any) => {
        setAlertState(text);
        setTimeout(() => {
            setAlertState(null);
        }, 3000);
    };
    const closeAlert = () => {
        setAlertState(null);
    };


    //delete a Worker....

    const handleDelete = (WorkerID: any) => {
        var confirmSupprimer = confirm('Sûr vous souhaitez supprimer cet employé ??');
        if (confirmSupprimer) {

            try {
                axios.post('http://localhost:3001/api/deleteWorker', {
                    WorkerID: WorkerID,
                });
                openAlert('Worker Supprimerd Successfully');
                fetchWorker();
            } catch (error) {
                console.log('Error deleting Worker');
            }
        }
    }


    const filteredWorker =
        Worker && Worker.length > 0 ? (
            Worker.filter(wr => {
                const prenom = wr.Prenom ? wr.Prenom.toLowerCase() : '';
                const nomDeFamille = wr.NomDeFamille ? wr.NomDeFamille.toLowerCase() : '';
                return prenom.includes(searchTerm.toLowerCase()) || nomDeFamille.includes(searchTerm.toLowerCase());
            })
        ) : [];




    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
            {AddWorker && (
                <AddWorkerForm openAlert={() => openAlert('Worker added Successfully')} closeAddWorker={handleAddWorker} fetchWorkers={fetchWorker} />
            )}

            {LevelsDropdown.length > 0 && (
                <AccessLevles levels={LevelsDropdown} closeopenEditWorker={closeLevelsDropdown} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}

            {selectedWorker && (
                <EditWorker Worker={selectedWorker} onClose={closeopenEditWorker} openAlert={openAlert} fetchWorker={fetchWorker} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Worker</p>
                    <button onClick={handleAddWorker} title="Add Worker"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>

            <h1 className='py-4 font-black text-white whitespace-nowrap uppercase tracking-wider'>
                LISTS DES EMPOYES
            </h1>

            <SearchBar DarkMode={DarkMode} searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />


            <table
                className="w-full text-sm text-left"
                style={{
                    transition: 'height 0.5s ease-in-out',
                    height: `${filteredWorker.length * 50 + 40}px`
                }}
            >
                <thead className={`text-xs uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Numero de contact
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Post
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Salaire
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Accéder
                        </th>
                        <th>

                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody className='relative'>
                    {filteredWorker && filteredWorker.length > 0 ? (
                        filteredWorker.map((user) => (

                            <tr
                                key={user['EmployeeID']}
                                className={`border-b hover:opacity-90 ${DarkMode ? 'odd:bg-gray-600 even:bg-gray-500 even:text-white odd:text-gray-200' : 'odd:bg-gray-200 even:bg-white even:text-gray-900 odd:text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {user['Prenom']} {user['NomDeFamille']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user['NumeroDeContact']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user['Email']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user['Poste']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user['Salaire']}
                                </td>
                                <td className="px-6 py-4 flex items-center justify-center">
                                    <div
                                        className="flex items-center justify-center cursor-pointer w-10 items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                        onClick={() => handlLevelsDropdown(user)}>
                                        <MdOutlineSecurity
                                            className="w-5 h-5 flex-shrink-0 transition duration-75"
                                        />
                                    </div>
                                </td>
                                <td className="px-2">
                                    <button className='px-3 py-2 text-white bg-cyan-500 rounded transition hover:bg-cyan-500/50 border border-white hover:border-black'
                                        onClick={() => openEditWorker(user)}
                                    >
                                        Modifier
                                    </button>
                                </td>
                                <td className="px-2">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(user['EmployeeID'])}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                        >
                            <td className="px-4 py-4">
                                Aucun donnes desponible
                            </td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </motion.div>
    );
};