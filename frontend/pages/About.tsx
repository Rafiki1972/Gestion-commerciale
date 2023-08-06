// Dashboard.js
'use client'
import React from "react";
import '../app/globals.css'
import { useTheme } from 'next-themes'


function About() {
    const { theme, setTheme } = useTheme()
    return (
        <div>
            <h1>
                The current theme is: {theme}
            </h1>
            <button onClick={() => setTheme('light')}>Light Mode</button>
            <br/>
            <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </div>
    );
}

export default About;
