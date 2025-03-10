import React from 'react'

const AcceuilProduct = ({ params }) => {
    return (
        <div>
            {
                params == 'chatbot-ia' &&
                <div className='bg-blue-100 p-8 pt-16 pb-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16 '>
                        <div className='order-1 space-y-4 w-full md:w-[440px] '>
                            <h3 className='font-bold text-4xl ml-4'>Expérience client</h3>
                            <p className='pb-4'>Une solution qui renforce votre équipe :</p>
                            <div className="flex gap-x-2 ">
                                <i className="fa-solid fa-bell-concierge mt-1 text-blue-500 "></i>
                                <p> <span className='font-bold'> Service 24/24</span> une présence continue et réactive pour satisfaire vos clients à tout moment, sans contrainte horaire..</p>
                            </div>

                            <div className='flex gap-x-2'>
                                <i className="fa-solid fa-chart-line mt-1 text-blue-500"></i>
                                <p><span className='font-bold'>Scalabilité </span> Adaptez instantanément vos capacités de traitement, même sur des créneaux spécifiques..</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <i className="fa-solid fa-bolt mt-1 text-blue-500"></i>
                                <p><span className='font-bold'>Réactivité</span> Faites évoluer rapidement vos scénarios d’appels sans formation complexe, pour une adaptation continue à vos besoins..</p>
                            </div>
                        </div>

                        <div className='order-2 flex justify-center'>
                            <img src="chatbot.png" alt="Service" className='rounded-lg w-[90%] md:w-[600px] h-[auto] md:h-[300px]' />
                        </div>
                    </div>
                </div>
            }
            {
                params == 'callbot-ia' &&
                <div className='bg-blue-100 p-8 pt-16 pb-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                        <div className='order-1  space-y-4 w-full md:w-[440px]'>
                            <h3 className='font-bold text-4xl ml-4'>Expérience client</h3>
                            <p className='pb-4'>Une solution qui renforce votre équipe :</p>
                            <div className="flex gap-x-2">
                                <i className="fa-solid fa-bell-concierge mt-1 text-blue-500 "></i>
                                <p> <span className='font-bold'> Service 24/24</span> une présence continue et réactive pour satisfaire vos clients à tout moment, sans contrainte horaire..</p>
                            </div>

                            <div className='flex gap-x-2'>
                                <i className="fa-solid fa-bolt mt-1 text-blue-500"></i>
                                <p><span className='font-bold'>Scalabilité </span> Adaptez instantanément vos capacités de traitement, même sur des créneaux spécifiques..</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <i className="fa-solid fa-bolt mt-1 text-blue-500"></i>
                                <p><span className='font-bold'>Réactivité</span> Faites évoluer rapidement vos scénarios d’appels sans formation complexe, pour une adaptation continue à vos besoins..</p>
                            </div>
                        </div>

                        <div className='order-2  flex justify-center'>
                            <img src="callbot.png" alt="Service" className='rounded-lg w-[90%] md:w-[600px] h-[auto] md:h-[300px]' />
                        </div>
                    </div>
                </div>
            }
            {
                params == 'mailbot-ia' &&
                <div className='bg-blue-100 p-8 pt-16 pb-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                        <div className='order-1 space-y-4 w-full md:w-[440px]'>
                            <h3 className='font-bold text-4xl ml-4'>Expérience client</h3>
                            <p className='pb-4'>Une solution qui renforce votre équipe :</p>
                            <div className="flex gap-x-2">
                                <i className="fa-solid fa-bell-concierge mt-1 text-blue-500 "></i>
                                <p> <span className='font-bold'> Service 24/24</span> une présence continue et réactive pour satisfaire vos clients à tout moment, sans contrainte horaire..</p>
                            </div>

                            <div className='flex gap-x-2'>
                                <i className="fa-solid fa-bolt mt-1 text-blue-500"></i>
                                <p><span className='font-bold'>Scalabilité </span> Adaptez instantanément vos capacités de traitement, même sur des créneaux spécifiques..</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <i className="fa-solid fa-bolt mt-1 text-blue-500"></i>
                                <p><span className='font-bold'>Réactivité</span> Faites évoluer rapidement vos scénarios d’appels sans formation complexe, pour une adaptation continue à vos besoins..</p>
                            </div>
                        </div>

                        <div className='order-2 flex justify-center'>
                            <img src="maillbot.png" alt="Service" className='rounded-lg w-[90%] md:w-[600px] h-[auto] md:h-[300px]' />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AcceuilProduct
