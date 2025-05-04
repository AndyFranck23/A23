"use client";
import MyInput from '@/components/Admin/MyInput';
import axios from 'axios';
import { useRef, useState } from 'react';
import { handleImageBrowser, handleImageSelect } from '@/components/composants';
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), { ssr: false });

export default function NewProductForm() {
    const editorRef = useRef(null);
    const [load, setLoad] = useState(false);
    const [imageType, setImageType] = useState('url') // 'url' ou 'upload'
    const [imageFile, setImageFile] = useState(null) // Pour stocker le fichier uploadé
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        image: '',
        content: '',
        status: false,
        meta_title: '',
        meta_description: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (type, value) => {
        if (type === 'url') {
            setForm({ ...form, image: value });
        } else if (type === 'upload') {
            const files = value
            const newImages = URL.createObjectURL(files)
            setImageFile(value);
            setForm({ ...form, image: newImages });
        }
    };

    const removeImage = () => {
        setForm({ ...form, image: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)
        try {
            const content = editorRef.current.getContent();
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });
            if (imageFile) {
                formData.append('file', imageFile); // Clé répétée "file"
            }
            formData.append('content', JSON.stringify(content))
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res)
            alert(res.data.message)
            setMessage(res.data.message);
            editorRef.current.setContent('')
            setForm({
                title: '',
                description: '',
                category: '',
                image: '',
                content: '',
                status: false,
                meta_title: '',
                meta_description: ''
            });
            setImageFile(null)
        } catch (error) {
            console.error(error);
            setMessage('Erreur de connexion');
        } finally {
            setLoad(false)
        }
    };

    return (
        <>
            <div className="w-full h-screen text-gray-700 dark:text-gray-200 dark:bg-gray-700">
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Ajouter un nouveau article</h1>
                    {message && <p className="mb-4 text-green-600">{message}</p>}
                    <form onSubmit={handleSubmit} className="md:grid grid-cols-2 gap-3">
                        <div className="">
                            <MyInput
                                name="title"
                                required
                                label={"Titre"}
                                type="text"
                                value={form.title}
                                onChange={handleChange}
                            />
                            <div className="mt-2">
                                <label className="block text-sm font-medium mb-1">Catégorie</label>
                                <select
                                    name="category"
                                    required
                                    value={form.category}
                                    onChange={handleChange}
                                    className='w-full p-2 border focus:ring-1 focus:ring-blue-500 outline-none dark:bg-transparent dark:border-gray-600'
                                >
                                    <option value="" className='hidden'>Sélection</option>
                                    <option value="chocolats" className='dark:bg-gray-600'>Chocolats</option>
                                    <option value="technologie" className='dark:bg-gray-600'>Technologie</option>
                                    <option value="mode" className='dark:bg-gray-600'>La mode</option>
                                </select>
                            </div>
                            <div className='mt-2'>
                                <label className="block">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full h-[115px] p-2 border focus:ring-1 focus:ring-blue-500 outline-none dark:bg-transparent dark:border-gray-600"
                                ></textarea>
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-md">
                                    Images
                                </label>
                                <div className="mb-1">
                                    <select
                                        value={imageType}
                                        onChange={(e) => setImageType(e.target.value)}
                                        className="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500">
                                        <option value="url">URL</option>
                                        <option value="upload">Upload</option>
                                        <option value="select">Select</option>
                                    </select>
                                </div>
                                <div className="">
                                    {imageType === 'url' && (
                                        <div className="flex gap-2 mb-2">
                                            <MyInput
                                                name={'image'}
                                                type={'text'}
                                                placeholder="Entrez une URL d'image"
                                                onKeyPress={(e) => e.key === 'Enter' && handleImageChange('url', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const input = document.querySelector('input[name="image"]');
                                                    if (input.value) {
                                                        handleImageChange('url', input.value);
                                                        input.value = '';
                                                    }
                                                }}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                Ajouter
                                            </button>
                                        </div>
                                    )}

                                    {imageType === 'upload' && (
                                        <div className="mb-5">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                // multiple
                                                onChange={(e) => handleImageChange('upload', e.target.files[0])}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                                            />
                                        </div>
                                    )}

                                    {imageType === 'select' && (
                                        <div className="mb-5">
                                            <button
                                                type="button"
                                                onClick={() => handleImageSelect(setForm, form)}
                                                className="block w-[200px] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500">
                                                Choisir des images
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Prévisualisation des images */}
                                {form.image && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium mb-2">Images sélectionnées:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {/* {form.image.map((img, index) => ( */}
                                            <div className="relative group">
                                                {/* <Image
                                                    src={form.image}
                                                    alt={`Preview`}
                                                    height={120}
                                                    width={120}
                                                    className="object-cover rounded border"
                                                /> */}
                                                <img
                                                    src={form.image}
                                                    alt={`Preview`}
                                                    className="h-20 w-20 object-cover rounded border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ×
                                                </button>
                                            </div>
                                            {/* ))} */}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <MyInput
                                name="meta_title"
                                label={"Meta Title"}
                                type="text"
                                value={form.meta_title}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="meta_description"
                                label={"Meta Déscription"}
                                type="text"
                                value={form.meta_description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-span-2">
                            <Editor
                                // apiKey={TINY_KEY}
                                tinymceScriptSrc="/tinymce/tinymce.min.js"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue="<p>Écris ici...</p>"
                                init={{
                                    branding: false, // Masque le branding TinyMCE
                                    promotion: false, // Désactive les promotions
                                    resize: true, // Permet le redimensionnement
                                    image_caption: true, // Active les légendes d'images
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        "image", "fullscreen", "table", "wordcount", "code", "link",
                                        //  "autoresize"
                                        // "powerpaste",
                                        "lists", "advlist"
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | bold italic | forecolor backcolor emoticons | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | \
                        link image media | codesample emoticons | print fullscreen preview | \
                        ",
                                    images_upload_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/uploads`,
                                    automatic_uploads: true,
                                    file_picker_types: "image media",
                                    file_picker_callback: handleImageBrowser,
                                    image_advtab: true,
                                    image_title: true,
                                    image_description: true,
                                    paste_as_text: false, // Ne pas convertir le texte en texte brut
                                    paste_word_valid_elements: "p,h1,h2,h3,b,strong,i,em,u,a,span,div,br", // Conserver certains styles de Word
                                    paste_word_cleanup_mode: "keep", // Conserver tous les styles du Word
                                    paste_data_images: true,
                                    paste_preprocess: function (plugin, args) {
                                        // Traiter le contenu avant le collage
                                        console.log("Prétraitement du collage", args.content);
                                    },
                                    paste_postprocess: function (plugin, args) {
                                        // Traiter le contenu après le collage
                                        console.log("Post-traitement du collage", args.content);
                                    },
                                }}
                            />
                        </div>

                        <button disabled={load}
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2"
                        >
                            {
                                load ? "Enregistrement en cours ..." : "Enregistrer"
                            }
                        </button>
                        {
                            form.status == true ?
                                <button disabled={load}
                                    onClick={() => setForm({ ...form, status: false })}
                                    type="submit"
                                    className="bg-white border-2 border-red-500 text-red-600 py-2 px-4 rounded hover:bg-gray-100 col-span-2"
                                >
                                    {
                                        load ? "Broullion en cours ..." : "Broullion"
                                    }
                                </button> :
                                <button disabled={load}
                                    onClick={() => setForm({ ...form, status: true })}
                                    type="submit"
                                    className="bg-white border-2 border-blue-500 text-blue-600 py-2 px-4 rounded hover:bg-gray-100 col-span-2"
                                >
                                    {
                                        load ? "Publication en cours ..." : "Publier"
                                    }
                                </button>
                        }
                    </form>
                </div>
            </div>
            {
                load && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
                            <div className="mb-5 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Ajout en cours ...</h2>
                        </div>
                    </div>
                )
            }
        </>
    );
}
