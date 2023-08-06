// Dashboard.js

import { getCookie } from './cookie';
import React from 'react';
import { State } from './State';
import CardLineChart from './Chart';
import ChartCircle from './ChartCircle';
import BarChart from './BarChart';
import { Welcome } from './Welcome';
import { Table } from './Table';

function DashboardComponnent() {
    const name = getCookie('username');
    return (
        <>
            <Welcome name={name} />
            <div className="flex flex wrap min-h-screen">
                <div className="w-1/4">
                </div>
                <div className=" w-full w-3/4 mx-3 my-5 grid grid-cols-1 gap-4">
                    <State />
                    <CardLineChart />
                    <div className='flex gap-5 flex-wrap'>
                        <div className='md:w-[49%] w-[100%]'>
                            <ChartCircle />
                        </div>
                        <div className='md:w-[49%] w-[100%]'>
                            <BarChart />
                        </div>
                    </div>
                    <Table />
                </div>
            </div>
        </>
    );
}

export default DashboardComponnent;