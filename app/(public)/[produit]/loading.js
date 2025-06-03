// app/[produit]/loading.js
export default function Loading() {
    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center h-screen w-screen bg-white backdrop-blur-sm backdrop-opacity-20">
            <p className="text-black text-lg">Chargement en cours...</p>
        </div>
    );
}

