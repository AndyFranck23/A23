import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Prices = ({ price, chocolats, produit }) => {
    return (
        <div className="flex justify-center w-full">
            {
                Array.isArray(price) &&
                <div className="w-full space-y-3 my-2 max-w-lg">
                    {price.map((item, index) =>
                        <div className="hover:bg-gray-200 dark:hover:bg-gray-700 duration-100 text-lg font-semibold flex justify-between items-center h-[50px] px-4 bg-gray-100 dark:bg-gray-800 rounded-4xl" key={index}>
                            <p className="text-gray-800 dark:text-gray-200">
                                {item.partenaire}
                            </p>
                            <a href={
                                typeof item?.lien === "string" &&
                                    (item?.lien.startsWith("http://") || item?.lien.startsWith("https://"))
                                    ? item?.lien
                                    : '#'
                            }
                                className={`text-white rounded-4xl w-[120px] px-4 p-1 flex items-center justify-between font-medium transition-colors duration-200 ${produit == "chocolats" ? 'bg-amber-600 hover:bg-amber-700' : 'bg-tech'}`}
                                target="_blank"
                                rel="nofollow noopener">
                                <ShoppingCartIcon className='w-7 h-7' /> {item?.prix} {chocolats?.devise == 'USD' ? '$' : '€'}
                            </a>
                        </div>
                    )}
                </div>
            }

        </div>
    )
}

export default Prices