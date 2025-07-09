import React from 'react'

const Features = ({ chocolats }) => {
    function capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    return (
        <div id="caractéristique" className="mx-auto py-12 mt-8 border-t border-gray-200">
            <h2 className="md:text-4xl text-3xl font-bold text-indigo-600 text-center mb-4">Les caractéristiques</h2>
            <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center line-clamp-1">{chocolats?.name}</h3>
            <div className="w-full">
                {chocolats?.features.map((value, index) => {
                    const [titre, text] = value.split("=");
                    const elements = !text ? titre.split(',').map(f => f.trim()) : text.split(',').map(f => f.trim())
                    return (
                        <div className="" key={index}>
                            {!text ? '' : <h3 className="text-md md:text-lg font-bold text-red-600 my-4">{titre.toUpperCase()}</h3>}
                            {elements?.map((test, i) => {
                                const [label, element] = test.split(":");
                                return (
                                    <div key={i} className={`${i % 2 == 0 ? 'bg-gray-100 dark:bg-gray-800' : ''} grid grid-cols-2 p-4 px-5`}>
                                        <span className="font-semibold text-lg text-gray-700 dark:text-gray-200 w-35 md:w-full overflow-x-auto">{capitalizeFirstLetter(label)}</span>
                                        {/* <svg className="w-4 h-4 mr-1 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                    </svg> */}
                                        <span className="flex-1 text-gray-600 dark:text-gray-400 text-md">{element}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Features