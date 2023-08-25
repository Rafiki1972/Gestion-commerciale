import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const EditArticle = ({ product, onClose, openAlert }) => {
    const [productData, setProductData] = useState({
        articleID: product.ArticleID,
        nomDeLArticle: product.NomDeLArticle,
        description: product.Description,
        code: product.Code,
        cout: product.Cout,
        prixDeVente: product.PrixDeVente,
    });
    const [selectedImage, setSelectedImage] = useState(null);


    const handleSave = async () => {
        const formData = new FormData();
        formData.append('ArticleID', productData.articleID);
        formData.append('updatenomDeLArticle', productData.nomDeLArticle);
        formData.append('updatedescription', productData.description);
        formData.append('updatecode', productData.code);
        formData.append('updatecout', productData.cout);
        formData.append('updateprixDeVente', productData.prixDeVente);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        try {
            axios.post('http://localhost:3001/api/editProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // You can implement the logic here to save the edited article.
            // For example, you can make an API call to update the article data.
            openAlert('Product Edited Successfully');
            // Close the edit modal
            onClose();
        } catch (error) {
            console.log('Error editing product', error);
        }

    };

    const handleImageChange = (e) => {
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
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 z-50"
        >
            <div className="bg-white p-4 rounded-lg w-2/3">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-black opacity-50 z-[-1] text-gray-600 hover:text-gray-800 w-[100%] h-[100%]"
                >
                </button>
                <h2 className="text-xl font-bold mb-4">Edit Article</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nom De LArticle</label>
                    <input
                        type="text"
                        name="NomDeLArticle"
                        value={productData.nomDeLArticle}
                        onChange={(e) => setProductData({ ...productData, nomDeLArticle: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Code</label>
                    <input
                        type="text"
                        name="Code"
                        value={productData.code}
                        onChange={(e) => setProductData({ ...productData, code: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Cout</label>
                    <input
                        type="text"
                        name="Cout"
                        value={productData.cout}
                        onChange={(e) => setProductData({ ...productData, cout: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Prix De Vente</label>
                    <input
                        type="text"
                        name="PrixDeVente"
                        value={productData.prixDeVente}
                        onChange={(e) => setProductData({ ...productData, prixDeVente: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="flex g-5 justify-between">
                    <button
                        onClick={onClose}
                        className="w-[49%] bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="w-[49%] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EditArticle;













// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚪⚪🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚪⚪⚪🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴
// 🔴🔴🔴⚪⚪⚪⚪⚪⚫⚫⚫⚪⚫⚫⚫⚫⚫⚪⚪⚪🔴🔴🔴
// 🔴🔴⚪⚪⚪⚫⚪⚪⚪⚫⚫⚫⚫⚫⚪⚫⚫⚫⚪⚪⚪🔴🔴
// 🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴
// 🔴🔴⚪⚪⚪⚫⚫⚫⚪⚫⚫⚫⚫⚫⚪⚪⚪⚫⚪⚪⚪🔴🔴
// 🔴🔴🔴⚪⚪⚪⚫⚫⚫⚫⚫⚪⚫⚫⚫⚪⚪⚪⚪⚪🔴🔴🔴
// 🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴⚪⚪⚪⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴⚪⚪⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴