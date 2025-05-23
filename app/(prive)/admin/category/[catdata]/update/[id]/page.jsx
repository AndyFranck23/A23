"use client";
import MyInput from '@/components/Admin/MyInput';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewProductForm() {
    const params = useParams()
    const id = params.id
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        produit_id: '',
        name: '',
        category: '',
        description: '',
        status: 0,
        meta_title: '',
        meta_description: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?id=${id}`)
                const data = await response.json()
                setForm({
                    produit_id: data[0].produit_id,
                    name: data[0].nom,
                    category: data[0].category,
                    description: data[0].description,
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
        fetchCategories()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoad(true)
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });
            const res = await axios.put(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res)
            setMessage(res.data.message);
            alert(res.data.message)
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
                    <h1 className="text-2xl font-bold mb-4">Modifier un catégorie</h1>
                    {message && <p className="mb-4 text-green-600">{message}</p>}
                    <form onSubmit={handleSubmit} className="md:grid grid-cols-2 gap-3">
                        <div className="">
                            <MyInput
                                name="name"
                                required
                                label={"Nom"}
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
                            {/* <MyInput
                            name="image"
                            type="text"
                            label={"URL de l'image"}
                            value={form.image}
                            onChange={handleChange}
                        /> */}
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

                        <button disabled={load}
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2"
                        >
                            {
                                load ? "Enregistrement en cours ..." : "Enregistrer"
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
