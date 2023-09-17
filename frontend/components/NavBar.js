'use client'
import React from 'react';
/* These import statements are importing specific icons from different icon libraries
(`react-icons/vsc`, `react-icons/io5`, `react-icons/md`). */
import { VscAccount } from "react-icons/vsc";
import { IoMoon, IoLogOut } from "react-icons/io5";
import { FaRegSun } from "react-icons/fa6";
import { HiChartPie } from "react-icons/hi2";
import { MdProductionQuantityLimits } from "react-icons/md";
import LogoutButton from './LogOut';
import CheckCookie from './cookie';

export const NavBar = ({ handleItemClick, handleDarkMode, DarkMode , selectedItem}) => {
    return (
        <aside
            id="sidebar"
            className={`fixed z-20 h-full top-0 left-0 flex lg:flex flex-shrink-0 w-2/12 transition-all transition-all overflow-hidden ${DarkMode ? 'bg-gray-800' : 'bg-purple-800'}`}
            aria-label="Sidebar"
        >
            <CheckCookie />
            <div className="relative flex-1 flex flex-col min-h-0 pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 divide-y space-y-1">
                        <ul className="space-y-2 pb-2">
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
                                    <img src='../images/logo.svg' width={70} />
                                    {/* <span className="ml-3  hidden md:block hidden md:block">Dashboard</span> */}
                                </div>
                            </li>
                            {/* ... Other list items ... */}
                        </ul>
                        <div className="space-y-2 pt-2">
                            <div
                                className={
                                    `text-base cursor-pointer  font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'} ${ selectedItem === 'dahsboard' ? ' text-amber-400' : 'text-white'}`
                                }
                                onClick={() => handleItemClick('dahsboard')}
                            >
                                <HiChartPie
                                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                                />
                                <span className="ml-4  hidden md:block">Dashboard</span>
                            </div>
                            <div
                                className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${ selectedItem === 'article' ? ' text-amber-400' : 'text-white'}`}
                                onClick={() => handleItemClick('article')}
                            >
                                <MdProductionQuantityLimits
                                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                                />
                                <span className="ml-4  hidden md:block">Article</span>
                            </div>
                            <div
                                className={`text-base cursor-pointer font-normal rounded-lg group transition duration-75 flex items-center p-2 ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}  ${ selectedItem === 'client' ? ' text-amber-400' : 'text-white'}`}
                                onClick={() => handleItemClick('client')}
                            >
                                <MdProductionQuantityLimits
                                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                                />
                                <span className="ml-4  hidden md:block">Client</span>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 space-y-2">
                        <a href=""
                            className={`text-base text-white font-normal rounded-lg flex items-center p-2  group ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'}`}>
                            <VscAccount
                                className="w-6 h-6 text-white group-hover:text-white transition duration-75" />
                            <span className="ml-3  hidden md:block">
                                Profile
                            </span>
                        </a>
                        <div onClick={handleDarkMode}
                            className={`cursor-pointer text-base text-white font-normal rounded-lg flex items-center p-2 group ${DarkMode ? 'hover:bg-gray-400' : 'hover:bg-purple-400'} `}>
                            {DarkMode ? (
                                <>
                                    <FaRegSun className="w-6 h-6 text-white group-hover:text-white transition duration-75" />
                                    <span className="ml-3 hidden md:block">
                                        <button>Light Mode</button>
                                    </span></>
                            ) :
                                (
                                    <>
                                        <IoMoon className="w-6 h-6 text-white group-hover:text-white transition duration-75" />
                                        <span className="ml-3 hidden md:block">
                                            <button>Dark Mode</button>
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

        </aside >
    );
};