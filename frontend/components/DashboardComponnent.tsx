// Dashboard.js

import { getCookie } from './cookie';
import React, { useEffect } from 'react';
import { State } from './State';
import CardLineChart from './Chart';
import ChartCircle from './ChartCircle';
import BarChart from './BarChart';
import { Welcome } from './Welcome';
import { Table } from './Table';
import { motion } from 'framer-motion';

interface DashboardComponentProps {
    DarkMode: boolean;
}


function DashboardComponnent(props: DashboardComponentProps) {
    let DarkMode = props.DarkMode;

    const name = getCookie('username');
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <Welcome name={name} />
            <div className={`flex transition flex wrap min-h-screen`}>
                <div className="w-1/4">
                </div>
                <div className=" w-full w-3/4 mx-3 my-5 grid grid-cols-1 gap-4">
                    <State DarkMode={DarkMode} />
                    <CardLineChart DarkMode={DarkMode} />
                    <div className='flex gap-5 flex-wrap'>
                        <div className='md:w-[49%] w-[100%]'>
                            <ChartCircle DarkMode={DarkMode} />
                        </div>
                        <div className='md:w-[49%] w-[100%]'>
                            <BarChart DarkMode={DarkMode} />
                        </div>
                    </div>
                    <Table DarkMode={DarkMode} />
                </div>
            </div>
        </motion.div>

    );
}

export default DashboardComponnent;