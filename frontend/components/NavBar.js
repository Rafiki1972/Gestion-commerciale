'use client'
import React from 'react';
/* These import statements are importing specific icons from different icon libraries
(`react-icons/vsc`, `react-icons/io5`, `react-icons/md`). */
import { VscAccount } from "react-icons/vsc";
import { IoMoon, IoLogOut } from "react-icons/io5";
import { FaRegSun } from "react-icons/fa6";
import { FaHospitalUser, FaUserTag, FaReceipt , FaBusinessTime} from "react-icons/fa";
import { HiChartPie, HiMiniBanknotes } from "react-icons/hi2";
import { MdSell, MdWork, MdProductionQuantityLimits } from "react-icons/md";
import { TbBusinessplan } from "react-icons/tb";
import { BsClipboard2DataFill } from "react-icons/bs";
import { BiSolidFactory } from "react-icons/bi";
import LogoutButton from './LogOut';
import CheckCookie from './cookie';
import { getCookie } from './cookie';

export const NavBar = ({ worker, handleItemClick, handleDarkMode, DarkMode, selectedItem }) => {
    const GestionDesEmployes = worker[0]?.GestionDesEmployes;
    const GestionDesArticles = worker[0]?.GestionDesArticles;
    const GestionDesClient = worker[0]?.GestionDesClient;
    const GestionDesFournisseur = worker[0]?.GestionDesFournisseur;
    const GestionDeStock = worker[0]?.GestionDeStock;
    const GestionDesAchats = worker[0]?.GestionDesAchats;
    const GestionDesVentes = worker[0]?.GestionDesVentes;
    const GestionDesFactures = worker[0]?.GestionDesFactures;
    const GestionDesResourcesHumaine = worker[0]?.GestionDesResourcesHumaine;
    const adminState = getCookie('usertype')
    return (
        <nav
            id="sidebar"
            className={`border-r border-white fixed z-20 h-full top-0 left-0 flex lg:flex flex-shrink-0 w-2/12 transition-all transition-all overflow-hidden ${DarkMode ? 'bg-gray-800' : 'bg-purple-800'}`}
            aria-label="Sidebar"
        >
            <CheckCookie />
            <div className="relative flex-1 flex flex-col min-h-0 pt-0">
                <div className="w-full relative flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="pb-[60%] flex-1 px-3 border-b  divide-y space-y-1">
                        <ul className="">
                            <li>
                                {/* <form action="#" method="GET" className="">
                            <label htmlFor="mobile-search" className="">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                    </svg>
                                </div>
                                <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                            </div>
                        </form> */}
                            </li>
                            <li>
                                <div className="rounded-lg flex items-center justify-center p-2 hover:bg-purple-400 group">
                                    <img src='../images/logo.svg' width={50} />
                                    {/* <span className="ml-3  hidden md:block hidden md:block">Dashboard</span> */}
                                </div>
                            </li>
                            {/* ... Other list items ... */}
                        </ul>
                        <div className="space-y-2 pt-2">
                            <div
                                className={
                                    `text-base cursor-pointer  font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'} ${selectedItem === 'dahsboard' ? 'font-extrabold text-amber-400' : 'text-white'}`
                                }
                                onClick={() => handleItemClick('dahsboard')}
                            >
                                <HiChartPie
                                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                                />
                                <span className="ml-4  hidden md:block">Tableau de bord</span>
                            </div>
                            {GestionDesArticles !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'article' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                    onClick={() => handleItemClick('article')}
                                >
                                    <MdSell
                                        className="w-5 h-5 flex-shrink-0 transition duration-75"
                                    />
                                    <span className="ml-4  hidden md:block">Article</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            {GestionDesClient !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'client' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                    onClick={() => handleItemClick('client')}
                                >
                                    <FaUserTag
                                        className="w-5 h-5 flex-shrink-0 transition duration-75"
                                    />
                                    <span className="ml-4  hidden md:block">Client</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            {GestionDesFournisseur !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'supplier' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                    onClick={() => handleItemClick('supplier')}
                                >
                                    <FaHospitalUser
                                        className="w-5 h-5 flex-shrink-0 transition duration-75"
                                    />
                                    <span className="ml-4  hidden md:block">Fournisseur</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            {GestionDesEmployes !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'worker' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                    onClick={() => handleItemClick('worker')}
                                >
                                    <MdWork
                                        className="w-5 h-5 flex-shrink-0 transition duration-75"
                                    />
                                    <span className="ml-4  hidden md:block">Employé</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            {GestionDesVentes !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'vente' ? 'font-extrabold text-amber-400 ' : 'text-white'}`}
                                    onClick={() => handleItemClick('vente')}
                                >
                                    <MdProductionQuantityLimits
                                        className="w-5 h-5 flex-shrink-0 transition duration-75"
                                    />
                                    <span className="ml-4  hidden md:block">Vente</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            {GestionDesAchats !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'achat' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                    onClick={() => handleItemClick('achat')}
                                >
                                    <TbBusinessplan
                                        className="w-5 h-5 flex-shrink-0 transition duration-75"
                                    />
                                    <span className="ml-4  hidden md:block">Achat</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            {GestionDeStock !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'stock' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                    onClick={() => handleItemClick('stock')}
                                >
                                    <BsClipboard2DataFill
                                        className="w-5 h-5 flex-shrink-0 transition duration-75 text-white"
                                    />
                                    <span className="ml-4  hidden md:block">Stock</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            {GestionDesFactures !== 0 || adminState === 'admin' ? (
                                <div
                                    className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'client' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                    onClick={() => handleItemClick('achat')}
                                >
                                    <FaReceipt
                                        className="w-5 h-5 flex-shrink-0 transition duration-75"
                                    />
                                    <span className="ml-4  hidden md:block">Facteurs</span>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                            }
                            <div
                                className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'transaction' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                onClick={() => handleItemClick('transaction')}
                            >
                                <HiMiniBanknotes
                                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                                />
                                <span className="ml-4  hidden md:block">Transaction Compte</span>
                            </div>
                            <div
                                className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'production' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                onClick={() => handleItemClick('production')}
                            >
                                <BiSolidFactory
                                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                                />
                                <span className="ml-4  hidden md:block">Production</span>
                            </div>
                            <div
                                className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'timesheet' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                onClick={() => handleItemClick('timesheet')}
                            >
                                <FaBusinessTime
                                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                                />
                                <span className="ml-4 hidden md:block">Emploi du temps</span>
                            </div>
                        </div>
                    </div>
                    <div className={`w-2/12 px-3 pt-2 border-t border-r space-y-2 fixed bottom-0 ${DarkMode ? 'bg-gray-900' : 'bg-purple-900'}`}>
                        {adminState === 'admin' &&
                            <div
                                className={`text-base text-white font-normal rounded-lg flex items-center p-2 cursor-pointer group ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${selectedItem === 'profile' ? 'font-extrabold text-amber-400' : 'text-white'}`}
                                onClick={() => handleItemClick('profile')}
                            >
                                <VscAccount
                                    className="w-6 h-6 text-white group-hover:text-white transition duration-75" />
                                <span className="ml-3  hidden md:block">
                                    Profile
                                </span>
                            </div>
                        }
                        <div onClick={handleDarkMode}
                            className={`cursor-pointer text-base text-white font-normal rounded-lg flex items-center p-2 group ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'} `}>
                            {DarkMode ? (
                                <>
                                    <FaRegSun className="w-6 h-6 text-white group-hover:text-white transition duration-75" />
                                    <span className="ml-3 hidden md:block">
                                        <button>
                                            Mode lumière
                                        </button>
                                    </span></>
                            ) :
                                (
                                    <>
                                        <IoMoon className="w-6 h-6 text-white group-hover:text-white transition duration-75" />
                                        <span className="ml-3 hidden md:block">
                                            <button>
                                                Mode sombre
                                            </button>
                                        </span>
                                    </>
                                )}
                        </div>
                        <div
                            className={`cursor-pointer text-base font-normal rounded-lg flex items-center p-2  group ${DarkMode ? 'hover:bg-gray-100 bg-amber-300 text-black' : 'hover:bg-purple-100 bg-purple-900 text-white'}`}>
                            <IoLogOut className="w-6 h-6 group-hover:text-purple-600 transition duration-75" />
                            <span className="ml-3 w-full hidden md:block group-hover:text-purple-600 transition duration-75">
                                <LogoutButton />
                            </span>
                        </div>
                    </div>
                </div>
            </div >

        </nav>
    );
};