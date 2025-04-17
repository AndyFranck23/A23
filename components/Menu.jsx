'use client'; // Nécessaire pour les hooks React

import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { useEffect, useState } from 'react';

export const Menu = ({ className, produits, category }) => {
    const [active, setActive] = useState(null)
    const [activeCat, setActiveCat] = useState(null)

    return (
        <div className="flex justify-end">
            <div className={`overflow-y-auto fixed dark:bg-gray-900 dark:text-gray-300 bg-white w-[200px] h-screen z-40 px-2 pr-5 ${className}`}>
                <div className="">
                    <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200`}>
                        Accueil
                    </Link>
                    {
                        produits?.length > 0 &&
                        <>
                            {
                                produits.map((item, index) =>
                                    <Link key={index} href={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.slug}`} className={`flex justify-between items-center w-full p-3 rounded-2xl  dark:hover:bg-gray-800 hover:bg-gray-200`}>
                                        {item.nom}
                                    </Link>
                                )
                            }
                        </>
                    }
                    <div className="">
                        <button onClick={() => setActive(active == 'Catégories' ? null : 'Catégories')} className={`flex justify-between items-center w-full p-3 rounded-2xl dark:hover:bg-gray-800 hover:bg-gray-200`}>
                            Catégories
                            {active == 'Catégories' ?
                                <i className="fa-solid fa-chevron-down" /> :
                                <i className="fa-solid fa-chevron-right" />}
                        </button>
                        {active == 'Catégories' &&
                            <div className="dark:bg-gray-800 bg-gray-200 rounded-lg p-1 mt-1">
                                {
                                    produits?.length > 0 &&
                                    <>
                                        {
                                            produits?.map((item, i) =>
                                                <div className="" key={i}>
                                                    <button onClick={() => setActiveCat(activeCat == item.slug ? null : item.slug)} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-400'>
                                                        <p>{item.nom} </p>
                                                        {activeCat == item.slug ?
                                                            <i className="fa-solid fa-chevron-down" /> :
                                                            <i className="fa-solid fa-chevron-right" />}
                                                    </button>
                                                    {activeCat == item.slug &&
                                                        <div className='dark:text-gray-500 text-gray-700 ml-2'>
                                                            {category?.map((elt, index) =>
                                                                <div key={index} className="">
                                                                    {elt.category == item.slug ?
                                                                        <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.slug}/${elt.slug}`} className='flex justify-between items-center w-full p-2 rounded-lg dark:hover:bg-gray-900 hover:bg-gray-300'>{elt.nom} </Link> : ''
                                                                    }
                                                                </div>
                                                            )
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </>
                                }
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
