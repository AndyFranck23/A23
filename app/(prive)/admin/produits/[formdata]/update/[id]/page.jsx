"use client";
import MyInput from '@/components/Admin/MyInput';
import { handleImageSelect } from '@/components/composants';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewProductForm() {
    const params = useParams()
    const id = params.id
    const category = params.formdata
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageType, setImageType] = useState('url') // 'url' ou 'upload'
    const [imageFile, setImageFile] = useState([]) // Pour stocker le fichier uploadé
    const [type, setType] = useState([])
    const [form, setForm] = useState({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        originalPrice: '',
        remise: '',
        program: '',
        image: [],
        description: '',
        poids: 0,
        features: '',
        affiliateLink: '',
        status: 0,
        meta_title: '',
        meta_description: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?id=${id}`)
                const { offres } = await response.json()
                const data = offres
                setForm({
                    name: data[0].name,
                    category: data[0].category,
                    subcategory: data[0].subcategory,
                    price: data[0].price,
                    originalPrice: data[0].originalPrice,
                    remise: data[0].remise,
                    program: data[0].program,
                    image: data[0].image == "" ? [] : JSON.parse(data[0].image),
                    description: data[0].description,
                    poids: data[0].poids,
                    features: data[0].features,
                    affiliateLink: data[0].affiliateLink,
                    status: data[0].status,
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
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?cat=${category}`)
                const data = await response.json()
                setType(data)
            } catch (error) {
                console.log(error)
                setMessage('Erreur de connexion données non récupérer');
            } finally {
                setLoading(false);
            }
        }
        fetchCategories()
        fetchData()
    }, [])

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
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                key == 'image' ? (form[key].filter(ele => !ele.startsWith('blob:'))).forEach((file) => {
                    formData.append(key, file)
                }) :
                    formData.append(key, form[key]);
            });
            if (imageFile) {
                imageFile.forEach((file) => {
                    formData.append('file', file); // Clé répétée "file"
                });
            }
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
                    <h1 className="text-2xl font-bold mb-4">Modification d'un produit</h1>
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
                                    onChange={handleChange}
                                    className='w-full p-2 border focus:ring-1 focus:ring-blue-500 outline-none dark:bg-transparent dark:border-gray-600'
                                >
                                    <option value="" className='hidden'>Sélection</option>
                                    {
                                        type?.map((item, index) =>
                                            <option key={index} value={item.nom} className='dark:bg-gray-600'>{item.nom}</option>
                                        )
                                    }
                                </select>
                            </div>
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
                                                        onClick={() => removeImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
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
                            <MyInput
                                name="meta_title"
                                label={"Meta Title"}
                                type="text"
                                value={form.meta_title}
                                onChange={handleChange}
                            />
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
                                name="price"
                                required
                                label={"Prix"}
                                type="text"
                                value={form.price}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="originalPrice"
                                label={"Prix original"}
                                type="text"
                                value={form.originalPrice}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="remise"
                                label={"Remise (%)"}
                                type="number"
                                value={form.remise}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="program"
                                label={"Programme"}
                                type="text"
                                value={form.program}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="features"
                                required
                                label={"Caractéristiques (séparées par des virgules)"}
                                type="text"
                                value={form.features}
                                onChange={handleChange}
                            />
                            <MyInput
                                name="affiliateLink"
                                label={"Lien affilié"}
                                type="text"
                                value={form.affiliateLink}
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
                        <div className="sm:flex justify-between">
                            <button disabled={load}
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2"
                            >
                                {
                                    load ? "Enregistrement en cours ..." : "Modifier le produit"
                                }
                            </button>
                            {
                                form.status == 1 ?
                                    <button disabled={load}
                                        onClick={() => setForm({ ...form, status: 0 })}
                                        type="submit"
                                        className="bg-white border-2 border-red-500 text-red-600 py-2 px-4 rounded hover:bg-gray-100 col-span-2"
                                    >
                                        {
                                            load ? "Broullion en cours ..." : "Broullion"
                                        }
                                    </button> :
                                    <button disabled={load}
                                        onClick={() => setForm({ ...form, status: 1 })}
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
                            <h2 className="text-2xl font-bold dark:text-white">Enregistrement en cours ...</h2>
                        </div>
                    </div>
                )
            }
        </>
    );
}
