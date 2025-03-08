import Media from '@/components/admin/Media';
import React from 'react'

const page = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/upload`)
    const data = await response.json()
    // Si aucune image n'est trouvée, retourne une erreur
    if (!data.images || data.images.length === 0) {
        console.log("Aucune image disponible");
        return;
    }
    return (
        <div>
            <Media data={data} />
        </div>
    )
}

export default page