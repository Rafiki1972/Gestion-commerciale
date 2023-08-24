// components/AddProductForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
interface AddProucttPorps {
    closeAddProduct: () => void;
}
const AddProductForm = ({ closeAddProduct }: AddProucttPorps) => {
    const [productData, setProductData] = useState({
        nomDeLArticle: '',
        description: '',
        code: '',
        cout: '',
        prixDeVente: '',
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);


    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nomDeLArticle', productData.nomDeLArticle);
        formData.append('description', productData.description);
        formData.append('code', productData.code);
        formData.append('cout', productData.cout);
        formData.append('prixDeVente', productData.prixDeVente);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await axios.post('http://localhost:3001/api/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            setMessage(response.data.message);
            setProductData({
                nomDeLArticle: '',
                description: '',
                code: '',
                cout: '',
                prixDeVente: '',
            });
            setSelectedImage(null);
        } catch (error) {
            setMessage('Error adding product');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 cursor-pointer"
        >
            <div className='bg-white p-4 rounded-lg max-w-md'>
                <button
                    onClick={closeAddProduct}
                    className="absolute top-0 right-0 bg-black opacity-50 z-[-1] text-gray-600 hover:text-gray-800 w-[100%] h-[100%]"
                >
                </button>
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nomDeLArticle">Nom de l'article</label>
                        <input
                            type="text"
                            id="nomDeLArticle"
                            value={productData.nomDeLArticle}
                            onChange={(e) => setProductData({ ...productData, nomDeLArticle: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={productData.description}
                            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Code</label>
                        <input
                            type="text"
                            id="code"
                            value={productData.code}
                            onChange={(e) => setProductData({ ...productData, code: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="cout">Cout</label>
                        <input
                            type="text"
                            id="cout"
                            value={productData.cout}
                            onChange={(e) => setProductData({ ...productData, cout: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="prixDeVente">Prix de vente</label>
                        <input
                            type="text"
                            id="prixDeVente"
                            value={productData.prixDeVente}
                            onChange={(e) => setProductData({ ...productData, prixDeVente: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button className='border p-4' type="submit">Add Product</button>
                </form>
                <p>{message}</p>
            </div>
        </motion.div>
    );
};

export default AddProductForm;
