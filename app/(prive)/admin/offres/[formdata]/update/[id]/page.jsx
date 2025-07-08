"use client";
import MyInput from '@/components/Admin/MyInput';
import { handleImageBrowser, handleImageSelect } from '@/components/composants';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const Editor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), { ssr: false });
import dynamic from "next/dynamic";

export default function NewProductForm() {
    const editorRef = useRef(null);
    const params = useParams()
    const id = params.id
    const produit_id = params.formdata
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageType, setImageType] = useState('url') // 'url' ou 'upload'
    const [imageFile, setImageFile] = useState([]) // Pour stocker le fichier uploadé
    const [type, setType] = useState([])
    const [form, setForm] = useState({
        produit_id: '',
        category_id: '',
        name: '',
        category: '',
        subcategory: '',
        price: [],
        devise: '',
        remise: '',
        remiseDate: '',
        image: [],
        description: '',
        poids: 0,
        features: '',
        status: false,
        content: '',
        meta_title: '',
        meta_description: ''
    });
    const [champTemporaire, setChampTemporaire] = useState({
        partenaire: '',
        prix: '',
        lien: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?id=${id}`)
                const { offres } = await response.json()
                const data = offres
                let price = [];
                try {
                    const raw = data[0]?.price;

                    if (typeof raw === "string") {
                        const parsed = JSON.parse(raw);

                        if (Array.isArray(parsed)) {
                            price = parsed;
                        }
                    }
                } catch (error) {
                    // Ignorer toute erreur de parsing
                    price = [];
                }
                setForm({
                    produit_id: data[0].produit_id,
                    category_id: data[0].category_id,
                    name: data[0].name,
                    category: data[0].produit.nom,
                    subcategory: data[0].categorie.nom,
                    price: price,
                    devise: data[0].devise,
                    remise: data[0].remise,
                    remiseDate: data[0].remiseDate == null ? '' : data[0].remiseDate.split("T")[0],
                    image: data[0].image == "" ? [] : JSON.parse(data[0].image),
                    description: data[0].description,
                    poids: data[0].poids,
                    features: data[0].features,
                    status: data[0].status,
                    content: data[0]?.content ? JSON.parse(data[0].content) : data[0]?.content,
                    meta_title: data[0].meta_title,
                    meta_description: data[0].meta_description
                })
                setMessage('');
            } catch (error) {
                console.log(error)
                setMessage('Erreur de connexion données non récupérer');
            } finally {
                setLoading(false);
            }
        }
        fetchData()
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?produit_id=${produit_id}`)
                const data = await response.json()
                setType(data)
            } catch (error) {
                console.log(error)
                setMessage('Erreur de connexion données non récupérer');
            }
        }
        fetchCategories()
    }, [])

    const handleTempChange = (field, value) => {
        setChampTemporaire(prev => ({
            ...prev,
            [field]: field === 'prix' ? parseFloat(value) || '' : value
        }));
    };

    const ajouterDonnee = () => {
        const { partenaire, prix, lien } = champTemporaire;
        if (partenaire && prix && lien) {
            setForm(prev => ({
                ...prev,
                price: [...prev.price, champTemporaire]
            }));
            setChampTemporaire({ partenaire: '', prix: '', lien: '' });
        } else {
            alert("Veuillez remplir les 3 champs avant d'ajouter.");
        }
    };

    const modifierDonnee = (index, field, value) => {
        const nouvellesDonnees = [...form.price];
        nouvellesDonnees[index][field] = field === 'prix' ? parseFloat(value) || '' : value;
        setForm(prev => ({
            ...prev,
            price: nouvellesDonnees
        }));
    };

    const handleImageChange = (type, value) => {
        if (type === 'url') {
            setForm(prev => ({ ...prev, image: [...prev.image, value] }));
        } else if (type === 'upload') {
            const files = Array.from(value);
            const newImages = files.map(file => URL.createObjectURL(file));
            setImageFile(prev => [...prev, ...files]);
            setForm(prev => ({ ...prev, image: [...prev.image, ...newImages] }));
        }
    };

    const removeImage = (index) => {
        setForm(prev => {
            const newImages = [...prev.image];
            newImages.splice(index, 1);
            return { ...prev, image: newImages };
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)

        try {
            const content = editorRef.current.getContent();
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                key == 'image' ? (form[key].filter(ele => !ele.startsWith('blob:'))).forEach((file) => {
                    formData.append(key, file)
                }) :
                    key == 'price' ? formData.append(key, JSON.stringify(form[key])) :
                        formData.append(key, form[key]);
            });
            if (imageFile) {
                imageFile.forEach((file) => {
                    formData.append('file', file); // Clé répétée "file"
                });
            }
            formData.append('content', JSON.stringify(content))
            const res = await axios.put(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(res.data.message)
            setMessage(res.data.message);
        } catch (error) {
            console.error(error);
            setMessage('Erreur de connexion');
        } finally {
            setLoad(false)
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full h-screen text-gray-700 dark:text-gray-200 dark:bg-gray-700">
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 text-indigo-600">Modification d'un produit</h1>
                    {message && <p className="mb-4 text-green-600">{message}</p>}
                    <form onSubmit={handleSubmit} encType='multipart/form-data' className="md:grid grid-cols-2 gap-3">
                        <div className="">
                            <MyInput
                                name="name"
                                required
                                label={"Nom du produit"}
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="category"
                                required
                                label={"Catégorie"}
                                type="text"
                                value={form.category}
                                disabled={true}
                            />

                            <div className="mt-2">
                                <label className="block text-sm font-medium mb-1">Sous-catégorie</label>
                                <select
                                    name="subcategory"
                                    required
                                    value={form.subcategory}
                                    onChange={(e) => setForm({
                                        ...form,
                                        subcategory: e.target.value,
                                        category_id: type.find(item => item.nom == e.target.value).id
                                    })}
                                    className='w-full p-2 border focus:ring-1 focus:ring-blue-500 outline-none dark:bg-transparent dark:border-gray-600'
                                >
                                    <option value="" className='hidden'>Sélection</option>
                                    {
                                        type.length > 0 &&
                                        type?.map((item, index) =>
                                            <option key={index} value={item.nom} className='dark:bg-gray-600'>{item.nom}</option>
                                        )
                                    }
                                </select>
                            </div>
                            {/* Ajout de l'image */}
                            <div className="">
                                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-md">
                                    Images (Multiple)
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
                                                multiple
                                                onChange={(e) => handleImageChange('upload', e.target.files)}
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
                                {form.image.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium mb-2">Images sélectionnées:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {form.image.map((img, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={img}
                                                        alt={`Preview ${index}`}
                                                        className="h-20 w-20 object-cover rounded border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(img)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Fin image */}
                            <div className='mt-2'>
                                <label className="block">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-[115px] p-2 border focus:ring-1 focus:ring-blue-500 outline-none dark:bg-transparent dark:border-gray-600"
                                ></textarea>
                            </div>
                        </div>
                        <div className="">
                            <MyInput
                                name="poids"
                                required
                                label={"Poids"}
                                type="text"
                                value={form.poids}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="remise"
                                label={"Remise (%)"}
                                type="number"
                                value={form.remise}
                                onChange={handleChange}
                            />
                            {
                                form.remise &&
                                <MyInput
                                    name="remiseDate"
                                    label={"Date fin du remise"}
                                    type="date"
                                    value={form.remiseDate}
                                    onChange={handleChange}
                                />
                            }
                            <div className='mt-2'>
                                <label className="block">Caractéristiques (séparées par des virgules)</label>
                                <textarea
                                    name="features"
                                    value={form.features}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-[115px] p-2 border focus:ring-1 focus:ring-blue-500 outline-none dark:bg-transparent dark:border-gray-600"
                                ></textarea>
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

                        {/* Champs des prix */}
                        <div className="p-2 w-full space-y-6 border-2 border-gray-700 dark:border-gray-400 md:col-span-2 mt-5">

                            {/* Champs d’ajout */}
                            <div className="md:grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-200">
                                <div className="space-y-2 p-3 rounded bg-gray-100 dark:bg-gray-700 ">
                                    <h2 className="text-2xl font-bold">Ajout et modification des prix</h2>
                                    <MyInput
                                        type="text"
                                        placeholder="Partenaire"
                                        value={champTemporaire.partenaire}
                                        onChange={(e) => handleTempChange('partenaire', e.target.value)}
                                    />
                                    <MyInput
                                        type="number"
                                        placeholder="Prix"
                                        step="0.01"
                                        value={champTemporaire.prix}
                                        onChange={(e) => handleTempChange('prix', e.target.value)}
                                    />
                                    <MyInput
                                        type="text"
                                        placeholder="Lien"
                                        value={champTemporaire.lien}
                                        onChange={(e) => handleTempChange('lien', e.target.value)}
                                    />

                                    <button
                                        type='button'
                                        onClick={ajouterDonnee}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
                                    >
                                        Ajouter
                                    </button>
                                </div>

                                {/* Affichage stylisé des données */}
                                <div className="space-y-4 overflow-y-auto h-[290px] p-2">
                                    <h3 className="text-lg font-semibold">Prix, partenaire et lien affilié enregistré</h3>
                                    {form.price.length === 0 ? (
                                        <p className="text-gray-500">Aucune offre ajoutée pour le moment.</p>
                                    ) : (
                                        form.price.map((item, index) => (
                                            <div key={index} className="border rounded p-2 bg-transparent shadow space-y-1 text-gray-700 dark:text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Partenaire :</span>
                                                    <input
                                                        type="text"
                                                        value={item.partenaire}
                                                        onChange={(e) => modifierDonnee(index, 'partenaire', e.target.value)}
                                                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Prix :</span>
                                                    <input
                                                        type="number"
                                                        step={0.01}
                                                        value={item.prix}
                                                        onChange={(e) => modifierDonnee(index, 'prix', e.target.value)}
                                                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Lien :</span>
                                                    <input
                                                        type="text"
                                                        value={item.lien}
                                                        onChange={(e) => modifierDonnee(index, 'lien', e.target.value)}
                                                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sélectionnez une devise (Unité monétaire)
                            </label>
                            <select
                                name='devise'
                                value={form.devise}
                                required
                                onChange={(e) => handleChange(e)}
                                className="block w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="" className='hidden'>-- Choisir une devise --</option>
                                <option value="EUR">Euro (€)</option>
                                <option value="USD">Dollar ($)</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <Editor
                                // apiKey={TINY_KEY}
                                tinymceScriptSrc="/tinymce/tinymce.min.js"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={form.content}
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
                        <div className="sm:flex justify-between">
                            <button disabled={load}
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2"
                            >
                                {
                                    load ? "Enregistrement en cours ..." : "Enregistrer le produit"
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
                        </div>
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
                            <h2 className="text-2xl font-bold dark:text-white">Modification en cours ...</h2>
                        </div>
                    </div>
                )
            }
        </>
    );
}
