'use client';

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { Bars3BottomRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Menu } from './Menu';

export default function Header({ produits, category }) {
    const [menuActive, setMenuActive] = useState(false)

    return (
        <>
            {menuActive && <div onClick={() => setMenuActive(!menuActive)} className="h-screen bg-black/20 backdrop-blur-sm blakdrop-opacity-20 w-screen fixed z-30"></div>}
            <nav className={`dark:bg-gray-700 dark:text-gray-300 bg-white text-gray-600 border-b dark:border-gray-700 w-screen fixed z-50`}>
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex justify-between h-16 items-center`}>
                        <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/`} className="text-2xl font-bold">
                            <div className="flex items-center">
                                <img src='/logo.png' className='h-20 w-20 object-cover' />
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    Les 3 Merveilles
                                </span>
                            </div>
                        </Link>

                        <div className={`hidden sm:flex items-center space-x-8`}>
                            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/`} className={`hover:text-blue-500`}>
                                Accueil
                            </Link>
                            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/chocolats`} className={`hover:text-blue-500`}>
                                Chocolats
                            </Link>
                            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/technologie`} className={`hover:text-blue-500`}>
                                Technologie
                            </Link>
                            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/la-mode`} className={`hover:text-blue-500`}>
                                La mode
                            </Link>
                            <DarkModeToggle className={'lg:block hidden'} />
                        </div>
                        <Bars3BottomRightIcon onClick={() => setMenuActive(!menuActive)} className='w-10 h-10' />
                    </div >
                </div >
            </nav >
            <div className=" pb-[65px]"></div>
            <Menu
                produits={produits}
                category={category}
                className={`transform ease-in-out duration-500 ${menuActive ? 'translate-x-[0%]' : ' translate-x-[200%]'}`}
            />
        </>
    );
}