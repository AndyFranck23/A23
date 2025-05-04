'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export const Menu = ({ className }) => {
    const [activeId, setActiveId] = useState(null)
    const [produits, setProduits] = useState([])
    const toggleMenu = (id) => {
        setActiveId(activeId === id ? null : id)
    }

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/produit?menu=dd`)
                const produit = await response.json()
                setProduits(produit)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduit()
    }, [])

    return (
        <>
            <div className={`h-screen bg-white border-r-[5px] border-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 w-[180px] fixed ${className}`}>
                <ul className="p-2 space-y-2 list-none">
                    <li>
                        <BoutonMenu title={"Dashboard"} onClick={() => toggleMenu('')} href={'/'} isActive={activeId} />
                    </li>
                    <li>
                        <BoutonMenu title={"Média"} onClick={() => toggleMenu('Médias')} href={'/admin/media'} isActive={activeId} />
                    </li>
                    <li>
                        <BoutonMenu title={"Articles"} onClick={() => toggleMenu('Articles')} href={'/admin/articles/liste'} isActive={activeId} />
                    </li>
                    <li>
                        <BoutonMenu title={"Page"} onClick={() => toggleMenu('Page')} href={'/admin/page/liste'} isActive={activeId} />
                    </li>
                    <li>
                        <BoutonMenu title={"Produits"} onClick={() => toggleMenu('Produits')} href={'/admin/produits/liste'} isActive={activeId} />
                    </li>
                    <li>
                        <BoutonMenu title={"Offres"} onClick={() => toggleMenu('Offres')} href={''} isActive={activeId} />
                        <div className={`bg-gray-200 dark:bg-gray-700 dark:text-white mt-2 rounded-lg overflow-hidden transition-all duration-300 ${activeId === 'Offres' ? 'max-h-40' : 'max-h-0'}`}>
                            {
                                produits?.map((item, index) =>
                                    <MySubButton key={index} text={item.nom} href={`/admin/offres/${item.id}/liste`} />
                                )
                            }
                        </div>
                    </li>
                    <li>
                        <BoutonMenu title={"Catégories"} onClick={() => toggleMenu('Catégories')} href={''} isActive={activeId} />
                        <div className={`bg-gray-200 dark:bg-gray-700 dark:text-white mt-2 rounded-lg overflow-hidden transition-all duration-300 ${activeId === 'Catégories' ? 'max-h-40' : 'max-h-0'}`}>
                            {
                                produits?.map((item, index) =>
                                    <MySubButton key={index} text={item.nom} href={`/admin/category/${item.id}/liste`} />
                                )
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

const BoutonMenu = ({ href, title, className, onClick, isActive }) => {
    return (
        <Link href={href} onClick={() => onClick(title)} className={`flex 
                py-2 px-4 w-full rounded-xl duration-200 
                ${isActive == title ? 'bg-blue-500 text-white hover:bg-blue-600' :
                'hover:bg-gray-200 dark:hover:bg-gray-600'} ${className}`}>
            {title}
        </Link>
    )
}

const MySubButton = ({ text, href }) => {
    return (
        <Link
            href={href}
            className="flex items-center px-6 py-2 w-full transition-all duration-300 hover:bg-blue-400 hover:text-white"
        >
            {text}
        </Link>
    )
}
