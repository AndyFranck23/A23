// components/DarkModeToggle.js
'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function DarkModeToggle({ className }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem("theme") === "dark";
        setDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle("dark", newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? ' hover:bg-gray-800' : 'hover:bg-gray-200'} ${className}`}
        >
            {darkMode ? (
                <div className="flex justify-between items-center w-full">
                    <p>Claire</p>
                    <SunIcon className="w-6 h-6 text-yellow-400" />
                </div>
            ) : (
                <div className="flex justify-between items-center w-full">
                    <p>Sombre</p>
                    <MoonIcon className="w-6 h-6 text-gray-600" />
                </div>
            )}
        </button>
    );
}