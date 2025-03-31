'use client'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'
import DarkModeToggle from '../DarkModeToggle'
import { Menu } from './Menu'

const Header = () => {
    const [menuActive, setMenuActive] = useState(false)

    return (
        <>
            <nav className={`dark:bg-gray-900 dark:text-gray-300 bg-white text-gray-600 border-b dark:border-gray-700 w-screen fixed z-50`}>
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex justify-between h-16 items-center`}>
                        <Bars3BottomLeftIcon onClick={() => setMenuActive(!menuActive)} className='w-10 h-10 md:hidden block' />
                        <Link href={`/`} className="text-2xl font-bold">
                            <div className="flex items-center">
                                {/* <svg
                                    className="h-12 w-12 mr-3"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="25" cy="25" r="20" className="fill-yellow-500 dark:fill-yellow-300" />
                                    <circle cx="75" cy="25" r="20" className="fill-blue-500 dark:fill-blue-300" />
                                    <circle cx="50" cy="75" r="20" className="fill-pink-500 dark:fill-pink-300" />
                                </svg> */}
                                <img src='/logo.png' className='h-20 w-20 object-cover' />
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    Les 3 Merveilles
                                </span>
                            </div>
                        </Link>
                        <DarkModeToggle />
                    </div >
                </div >
            </nav >
            <div className=" pb-[65px]"></div>

            {/* Overlay et menu latéral */}
            {menuActive && (
                <div
                    onClick={() => setMenuActive(false)}
                    className="md:hidden fixed h-screen w-screen z-20 bg-black/30 backdrop-blur-sm"
                ></div>
            )}
            <Menu className={`md:hidden block transform ease-in-out duration-500 z-40 ${menuActive ? "translate-x-[0%]" : "translate-x-[-100%]"}`} />
        </>
    )
}

export default Header