"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function MediaManager() {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads`);
            const data = await res.json();
            setFiles(data.images);
        } catch (error) {
            console.log(error)
        }
    };

    const toggleSelection = (filename) => {
        setSelectedMedia(prev =>
            prev.includes(filename)
                ? prev.filter(f => f !== filename)
                : [...prev, filename]
        );
    };

    const selectAll = () => {
        if (selectedMedia.length === files.length) {
            setSelectedMedia([]);
        } else {
            setSelectedMedia(files);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedMedia.length === 0) return;
        if (confirm(`Supprimer ${selectedMedia.length} fichier(s) ?`)) {
            try {
                setLoading(true)
                await Promise.all(
                    selectedMedia.map(filename =>
                        axios.delete(`${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads/${filename}`)
                    )
                );
                setSelectedMedia([]);
                await fetchMedia();
                alert('Suppression réussie !');
            } catch (error) {
                console.log(error);
                alert('Erreur lors de la suppression');
            } finally {
                setLoading(false)
            }
        }
    };

    const handleFileSelect = (e) => {
        setSelectedFiles([...e.target.files]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (selectedFiles.length == 0) return alert("Veuillez entrer une image")
        setUploading(true);
        // setLoading(true);

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('file', file);
        });

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads`, formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            alert(response.data.message);
            await fetchMedia();
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
            // setLoading(false);
        }
    };


    return (
        <>
            <div className="p-6 dark:text-gray-200">
                <h1 className="text-3xl font-bold mb-6">Gestion des médias</h1>

                {/* Bulk Actions Bar */}
                {selectedMedia.length > 0 && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl flex gap-4 items-center z-20 border-2 border-gray-300 dark:border-gray-500">
                        <span className="text-gray-700 dark:text-gray-200">
                            {selectedMedia.length} sélectionné(s)
                        </span>
                        <button
                            onClick={handleBulkDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Supprimer la sélection
                        </button>
                        <button
                            onClick={() => setSelectedMedia([])}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                        >
                            Annuler
                        </button>
                    </div>
                )}

                {/* Upload Section */}
                <form onSubmit={handleUpload} encType='multipart/form-data' className="mb-8 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button
                        type="submit"
                        disabled={uploading}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    >
                        {uploading ? 'Envoi en cours...' : 'Envoyer les fichiers'}
                    </button>
                </form>

                {/* Selection Controls */}
                <div className="mb-4 flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={files.length > 0 && selectedMedia.length === files.length}
                            onChange={selectAll}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">Tout sélectionner</span>
                    </label>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className={`relative group border-2 rounded-lg overflow-hidden transition-all ${selectedMedia.includes(file)
                                ? 'border-blue-500 scale-95'
                                : 'border-transparent'
                                }`}
                            onClick={() => toggleSelection(file.name)}
                        >
                            <div className="absolute top-2 left-2 z-10">
                                <input
                                    type="checkbox"
                                    checked={selectedMedia.includes(file.name)}
                                    readOnly
                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                            <Image
                                src={file.url}
                                alt={file.name}
                                width={200}
                                height={200}
                                quality={5}
                                className='w-full h-32 object-cover cursor-pointer'
                            />
                            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all" /> */}
                        </div>
                    ))}
                </div>
            </div>
            {/* Drag Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
                        <div className="mb-5 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                        <h2 className="text-2xl font-bold dark:text-white">Suppression en cours ...</h2>
                    </div>
                </div>
            )}
        </>
    );
}