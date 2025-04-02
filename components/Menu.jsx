'use client'; // Nécessaire pour les hooks React

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { useEffect, useState } from 'react';

export const Menu = ({ className }) => {
    const [active, setActive] = useState(null)
    const [activeCat, setActiveCat] = useState(null)
    const [category, setCategory] = useState([])

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category`)
                const data = await response.json()
                setCategory(data)
                // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCat()
    }, [])

    return (
        <div className="flex justify-end">
            <div className={`overflow-y-auto fixed dark:bg-gray-900 dark:text-gray-300 bg-white w-[200px] h-screen z-40 px-2 pr-5 ${className}`}>
                <div className="">
                    <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200`}>
                        Accueil
                    </Link>
                    <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/chocolats`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200`}>
                        Chocolats
                    </Link>
                    <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/tech`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200`}>
                        Technologie
                    </Link>
                    <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/mode`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200`}>
                        La mode
                    </Link>
                    <div className="">
                        <button onClick={() => setActive(active == 'Catégories' ? null : 'Catégories')} className={`flex justify-between items-center w-full p-3 rounded-2xl dark:hover:bg-gray-800 hover:bg-gray-200`}>
                            Catégories
                            {active == 'Catégories' ?
                                <i className="fa-solid fa-chevron-down" /> :
                                <i className="fa-solid fa-chevron-right" />}
                        </button>
                        {active == 'Catégories' &&
                            <div className="dark:bg-gray-800 bg-gray-200 rounded-lg p-1 mt-1">
                                <div className="">
                                    <button onClick={() => setActiveCat(activeCat == 'Chocolats' ? null : 'Chocolats')} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-400'>
                                        <p>Chocolats</p>
                                        {activeCat == 'Chocolats' ?
                                            <i className="fa-solid fa-chevron-down" /> :
                                            <i className="fa-solid fa-chevron-right" />}
                                    </button>
                                    {activeCat == 'Chocolats' &&
                                        <div className='dark:text-gray-500 text-gray-700 ml-2'>
                                            {category?.map((item, index) =>
                                                <div key={index} className="">
                                                    {item.category == 'chocolats' ?
                                                        <Link href={'#'} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300'>{item.nom} </Link> : ''
                                                    }
                                                </div>
                                            )
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="">
                                    <button onClick={() => setActiveCat(activeCat == 'Technologie' ? null : 'Technologie')} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-400'>
                                        <p>Technologie</p>
                                        {activeCat == 'Technologie' ?
                                            <i className="fa-solid fa-chevron-down" /> :
                                            <i className="fa-solid fa-chevron-right" />}
                                    </button>
                                    {activeCat == 'Technologie' &&
                                        <div className='dark:text-gray-500 text-gray-700 ml-2'>
                                            {category?.map((item, index) =>
                                                <div key={index} className="">
                                                    {item.category == 'technologie' ?
                                                        <Link href={'#'} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300'>{item.nom} </Link> : ''
                                                    }
                                                </div>
                                            )
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="">
                                    <button onClick={() => setActiveCat(activeCat == 'La mode' ? null : 'La mode')} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-400'>
                                        <p>La mode</p>
                                        {activeCat == 'La mode' ?
                                            <i className="fa-solid fa-chevron-down" /> :
                                            <i className="fa-solid fa-chevron-right" />}
                                    </button>
                                    {activeCat == 'La mode' &&
                                        <div className='dark:text-gray-500 text-gray-700 ml-2'>
                                            {category?.map((item, index) =>
                                                <div key={index} className="">
                                                    {item.category == 'mode' ?
                                                        <Link href={'#'} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300'>{item.nom} </Link> : ''
                                                    }
                                                </div>
                                            )
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200`}>
                        Blog
                    </Link>
                    <DarkModeToggle className={`flex justify-between items-center w-full p-3 rounded-2xl`} />
                    <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/about`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200'}`}>
                        À propos
                    </Link>
                </div>
            </div>
        </div >
    )
}
