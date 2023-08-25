import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EditArticle from './EditArticle'
import axios from 'axios';

const ProductDetails = ({ product, onClose, openAlert, fetchProducts }) => {
    const [EditProduct, setEditProduct] = useState(null)

    const openEditProduct = (product) => {
        setEditProduct(product);
    };

    const closeEditProduct = () => {
        setEditProduct(null);
    };

    const handleDelete = async () => {
        var confirmDelete = confirm('Sure you want to delete this item ??');
        if (confirmDelete) {

            try {
                axios.post('http://localhost:3001/api/deleteProduct', {
                    ArticleID: product.ArticleID,
                });
                fetchProducts();
                onClose();
                openAlert('Product Deleted Successfully');
            } catch (error) {
                console.log('Error deleting product');
            }
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 z-50"
        >
            <div className="bg-white p-4 rounded-lg max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-black opacity-50 z-[-1] text-gray-600 hover:text-gray-800 w-[100%] h-[100%]"
                >
                </button>
                <h2 className="text-xl font-bold mb-4">{product.NomDeLArticle}</h2>
                <div className="flex justify-center">
                    <img
                        src={`http://localhost:3001/images/` + product.product_image}

                        alt={product.NomDeLArticle}
                        className="h-48 w-48 object-cover"
                    />
                </div>
                <p className="mt-4 text-gray-700">{product.Description}</p>
                <p className="mt-2 text-gray-900 font-semibold">{product.Cout} DH</p>
            </div>
            <div className='mt-5'>
                <div
                    className="group relative cursor-pointer inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                    onClick={handleDelete}
                >
                    <span
                        className="absolute inset-0 border border-red-600 group-active:border-red-500"
                    ></span>
                    <span
                        className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                    >
                        Delete
                    </span>
                </div>

                {/* Border */}

                <div
                    className="group relative cursor-pointer inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500"
                    onClick={openEditProduct}
                >
                    <span className="absolute inset-0 border border-current"></span>
                    <span
                        className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
                    >
                        Edit
                    </span>
                </div>
            </div>
            {EditProduct && (
                <EditArticle product={product} onClose={onClose} openAlert={openAlert} />
            )}
        </motion.div>
    );
};

export default ProductDetails;
