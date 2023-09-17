// components/AddProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
interface AddProucttPorps {
    closeAddProduct: () => void;
    fetchProducts(): void
}
const AddProductForm = ({ closeAddProduct, fetchProducts }: AddProucttPorps) => {
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
        closeAddProduct()
        fetchProducts();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };


    // Generate random code 
    const generateUniqueCode = async () => {
        let uniqueCode;

        // Keep generating codes until a unique one is found
        while (true) {
            // Generate a random number between 1000 and 9999
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            // Combine it with a prefix if needed
            uniqueCode = `PROD-${randomCode}`;

            // Check if the code exists in the product API
            const codeExists = await checkCodeExists(uniqueCode);
            if (!codeExists) {
                // If the code doesn't exist, break out of the loop
                break;
            }
        }

        // return uniqueCode;
        setProductData({
            ...productData, // Spread the existing state
            code: uniqueCode, // Update the code field with the new value
        });
    };

    const checkCodeExists = async (code: any) => {
        try {
            // Make an HTTP GET request to your product API to check if the code exists
            const response = await axios.get(`http://localhost:3001/api/checkCode/${code}`);

            if (response.data.exists === true) {
                // Code exists
                return true;
            } else {
                // Code does not exist
                return false;
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error checking code existence:', error);
            return false; // Assume the code doesn't exist in case of an error
        }
    };

    useEffect(() => {
        // Call the generateUniqueCode function only once on component mount
        generateUniqueCode();
    }, []); // The empty dependency array ensures this effect runs once

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
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="nomDeLArticle">Nom de l'article</label>
                        <input
                            type="text"
                            id="nomDeLArticle"
                            value={productData.nomDeLArticle}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            onChange={(e) => setProductData({ ...productData, nomDeLArticle: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={productData.description}
                            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">Code</label>
                        <input
                            type="text"
                            id="code"
                            readOnly={true}
                            value={productData.code}
                            onChange={(e) => setProductData({ ...productData, code: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="cout">Cout</label>
                        <input
                            type="text"
                            id="cout"
                            value={productData.cout}
                            onChange={(e) => setProductData({ ...productData, cout: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="prixDeVente">Prix de vente</label>
                        <input
                            type="text"
                            id="prixDeVente"
                            value={productData.prixDeVente}
                            onChange={(e) => setProductData({ ...productData, prixDeVente: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4" type="submit">Add Product</button>
                </form>
                <p>{message}</p>
            </div>
        </motion.div>
    );
};

export default AddProductForm;
// 1991