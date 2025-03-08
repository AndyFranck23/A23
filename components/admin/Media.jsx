'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Media = ({ data }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState(data.images)

    // Fonction pour rafraîchir la liste des images
    const fetchImages = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/upload`)
            const dataImages = await res.json()
            setImages(dataImages.images)
        } catch (err) {
            console.error(err)
        }
    }

    // Fonction pour ajouter (uploader) un fichier dans /uploads
    const handleAdd = async () => {
        if (!selectedFile) {
            alert("Veuillez sélectionner un fichier à ajouter.")
            return
        }
        const formData = new FormData()
        formData.append("file", selectedFile)
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            setMessage(response.data.message)
            alert(response.data.message)
            // Rafraîchir la liste des images après l'ajout
            fetchImages()
        } catch (error) {
            console.error(error)
            setMessage("Erreur lors de l'upload.")
        }
    }

    // Fonction pour supprimer l'image sélectionnée
    const handleDelete = async () => {
        if (!image) {
            alert("Veuillez sélectionner une image à supprimer.")
            return
        }
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads/${image}`
            )
            setMessage(response.data.message)
            alert(response.data.message)
            // Rafraîchir la liste des images après la suppression
            fetchImages()
        } catch (error) {
            console.error(error)
            setMessage("Erreur lors de la suppression.")
        }
    }

    return (
        <div className="text-black">
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    onChange={(e) => {
                        setSelectedFile(e.target.files[0])
                    }}
                    className="border p-1"
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Ajouter
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Supprimer
                </button>
            </div>
            <div className="mt-2">
                <p className="font-medium">Image sélectionnée: {image}</p>
                {message && <p className="text-sm text-gray-600 mt-1">{message}</p>}
            </div>
            <div className="flex flex-wrap mt-4 gap-2">
                {images.map((item, index) => (
                    <div
                        key={index}
                        className="cursor-pointer border p-1"
                        onClick={() => setImage(item)}
                    >
                        <img
                            src={`/api/uploads/${item}`}
                            className="w-[80px] h-[80px] object-cover"
                            alt={`Image ${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Media
